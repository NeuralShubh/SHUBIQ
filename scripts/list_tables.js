const { Client } = require('pg');
const fs = require('fs');
async function main() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/^DATABASE_URL=(.+)$/m)[1].trim();
  const c = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await c.connect();
  const res = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name='contact_submissions'");
  console.log('Columns:', res.rows.map(r => r.column_name));
  await c.end();
}
main();
