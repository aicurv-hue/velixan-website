# Velixan Technologies — Website Implementation Plan

> Last updated: 2026-03-21
> Status: Planning phase

---

## Overview

This plan covers all improvements to the Velixan Technologies marketing website, organized into 4 phases. Each task lists what I (Claude) will do vs. what I need from you.

---

## Phase 1 — Foundation & Trust (Do First)

These are blockers. Without them the site looks incomplete to clients and doesn't index properly.

---

### 1.1 OG Social Share Image

**What it is:** A 1200×630px banner image that appears when someone shares the site link on LinkedIn, WhatsApp, Twitter, etc.

**What I will do:**
- Design the image layout in code (HTML/CSS → screenshot, or SVG)
- Write the exact copy and positioning for the banner
- Add the final `og-image.png` reference to `index.html` (already prepared in the meta tags)

**What I need from you:**
- [ ] Do you have a logo file (PNG/SVG) for Velixan? If yes, share it.
- [ ] If no logo yet, confirm: should I use the text-based "Velixan." wordmark from the site?
- [ ] Preferred tagline on the image — use the hero sub-text or something shorter?

---

### 1.2 Favicon (Proper)

**What it is:** The small icon in browser tabs and bookmarks.

**What I will do:**
- Create a proper SVG favicon using the "V" lettermark in brand purple (#7000ff)
- Replace the current emoji placeholder

**What I need from you:**
- [ ] Confirm: use a "V" lettermark, or do you have a logo icon/symbol to use?

---

### 1.3 robots.txt + sitemap.xml

**What it is:** Two files that tell Google how to crawl and index the site.

**What I will do:**
- Write `robots.txt` (allow all, point to sitemap)
- Write `sitemap.xml` with the homepage URL and last-modified date
- Save both to the `Website/` folder

**What I need from you:**
- [ ] Confirm the live domain: is it `https://velixantechnologies.com` exactly (no www)?

---

### 1.4 Privacy Policy & Terms of Service Pages

**What it is:** Standalone HTML pages that the footer already links to.

**What I will do:**
- Write `privacy.html` — GDPR/PIPEDA compliant (Canada) privacy policy covering: data collected via email contact, no cookies beyond analytics, contact email
- Write `terms.html` — standard SaaS/services terms covering: service description, payment terms, IP ownership, limitation of liability
- Match the site's visual style (dark theme, same fonts/colors)
- Fix the footer links from `href="#"` to point to the real pages

**What I need from you:**
- [ ] Company legal name (is it "Velixan Technologies Inc." or another registered name?)
- [ ] Province/territory of incorporation (for Canadian law references)
- [ ] Do you collect any data beyond contact emails? (e.g., analytics, cookies, a CRM?)
- [ ] Do clients sign separate contracts, or do these Terms govern the relationship?

---

## Phase 2 — Conversion & Leads

These directly impact how many visitors become paying clients.

---

### 2.1 Contact Form (Replace mailto links)

**What it is:** An embedded form replacing the bare `mailto:` CTA buttons. Submissions go to your inbox without requiring the visitor to open their email client.

**What I will do:**
- Build a modal contact form triggered by "Start a Project" / "Get in Touch" buttons
- Fields: Name, Email, Company (optional), Budget range (dropdown), Message
- Integrate with **Web3Forms** (free, no backend needed, sends directly to your email)
- Add client-side validation with inline error messages
- Add a success state ("We'll be in touch within 24 hours")

**What I need from you:**
- [ ] Confirm the inbox email where form submissions should arrive
- [ ] Sign up at web3forms.com and share your **Access Key** (it's free, takes 2 minutes — go to web3forms.com → "Get Access Key" → enter your email)
- [ ] What budget ranges should be in the dropdown? (e.g., Under $5K / $5K–$20K / $20K–$50K / $50K+)

---

### 2.2 Analytics Integration

**What it is:** Tracking which pages/sections users visit, which CTAs they click, and where they drop off.

**Two options — choose one:**

**Option A — Google Analytics 4 (GA4)**
- Free, industry standard, integrates with Google Search Console
- Requires a Google account

**Option B — Plausible Analytics**
- Privacy-first, no cookies, GDPR compliant out of the box, simpler dashboard
- Costs ~$9/month after a 30-day trial

**What I will do:**
- Add the tracking script to `index.html`
- Set up custom event tracking for: CTA button clicks, service tab switches, form submissions
- Document what each event tracks

**What I need from you:**
- [ ] Which option do you prefer — GA4 or Plausible?
- [ ] For GA4: share your **Measurement ID** (format: `G-XXXXXXXXXX`) — create a property at analytics.google.com
- [ ] For Plausible: share your **domain** after signing up at plausible.io

---

## Phase 3 — Performance & SEO

These improve Google ranking and site speed on all devices.

---

### 3.1 Disable Particle Canvas on Mobile

**What it is:** The particle animation currently runs on phones, draining battery and slowing page responsiveness.

**What I will do:**
- Add a media query check — skip the canvas entirely on screens under 768px
- Replace with a subtle CSS gradient animation as a lightweight alternative background on mobile

**What I need from you:**
- Nothing — I can implement this immediately.

---

### 3.2 Hero Visual Fallback for Tablet (1024px)

**What it is:** The 3D orb disappears on iPad/tablet screens, leaving the hero as plain text only.

**What I will do:**
- Design a simplified static version of the orb (CSS only, no JS) that shows at 768–1024px
- Or: restructure the hero to be full-width centered text on tablet (cleaner option)

**What I need from you:**
- [ ] Preference: simplified orb visual on tablet, OR full-width centered text layout?

---

### 3.3 Google Search Console Setup

**What it is:** Connects your domain to Google's index so you can see search rankings and fix crawl errors.

**What I will do:**
- Generate the HTML verification file or meta tag
- Document the exact steps to verify ownership in Search Console

**What I need from you:**
- [ ] Access to add a DNS TXT record OR upload a file to the server (ask your hosting provider if unsure)
- [ ] Confirm the domain (same as 1.3)

---

## Phase 4 — Content & Credibility

These increase trust with skeptical enterprise buyers.

---

### 4.1 Fix the "12+ Years" Stat

**What it is:** The current stat claims 12+ years of experience. If Velixan is newer, this is a trust liability.

**What I will do:**
- Replace with a credible metric you can back up
- Reanimate the counter for the new number

**What I need from you:**
- [ ] Choose a replacement metric. Options:
  - Total projects delivered (e.g., "150+ Projects") — what's your real count?
  - Team combined experience (e.g., "40+ Years Combined Experience")
  - Industries served (e.g., "8 Industries")
  - Countries served
  - Something else?

---

### 4.2 Improve Testimonials

**What it is:** Current testimonials show only initials — reads as unverifiable to buyers.

**What I will do:**
- Update the testimonial cards with the details you provide
- Optionally add company name/type and a location flag

**What I need from you:**
- [ ] For each testimonial, provide: Full name (or first name + last initial), their title/role, company type or name (if permitted), and the quote text
- [ ] If you have no real testimonials yet: I can rewrite the anonymous ones to be more specific and credible-sounding without naming anyone

---

### 4.3 Add AI & Blockchain Service Cards

**What it is:** The hero mentions "AI Agents" and "Blockchain" but the Services section has no cards for them.

**What I will do:**
- Add 2 new service cards to the "Development & Design" tab:
  - AI Agent Development (autonomous agents, LLM integrations, workflow automation)
  - Blockchain & Web3 (smart contracts, DeFi, token architecture)
- Match the existing card style and icons

**What I need from you:**
- [ ] Confirm: yes, add these cards?
- [ ] Any specific technologies or use-cases you want highlighted for each?

---

### 4.4 Add Social Media Links

**What it is:** Footer currently has no social links — a trust signal gap for B2B clients.

**What I will do:**
- Add LinkedIn icon-link (and optionally Twitter/X, GitHub) to the footer

**What I need from you:**
- [ ] LinkedIn company page URL
- [ ] Twitter/X handle (if any)
- [ ] GitHub org URL (if public — shows technical credibility)

---

## Summary: What I Need From You

Collected in one place for convenience:

| # | Item | Needed For |
|---|---|---|
| A | Logo file (PNG/SVG) or confirm text wordmark | OG Image, Favicon |
| B | Confirm live domain (with/without www) | robots.txt, sitemap, Search Console |
| C | Company legal name + province | Privacy Policy, Terms |
| D | Whether you use cookies/analytics currently | Privacy Policy |
| E | Web3Forms access key | Contact Form |
| F | Form submission email address | Contact Form |
| G | Budget range options for the form | Contact Form |
| H | GA4 or Plausible, + measurement ID / domain | Analytics |
| I | Tablet hero preference (orb vs full-width) | Hero Visual |
| J | Replacement metric for "12+ Years" stat | Credibility |
| K | Real testimonial details (names/roles/quotes) | Testimonials |
| L | Confirm adding AI + Blockchain cards | Services |
| M | LinkedIn / Twitter / GitHub URLs | Footer |

---

## Execution Order (Recommended)

```
Week 1:  Phase 1 (Foundation) — 1.3, 1.1, 1.2, then 1.4
Week 2:  Phase 2 (Conversion) — 2.1 Contact Form, 2.2 Analytics
Week 3:  Phase 3 (Performance) — 3.1 immediately, 3.2, 3.3
Week 4:  Phase 4 (Content) — 4.1, 4.2, 4.3, 4.4
```

Items 3.1 (disable canvas on mobile) and 4.3 (AI/Blockchain cards) require nothing from you and can be done immediately on your say-so.
