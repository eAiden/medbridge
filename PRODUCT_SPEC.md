# MedBridge — Product Specification

## Executive Summary

MedBridge is a mobile-first web platform that helps Filipino patients navigate government medical assistance programs, automate guarantee letter applications, and crowdfund remaining hospital bill gaps through a verified, trust-based system.

The platform addresses a critical healthcare access problem: obtaining guarantee letters (documents that pledge payment for hospital bills) currently requires navigating opaque bureaucracy and political connections. Thousands of Filipinos already crowdsource tips in Facebook groups — MedBridge centralizes this knowledge into an actionable, need-based system.

---

## Problem Statement

**The guarantee letter crisis:**
- Filipino patients need guarantee letters from government agencies or politicians to receive hospital care without upfront payment
- The process is opaque, bureaucratic, and depends on political connections rather than actual need
- Patients crowdsource tips on Facebook to navigate the system — proving massive unmet demand
- Even after securing partial coverage, significant gaps remain that families cannot afford

**Key pain points:**
1. **Information asymmetry** — Patients don't know which programs they qualify for
2. **Bureaucratic friction** — Multiple agencies, different requirements, in-person visits required
3. **Political dependency** — Success often depends on who you know, not what you need
4. **Funding gaps** — Government programs rarely cover 100% of the bill
5. **Trust deficit** — Existing crowdfunding platforms lack verification for medical campaigns

---

## Target Users

### Primary: Patients & Families
- Low to middle income Filipino households (PHP 10K-30K monthly)
- Currently confined or seeking treatment at hospitals
- Navigating the guarantee letter process for the first time
- Ages 25-55, mobile-first internet users

### Secondary: Donors & Community
- OFW families wanting to help relatives back home
- Bayanihan-minded Filipinos on social media
- Corporate CSR programs and NGOs
- Church and community organizations

---

## Product Architecture

### Layer 1: Eligibility Engine

**Purpose:** Map patients to every government program they qualify for.

**How it works:**
1. Patient completes a 4-step assessment (personal info, employment/income, medical details, existing coverage)
2. Engine matches their profile against 10+ government programs using criteria-based scoring
3. Results ranked by match strength with estimated coverage amounts, required documents, and success rates

**Programs tracked:**
- PhilHealth Z-Benefit Package (up to PHP 600K)
- PhilHealth All Case Rate Package (up to PHP 100K)
- DSWD AICS (up to PHP 50K)
- PCSO IMAP (up to PHP 100K)
- DOH Medical Assistance Program (up to PHP 200K)
- Malasakit Center One-Stop Shop (up to PHP 400K)
- Congressional District Office Medical Assistance (up to PHP 50K)
- Senatorial Office Medical Assistance (up to PHP 100K)
- LGU Medical Assistance (up to PHP 30K)
- Pag-IBIG Calamity/Multi-Purpose Loan (up to PHP 80K)

**Matching algorithm:**
- Evaluates eligibility criteria (income thresholds, PhilHealth status, employment, age, location, diagnosis)
- Calculates match score (0-100%) per program
- Estimates coverage based on match strength and program type (full, partial, case-rate)
- Identifies missing documents and potential warnings

### Layer 2: Application Automation

**Purpose:** Remove friction from the guarantee letter application process.

**Features:**
- **Document checklist** — Interactive checklist per program showing every required document
- **Letter generator** — Pre-fills formal request letters with patient details, addressed to the correct office
- **Copy/Print** — One-tap copy to clipboard or print for submission
- **Application tracking** — Dashboard showing status across all agencies (draft, submitted, pending, approved, denied)
- **Multi-agency tracking** — See all applications in one view with estimated coverage per agency

**Letter generation:**
- Properly formatted Filipino government formal letter
- Addressed to correct office/official per program
- Includes patient situation, diagnosis, income, and specific request
- Lists attached documents per program requirements

### Layer 3: Verified Medical Crowdfunding

**Purpose:** Fund the gap between government assistance and actual hospital bills.

**Key differentiators from generic crowdfunding:**
1. **Hospital bill verification** — Patient uploads Statement of Account; platform confirms with the hospital
2. **Direct-to-hospital payment** — Donated funds go straight to hospital billing, never touch the patient
3. **Funding gap calculator** — Shows exactly: Total Bill - PhilHealth - Guarantee Letters = Crowdfunding Goal
4. **Multi-layer verification** — Hospital SOA, barangay endorsement, employer verification, social worker assessment
5. **Filipino payment rails** — GCash, Maya, bank transfer, credit/debit card

**Campaign flow:**
1. Patient creates campaign (personal info, diagnosis, hospital, bill amount)
2. Enters existing coverage (PhilHealth, guarantee letters) — gap auto-calculated
3. Uploads Statement of Account for verification
4. Writes patient story (Filipino or English)
5. Platform verifies with hospital (24-48 hours)
6. Campaign goes live with verification badges
7. Donors contribute via GCash/Maya/bank/card
8. Funds sent directly to hospital billing

---

## Business Model

### Phase 1: Free Platform (MVP — Launch)
- All features free for patients
- Revenue: None (focus on user acquisition and trust building)
- Funding: Grants, civic tech funding, social enterprise competitions

### Phase 2: Sustainable Revenue
- **Crowdfunding platform fee:** 3-5% of donations (industry standard, lower than GoFundMe's 2.9% + $0.30)
- **Hospital partnerships:** Hospitals pay for patient referral and streamlined billing integration
- **Data insights:** Anonymized, aggregated data on healthcare access gaps (sold to NGOs, government, researchers)
- **Premium features:** Expedited verification, priority support, advocacy assistance

### Phase 3: Expansion
- **Insurance integration:** Micro-insurance products for the underinsured
- **Telemedicine partnerships:** Connect patients with doctors for initial consultations
- **Government API integration:** Direct submission to DSWD, PCSO, DOH systems

---

## Market Size

- **Philippines population:** 115M+
- **Without health insurance or underinsured:** ~30M Filipinos
- **Annual hospitalization rate:** ~5-7% of population
- **Average hospital bill exceeding coverage:** PHP 200K-500K
- **Facebook groups for medical assistance:** 50K-200K+ members each
- **Total addressable market:** PHP 50B+ annual healthcare funding gap

---

## Technical Architecture

### Current (MVP Prototype)
- **Frontend:** Next.js 16 + Tailwind CSS + shadcn/ui (base-ui)
- **Design:** Mobile-first, PWA-capable
- **Data:** Static program database (in-code)
- **State:** Client-side React state

### Production Roadmap
- **Backend:** Node.js/Express or Next.js API routes
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js with OTP (SMS/email — standard in PH)
- **Payments:** GCash API, Maya API, Dragonpay (Philippine payment aggregator)
- **File storage:** AWS S3 or Cloudflare R2 (for SOA uploads)
- **Notifications:** SMS (Semaphore/Globe Labs), push notifications
- **Hosting:** Vercel or AWS (with Manila/Singapore region)
- **Monitoring:** Sentry for error tracking, Mixpanel for analytics

---

## Growth Strategy

### Phase 1: Community-first (Month 1-3)
- Deploy to existing Facebook medical assistance groups
- Partner with 3-5 hospitals for bill verification pilot
- Create educational content (TikTok, Facebook Reels) on how to apply for assistance
- Engage patient advocates and social workers as ambassadors

### Phase 2: Institutional partnerships (Month 4-8)
- Partner with Malasakit Centers for integration
- Onboard hospital social workers as verification partners
- LGU partnerships for local program data
- NGO partnerships for campaign amplification

### Phase 3: Scale (Month 9-12)
- Government API integration (DSWD, PCSO, PhilHealth)
- OFW community outreach (major donor base)
- Corporate CSR partnerships
- Expand to other Southeast Asian markets with similar challenges

---

## Competitive Landscape

| Platform | Gap MedBridge Fills |
|---|---|
| Facebook Groups | Centralized, structured, actionable (vs. scattered tips) |
| GoFundMe | Filipino payment rails, hospital verification, direct-to-hospital payments |
| PhilHealth Portal | Covers all programs (not just PhilHealth), simpler UX, letter generation |
| Hospital social workers | 24/7 digital access, multi-agency view, crowdfunding for gaps |

---

## Success Metrics

### Leading indicators
- Assessment completions per week
- Letters generated per week
- Campaign verification rate (target: 95%+)
- Average time from campaign creation to first donation

### Lagging indicators
- Total coverage facilitated (PHP)
- Total crowdfunding raised (PHP)
- Bills fully covered (count)
- User NPS score (target: 70+)
- Hospital partnership count

---

## Risk Factors

1. **Data accuracy** — Government programs change frequently; need system for updates
2. **Verification bottleneck** — Hospital verification at scale requires partnerships
3. **Regulatory** — Crowdfunding regulation in PH (Securities Regulation Code considerations)
4. **Political sensitivity** — Exposing guarantee letter allocation data may face resistance
5. **Digital divide** — Some target users have limited smartphone/internet access

**Mitigations:**
- Community-sourced program updates with admin verification
- Hospital social worker partnership model for verification
- Legal counsel on SEC crowdfunding regulations
- Frame as complementary to existing systems, not adversarial
- SMS-based interface for feature phones (Phase 2)
