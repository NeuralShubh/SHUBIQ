const { Client } = require("pg")
const fs = require("fs")
const path = require("path")

const match = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8").match(/^DATABASE_URL=(.+)$/m)
const client = new Client({ connectionString: match[1].trim(), ssl: { rejectUnauthorized: false } })

const SCHEMA = `
CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT,
  title TEXT,
  "desc" TEXT,
  tag TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS studio_pricing_plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tier TEXT,
  tag TEXT,
  best_for TEXT,
  price INTEGER,
  price_suffix TEXT,
  meta TEXT,
  features JSONB,
  cta TEXT,
  highlighted BOOLEAN,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

client.connect().then(() => client.query(SCHEMA)).then(() => {
  console.log("Tables created successfully!")
  client.end()
}).catch(console.error)
