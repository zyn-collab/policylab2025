# Deployment Checklist

Use this checklist before deploying your ebook to production.

## Pre-Deployment

### Content

- [ ] All Word documents converted (`npm run convert`)
- [ ] Chapters processed (`npm run process`)
- [ ] All chapters reviewed for formatting issues
- [ ] Footnotes rendering correctly
- [ ] Images displaying properly
- [ ] Links working (internal and external)

### Customization

- [ ] Cover page title, subtitle, and author updated ([src/pages/index.astro](src/pages/index.astro))
- [ ] Sidebar title updated ([src/components/Sidebar.astro](src/components/Sidebar.astro))
- [ ] Favicon customized ([public/favicon.svg](public/favicon.svg))
- [ ] Meta tags added (title, description, OG tags)
- [ ] Color scheme customized if desired ([src/styles/global.css](src/styles/global.css))

### Testing

- [ ] Build succeeds (`npm run build`)
- [ ] Preview build locally (`npm run preview`)
- [ ] Test all chapter links
- [ ] Test sidebar navigation
- [ ] Test search functionality
- [ ] Test dark mode toggle
- [ ] Test on mobile device/viewport
- [ ] Check browser console for errors
- [ ] Verify all images load
- [ ] Test keyboard navigation

### Quality

- [ ] Proofread all content
- [ ] Check for broken links
- [ ] Verify heading hierarchy (H1 → H2 → H3)
- [ ] Ensure consistent formatting
- [ ] Remove any placeholder content
- [ ] Check copyright/license information

## Platform-Specific

### Netlify

- [ ] Repository pushed to GitHub/GitLab/Bitbucket
- [ ] Netlify site created and linked to repository
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `dist`
- [ ] Build succeeds on Netlify
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Vercel

- [ ] Repository pushed to GitHub/GitLab/Bitbucket
- [ ] Vercel project created and linked
- [ ] Build settings auto-detected correctly
- [ ] Build succeeds on Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### GitHub Pages

- [ ] Repository is public (or GitHub Pro for private)
- [ ] GitHub Pages enabled in settings
- [ ] Source set to `gh-pages` branch or `/docs` folder
- [ ] `astro.config.mjs` updated with correct base path
- [ ] Build and push to deployment branch
- [ ] Custom domain configured (if applicable)

## Post-Deployment

### Verification

- [ ] Site loads at production URL
- [ ] All pages accessible
- [ ] No 404 errors
- [ ] Dark mode works
- [ ] Search works
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Images load from production
- [ ] Fonts load correctly

### SEO & Analytics

- [ ] Submit sitemap to search engines (if applicable)
- [ ] Add analytics tracking (Google Analytics, Plausible, etc.)
- [ ] Test Open Graph preview (Twitter, LinkedIn, Facebook)
- [ ] Verify meta descriptions

### Performance

- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Optimize images if needed
- [ ] Verify caching headers

### Monitoring

- [ ] Set up uptime monitoring (optional)
- [ ] Configure error tracking (optional)
- [ ] Set up deployment notifications

## Ongoing Maintenance

- [ ] Document update process for team
- [ ] Set up automated deployments (git push → auto deploy)
- [ ] Create backup of source files
- [ ] Version control for content updates

## Troubleshooting

If something goes wrong:

1. Check build logs on hosting platform
2. Test build locally: `npm run build`
3. Check for missing dependencies
4. Verify all file paths are correct (relative, not absolute)
5. Ensure no hard-coded localhost URLs
6. Check browser console for errors
7. Review README.md troubleshooting section

## Quick Commands

```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build

# Full content pipeline
npm run convert
npm run process
npm run build

# Test production build locally
npm run preview
```

## Environment-Specific Notes

### Base URL Configuration

If deploying to a subdirectory (e.g., `yourdomain.com/ebook/`), update `astro.config.mjs`:

```javascript
export default defineConfig({
  base: '/ebook',
  // ...
});
```

### Custom Domain

1. Add CNAME/A record in DNS settings
2. Configure custom domain in hosting platform
3. Wait for DNS propagation (up to 48 hours)
4. Verify SSL certificate issued

### Multiple Environments

Consider separate deployments for:
- **Production**: Main public site
- **Staging**: Preview/testing before going live
- **Development**: For development team testing

Use branch-based deployments:
- `main` → production
- `staging` → staging environment
- `dev` → development environment

---

**Ready to deploy?** Check every box, then push to production! 🚀
