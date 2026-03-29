const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/^DATABASE_URL=(.+)$/m)[1].trim();
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  
  await client.connect();
  const tables = ['projects_admin', 'services', 'labs_products', 'studio_pricing_plans', 'blog_posts'];
  for (const table of tables) {
    const res = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
    console.log(`Table ${table} columns:`, res.rows.map(r => r.column_name).join(', '));
  }
  await client.end();
}

main();
