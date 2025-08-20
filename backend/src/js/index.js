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
  } catch (err) {
    console.error("Error during sync:", err);
  } finally {
    await pool.end();
  }
})();
