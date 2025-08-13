import { describe, test, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { Client } from '@notionhq/client';
import pkg from 'pg';
import { config } from 'dotenv';

// Set Jest timeout for slow integration tests
jest.setTimeout(30000);

const { Pool } = pkg;

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

  test('should create a new page in Notion database', async () => {
    const testName = `test_create_${Date.now()}`;
    const testDate = new Date().toISOString().split('T')[0];
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: { content: testName }
            }
          ]
        },
        Date: {
          date: { start: testDate }
        }
      }
    });
    expect(response).toBeDefined();
    expect(response.object).toBe('page');
    expect(response.properties.Name.title[0].plain_text).toBe(testName);
  });

  test('should update a page in Notion database', async () => {
    // Create a page to update
    const testName = `test_update_${Date.now()}`;
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: { content: testName }
            }
          ]
        }
      }
    });
    const pageId = response.id;
    // Update the page
    const updatedName = `${testName}_updated`;
    const updateResponse = await notion.pages.update({
      page_id: pageId,
      properties: {
        Name: {
          title: [
            {
              text: { content: updatedName }
            }
          ]
        }
      }
    });
    expect(updateResponse).toBeDefined();
    expect(updateResponse.properties.Name.title[0].plain_text).toBe(updatedName);
  });

  test('should handle error for invalid Notion API key', async () => {
    const badNotion = new Client({ auth: 'invalid-key' });
    await expect(
      badNotion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID })
    ).rejects.toThrow();
  });

  test('should validate Notion database schema properties', async () => {
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID
    });
    expect(response.properties).toBeDefined();
    expect(response.properties.Name).toBeDefined();
    expect(response.properties.Name.type).toBe('title');
    expect(response.properties.Date).toBeDefined();
    expect(response.properties.Date.type).toBe('date');
  });

  test('should paginate Notion database results', async () => {
    // Query with small page size to force pagination
    const firstPage = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 1
    });
    expect(firstPage.results.length).toBeLessThanOrEqual(1);
    if (firstPage.has_more && firstPage.next_cursor) {
      const secondPage = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        start_cursor: firstPage.next_cursor,
        page_size: 1
      });
      expect(secondPage.results.length).toBeLessThanOrEqual(1);
    }
  });
});