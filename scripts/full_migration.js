const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
const supabaseUrlMatch = envLocal.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/m);
const supabaseKeyMatch = envLocal.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m);
const supabaseUrl = supabaseUrlMatch ? supabaseUrlMatch[1].trim() : '';
const supabaseKey = supabaseKeyMatch ? supabaseKeyMatch[1].trim() : '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

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
      const { error } = await supabase.from('projects_admin').insert({
        title: p.title,
        slug: p.slug || p.title.toLowerCase().replace(/\s+/g, '-'),
        category: p.category,
        description: p.description,
        techStack: p.techStack || p.tech || [],
        impact: p.impact || {},
        videoUrl: p.videoUrl || p.video,
        githubUrl: p.githubUrl || p.links?.github,
        status: p.status || 'Completed',
        subtitle: p.subtitle || '',
        videoPoster: p.videoPoster || '',
        liveUrl: p.liveUrl || p.links?.live || '',
        features: p.features || [],
        year: p.year || '2025',
        duration: p.duration || '3 Weeks',
        number: String(i + 1).padStart(2, '0')
      });
      if (error) console.error('Projects Error:', error);
    }

    // 3. Services
    console.log('Migrating Services...');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const [i, s] of SERVICES.entries()) {
      const { error } = await supabase.from('services').insert({
        title: s.title,
        desc: s.desc,
        tag: s.tag,
        icon: s.icon ? s.icon.name || 'Box' : 'Box',
        order_index: i
      });
      if (error) console.error('Services Error:', error);
    }

    // 4. Labs
    console.log('Migrating Labs...');
    await supabase.from('labs_products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const [i, l] of ECOSYSTEM_ITEMS.entries()) {
      const { error } = await supabase.from('labs_products').insert({
        type: l.type,
        title: l.title,
        subtitle: l.subtitle,
        description: l.description || l.desc,
        icon: l.icon || '?',
        color: l.color,
        status: l.status,
        link: l.link,
        order_index: i,
        featured: i < 3,
        tags: []
      });
      if (error) console.error('Labs Error:', error);
    }

    // 5. Pricing
    console.log('Migrating Pricing Plans...');
    const { DEFAULT_STUDIO_CONTENT } = require('../src/app/shubiq-studio/studioContent.ts');
    await supabase.from('studio_pricing_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (DEFAULT_STUDIO_CONTENT && DEFAULT_STUDIO_CONTENT.plans) {
      for (const [i, p] of DEFAULT_STUDIO_CONTENT.plans.entries()) {
        const { error } = await supabase.from('studio_pricing_plans').insert({
          tier: p.tier,
          tag: p.tag,
          best_for: p.bestFor,
          price: p.price,
          price_suffix: p.priceSuffix || '',
          meta: p.meta,
          features: p.features || [],
          cta: p.cta,
          highlighted: p.highlighted || false,
          icon: p.icon || 'zap',
          order_index: i
        });
        if (error) console.error('Pricing Error:', error);
      }
    }

    console.log('✅ All data successfully published to live Supabase DB!');
    process.exit(0);

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

sync();
