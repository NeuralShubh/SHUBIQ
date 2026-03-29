const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
const supabaseUrlMatch = envLocal.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/m);
const supabaseKeyMatch = envLocal.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m);
const supabaseUrl = supabaseUrlMatch ? supabaseUrlMatch[1].trim() : '';
const supabaseKey = supabaseKeyMatch ? supabaseKeyMatch[1].trim() : '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  console.log('🔄 Starting massive data sync to Supabase...');

  require('ts-node').register({
    compilerOptions: { module: 'commonjs', moduleResolution: 'node', target: 'es6', esModuleInterop: true },
    transpileOnly: true
  });

  const m = require('module');
  const originalRequire = m.prototype.require;
  m.prototype.require = function (id) {
    if (id.startsWith('react') || id.startsWith('lucide-react')) return {};
    if (id.startsWith('@/')) {
      const p = path.join(process.cwd(), 'src', id.slice(2));
      if (fs.existsSync(p + '.ts')) return originalRequire.call(this, p + '.ts');
      if (fs.existsSync(p + '.tsx')) return originalRequire.call(this, p + '.tsx');
      return originalRequire.call(this, p);
    }
    return originalRequire.call(this, id);
  };

  try {
    const dataProjects = require('../app/data-projects.ts');
    const PROJECTS = dataProjects.projects || dataProjects.default || [];
    const srcData = require('../src/app/data.ts');
    const { SERVICES = [], ECOSYSTEM_ITEMS = [] } = srcData;

    console.log(`Found ${PROJECTS.length} projects, ${SERVICES.length} services...`);

    // 1. Projects
    console.log('Migrating Projects...');
    await supabase.from('projects_admin').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    for (const [i, p] of PROJECTS.entries()) {
      await supabase.from('projects_admin').insert({
        title: p.title,
        slug: p.slug || p.title.toLowerCase().replace(/\s+/g, '-'),
        category: p.category,
        brand_color: p.brandColor || p.color,
        description: p.description,
        tech_stack: p.techStack || p.tech,
        impact_features: p.impact,
        video_url: p.videoUrl || p.video,
        github_url: p.githubUrl || p.links?.github,
        status: p.status || 'Completed',
        order_index: i
      });
    }

    // 3. Services
    console.log('Migrating Services...');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const [i, s] of SERVICES.entries()) {
      await supabase.from('services').insert({
        title: s.title,
        desc: s.desc,
        tag: s.tag,
        icon: s.icon ? s.icon.name || 'Box' : 'Box',
        order_index: i
      });
    }

    // 4. Labs
    console.log('Migrating Labs...');
    await supabase.from('labs_products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const [i, l] of ECOSYSTEM_ITEMS.entries()) {
      await supabase.from('labs_products').insert({
        type: l.type,
        title: l.title,
        subtitle: l.subtitle,
        description: l.description,
        icon: l.icon || '?',
        color: l.color,
        status: l.status,
        link: l.link,
        order_index: i,
        featured: i < 3
      });
    }

    console.log('✅ All data successfully published to live Supabase DB!');
    process.exit(0);

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

sync();
