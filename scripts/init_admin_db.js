/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")
const { Client } = require("pg")

const ROOT = process.cwd()
const ENV_PATH = path.join(ROOT, ".env.local")

function readDatabaseUrl() {
  const raw = fs.readFileSync(ENV_PATH, "utf8")
  const match = raw.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error("DATABASE_URL not found in .env.local")
  return match[1].trim()
}

const SCHEMA = `
-- Create projects table
CREATE TABLE IF NOT EXISTS projects_admin (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  number TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT,
  status TEXT,
  "videoUrl" TEXT,
  "videoPoster" TEXT,
  "liveUrl" TEXT,
  "githubUrl" TEXT,
  "techStack" JSONB,
  impact JSONB,
  features JSONB,
  year TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  date TEXT,
  author TEXT,
  tags JSONB,
  content JSONB,
  "readingTime" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table (actually we use contact_submissions but let's make sure it has the fields we expect)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  source TEXT,
  business_type TEXT,
  status TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Labs ecosystem table
CREATE TABLE IF NOT EXISTS labs_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  status TEXT,
  link TEXT,
  tags JSONB,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

const INITIAL_PROJECTS = [
  {
    slug: "buildwithshubh",
    number: "01",
    title: "BuildWithShubh",
    subtitle: "A modern business platform built with Next.js, Tailwind CSS, and Supabase",
    description: "A modern business platform built with Next.js, Tailwind CSS, and Supabase, delivering fast, conversion-focused digital experiences for growing brands. The platform showcases precision engineering and premium web architecture designed for business growth.",
    category: "Agency",
    status: "Live",
    videoUrl: "",
    videoPoster: "",
    liveUrl: "https://buildwithshubh.vercel.app",
    githubUrl: "https://github.com/NeuralShubh/BuildWithShubh",
    techStack: JSON.stringify(["Next.js", "TypeScript", "Supabase", "Tailwind CSS"]),
    impact: JSON.stringify({
      headline: "Unified multiple digital systems into one cohesive brand infrastructure",
      description: "Replaced scattered web presence with a single high-performance platform that loads in under 2 seconds and converts visitors into clients."
    }),
    features: JSON.stringify([
      "Conversion-focused landing system with optimized CTAs",
      "Supabase-powered backend for real-time data",
      "Mobile-first responsive design across all breakpoints",
      "SEO-optimized architecture with structured data",
      "Performance score 90+ on Lighthouse"
    ]),
    year: "2025",
    duration: "4 weeks"
  }
  // Add more from data-projects.ts if needed, but for now 1 is enough to seed UI
];

async function main() {
  const client = new Client({
    connectionString: readDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  try {
    console.log("Creating tables...")
    await client.query(SCHEMA)
    console.log("Tables created successfully.")
    
    // Seed initial project to test mapping
    console.log("Inserting seed project...")
    const p = INITIAL_PROJECTS[0];
    await client.query(`
      INSERT INTO projects_admin (slug, number, title, subtitle, description, category, status, "videoUrl", "videoPoster", "liveUrl", "githubUrl", "techStack", impact, features, year, duration)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14::jsonb, $15, $16)
      ON CONFLICT (slug) DO NOTHING
    `, [p.slug, p.number, p.title, p.subtitle, p.description, p.category, p.status, p.videoUrl, p.videoPoster, p.liveUrl, p.githubUrl, p.techStack, p.impact, p.features, p.year, p.duration])
    
    console.log("All done!")
  } catch (error) {
    console.error("MIGRATION ERROR", error)
  } finally {
    await client.end()
  }
}

main()
