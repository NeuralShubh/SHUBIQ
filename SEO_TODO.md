# SEO TODO (Temporary)

## Step 1: Set Production Site URL
- [x] Add `NEXT_PUBLIC_SITE_URL=https://shubiq.com` to Vercel → Project → Settings → Environment Variables
- [x] Redeploy the project after adding the env var
- [x] Verify these URLs return `200`:
- [x] `https://shubiq.com/robots.txt`
- [x] `https://shubiq.com/sitemap.xml`
- [x] `https://shubiq.com/opengraph-image`

## Step 2: Google Search Console
- [ ] Add `shubiq.com` as a Domain property
- [ ] Verify via DNS record
- [ ] Submit sitemap: `https://shubiq.com/sitemap.xml`

## Step 3: Page-Level SEO
- [x] Ensure each key page has a single H1 and clear primary keyword
- [x] Add/confirm meta descriptions for: Home, Studio, Labs, Flow
- [x] Add internal links in footer to Studio, Labs, Founder
- [x] Add Founder page with clear H1 and brand narrative

## Step 4: Structured Data Expansion
- [x] Add `Person` schema for Shubham
- [x] Add `Service` schema for Studio services
- [x] Keep `Organization` + `WebSite` schemas in root layout

## Step 5: Content & Links
- [ ] Create 3–5 pillar posts
- [ ] Add internal links from posts to Studio + Labs
