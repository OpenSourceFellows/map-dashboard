import fs from 'fs';
import csv from 'csv-parser';
import { Client } from "@notionhq/client";
import { config } from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

// Load environment variables
config();

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Initialize PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

/**
 * Inserts landmark records into table
 * Duplicate rows on (campaign, name) will be ignored.
 * @param {Array<Object>} rows - CSV data as objects
 * @throws Rollback if error occurs during insertion. 
 */
async function insertLandmarkRows(rows) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction
    for (const row of rows) {
      const query = `
        INSERT INTO landmarks (
          campaign, name, species, longitude, latitude, acres_owned
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT ON CONSTRAINT unique_landmark_campaign DO NOTHING
      `; // Postgres column names (insert data)

      // CSV column names--exluded 'water' SQL column since CSV file omits it
      const values = [
        row.campaign,
        row.landmark, // becomes 'name' in SQL
        row.species || '',
        Number.isFinite(parseFloat(row.longitude)) ? parseFloat(row.longitude) : 0,
        Number.isFinite(parseFloat(row.latitude)) ? parseFloat(row.latitude) : 0,
        Number.isFinite(parseInt(row.acreage)) ? parseInt(row.acreage) : 0,
      ];
      await client.query(query, values); // Insert row, skip duplicates
    }
    await client.query('COMMIT'); // Commit transaction
    console.log('All rows inserted successfully!');
  } catch (err) {
    await client.query('ROLLBACK'); // Undo all changes if anything fails
    console.error('Error inserting rows:', err);
  } finally {
    client.release(); // Release connection
  }
}

/**
 * Reads landmark data from CSV file, parses data, inserts data into table.
 * @returns {Promise<void>} Resolves when all data loaded.
 * @throws Rejects if trouble reading or inserting data.
 */
async function syncLandmarkData() {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('data/external/landmarks.csv')
      .pipe(csv())
      .on('data', (row) => {
        results.push(row); // Collect each row
      })
      .on('end', async () => {
        try {
          console.log(`Loaded ${results.length} rows from CSV.`);
          await insertLandmarkRows(results); // Load into PostgreSQL
          resolve(); // Resolve the promise after successful insert
        } catch (err) {
          reject(err); // Reject on failure to insert
        }
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        reject(err); // Reject on read failure
      });
  });
}

(async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    for (const page of response.results) {
      const name = page.properties.Name.title[0]?.plain_text || "Unnamed";
      const date = page.properties.Date?.date?.start || null;

      if (date) {
        await pool.query(
          `INSERT INTO notion_table (name, date)
           VALUES ($1, $2)
           ON CONFLICT (name) DO UPDATE SET date = EXCLUDED.date`,
          [name, date]
        );
      }
    }

    console.log("Data sync complete.");
    await syncLandmarkData();
  } catch (err) {
    console.error("Error during sync:", err);
  } finally {
    await pool.end();
  }
})();
