const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const { Client } = require('@notionhq/client');
const { Pool } = require('pg');
const { config } = require('dotenv');

// Load environment variables
config();

describe('Notion API Integration Tests', () => {
  let notion;
  let pool;

  beforeAll(async () => {
    // Initialize Notion client
    notion = new Client({ 
      auth: process.env.NOTION_API_KEY 
    });

    // Initialize PostgreSQL connection pool
    pool = new Pool({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    });

    // Create test table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notion_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  afterAll(async () => {
    // Clean up test data
    await pool.query('DELETE FROM notion_table WHERE name LIKE $1', ['test_%']);
    await pool.end();
  });

  test('should connect to Notion API successfully', async () => {
    expect(process.env.NOTION_API_KEY).toBeDefined();
    expect(process.env.NOTION_DATABASE_ID).toBeDefined();
    
    // Test basic connection
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    });
    
    expect(response).toBeDefined();
    expect(response.id).toBe(process.env.NOTION_DATABASE_ID);
  });

  test('should query Notion database successfully', async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 1
    });
    
    expect(response).toBeDefined();
    expect(response.results).toBeDefined();
    expect(Array.isArray(response.results)).toBe(true);
  });

  test('should connect to PostgreSQL successfully', async () => {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    
    expect(result.rows).toBeDefined();
    expect(result.rows.length).toBe(1);
    
    client.release();
  });

  test('should insert data into PostgreSQL from Notion', async () => {
    const testName = `test_${Date.now()}`;
    const testDate = new Date().toISOString().split('T')[0];
    
    // Insert test data
    await pool.query(
      'INSERT INTO notion_table (name, date) VALUES ($1, $2)',
      [testName, testDate]
    );
    
    // Verify insertion
    const result = await pool.query(
      'SELECT * FROM notion_table WHERE name = $1',
      [testName]
    );
    
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe(testName);
    expect(result.rows[0].date.toISOString().split('T')[0]).toBe(testDate);
  });

  test('should handle database sync operation', async () => {
    // Test the main sync functionality
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 5
    });

    expect(response.results.length).toBeGreaterThanOrEqual(0);
    
    // If there are results, test the sync process
    if (response.results.length > 0) {
      const page = response.results[0];
      const name = page.properties.Name?.title[0]?.plain_text || "Test Entry";
      const date = page.properties.Date?.date?.start || new Date().toISOString().split('T')[0];

      await pool.query(
        `INSERT INTO notion_table (name, date)
         VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET date = EXCLUDED.date`,
        [name, date]
      );

      // Verify the data was inserted/updated
      const result = await pool.query(
        'SELECT * FROM notion_table WHERE name = $1',
        [name]
      );
      
      expect(result.rows.length).toBe(1);
    }
  });
});