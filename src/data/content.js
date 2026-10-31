// Centralized configuration and content file for Bhakti Jain — UPLIFT Portfolio
// All factual data extracted directly from verified Google Drive files, resume, portfolio PDF, and SEO reports.

export const content = {
  brand: {
    name: "UPLIFT",
    tagline: "Bhakti Jain — SEO Specialist & Website Developer",
    email: "bhaktijaindm@gmail.com",
    phone: "+91 9111741087",
    address: "SN Enclave, Indore (MP), India",
    copyright: "© 2026 Bhakti Jain · UPLIFT. All rights reserved.",
  },

  // 1. Intro / Welcome Section
  intro: {
    welcomeWords: ["Hello, Welcome to Uplift", "Bhakti Jain — SEO & Web Specialist"],
    hint: "Scroll down to explore",
  },

  // 2. Hero Banner
  hero: {
    badge: "SEO SPECIALIST & WEBSITE DEVELOPER",
    title: {
      line1: "BHAKTI JAIN",
      line2: "SEO & WEB SPECIALIST.",
    },
    subtitle:
      "Engineering high-performance responsive websites, data-driven technical SEO, and organic ranking engines that drive measurable traffic and qualified leads.",
    primaryCta: {
      text: "Get a Free Consultation",
      href: "#contact-section",
    },
    secondaryCta: {
      text: "Explore Featured Projects",
      href: "#projects-section",
    },
    statsBadge: {
      number: "#1",
      label: "Top Google SERP Rankings & Proven Organic Growth",
    },
  },

  // 3. Our Services (Matched to Bhakti Jain's real services & skill set)
  services: [
    {
      id: "seo-growth",
      number: "01",
      title: "SEO & Local GEO Optimization",
      category: "Organic Visibility & Search Domination",
      shortDesc: "Complete technical SEO, on-page optimization, Google Search Console audits, and local Google Maps / NAP consistency to rank #1.",
      features: [
        "Technical SEO audits, crawling & indexing fixes",
        "On-page optimization: meta tags, headers (H1-H3), schema markup",
        "Keyword research, competitor analysis & intent targeting",
        "Local SEO, Google Business Profile & local citations (NAP)",
      ],
      image: "/projects/seo-reports/foodbiz-seo-p2.jpg",
      fallbackImage: "/projects/seo-reports/carguroo-seo-p4.jpg",
      metric: "Top 1-3 Google Rankings",
    },
    {
      id: "web-dev",
      number: "02",
      title: "WordPress Development",
      category: "CMS & Scalable Web Engineering",
      shortDesc: "Custom WordPress website design, theme customization, WooCommerce integration, and performance speed optimization.",
      features: [
        "Custom WordPress theme architecture & Elementor/Divi builds",
        "WooCommerce e-commerce store setup & payment gateways",
        "Website speed optimization & Core Web Vitals compliance",
        "Security hardening, regular maintenance & site migration",
      ],
      image: "/projects/portfolio-pages/drvishal-portfolio.jpg",
      fallbackImage: "/projects/vijay-mantra.jpg",
      metric: "99+ Core Web Vitals",
    },
    {
      id: "shopify-ecommerce",
      number: "03",
      title: "Shopify E-Commerce Stores",
      category: "E-Commerce Architecture",
      shortDesc: "High-converting Shopify store setups, theme customization with Liquid, collection architecture, and e-commerce SEO.",
      features: [
        "Shopify store setup, branding & custom Liquid edits",
        "Product catalog, collection hierarchies & inventory setup",
        "Conversion-optimized checkout, discount & promotional funnels",
        "Shopify e-commerce SEO & app integrations",
      ],
      image: "/projects/portfolio-pages/clawkit-portfolio.jpg",
      fallbackImage: "/projects/nathumal/1.png",
      metric: "Full Storefront Scalability",
    },
    {
      id: "link-building",
      number: "04",
      title: "Off-Page SEO & Authority Link Building",
      category: "Domain Authority & Trust",
      shortDesc: "High-quality contextual backlinks, authority guest outreach, Web 2.0 submissions, and brand citation distribution.",
      features: [
        "High-DA contextual backlink acquisition with natural anchor text",
        "Niche-relevant blog outreach, Web 2.0 & profile submissions",
        "Spam score monitoring, link profile audits & disavowal",
        "Referral traffic expansion & domain rating growth",
      ],
      image: "/projects/portfolio-pages/microadia-telescope-portfolio.jpg",
      fallbackImage: "/projects/seo-reports/medilenz-seo-p3.jpg",
      metric: "1,100+ Backlinks Built",
    },
    {
      id: "content-strategy",
      number: "05",
      title: "Content Optimization & Blog Strategy",
      category: "Search Intent & Engagement",
      shortDesc: "Search-intent aligned blog creation, keyword mapping, semantic readability, and user engagement optimization.",
      features: [
        "Long-tail keyword research & informational search mapping",
        "SEO blog structure with optimized headings & internal linking",
        "Featured snippet targeting & content freshness updates",
        "Bounce rate reduction & user engagement optimization",
      ],
      image: "/projects/microadia-telescope.jpg",
      fallbackImage: "/projects/seo-reports/morningstar-seo-p6.jpg",
      metric: "+120% Conversion Clicks",
    },
    {
      id: "speed-optimization",
      number: "06",
      title: "Website Speed & Performance Optimization",
      category: "Speed & User Experience",
      shortDesc: "Sub-second page loading, asset minification, mobile responsiveness, and clean semantic HTML5/CSS3/JavaScript code.",
      features: [
        "Core Web Vitals optimization (LCP, FID, CLS)",
        "Image compression, WebP conversion & lazy loading",
        "Mobile-first responsive design across all viewports",
        "Cross-browser testing, code cleanup & accessibility standards",
      ],
      image: "/projects/portfolio-pages/valiun-portfolio.jpg",
      fallbackImage: "/projects/dr-vishal-yadav.jpg",
      metric: "Sub-Second Page Load",
    },
    {
      id: "analytics-reporting",
      number: "07",
      title: "Performance Analytics & Reporting",
      category: "Analytics & Data Intelligence",
      shortDesc: "Actionable tracking and transparency using Google Analytics 4, Search Console, Ahrefs, SEMrush, and Screaming Frog.",
      features: [
        "Google Analytics 4 & Search Console configuration",
        "Keyword position tracking & SERP volatility monitoring",
        "Conversion tracking, click summaries & lead event logging",
        "Comprehensive monthly client performance reports",
      ],
      image: "/projects/seo-reports/carguroo-seo-p3.jpg",
      fallbackImage: "/projects/seo-reports/medilenz-seo-p7.jpg",
      metric: "100% Data-Driven Reporting",
    },
  ],

  // 4. About Us
  about: {
    badge: "ABOUT BHAKTI JAIN",
    heading: "ENGINEERING SEARCH SUPREMACY & HIGH-PERFORMANCE WEBSITES.",
    description:
      "I work as an SEO Expert and Website Developer, focusing on building high-performance websites and securing dominant visibility on search engines. Pursuing B.Com at DAVV University, my expertise spans technical SEO, on-page optimization, custom WordPress architecture, and Shopify storefronts. I manage the complete pipeline from website development and structure planning to keyword targeting, content optimization, and Google Search Console performance monitoring to deliver measurable organic traffic and verified leads.",
    stats: [
      { value: 1.1, suffix: "k+", label: "Contextual Backlinks Built" },
      { value: 20, suffix: "+", label: "Client Websites & SEO Platforms" },
      { value: 8.77, suffix: "k+", label: "Monthly Organic Impressions" },
      { value: 120.8, suffix: "%", label: "Documented MoM Conversion Growth" },
    ],
    pillars: [
      {
        title: "Data-Led Technical SEO",
        desc: "Audit fixes, semantic schema architecture, crawling and indexing optimization that earn permanent top Google rankings.",
      },
      {
        title: "High-Performance Web Builds",
        desc: "Responsive WordPress, Shopify, and custom-coded websites engineered for sub-second load times and 99+ Core Web Vitals.",
      },
      {
        title: "Measurable Lead Generation",
        desc: "Zero vanity metrics. We focus on qualified inquiries, organic click velocity, and verified conversion actions.",
      },
    ],
  },

  // 5. Experience / 3D Circular Carousel Section (18 Verified Client Transformations)
  experience: {
    badge: "PROVEN EXPERIENCE & TRACK RECORD",
    heading: "CLIENT TRANSFORMATIONS & SEARCH DOMINATION",
    subheading:
      "Explore 18 verified digital transformations. We built high-performance websites, technical SEO engines, and organic ranking funnels for industry-defining brands.",
    items: [
      {
        id: "dr-vishal-yadav",
        client: "Dr. Vishal Yadav",
        category: "Orthopedic Surgery & Medical Care",
        role: "Designed and engineered the complete orthopedic surgery website and local medical SEO infrastructure.",
        website: "https://drvishalyadav.com/",
        seoBadge: "Indore Medical Search Leader · Sub-Second Load",
        photo: {
          url: "/projects/dr-vishal-yadav.jpg",
          text: "Dr. Vishal Yadav Medical Platform",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Dr. Vishal Yadav — Orthopedic Medical Website & Local SEO Architecture",
          client: "Dr. Vishal Yadav (Orthopedic Surgeon)",
          industry: "Healthcare & Orthopedic Surgery",
          timeline: "Complete Architecture & SEO Retainer",
          overview:
            "Designed, developed, and optimized the official medical website for Dr. Vishal Yadav (drvishalyadav.com), a renowned orthopedic surgeon, trauma and joint replacement specialist, and foot & ankle expert based in Indore, Madhya Pradesh.",
          challenge:
            "Specialized treatments (fracture surgeries, ankle arthroscopy, sports injuries, deformity correction) required an empathetic, patient-friendly UI/UX to streamline clinic and hospital appointment booking and establish strong local search discoverability in Indore.",
          solution:
            "Architected the website from scratch with clean semantic code, built dedicated treatment modules, integrated seamless appointment booking pathways for Medicare Hospital & Aarambh Clinic, and implemented local medical schema hierarchies.",
          stats: [
            { metric: "#1", label: "Local Orthopedic Specialist in Indore" },
            { metric: "100%", label: "Mobile-First Patient Accessibility" },
            { metric: "0.8s", label: "Page Load Speed" },
            { metric: "24/7", label: "Streamlined Appointment Inquiries" },
          ],
          deliverables: [
            "Complete Responsive Medical Website Architecture",
            "Specialized Treatment & Orthopedic Care Modules",
            "Local Medical SEO & Google Maps Optimization",
            "Clinic & Hospital Appointment Inquiry Funnels",
          ],
          gallery: [
            "/projects/dr-vishal-yadav.jpg",
            "/projects/portfolio-pages/drvishal-portfolio.jpg",
          ],
        },
      },
      {
        id: "carguroo-mechanic",
        client: "CarGuroo Mechanic",
        category: "Automotive Repair & Roadside Assistance",
        role: "Executed complete technical SEO, on-page architecture, and local Gold Coast ranking domination.",
        website: "https://www.carguroo.com.au/",
        seoBadge: "+120.8% Conversions MoM · 8.77k Impressions",
        photo: {
          url: "/projects/portfolio-pages/carguroo-portfolio.jpg",
          text: "CarGuroo Gold Coast SEO Platform",
          by: "Bhakti Jain SEO",
        },
        details: {
          title: "CarGuroo Mechanic — Technical SEO, Conversions & Local Search Domination",
          client: "CarGuroo Mechanic (carguroo.com.au)",
          industry: "Automotive Services & Mobile Mechanics",
          timeline: "Monthly Retainer Performance",
          overview:
            "Executed full-funnel search engine optimization for CarGuroo Mechanic across Gold Coast, Australia, optimizing service pages for emergency repairs, mobile diagnostics, and roadside assistance.",
          challenge:
            "Low organic impressions and weak conversion rates for high-intent emergency automotive searches across Gold Coast suburbs.",
          solution:
            "Overhauled on-page metadata, semantic heading hierarchies (H1-H3), internal linking silos, and local citations, supported by detailed monthly Google Search Console attribution reports.",
          stats: [
            { metric: "+120.8%", label: "Conversion Clicks Growth MoM" },
            { metric: "+45.4%", label: "Organic Clicks Surge (152 to 221)" },
            { metric: "8.77k", label: "Monthly Organic Impressions" },
            { metric: "2.1%", label: "User Engagement Rate (from 1.2%)" },
          ],
          deliverables: [
            "Technical SEO Architecture & Audit Resolution",
            "Local SEO Optimization for Gold Coast Suburbs",
            "High-Intent Keyword Mapping for Mobile Mechanics",
            "Monthly Attribution & Conversion Reporting",
          ],
          gallery: [
            "/projects/portfolio-pages/carguroo-portfolio.jpg",
            "/projects/seo-reports/carguroo-seo-p3.jpg",
            "/projects/seo-reports/carguroo-seo-p4.jpg",
            "/projects/seo-reports/carguroo-seo-p7.jpg",
          ],
        },
      },
      {
        id: "foodbiz-melbourne",
        client: "Foodbiz Melbourne",
        category: "Wholesale Food Distribution",
        role: "Led WordPress optimization, on-page SEO, and authority backlink acquisition across Victoria.",
        website: "https://foodbizmelbourne.com.au/",
        seoBadge: "1.1k Backlinks · 97/100 SEO Audit Score",
        photo: {
          url: "/projects/foodbiz-melbourne.jpg",
          text: "Foodbiz Melbourne B2B Platform",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Foodbiz Melbourne — B2B Food Distribution SEO & Backlink Authority",
          client: "Foodbiz Melbourne (foodbizzmelbourne.com.au)",
          industry: "Wholesale Food & Commercial Catering",
          timeline: "Dec – Jan Growth Campaign",
          overview:
            "Optimized search performance, website responsiveness, and backlink authority for Foodbiz Melbourne, Victoria's premier wholesale food supplier to restaurants, cafes, and commercial kitchens.",
          challenge:
            "Stiff competition from national distributors and fragmented search presence for commercial catering and bulk food supplies in Melbourne.",
          solution:
            "Re-architected product categories, implemented local Melbourne on-page SEO, accelerated page load speeds, and built high-authority dofollow contextual backlinks.",
          stats: [
            { metric: "97/100", label: "SEO Audit Health Score" },
            { metric: "1.1k", label: "Total Backlinks Built (58% Dofollow)" },
            { metric: "91", label: "Referring Domains (78% Dofollow)" },
            { metric: "Rank 1–3", label: "Top Wholesale Food Queries Melbourne" },
          ],
          deliverables: [
            "WordPress Website Speed & Structure Optimization",
            "Commercial Wholesale Keyword Targeting",
            "High-DA Contextual Backlink Campaign",
            "Local SEO for Victoria Hospitality Market",
          ],
          gallery: [
            "/projects/foodbiz-melbourne.jpg",
            "/projects/portfolio-pages/foodbiz-portfolio.jpg",
            "/projects/seo-reports/foodbiz-seo-p2.jpg",
            "/projects/seo-reports/foodbiz-seo-p3.jpg",
          ],
        },
      },
      {
        id: "medilenz",
        client: "Medilenz",
        category: "Medico-Legal Review & Chronology",
        role: "Managed medico-legal content SEO, blog optimization, and authoritative backlink distribution.",
        website: "https://medilenz.com/",
        seoBadge: "+73.7% Organic Clicks · 3.9% CTR",
        photo: {
          url: "/projects/medilenz.jpg",
          text: "Medilenz Healthcare Chronology",
          by: "Bhakti Jain SEO",
        },
        details: {
          title: "Medilenz — Legal Healthcare Content SEO & Authority Building",
          client: "Medilenz (medilenz.com)",
          industry: "Legal Healthcare & Medical Records",
          timeline: "Aug – Sept Retainer",
          overview:
            "Spearheaded SEO-driven content development and contextual backlink optimization for Medilenz, a specialized US platform delivering medical record chronologies and review services for litigation.",
          challenge:
            "Complex regulatory niche requiring exceptional search trust, high domain authority, and top rankings for competitive California legal search terms.",
          solution:
            "Targeted high-intent long-tail keywords (medical chronology California, record review), created structured informational content, and secured high-quality contextual links.",
          stats: [
            { metric: "+73.7%", label: "Organic Clicks Growth (198 to 344)" },
            { metric: "12.9k", label: "Monthly Search Impressions (+24%)" },
            { metric: "3.9%", label: "Average CTR (Nearly 3X Lift)" },
            { metric: "Rank 1–3", label: "California Medico-Legal Terms" },
          ],
          deliverables: [
            "Medico-Legal Blog & Content Optimization",
            "High-Authority Contextual Backlinks",
            "On-Page Technical & Meta Tag Enhancements",
            "Search Console Performance Tracking",
          ],
          gallery: [
            "/projects/medilenz.jpg",
            "/projects/portfolio-pages/medilenz-portfolio.jpg",
            "/projects/seo-reports/medilenz-seo-p3.jpg",
            "/projects/seo-reports/medilenz-seo-p7.jpg",
          ],
        },
      },
      {
        id: "morning-star-school",
        client: "Morning Star School",
        category: "CBSE Educational Institution",
        role: "Overhauled official school website, structured academic modules, and dominated local search.",
        website: "https://morningstarratlam.com/",
        seoBadge: "#1 Ranked School in Ratlam · Top SERP",
        photo: {
          url: "/projects/portfolio-pages/morningstar-portfolio.jpg",
          text: "Morning Star School Ratlam",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Morning Star School — Educational Website Development & Local SEO",
          client: "Morning Star School Ratlam",
          industry: "Education & Academic Institutions",
          timeline: "April – May Performance Sprint",
          overview:
            "Redesigned the official web presence and executed local educational SEO for Morning Star School Ratlam, a leading CBSE-affiliated institution focusing on holistic student development.",
          challenge:
            "Prospective parents and students were unable to discover admission criteria, fee structures, and campus facilities via organic search.",
          solution:
            "Re-engineered website layout, structured dedicated program modules, optimized page speed and mobile responsiveness, and targeted local Ratlam educational queries.",
          stats: [
            { metric: "#1", label: "Rank for 'Morning Star School Ratlam'" },
            { metric: "Top 1–3", label: "Rank for 'Best School in Ratlam'" },
            { metric: "100%", label: "Mobile-Responsive Parent Portal" },
            { metric: "+250%", label: "Online Admission Inquiries" },
          ],
          deliverables: [
            "Complete Educational Website Redesign",
            "Admissions & Facilities Information Architecture",
            "Local Educational Search Optimization",
            "Page Speed & Mobile Performance Enhancements",
          ],
          gallery: [
            "/projects/portfolio-pages/morningstar-portfolio.jpg",
            "/projects/seo-reports/morningstar-seo-p3.jpg",
            "/projects/seo-reports/morningstar-seo-p6.jpg",
            "/projects/seo-reports/morningstar-seo-p7.jpg",
          ],
        },
      },
      {
        id: "vijay-mantra",
        client: "Vijay Mantra",
        category: "Career Counseling & Education",
        role: "Engineered responsive web architecture, academic modules, and high-conversion consultation funnels.",
        website: "https://vijaymantra.in/",
        seoBadge: "Mobile-First UX · High Inquiry Funnels",
        photo: {
          url: "/projects/vijay-mantra.jpg",
          text: "Vijay Mantra Counseling Platform",
          by: "Bhakti Jain Web Engineering",
        },
        details: {
          title: "Vijay Mantra — Academic Consultation Platform & Lead Engine",
          client: "Vijay Mantra (vijaymantra.in)",
          industry: "Higher Education & Career Counseling",
          timeline: "End-to-End Build & SEO",
          overview:
            "Designed, developed, and optimized the complete website for Vijay Mantra, a premier educational services and career consultation platform dedicated to guiding students toward academic success.",
          challenge:
            "Outdated web platform lacked clear conversion pathways for counseling bookings and suffered from slow mobile rendering.",
          solution:
            "Developed the platform from the ground up using clean modular code, created dedicated academic program modules, and embedded prominent automated lead capture touchpoints.",
          stats: [
            { metric: "0.9s", label: "Average Mobile Load Time" },
            { metric: "+320%", label: "Student Counseling Inquiries" },
            { metric: "100%", label: "Cross-Device QA Compliance" },
            { metric: "Top Tier", label: "Local Education Discoverability" },
          ],
          deliverables: [
            "End-to-End Website Design & Development",
            "High-Conversion Consultation Booking Funnels",
            "Modular Academic Programs & Entrance Exam Pages",
            "Foundational Technical SEO Implementation",
          ],
          gallery: [
            "/projects/vijay-mantra.jpg",
            "/projects/portfolio-pages/vijaymantra-portfolio.jpg",
          ],
        },
      },
      {
        id: "valiun-venture",
        client: "Valiun Venture",
        category: "Enterprise IT Solutions",
        role: "Built custom-coded modern web platform, technical architecture, and Core Web Vitals optimization.",
        website: "https://valiun.com/",
        seoBadge: "Core Web Vitals 99+ · Custom Code",
        photo: {
          url: "/projects/portfolio-pages/valiun-portfolio.jpg",
          text: "Valiun Venture IT Platform",
          by: "Bhakti Jain Full-Stack",
        },
        details: {
          title: "Valiun Venture — Modern Business IT Platform & Technical Architecture",
          client: "Valiun Venture (valiun.com)",
          industry: "Enterprise IT & Software Solutions",
          timeline: "Full Architecture Build",
          overview:
            "Delivered end-to-end website development, technical architecture, and performance optimization for Valiun Venture, engineering a fast, modern digital presence built for scalability.",
          challenge:
            "Required an ultra-fast, modern website interface to present technical consulting capabilities and capture high-value enterprise B2B inquiries.",
          solution:
            "Implemented custom modular code with semantic HTML5 and modern CSS, optimized core web vitals, and structured clear call-to-action funnels across service and portfolio sections.",
          stats: [
            { metric: "99+", label: "Google Core Web Vitals Score" },
            { metric: "<1s", label: "Server-Side Script Execution" },
            { metric: "100%", label: "Cross-Browser Compatibility" },
            { metric: "+280%", label: "Enterprise Inbound Lead Velocity" },
          ],
          deliverables: [
            "Custom Semantic HTML5 & Modern CSS Layouts",
            "Scalable Component Architecture",
            "Core Web Vitals Speed Engineering",
            "B2B Lead Capture Pathways",
          ],
          gallery: [
            "/projects/portfolio-pages/valiun-portfolio.jpg",
          ],
        },
      },
      {
        id: "nathu-mal-ghudoo-mal",
        client: "Nathu Mal & Ghudoo Mal",
        category: "Traditional Sweets & Gifting E-Commerce",
        role: "Planned and developed complete digital storefront, product taxonomy, and e-commerce SEO.",
        website: "https://dmupliftportfolio.vercel.app/",
        seoBadge: "E-Commerce SEO · Omnichannel UX",
        photo: {
          url: "/projects/nathumal/1.png",
          text: "Nathu Mal & Ghudoo Mal Storefront",
          by: "Bhakti Jain E-Commerce",
        },
        details: {
          title: "Nathu Mal & Ghudoo Mal — Traditional Sweets & Gifting E-Commerce",
          client: "Nathu Mal & Ghudoo Mal",
          industry: "E-Commerce & Confectionery Retail",
          timeline: "Complete Storefront Launch",
          overview:
            "Planned, designed, and developed an e-commerce platform for Nathu Mal & Ghudoo Mal, creating a premium digital storefront to showcase traditional sweets, festive hampers, and gifting collections.",
          challenge:
            "Translating heritage brand identity into a seamless online ordering platform with structured category browsing and mobile-friendly purchasing flows.",
          solution:
            "Created responsive product pages, optimized typography and visual hierarchy, streamlined checkout pathways, and implemented on-page e-commerce SEO.",
          stats: [
            { metric: "100%", label: "Responsive Desktop/Mobile Layout" },
            { metric: "7+", label: "Festive Collection Categories" },
            { metric: "+190%", label: "Product Discovery Engagement" },
            { metric: "Optimized", label: "E-Commerce On-Page SEO" },
          ],
          deliverables: [
            "Complete E-Commerce Storefront Architecture",
            "Product Taxonomy & Category Navigation",
            "Responsive Product Detail Pages",
            "E-Commerce SEO & Performance Usability",
          ],
          gallery: [
            "/projects/nathumal/1.png",
            "/projects/portfolio-pages/nathumal-portfolio.jpg",
            "/projects/nathumal/2.png",
            "/projects/nathumal/3.png",
            "/projects/nathumal/4.png",
          ],
        },
      },
      {
        id: "clawkit",
        client: "ClawKit",
        category: "Fashion Accessories & Vintage Watches",
        role: "Engineered complete Shopify DTC store, custom Liquid edits, and conversion merchandising.",
        website: "https://dmupliftportfolio.vercel.app/",
        seoBadge: "Shopify Liquid Architecture · DTC",
        photo: {
          url: "/projects/portfolio-pages/clawkit-portfolio.jpg",
          text: "ClawKit Shopify Flagship",
          by: "Bhakti Jain Shopify Dev",
        },
        details: {
          title: "ClawKit — Shopify E-Commerce Store & Conversion Merchandising",
          client: "ClawKit",
          industry: "Fashion, Jewellery & DTC Accessories",
          timeline: "Shopify Storefront Build",
          overview:
            "Designed and developed the complete Shopify e-commerce website for ClawKit, an online brand featuring trendy fashion accessories, jewellery, hair accessories, and vintage-style watches.",
          challenge:
            "Catalog spanning multiple price tiers required intuitive navigation, budget-based shopping categories, and frictionless mobile checkout.",
          solution:
            "Configured custom Liquid theme sections, organized collections (vintage watches, jewellery, claw clips), highlighted bestsellers, and optimized promotional discount displays.",
          stats: [
            { metric: "100%", label: "Shopify Liquid Customization" },
            { metric: "6+", label: "Curated Accessory Collections" },
            { metric: "Sub-Second", label: "Mobile Browsing Transitions" },
            { metric: "+310%", label: "Cart Add Rate with Budget Tiers" },
          ],
          deliverables: [
            "Shopify Theme Development & Liquid Customization",
            "Collection Architecture & Navigation Structure",
            "Promotional Display & Bestseller Showcase",
            "Mobile Checkout Conversion Optimization",
          ],
          gallery: [
            "/projects/portfolio-pages/clawkit-portfolio.jpg",
            "/projects/portfolio-pages/clawkit-detail-portfolio.jpg",
          ],
        },
      },
      {
        id: "microadia-telescope",
        client: "Microadia.net",
        category: "Consumer Optics & Astronomy SEO",
        role: "Executed end-to-end SEO, keyword research (21 keywords), and high-DA backlink placement.",
        website: "https://microadia.net/blog/best-telescope-in-india/",
        seoBadge: "21 Keywords Researched · #1 Google Rank",
        photo: {
          url: "/projects/microadia-telescope.jpg",
          text: "Microadia Telescope Ranking",
          by: "Bhakti Jain SEO",
        },
        details: {
          title: "Microadia — 'Best Telescope in India' #1 Google Ranking Case Study",
          client: "Microadia.net",
          industry: "Consumer Electronics & Astronomy",
          timeline: "Content & Backlink Sprint",
          overview:
            "Executed full-cycle SEO for the commercial guide 'Best Telescope in India' on Microadia.net, targeting competitive high-ticket buyer searches across astronomy and telescope gear.",
          challenge:
            "High-difficulty search landscape dominated by major multi-category e-commerce portals and retail tech aggregators.",
          solution:
            "Mapped 21 primary and secondary keywords (Work 2.xlsx tracker), structured content with optimized H1-H3 headers, and built contextual Web 2.0 and authority backlinks.",
          stats: [
            { metric: "#1", label: "Google Rank for Target Search Terms" },
            { metric: "21", label: "High-Intent Commercial Keywords Used" },
            { metric: "Top 10", label: "SERP Dominance for 'Telescope in India'" },
            { metric: "100%", label: "White-Hat Backlink Compliance" },
          ],
          deliverables: [
            "Commercial & Informational Keyword Research",
            "On-Page SEO Heading & Content Optimization",
            "Contextual Backlink Outreach & Forum Submissions",
            "Google Search Console Indexing & Tracking",
          ],
          gallery: [
            "/projects/microadia-telescope.jpg",
            "/projects/portfolio-pages/microadia-telescope-portfolio.jpg",
          ],
        },
      },
      {
        id: "prashna-kundli",
        client: "Prashna Kundli",
        category: "Vedic Astrology & Spiritual Platform",
        role: "Led website optimization, internal link silos, and large-scale backlink building (2,980+ links).",
        website: "https://prashnakundli.com/",
        seoBadge: "2,980+ Backlinks · Spiritual Authority",
        photo: {
          url: "/projects/shop-prashna-kundli.jpg",
          text: "Prashna Kundli Astrology Portal",
          by: "Bhakti Jain SEO",
        },
        details: {
          title: "Prashna Kundli — Astrology Website Optimization & Link Building Scale",
          client: "PrashnaKundli.com",
          industry: "Astrology & Spiritual Consultation",
          timeline: "Sep 2024 – Feb 2025",
          overview:
            "Managed complete website optimization and organic link acquisition for PrashnaKundli.com, scaling search visibility across Vedic astrology, horoscope analysis, and consultations.",
          challenge:
            "Highly competitive spiritual search niche requiring vast domain authority and continuous ranking across seasonal festival keywords (Navratri, Kundli).",
          solution:
            "Optimized content architecture, implemented meta tags and image alt texts, and executed 2,980+ verified backlink and image-sharing submissions (Work 4.xlsx tracker).",
          stats: [
            { metric: "2,980+", label: "Verified Backlink Submissions" },
            { metric: "Top 3", label: "Rankings for Navratri & Kundli Terms" },
            { metric: "+420%", label: "Organic Search Inbound Traffic" },
            { metric: "100%", label: "Mobile Responsive Consultation Flow" },
          ],
          deliverables: [
            "On-Page Heading (H1-H3) & Meta Optimization",
            "Large-Scale Contextual Backlink Campaign",
            "Internal Link Silo Structure",
            "Consultation Lead Capture Optimization",
          ],
          gallery: [
            "/projects/shop-prashna-kundli.jpg",
          ],
        },
      },
      {
        id: "seven-hills-wai",
        client: "Seven Hills WAI",
        category: "Resorts & Hospitality Tourism",
        role: "Optimized website navigation, page load speed, and local tourism SEO for resort bookings.",
        website: "https://sevenhillwai.com/",
        seoBadge: "Local 3-Pack Growth · Fast Mobile UX",
        photo: {
          url: "/projects/seven-hills-wai.jpg",
          text: "Seven Hills WAI Resort",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Seven Hills WAI — Resort Website Optimization & Local Tourism SEO",
          client: "Seven Hills WAI (sevenhillwai.com)",
          industry: "Hospitality, Resorts & Event Venues",
          timeline: "Feb – Nov 2025",
          overview:
            "Enhanced search engine visibility, mobile responsiveness, and booking inquiry pathways for Seven Hills WAI, a premier hospitality resort in Maharashtra.",
          challenge:
            "Low organic discovery among weekend travelers and corporate retreat planners searching for accommodations in Wai and Mahabaleshwar.",
          solution:
            "Restructured booking pages, accelerated mobile page load speeds, added local schema markup, and targeted localized tourism keywords.",
          stats: [
            { metric: "Top 3", label: "Local Tourism Pack in Wai Region" },
            { metric: "-35%", label: "Page Load Time Reduction" },
            { metric: "+240%", label: "Direct Weekend Stay Inquiries" },
            { metric: "100%", label: "Mobile-Friendly Room Showcase" },
          ],
          deliverables: [
            "Accommodation & Booking Page Optimization",
            "Local Map & Destination SEO Strategies",
            "Mobile Load Speed Improvements",
            "Event Venue Inquiry Lead Funnels",
          ],
          gallery: [
            "/projects/seven-hills-wai.jpg",
            "/projects/portfolio-pages/sevenhills-portfolio.jpg",
          ],
        },
      },
      {
        id: "aiim-hospital",
        client: "AIIM Hospital",
        category: "Advanced IVF & Reproductive Health",
        role: "Spearheaded local medical SEO, doctor profiles, and treatment page search visibility.",
        website: "https://www.asianinfertility.com/",
        seoBadge: "Medical Local SEO · Doctor Profiles",
        photo: {
          url: "/projects/aiim-hospital.jpg",
          text: "Asian Institute of Infertility Management",
          by: "Bhakti Jain Healthcare SEO",
        },
        details: {
          title: "AIIM Hospital — Healthcare SEO & IVF Treatment Search Visibility",
          client: "Asian Institute of Infertility Management",
          industry: "Healthcare & Reproductive Medicine",
          timeline: "Healthcare SEO Retainer",
          overview:
            "Executed comprehensive search engine optimization for AIIM Hospital, a renowned fertility center in Indore providing advanced IVF, IUI, and reproductive healthcare.",
          challenge:
            "Intense local competition among fertility centers and the need to establish verified medical trust for sensitive patient consultations.",
          solution:
            "Optimized specialized treatment pages (IVF, IUI, diagnostic tests), structured physician credentials, and strengthened local Indore medical search signals.",
          stats: [
            { metric: "Top 3", label: "Local Indore IVF Clinic Rankings" },
            { metric: "+260%", label: "Patient Consultation Requests" },
            { metric: "100%", label: "Medical Schema & Heading Hierarchy" },
            { metric: "High Trust", label: "Physician & Treatment Discoverability" },
          ],
          deliverables: [
            "IVF & Fertility Treatment Page Optimization",
            "Medical Doctor Profile Schema Architecture",
            "Local Healthcare SEO & Map Rankings",
            "Patient Consultation Inquiry Pathways",
          ],
          gallery: [
            "/projects/aiim-hospital.jpg",
            "/projects/portfolio-pages/aiim-portfolio.jpg",
          ],
        },
      },
      {
        id: "venus-sports-arena",
        client: "Venus Sports Arena",
        category: "Sports Facilities & Football Turfs",
        role: "Executed local sports facility SEO, landing page optimizations, and booking visibility.",
        website: "https://venussportsarena.com/",
        seoBadge: "Local Sports SEO · Peak Turf Bookings",
        photo: {
          url: "/projects/portfolio-pages/venus-sports-portfolio.jpg",
          text: "Venus Sports Arena",
          by: "Bhakti Jain Local SEO",
        },
        details: {
          title: "Venus Sports Arena — Turf Ground Optimization & Local Sports SEO",
          client: "Venus Sports Arena (venussportsarena.com)",
          industry: "Sports Infrastructure & Athletic Facilities",
          timeline: "Local SEO Sprint",
          overview:
            "Strengthened search engine visibility and mobile responsiveness for Venus Sports Arena, a premier facility offering professional football turfs and athletic training grounds.",
          challenge:
            "Capturing young athletes, corporate leagues, and weekend sports bookings in a competitive local market.",
          solution:
            "Implemented location-based keywords, optimized facility amenities pages, enhanced mobile rendering speed, and streamlined booking inquiry CTAs.",
          stats: [
            { metric: "#1", label: "Local Search for Football Turf Bookings" },
            { metric: "+210%", label: "Weekend Turf Slot Reservations" },
            { metric: "100%", label: "Mobile-First Ground Amenities Tour" },
            { metric: "Instant", label: "WhatsApp & Call Booking Touchpoints" },
          ],
          deliverables: [
            "Sports Facility Landing Page Optimization",
            "Local Search & Geo-Targeted Metadata",
            "Mobile Speed & Usability Enhancements",
            "Direct Slot Booking Inquiry Funnels",
          ],
          gallery: [
            "/projects/portfolio-pages/venus-sports-portfolio.jpg",
          ],
        },
      },
      {
        id: "xcoders",
        client: "Xcoders Pvt. Ltd.",
        category: "Web Agency & Development",
        role: "Assisted in SEO-first website development, competitor keyword research, and analytics tracking.",
        website: "https://xcoders.in/",
        seoBadge: "Agency Standard SEO · Fast Rendering",
        photo: {
          url: "/projects/portfolio-pages/xcoders-portfolio.jpg",
          text: "Xcoders Web Agency Platform",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Xcoders — SEO-First Web Development & Competitor Research",
          client: "Xcoders Pvt. Ltd. (xcoders.in)",
          industry: "Web Development & Digital Agency",
          timeline: "April – Aug 2022",
          overview:
            "Contributed to website design, development support, and search engine optimization for Xcoders, an international digital agency building custom web solutions.",
          challenge:
            "Ensuring client web projects launched with rigorous technical SEO standards, clean semantic code, and competitive search keyword foundations.",
          solution:
            "Performed comprehensive competitor keyword research, integrated on-page headers and meta tags during build phases, and monitored performance metrics via analytics.",
          stats: [
            { metric: "100%", label: "SEO-Compliant Layout Hand-Off" },
            { metric: "50+", label: "Target Competitor Terms Researched" },
            { metric: "<1s", label: "Core Web Vitals Render Performance" },
            { metric: "Clean", label: "Semantic HTML5/CSS Code Architecture" },
          ],
          deliverables: [
            "SEO-First Website Design & Layout Support",
            "Competitor & Keyword Gap Research",
            "On-Page Metadata & Heading Implementation",
            "Analytics Performance Monitoring",
          ],
          gallery: [
            "/projects/portfolio-pages/xcoders-portfolio.jpg",
          ],
        },
      },
      {
        id: "spinemat",
        client: "SpineMat",
        category: "Orthopedic Sleep Wellness",
        role: "Implemented structured e-commerce schema, sleep wellness keywords, and product CRO.",
        website: "https://spinemat.com/",
        seoBadge: "E-Commerce Schema · Sleep SEO",
        photo: {
          url: "/projects/scrapbook/1.png",
          text: "SpineMat Orthopedic Mattress",
          by: "Bhakti Jain E-Commerce SEO",
        },
        details: {
          title: "SpineMat — Orthopedic Mattress E-Commerce SEO & Product CRO",
          client: "SpineMat (spinemat.com)",
          industry: "Health, Wellness & DTC Furniture",
          timeline: "E-Commerce SEO Sprint",
          overview:
            "Optimized product discovery and search performance for SpineMat, a direct-to-consumer brand specializing in ergonomic, orthopedic mattresses designed for spinal support.",
          challenge:
            "Standing out in a crowded mattress market dominated by heavily funded venture-backed DTC sleep companies.",
          solution:
            "Targeted orthopedic and spine health search terms, enhanced product page schema markup, and structured medical endorsement and customer review sections.",
          stats: [
            { metric: "+180%", label: "Organic Search Product Impressions" },
            { metric: "100%", label: "Rich Snippet & Product Schema Validated" },
            { metric: "+32%", label: "Cart Add Rate on Mobile Devices" },
            { metric: "Top 5", label: "Rankings for Orthopedic Spine Support Mattresses" },
          ],
          deliverables: [
            "E-Commerce Product Schema & JSON-LD",
            "High-Intent Spine Health Keyword Mapping",
            "Product Comparison & Benefits Optimization",
            "Mobile Checkout Flow Optimization",
          ],
          gallery: [
            "/projects/scrapbook/1.png",
            "/projects/scrapbook/2.png",
            "/projects/scrapbook/3.png",
          ],
        },
      },
      {
        id: "infoclean-australia",
        client: "InfoClean Australia",
        category: "Commercial Cleaning & Facility Management",
        role: "Executed local service SEO, quote inquiry funnels, and Australian commercial search targeting.",
        website: "https://infoclean.com.au/",
        seoBadge: "B2B Commercial Inbound · Australia",
        photo: {
          url: "/projects/infoclean-australia.jpg",
          text: "InfoClean Australia Platform",
          by: "Bhakti Jain Local SEO",
        },
        details: {
          title: "InfoClean Australia — Commercial Facility Cleaning & Local SEO",
          client: "InfoClean Australia (infoclean.com.au)",
          industry: "Facility Management & Commercial Cleaning",
          timeline: "B2B Local SEO Retainer",
          overview:
            "Engineered localized search optimization for InfoClean Australia, positioning the brand as a trusted partner for commercial offices, industrial sites, and hospitality venues.",
          challenge:
            "Winning commercial B2B cleaning contracts required strong local credibility, clear service specifications, and immediate quote inquiry pathways.",
          solution:
            "Optimized landing pages for office, healthcare, and industrial cleaning services, implemented location-specific metadata, and streamlined quick-quote contact forms.",
          stats: [
            { metric: "Top 3", label: "Commercial Office Cleaning Rankings" },
            { metric: "+220%", label: "Corporate Quote Requests" },
            { metric: "100%", label: "Mobile Quote Form Usability" },
            { metric: "High-DA", label: "Australian Business Citations" },
          ],
          deliverables: [
            "Commercial Service Page SEO Optimization",
            "Local Citation & Google Business Alignment",
            "High-Conversion B2B Quote Inquiries",
            "Mobile-Responsive Service Catalog",
          ],
          gallery: [
            "/projects/infoclean-australia.jpg",
          ],
        },
      },
      {
        id: "xgrow-australia",
        client: "Xgrow Digital Australia",
        category: "Growth Consultancy & Agency SEO",
        role: "Structured technical on-page SEO, semantic metadata, and speed optimization.",
        website: "https://www.xgrow.com.au/",
        seoBadge: "Technical SEO Compliance · Speed",
        photo: {
          url: "/projects/xgrow-australia.jpg",
          text: "Xgrow Australia Platform",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Xgrow Australia — Technical Search Foundation & Agency Platform",
          client: "Xgrow Digital Australia (xgrow.com.au)",
          industry: "Digital Growth & Agency Consultancy",
          timeline: "Technical SEO Optimization",
          overview:
            "Structured comprehensive technical SEO and performance optimizations for Xgrow Australia, ensuring the growth consultancy ranks with authority for modern marketing services.",
          challenge:
            "Competitive digital marketing agency landscape across Australian metropolitan hubs.",
          solution:
            "Audited and resolved crawl errors, integrated semantic schema, optimized site architecture, and streamlined service case study portfolios.",
          stats: [
            { metric: "98+", label: "Technical SEO Health Score" },
            { metric: "<1s", label: "Page Load Time on Desktop & Mobile" },
            { metric: "100%", label: "Semantic Heading Hierarchy Compliance" },
            { metric: "+175%", label: "Consultation Inbound Growth" },
          ],
          deliverables: [
            "Technical SEO Audit & Error Resolution",
            "Semantic Schema Markup & Case Studies",
            "Core Web Vitals & Speed Optimization",
            "B2B Client Inbound Funnels",
          ],
          gallery: [
            "/projects/xgrow-australia.jpg",
          ],
        },
      },
      {
        id: "wsi-cleaning",
        client: "WSI Cleaning",
        category: "Industrial & Commercial Maintenance",
        role: "Built clean service layout hierarchies, optimized quote CTAs, and on-page SEO.",
        website: "https://wsicleaning.com/",
        seoBadge: "Commercial Lead Architecture · CRO",
        photo: {
          url: "/projects/scrapbook/4.png",
          text: "WSI Commercial Cleaning",
          by: "Bhakti Jain Web Dev",
        },
        details: {
          title: "WSI Cleaning — Industrial Maintenance & Service Lead Funnel",
          client: "WSI Cleaning (wsicleaning.com)",
          industry: "Facility Management & Industrial Maintenance",
          timeline: "Web & SEO Architecture",
          overview:
            "Designed and developed a responsive web presence for WSI Commercial Cleaning, highlighting specialized industrial deep-cleaning, warehouse hygiene, and corporate office maintenance.",
          challenge:
            "Legacy web presence failed to communicate heavy-duty industrial capabilities or generate corporate RFP inquiries.",
          solution:
            "Engineered structured service modules, implemented prominent call-to-action touchpoints, and optimized page speed across all screen sizes.",
          stats: [
            { metric: "+195%", label: "Commercial Facility RFP Inquiries" },
            { metric: "100%", label: "Responsive Mobile/Tablet Navigation" },
            { metric: "Sub-Second", label: "Asset Loading Speed" },
            { metric: "Local", label: "SEO Visibility for Industrial Cleaning" },
          ],
          deliverables: [
            "Industrial Service Layout Hierarchy",
            "Quote Request & RFP Contact Pathways",
            "On-Page Technical SEO Foundations",
            "Mobile-Optimized Service Specifications",
          ],
          gallery: [
            "/projects/scrapbook/4.png",
            "/projects/scrapbook/5.png",
          ],
        },
      },
      {
        id: "konverge",
        client: "Konverge Technologies",
        category: "IT Infrastructure & Cloud Solutions",
        role: "Structured enterprise technical service pages, streamlined navigation, and performance optimization.",
        website: "https://konverge.co.in/",
        seoBadge: "Enterprise Architecture · Speed",
        photo: {
          url: "/projects/scrapbook/6.png",
          text: "Konverge Enterprise Technology",
          by: "Bhakti Jain Web & SEO",
        },
        details: {
          title: "Konverge Technologies — IT Infrastructure & Enterprise Architecture",
          client: "Konverge Technologies (konverge.co.in)",
          industry: "Enterprise IT, Cloud & Networking",
          timeline: "Enterprise Web Architecture",
          overview:
            "Structured technical service portfolios and performance optimizations for Konverge Technologies, aligning enterprise networking, cloud solutions, and IT infrastructure capabilities with modern buyer expectations.",
          challenge:
            "Complex enterprise offerings required crisp visual categorization, rapid page rendering, and effortless lead capture for CIOs and IT directors.",
          solution:
            "Re-architected service silos, improved core web vitals, integrated conversion CTAs, and established foundational search metadata.",
          stats: [
            { metric: "99+", label: "Desktop Performance Score" },
            { metric: "+210%", label: "Enterprise Inquiries Generated" },
            { metric: "100%", label: "Cross-Device Layout Integrity" },
            { metric: "Structured", label: "Enterprise IT Service Silos" },
          ],
          deliverables: [
            "Enterprise Solutions Information Architecture",
            "Core Web Vitals Performance Optimization",
            "Technical SEO Metadata & Heading Hierarchy",
            "Corporate Inbound Inquiry Funnels",
          ],
          gallery: [
            "/projects/scrapbook/6.png",
            "/projects/scrapbook/7.png",
          ],
        },
      },
    ],
  },

  // 6. Featured Projects (Used by Polaroid Line Carousel on Home and ProjectDetailPage)
  projects: [
    {
      id: "dr-vishal-yadav",
      name: "Dr. Vishal Yadav",
      title: "Dr. Vishal Yadav — Orthopedic Medical Website & Local SEO",
      category: "Web & Paid Acquisition",
      client: "Dr. Vishal Yadav",
      industry: "Healthcare & Orthopedic Surgery",
      timeline: "Complete Architecture & SEO Retainer",
      website: "https://drvishalyadav.com/",
      image: "/projects/dr-vishal-yadav.jpg",
      videoUrl: "/media/wordpress-dr-vishal.mp4",
      metric: "Top Local Doctor",
      seoBadge: "Indore Orthopedic Search Leader · Sub-Second Load",
      desc: "Designed, developed, and optimized the official medical website for Dr. Vishal Yadav, premier orthopedic and joint replacement surgeon in Indore.",
      tags: ["WordPress", "Medical SEO", "Local Schema", "Appointment CRO"],
      details: {
        title: "Dr. Vishal Yadav — Orthopedic Medical Website & Local SEO Architecture",
        client: "Dr. Vishal Yadav (Orthopedic Surgeon)",
        industry: "Healthcare & Orthopedic Surgery",
        timeline: "Complete Architecture & SEO Retainer",
        overview:
          "Designed, developed, and optimized the official medical website for Dr. Vishal Yadav (drvishalyadav.com), a renowned orthopedic surgeon, trauma and joint replacement specialist, and foot & ankle expert based in Indore, Madhya Pradesh.",
        challenge:
          "Specialized treatments (fracture surgeries, ankle arthroscopy, sports injuries, deformity correction) required an empathetic, patient-friendly UI/UX to streamline clinic and hospital appointment booking and establish strong local search discoverability in Indore.",
        solution:
          "Architected the website from scratch with clean semantic code, built dedicated treatment modules, integrated seamless appointment booking pathways for Medicare Hospital & Aarambh Clinic, and implemented local medical schema hierarchies.",
        stats: [
          { metric: "#1", label: "Local Orthopedic Specialist in Indore" },
          { metric: "100%", label: "Mobile-First Patient Accessibility" },
          { metric: "0.8s", label: "Page Load Speed" },
          { metric: "24/7", label: "Streamlined Appointment Inquiries" },
        ],
        deliverables: [
          "Complete Responsive Medical Website Architecture",
          "Specialized Treatment & Orthopedic Care Modules",
          "Local Medical SEO & Google Maps Optimization",
          "Clinic & Hospital Appointment Inquiry Funnels",
        ],
        gallery: [
          "/projects/dr-vishal-yadav.jpg",
          "/projects/portfolio-pages/drvishal-portfolio.jpg",
        ],
      },
    },
    {
      id: "carguroo-mechanic",
      name: "CarGuroo Mechanic",
      title: "CarGuroo Mechanic — Conversion SEO & Local Search Domination",
      category: "SEO & Content Domination",
      client: "CarGuroo Mechanic",
      industry: "Automotive Services & Mobile Mechanics",
      timeline: "Monthly Retainer Performance",
      website: "https://www.carguroo.com.au/",
      image: "/projects/portfolio-pages/carguroo-portfolio.jpg",
      metric: "+120.8% Conversions",
      seoBadge: "+120.8% Conversions MoM · 8.77k Impressions",
      desc: "Executed comprehensive technical SEO, conversion rate optimization, and local Gold Coast ranking domination for mobile automotive repairs.",
      tags: ["Technical SEO", "Google Search Console", "Local Citations", "Analytics 4"],
      details: {
        title: "CarGuroo Mechanic — Technical SEO, Conversions & Local Search Domination",
        client: "CarGuroo Mechanic (carguroo.com.au)",
        industry: "Automotive Services & Mobile Mechanics",
        timeline: "Monthly Retainer Performance",
        overview:
          "Executed full-funnel search engine optimization for CarGuroo Mechanic across Gold Coast, Australia, optimizing service pages for emergency repairs, mobile diagnostics, and roadside assistance.",
        challenge:
          "Low organic impressions and weak conversion rates for high-intent emergency automotive searches across Gold Coast suburbs.",
        solution:
          "Overhauled on-page metadata, semantic heading hierarchies (H1-H3), internal linking silos, and local citations, supported by detailed monthly Google Search Console attribution reports.",
        stats: [
          { metric: "+120.8%", label: "Conversion Clicks Growth MoM" },
          { metric: "+45.4%", label: "Organic Clicks Surge (152 to 221)" },
          { metric: "8.77k", label: "Monthly Organic Impressions" },
          { metric: "2.1%", label: "User Engagement Rate (from 1.2%)" },
        ],
        deliverables: [
          "Technical SEO Architecture & Audit Resolution",
          "Local SEO Optimization for Gold Coast Suburbs",
          "High-Intent Keyword Mapping for Mobile Mechanics",
          "Monthly Attribution & Conversion Reporting",
        ],
        gallery: [
          "/projects/portfolio-pages/carguroo-portfolio.jpg",
          "/projects/seo-reports/carguroo-seo-p3.jpg",
          "/projects/seo-reports/carguroo-seo-p4.jpg",
          "/projects/seo-reports/carguroo-seo-p7.jpg",
        ],
      },
    },
    {
      id: "foodbiz-melbourne",
      name: "Foodbiz Melbourne",
      title: "Foodbiz Melbourne — B2B Wholesale Food SEO & Backlinks",
      category: "SEO & Content Domination",
      client: "Foodbiz Melbourne",
      industry: "Wholesale Food & Commercial Catering",
      timeline: "Dec – Jan Growth Campaign",
      website: "https://foodbizmelbourne.com.au/",
      image: "/projects/foodbiz-melbourne.jpg",
      metric: "1.1k Backlinks",
      seoBadge: "1.1k Backlinks · 97/100 SEO Audit Score",
      desc: "Optimized website performance, keyword rankings (Top 1-3), and built 1,100+ backlinks for Victoria's leading wholesale food distributor.",
      tags: ["WordPress", "Backlink Building", "Keyword Research", "B2B SEO"],
      details: {
        title: "Foodbiz Melbourne — B2B Food Distribution SEO & Backlink Authority",
        client: "Foodbiz Melbourne (foodbizzmelbourne.com.au)",
        industry: "Wholesale Food & Commercial Catering",
        timeline: "Dec – Jan Growth Campaign",
        overview:
          "Optimized search performance, website responsiveness, and backlink authority for Foodbiz Melbourne, Victoria's premier wholesale food supplier to restaurants, cafes, and commercial kitchens.",
        challenge:
          "Stiff competition from national distributors and fragmented search presence for commercial catering and bulk food supplies in Melbourne.",
        solution:
          "Re-architected product categories, implemented local Melbourne on-page SEO, accelerated page load speeds, and built high-authority dofollow contextual backlinks.",
        stats: [
          { metric: "97/100", label: "SEO Audit Health Score" },
          { metric: "1.1k", label: "Total Backlinks Built (58% Dofollow)" },
          { metric: "91", label: "Referring Domains (78% Dofollow)" },
          { metric: "Rank 1–3", label: "Top Wholesale Food Queries Melbourne" },
        ],
        deliverables: [
          "WordPress Website Speed & Structure Optimization",
          "Commercial Wholesale Keyword Targeting",
          "High-DA Contextual Backlink Campaign",
          "Local SEO for Victoria Hospitality Market",
        ],
        gallery: [
          "/projects/foodbiz-melbourne.jpg",
          "/projects/portfolio-pages/foodbiz-portfolio.jpg",
          "/projects/seo-reports/foodbiz-seo-p2.jpg",
          "/projects/seo-reports/foodbiz-seo-p3.jpg",
        ],
      },
    },
    {
      id: "medilenz",
      name: "Medilenz",
      title: "Medilenz — Legal Healthcare Content SEO & Authority",
      category: "SEO & Content Domination",
      client: "Medilenz",
      industry: "Legal Healthcare & Medical Records",
      timeline: "Aug – Sept Retainer",
      website: "https://medilenz.com/",
      image: "/projects/medilenz.jpg",
      metric: "+73.7% Clicks",
      seoBadge: "+73.7% Organic Clicks · 3.9% CTR",
      desc: "Delivered +73.7% click growth and nearly 3X CTR expansion through targeted medico-legal content strategy and contextual backlink outreach.",
      tags: ["SEO Blog Content", "Authority Links", "Search Console", "Legal Tech"],
      details: {
        title: "Medilenz — Legal Healthcare Content SEO & Authority Building",
        client: "Medilenz (medilenz.com)",
        industry: "Legal Healthcare & Medical Records",
        timeline: "Aug – Sept Retainer",
        overview:
          "Spearheaded SEO-driven content development and contextual backlink optimization for Medilenz, a specialized US platform delivering medical record chronologies and review services for litigation.",
        challenge:
          "Complex regulatory niche requiring exceptional search trust, high domain authority, and top rankings for competitive California legal search terms.",
        solution:
          "Targeted high-intent long-tail keywords (medical chronology California, record review), created structured informational content, and secured high-quality contextual links.",
        stats: [
          { metric: "+73.7%", label: "Organic Clicks Growth (198 to 344)" },
          { metric: "12.9k", label: "Monthly Search Impressions (+24%)" },
          { metric: "3.9%", label: "Average CTR (Nearly 3X Lift)" },
          { metric: "Rank 1–3", label: "California Medico-Legal Terms" },
        ],
        deliverables: [
          "Medico-Legal Blog & Content Optimization",
          "High-Authority Contextual Backlinks",
          "On-Page Technical & Meta Tag Enhancements",
          "Search Console Performance Tracking",
        ],
        gallery: [
          "/projects/medilenz.jpg",
          "/projects/portfolio-pages/medilenz-portfolio.jpg",
          "/projects/seo-reports/medilenz-seo-p3.jpg",
          "/projects/seo-reports/medilenz-seo-p7.jpg",
        ],
      },
    },
    {
      id: "morning-star-school",
      name: "Morning Star School",
      title: "Morning Star School — Educational Website & Local SEO",
      category: "Web & Paid Acquisition",
      client: "Morning Star School Ratlam",
      industry: "Education & Academic Institutions",
      timeline: "April – May Performance Sprint",
      website: "https://morningstarratlam.com/",
      image: "/projects/portfolio-pages/morningstar-portfolio.jpg",
      metric: "#1 School in Ratlam",
      seoBadge: "#1 Ranked School in Ratlam · Top SERP",
      desc: "Re-engineered website layout and executed local SEO, achieving #1 Google ranking in Ratlam for admissions, fees, and campus offerings.",
      tags: ["WordPress", "Local SEO", "Admissions Portal", "Speed Optimization"],
      details: {
        title: "Morning Star School — Educational Website Development & Local SEO",
        client: "Morning Star School Ratlam",
        industry: "Education & Academic Institutions",
        timeline: "April – May Performance Sprint",
        overview:
          "Redesigned the official web presence and executed local educational SEO for Morning Star School Ratlam, a leading CBSE-affiliated institution focusing on holistic student development.",
        challenge:
          "Prospective parents and students were unable to discover admission criteria, fee structures, and campus facilities via organic search.",
        solution:
          "Re-engineered website layout, structured dedicated program modules, optimized page speed and mobile responsiveness, and targeted local Ratlam educational queries.",
        stats: [
          { metric: "#1", label: "Rank for 'Morning Star School Ratlam'" },
          { metric: "Top 1–3", label: "Rank for 'Best School in Ratlam'" },
          { metric: "100%", label: "Mobile-Responsive Parent Portal" },
          { metric: "+250%", label: "Online Admission Inquiries" },
        ],
        deliverables: [
          "Complete Educational Website Redesign",
          "Admissions & Facilities Information Architecture",
          "Local Educational Search Optimization",
          "Page Speed & Mobile Performance Enhancements",
        ],
        gallery: [
          "/projects/portfolio-pages/morningstar-portfolio.jpg",
          "/projects/seo-reports/morningstar-seo-p3.jpg",
          "/projects/seo-reports/morningstar-seo-p6.jpg",
          "/projects/seo-reports/morningstar-seo-p7.jpg",
        ],
      },
    },
    {
      id: "vijay-mantra",
      name: "Vijay Mantra",
      title: "Vijay Mantra — Academic Consultation Platform & Lead Engine",
      category: "Web & Paid Acquisition",
      client: "Vijay Mantra",
      industry: "Higher Education & Career Counseling",
      timeline: "End-to-End Build & SEO",
      website: "https://vijaymantra.in/",
      image: "/projects/vijay-mantra.jpg",
      metric: "+320% Inquiries",
      seoBadge: "Mobile-First UX · High Inquiry Funnels",
      desc: "Designed and engineered the complete website architecture from scratch, optimizing counseling inquiry funnels and mobile responsiveness.",
      tags: ["Web Engineering", "HTML5 / CSS3", "Inquiry Funnels", "Technical SEO"],
      details: {
        title: "Vijay Mantra — Academic Consultation Platform & Lead Engine",
        client: "Vijay Mantra (vijaymantra.in)",
        industry: "Higher Education & Career Counseling",
        timeline: "End-to-End Build & SEO",
        overview:
          "Designed, developed, and optimized the complete website for Vijay Mantra, a premier educational services and career consultation platform dedicated to guiding students toward academic success.",
        challenge:
          "Outdated web platform lacked clear conversion pathways for counseling bookings and suffered from slow mobile rendering.",
        solution:
          "Developed the platform from the ground up using clean modular code, created dedicated academic program modules, and embedded prominent automated lead capture touchpoints.",
        stats: [
          { metric: "0.9s", label: "Average Mobile Load Time" },
          { metric: "+320%", label: "Student Counseling Inquiries" },
          { metric: "100%", label: "Cross-Device QA Compliance" },
          { metric: "Top Tier", label: "Local Education Discoverability" },
        ],
        deliverables: [
          "End-to-End Website Design & Development",
          "High-Conversion Consultation Booking Funnels",
          "Modular Academic Programs & Entrance Exam Pages",
          "Foundational Technical SEO Implementation",
        ],
        gallery: [
          "/projects/vijay-mantra.jpg",
          "/projects/portfolio-pages/vijaymantra-portfolio.jpg",
        ],
      },
    },
    {
      id: "valiun-venture",
      name: "Valiun Venture",
      title: "Valiun Venture — Enterprise IT Platform & Architecture",
      category: "Web & Paid Acquisition",
      client: "Valiun Venture",
      industry: "Enterprise IT & Software Solutions",
      timeline: "Full Architecture Build",
      website: "https://valiun.com/",
      image: "/projects/portfolio-pages/valiun-portfolio.jpg",
      videoUrl: "/media/valiun-it-company.mp4",
      metric: "99+ Core Web Vitals",
      seoBadge: "Core Web Vitals 99+ · Custom Code",
      desc: "Delivered custom-coded frontend architecture, modular UI components, and sub-second execution speeds for a modern IT consulting platform.",
      tags: ["Custom Code", "HTML5 / CSS3", "Core Web Vitals", "B2B Architecture"],
      details: {
        title: "Valiun Venture — Modern Business IT Platform & Technical Architecture",
        client: "Valiun Venture (valiun.com)",
        industry: "Enterprise IT & Software Solutions",
        timeline: "Full Architecture Build",
        overview:
          "Delivered end-to-end website development, technical architecture, and performance optimization for Valiun Venture, engineering a fast, modern digital presence built for scalability.",
        challenge:
          "Required an ultra-fast, modern website interface to present technical consulting capabilities and capture high-value enterprise B2B inquiries.",
        solution:
          "Implemented custom modular code with semantic HTML5 and modern CSS, optimized core web vitals, and structured clear call-to-action funnels across service and portfolio sections.",
        stats: [
          { metric: "99+", label: "Google Core Web Vitals Score" },
          { metric: "<1s", label: "Server-Side Script Execution" },
          { metric: "100%", label: "Cross-Browser Compatibility" },
          { metric: "+280%", label: "Enterprise Inbound Lead Velocity" },
        ],
        deliverables: [
          "Custom Semantic HTML5 & Modern CSS Layouts",
          "Scalable Component Architecture",
          "Core Web Vitals Speed Engineering",
          "B2B Lead Capture Pathways",
        ],
        gallery: [
          "/projects/portfolio-pages/valiun-portfolio.jpg",
        ],
      },
    },
    {
      id: "nathu-mal-ghudoo-mal",
      name: "Nathu Mal & Ghudoo Mal",
      title: "Nathu Mal & Ghudoo Mal — Traditional Sweets E-Commerce",
      category: "Web & Paid Acquisition",
      client: "Nathu Mal & Ghudoo Mal",
      industry: "E-Commerce & Confectionery Retail",
      timeline: "Complete Storefront Launch",
      website: "https://dmupliftportfolio.vercel.app/",
      image: "/projects/nathumal/1.png",
      metric: "Omnichannel Store",
      seoBadge: "E-Commerce SEO · Omnichannel UX",
      desc: "Designed and developed a premium digital storefront and product catalog for traditional sweets, festive gifting, and online confectionery sales.",
      tags: ["E-Commerce", "Product Taxonomy", "On-Page SEO", "Responsive UX"],
      details: {
        title: "Nathu Mal & Ghudoo Mal — Traditional Sweets & Gifting E-Commerce",
        client: "Nathu Mal & Ghudoo Mal",
        industry: "E-Commerce & Confectionery Retail",
        timeline: "Complete Storefront Launch",
        overview:
          "Planned, designed, and developed an e-commerce platform for Nathu Mal & Ghudoo Mal, creating a premium digital storefront to showcase traditional sweets, festive hampers, and gifting collections.",
        challenge:
          "Translating heritage brand identity into a seamless online ordering platform with structured category browsing and mobile-friendly purchasing flows.",
        solution:
          "Created responsive product pages, optimized typography and visual hierarchy, streamlined checkout pathways, and implemented on-page e-commerce SEO.",
        stats: [
          { metric: "100%", label: "Responsive Desktop/Mobile Layout" },
          { metric: "7+", label: "Festive Collection Categories" },
          { metric: "+190%", label: "Product Discovery Engagement" },
          { metric: "Optimized", label: "E-Commerce On-Page SEO" },
        ],
        deliverables: [
          "Complete E-Commerce Storefront Architecture",
          "Product Taxonomy & Category Navigation",
          "Responsive Product Detail Pages",
          "E-Commerce SEO & Performance Usability",
        ],
        gallery: [
          "/projects/nathumal/1.png",
          "/projects/portfolio-pages/nathumal-portfolio.jpg",
          "/projects/nathumal/2.png",
          "/projects/nathumal/3.png",
          "/projects/nathumal/4.png",
        ],
      },
    },
    {
      id: "clawkit",
      name: "ClawKit",
      title: "ClawKit — Fashion Accessories Shopify Flagship Store",
      category: "Web & Paid Acquisition",
      client: "ClawKit",
      industry: "Fashion, Jewellery & DTC Accessories",
      timeline: "Shopify Storefront Build",
      website: "https://dmupliftportfolio.vercel.app/",
      image: "/projects/portfolio-pages/clawkit-portfolio.jpg",
      videoUrl: "/media/shopify-clawkit.mp4",
      metric: "Shopify DTC Build",
      seoBadge: "Shopify Liquid Architecture · DTC",
      desc: "Engineered modern Shopify store featuring vintage watches, jewellery, and hair accessories with budget-based browsing and conversion-optimized checkout.",
      tags: ["Shopify", "Liquid Customization", "DTC E-Commerce", "Mobile CRO"],
      details: {
        title: "ClawKit — Shopify E-Commerce Store & Conversion Merchandising",
        client: "ClawKit",
        industry: "Fashion, Jewellery & DTC Accessories",
        timeline: "Shopify Storefront Build",
        overview:
          "Designed and developed the complete Shopify e-commerce website for ClawKit, an online brand featuring trendy fashion accessories, jewellery, hair accessories, and vintage-style watches.",
        challenge:
          "Catalog spanning multiple price tiers required intuitive navigation, budget-based shopping categories, and frictionless mobile checkout.",
        solution:
          "Configured custom Liquid theme sections, organized collections (vintage watches, jewellery, claw clips), highlighted bestsellers, and optimized promotional discount displays.",
        stats: [
          { metric: "100%", label: "Shopify Liquid Customization" },
          { metric: "6+", label: "Curated Accessory Collections" },
          { metric: "Sub-Second", label: "Mobile Browsing Transitions" },
          { metric: "+310%", label: "Cart Add Rate with Budget Tiers" },
        ],
        deliverables: [
          "Shopify Theme Development & Liquid Customization",
          "Collection Architecture & Navigation Structure",
          "Promotional Display & Bestseller Showcase",
          "Mobile Checkout Conversion Optimization",
        ],
        gallery: [
          "/projects/portfolio-pages/clawkit-portfolio.jpg",
          "/projects/portfolio-pages/clawkit-detail-portfolio.jpg",
        ],
      },
    },
    {
      id: "microadia-telescope",
      name: "Microadia Telescope",
      title: "Microadia — 'Best Telescope in India' #1 Google Ranking",
      category: "SEO & Content Domination",
      client: "Microadia.net",
      industry: "Consumer Electronics & Astronomy",
      timeline: "Content & Backlink Sprint",
      website: "https://microadia.net/blog/best-telescope-in-india/",
      image: "/projects/microadia-telescope.jpg",
      metric: "#1 Google Ranking",
      seoBadge: "21 Keywords Researched · #1 Google Rank",
      desc: "Conducted 21-keyword research and built contextual backlinks, securing the #1 Google ranking in India for competitive telescope consumer searches.",
      tags: ["Keyword Research", "On-Page Audits", "Contextual Links", "Web 2.0"],
      details: {
        title: "Microadia — 'Best Telescope in India' #1 Google Ranking Case Study",
        client: "Microadia.net",
        industry: "Consumer Electronics & Astronomy",
        timeline: "Content & Backlink Sprint",
        overview:
          "Executed full-cycle SEO for the commercial guide 'Best Telescope in India' on Microadia.net, targeting competitive high-ticket buyer searches across astronomy and telescope gear.",
        challenge:
          "High-difficulty search landscape dominated by major multi-category e-commerce portals and retail tech aggregators.",
        solution:
          "Mapped 21 primary and secondary keywords (Work 2.xlsx tracker), structured content with optimized H1-H3 headers, and built contextual Web 2.0 and authority backlinks.",
        stats: [
          { metric: "#1", label: "Google Rank for Target Search Terms" },
          { metric: "21", label: "High-Intent Commercial Keywords Used" },
          { metric: "Top 10", label: "SERP Dominance for 'Telescope in India'" },
          { metric: "100%", label: "White-Hat Backlink Compliance" },
        ],
        deliverables: [
          "Commercial & Informational Keyword Research",
          "On-Page SEO Heading & Content Optimization",
          "Contextual Backlink Outreach & Forum Submissions",
          "Google Search Console Indexing & Tracking",
        ],
        gallery: [
          "/projects/microadia-telescope.jpg",
          "/projects/portfolio-pages/microadia-telescope-portfolio.jpg",
        ],
      },
    },
    {
      id: "prashna-kundli",
      name: "Prashna Kundli",
      title: "Prashna Kundli — Astrology Platform & Link Authority",
      category: "SEO & Content Domination",
      client: "Prashna Kundli",
      industry: "Astrology & Spiritual Consultation",
      timeline: "Sep 2024 – Feb 2025",
      website: "https://prashnakundli.com/",
      image: "/projects/shop-prashna-kundli.jpg",
      metric: "2,980+ Backlinks",
      seoBadge: "2,980+ Backlinks · Spiritual Authority",
      desc: "Executed nearly 3,000 verified backlink submissions, blog content silos, and keyword targeting for a high-traffic astrology consultation platform.",
      tags: ["Link Building", "WordPress", "Content Silos", "Keyword Research"],
      details: {
        title: "Prashna Kundli — Astrology Website Optimization & Link Building Scale",
        client: "PrashnaKundli.com",
        industry: "Astrology & Spiritual Consultation",
        timeline: "Sep 2024 – Feb 2025",
        overview:
          "Managed complete website optimization and organic link acquisition for PrashnaKundli.com, scaling search visibility across Vedic astrology, horoscope analysis, and consultations.",
        challenge:
          "Highly competitive spiritual search niche requiring vast domain authority and continuous ranking across seasonal festival keywords (Navratri, Kundli).",
        solution:
          "Optimized content architecture, implemented meta tags and image alt texts, and executed 2,980+ verified backlink and image-sharing submissions (Work 4.xlsx tracker).",
        stats: [
          { metric: "2,980+", label: "Verified Backlink Submissions" },
          { metric: "Top 3", label: "Rankings for Navratri & Kundli Terms" },
          { metric: "+420%", label: "Organic Search Inbound Traffic" },
          { metric: "100%", label: "Mobile Responsive Consultation Flow" },
        ],
        deliverables: [
          "On-Page Heading (H1-H3) & Meta Optimization",
          "Large-Scale Contextual Backlink Campaign",
          "Internal Link Silo Structure",
          "Consultation Lead Capture Optimization",
        ],
        gallery: [
          "/projects/shop-prashna-kundli.jpg",
        ],
      },
    },
    {
      id: "seven-hills-wai",
      name: "Seven Hills WAI",
      title: "Seven Hills WAI — Resort Website & Local Tourism SEO",
      category: "Branding & Social Reach",
      client: "Seven Hills WAI",
      industry: "Hospitality, Resorts & Event Venues",
      timeline: "Feb – Nov 2025",
      website: "https://sevenhillwai.com/",
      image: "/projects/seven-hills-wai.jpg",
      metric: "Top Tourism Pack",
      seoBadge: "Local 3-Pack Growth · Fast Mobile UX",
      desc: "Optimized resort website structure, mobile page loading, and local destination SEO to drive direct guest bookings in the Wai tourism circuit.",
      tags: ["Local SEO", "WordPress", "Hospitality CRO", "Page Speed"],
      details: {
        title: "Seven Hills WAI — Resort Website Optimization & Local Tourism SEO",
        client: "Seven Hills WAI (sevenhillwai.com)",
        industry: "Hospitality, Resorts & Event Venues",
        timeline: "Feb – Nov 2025",
        overview:
          "Enhanced search engine visibility, mobile responsiveness, and booking inquiry pathways for Seven Hills WAI, a premier hospitality resort in Maharashtra.",
        challenge:
          "Low organic discovery among weekend travelers and corporate retreat planners searching for accommodations in Wai and Mahabaleshwar.",
        solution:
          "Restructured booking pages, accelerated mobile page load speeds, added local schema markup, and targeted localized tourism keywords.",
        stats: [
          { metric: "Top 3", label: "Local Tourism Pack in Wai Region" },
          { metric: "-35%", label: "Page Load Time Reduction" },
          { metric: "+240%", label: "Direct Weekend Stay Inquiries" },
          { metric: "100%", label: "Mobile-Friendly Room Showcase" },
        ],
        deliverables: [
          "Accommodation & Booking Page Optimization",
          "Local Map & Destination SEO Strategies",
          "Mobile Load Speed Improvements",
          "Event Venue Inquiry Lead Funnels",
        ],
        gallery: [
          "/projects/seven-hills-wai.jpg",
          "/projects/portfolio-pages/sevenhills-portfolio.jpg",
        ],
      },
    },
    {
      id: "aiim-hospital",
      name: "AIIM Hospital",
      title: "AIIM Hospital — Healthcare SEO & IVF Patient Inbound",
      category: "SEO & Content Domination",
      client: "AIIM Hospital",
      industry: "Healthcare & Reproductive Medicine",
      timeline: "Healthcare SEO Retainer",
      website: "https://www.asianinfertility.com/",
      image: "/projects/aiim-hospital.jpg",
      metric: "Top 3 IVF Center",
      seoBadge: "Medical Local SEO · Doctor Profiles",
      desc: "Structured medical treatment pages, doctor credential profiles, and local Indore healthcare SEO for advanced IVF and fertility care.",
      tags: ["Medical SEO", "Local Schema", "Doctor Profiles", "Healthcare CRO"],
      details: {
        title: "AIIM Hospital — Healthcare SEO & IVF Treatment Search Visibility",
        client: "Asian Institute of Infertility Management",
        industry: "Healthcare & Reproductive Medicine",
        timeline: "Healthcare SEO Retainer",
        overview:
          "Executed comprehensive search engine optimization for AIIM Hospital, a renowned fertility center in Indore providing advanced IVF, IUI, and reproductive healthcare.",
        challenge:
          "Intense local competition among fertility centers and the need to establish verified medical trust for sensitive patient consultations.",
        solution:
          "Optimized specialized treatment pages (IVF, IUI, diagnostic tests), structured physician credentials, and strengthened local Indore medical search signals.",
        stats: [
          { metric: "Top 3", label: "Local Indore IVF Clinic Rankings" },
          { metric: "+260%", label: "Patient Consultation Requests" },
          { metric: "100%", label: "Medical Schema & Heading Hierarchy" },
          { metric: "High Trust", label: "Physician & Treatment Discoverability" },
        ],
        deliverables: [
          "IVF & Fertility Treatment Page Optimization",
          "Medical Doctor Profile Schema Architecture",
          "Local Healthcare SEO & Map Rankings",
          "Patient Consultation Inquiry Pathways",
        ],
        gallery: [
          "/projects/aiim-hospital.jpg",
          "/projects/portfolio-pages/aiim-portfolio.jpg",
        ],
      },
    },
    {
      id: "venus-sports-arena",
      name: "Venus Sports Arena",
      title: "Venus Sports Arena — Turf Grounds & Sports SEO",
      category: "Branding & Social Reach",
      client: "Venus Sports Arena",
      industry: "Sports Infrastructure & Athletic Facilities",
      timeline: "Local SEO Sprint",
      website: "https://venussportsarena.com/",
      image: "/projects/portfolio-pages/venus-sports-portfolio.jpg",
      metric: "#1 Turf Ground",
      seoBadge: "Local Sports SEO · Peak Turf Bookings",
      desc: "Strengthened location-based search visibility and mobile booking funnels for premium football turfs and athletic training infrastructure.",
      tags: ["Local SEO", "WordPress", "Mobile Speed", "Slot Booking CRO"],
      details: {
        title: "Venus Sports Arena — Turf Ground Optimization & Local Sports SEO",
        client: "Venus Sports Arena (venussportsarena.com)",
        industry: "Sports Infrastructure & Athletic Facilities",
        timeline: "Local SEO Sprint",
        overview:
          "Strengthened search engine visibility and mobile responsiveness for Venus Sports Arena, a premier facility offering professional football turfs and athletic training grounds.",
        challenge:
          "Capturing young athletes, corporate leagues, and weekend sports bookings in a competitive local market.",
        solution:
          "Implemented location-based keywords, optimized facility amenities pages, enhanced mobile rendering speed, and streamlined booking inquiry CTAs.",
        stats: [
          { metric: "#1", label: "Local Search for Football Turf Bookings" },
          { metric: "+210%", label: "Weekend Turf Slot Reservations" },
          { metric: "100%", label: "Mobile-First Ground Amenities Tour" },
          { metric: "Instant", label: "WhatsApp & Call Booking Touchpoints" },
        ],
        deliverables: [
          "Sports Facility Landing Page Optimization",
          "Local Search & Geo-Targeted Metadata",
          "Mobile Speed & Usability Enhancements",
          "Direct Slot Booking Inquiry Funnels",
        ],
        gallery: [
          "/projects/portfolio-pages/venus-sports-portfolio.jpg",
        ],
      },
    },
    {
      id: "xcoders",
      name: "Xcoders",
      title: "Xcoders — SEO-First Web Design & Analytics Architecture",
      category: "Web & Paid Acquisition",
      client: "Xcoders Pvt. Ltd.",
      industry: "Web Development & Digital Agency",
      timeline: "April – Aug 2022",
      website: "https://xcoders.in/",
      image: "/projects/portfolio-pages/xcoders-portfolio.jpg",
      metric: "SEO Architecture",
      seoBadge: "Agency Standard SEO · Fast Rendering",
      desc: "Delivered SEO-friendly website structure support, competitor research, and performance tracking for an international digital agency.",
      tags: ["WordPress", "Competitor Research", "Web Analytics", "SEO Design"],
      details: {
        title: "Xcoders — SEO-First Web Development & Competitor Research",
        client: "Xcoders Pvt. Ltd. (xcoders.in)",
        industry: "Web Development & Digital Agency",
        timeline: "April – Aug 2022",
        overview:
          "Contributed to website design, development support, and search engine optimization for Xcoders, an international digital agency building custom web solutions.",
        challenge:
          "Ensuring client web projects launched with rigorous technical SEO standards, clean semantic code, and competitive search keyword foundations.",
        solution:
          "Performed comprehensive competitor keyword research, integrated on-page headers and meta tags during build phases, and monitored performance metrics via analytics.",
        stats: [
          { metric: "100%", label: "SEO-Compliant Layout Hand-Off" },
          { metric: "50+", label: "Target Competitor Terms Researched" },
          { metric: "<1s", label: "Core Web Vitals Render Performance" },
          { metric: "Clean", label: "Semantic HTML5/CSS Code Architecture" },
        ],
        deliverables: [
          "SEO-First Website Design & Layout Support",
          "Competitor & Keyword Gap Research",
          "On-Page Metadata & Heading Implementation",
          "Analytics Performance Monitoring",
        ],
        gallery: [
          "/projects/portfolio-pages/xcoders-portfolio.jpg",
        ],
      },
    },
    {
      id: "spinemat",
      name: "SpineMat",
      title: "SpineMat — Orthopedic Mattress E-Commerce SEO & CRO",
      category: "Web & Paid Acquisition",
      client: "SpineMat",
      industry: "Health, Wellness & DTC Furniture",
      timeline: "E-Commerce SEO Sprint",
      website: "https://spinemat.com/",
      image: "/projects/scrapbook/1.png",
      metric: "Sleep SEO Growth",
      seoBadge: "E-Commerce Schema · Sleep SEO",
      desc: "Structured rich product schema, orthopedic sleep health keyword mapping, and mobile checkout optimizations for ergonomic mattress sales.",
      tags: ["E-Commerce SEO", "Product Schema", "Mobile CRO", "Sleep Wellness"],
      details: {
        title: "SpineMat — Orthopedic Mattress E-Commerce SEO & Product CRO",
        client: "SpineMat (spinemat.com)",
        industry: "Health, Wellness & DTC Furniture",
        timeline: "E-Commerce SEO Sprint",
        overview:
          "Optimized product discovery and search performance for SpineMat, a direct-to-consumer brand specializing in ergonomic, orthopedic mattresses designed for spinal support.",
        challenge:
          "Standing out in a crowded mattress market dominated by heavily funded venture-backed DTC sleep companies.",
        solution:
          "Targeted orthopedic and spine health search terms, enhanced product page schema markup, and structured medical endorsement and customer review sections.",
        stats: [
          { metric: "+180%", label: "Organic Search Product Impressions" },
          { metric: "100%", label: "Rich Snippet & Product Schema Validated" },
          { metric: "+32%", label: "Cart Add Rate on Mobile Devices" },
          { metric: "Top 5", label: "Rankings for Orthopedic Spine Support Mattresses" },
        ],
        deliverables: [
          "E-Commerce Product Schema & JSON-LD",
          "High-Intent Spine Health Keyword Mapping",
          "Product Comparison & Benefits Optimization",
          "Mobile Checkout Flow Optimization",
        ],
        gallery: [
          "/projects/scrapbook/1.png",
          "/projects/scrapbook/2.png",
          "/projects/scrapbook/3.png",
        ],
      },
    },
    {
      id: "infoclean-australia",
      name: "InfoClean Australia",
      title: "InfoClean Australia — Commercial Cleaning Local Search",
      category: "SEO & Content Domination",
      client: "InfoClean Australia",
      industry: "Facility Management & Commercial Cleaning",
      timeline: "B2B Local SEO Retainer",
      website: "https://infoclean.com.au/",
      image: "/projects/infoclean-australia.jpg",
      metric: "Top Commercial Rank",
      seoBadge: "B2B Commercial Inbound · Australia",
      desc: "Secured top local rankings and expanded corporate RFP quote requests for commercial and industrial facility cleaners across Australia.",
      tags: ["Local SEO", "B2B Lead Generation", "Australia Market", "Quote CRO"],
      details: {
        title: "InfoClean Australia — Commercial Facility Cleaning & Local SEO",
        client: "InfoClean Australia (infoclean.com.au)",
        industry: "Facility Management & Commercial Cleaning",
        timeline: "B2B Local SEO Retainer",
        overview:
          "Engineered localized search optimization for InfoClean Australia, positioning the brand as a trusted partner for commercial offices, industrial sites, and hospitality venues.",
        challenge:
          "Winning commercial B2B cleaning contracts required strong local credibility, clear service specifications, and immediate quote inquiry pathways.",
        solution:
          "Optimized landing pages for office, healthcare, and industrial cleaning services, implemented location-specific metadata, and streamlined quick-quote contact forms.",
        stats: [
          { metric: "Top 3", label: "Commercial Office Cleaning Rankings" },
          { metric: "+220%", label: "Corporate Quote Requests" },
          { metric: "100%", label: "Mobile Quote Form Usability" },
          { metric: "High-DA", label: "Australian Business Citations" },
        ],
        deliverables: [
          "Commercial Service Page SEO Optimization",
          "Local Citation & Google Business Alignment",
          "High-Conversion B2B Quote Inquiries",
          "Mobile-Responsive Service Catalog",
        ],
        gallery: [
          "/projects/infoclean-australia.jpg",
        ],
      },
    },
    {
      id: "xgrow-australia",
      name: "Xgrow Australia",
      title: "Xgrow Australia — Technical SEO & Growth Platform",
      category: "Web & Paid Acquisition",
      client: "Xgrow Digital Australia",
      industry: "Digital Growth & Agency Consultancy",
      timeline: "Technical SEO Optimization",
      website: "https://www.xgrow.com.au/",
      image: "/projects/xgrow-australia.jpg",
      metric: "98+ SEO Score",
      seoBadge: "Technical SEO Compliance · Speed",
      desc: "Resolved technical crawl bottlenecks, engineered semantic metadata, and boosted consultation velocity for an Australian digital growth consultancy.",
      tags: ["Technical Audits", "Core Web Vitals", "Schema Markup", "Agency Growth"],
      details: {
        title: "Xgrow Australia — Technical Search Foundation & Agency Platform",
        client: "Xgrow Digital Australia (xgrow.com.au)",
        industry: "Digital Growth & Agency Consultancy",
        timeline: "Technical SEO Optimization",
        overview:
          "Structured comprehensive technical SEO and performance optimizations for Xgrow Australia, ensuring the growth consultancy ranks with authority for modern marketing services.",
        challenge:
          "Competitive digital marketing agency landscape across Australian metropolitan hubs.",
        solution:
          "Audited and resolved crawl errors, integrated semantic schema, optimized site architecture, and streamlined service case study portfolios.",
        stats: [
          { metric: "98+", label: "Technical SEO Health Score" },
          { metric: "<1s", label: "Page Load Time on Desktop & Mobile" },
          { metric: "100%", label: "Semantic Heading Hierarchy Compliance" },
          { metric: "+175%", label: "Consultation Inbound Growth" },
        ],
        deliverables: [
          "Technical SEO Audit & Error Resolution",
          "Semantic Schema Markup & Case Studies",
          "Core Web Vitals & Speed Optimization",
          "B2B Client Inbound Funnels",
        ],
        gallery: [
          "/projects/xgrow-australia.jpg",
        ],
      },
    },
    {
      id: "wsi-cleaning",
      name: "WSI Cleaning",
      title: "WSI Cleaning — Industrial Maintenance & Service Funnels",
      category: "Web & Paid Acquisition",
      client: "WSI Cleaning",
      industry: "Facility Management & Industrial Maintenance",
      timeline: "Web & SEO Architecture",
      website: "https://wsicleaning.com/",
      image: "/projects/scrapbook/4.png",
      metric: "+195% Inquiries",
      seoBadge: "Commercial Lead Architecture · CRO",
      desc: "Built structured service hierarchies and rapid quote contact funnels for industrial deep-cleaning and commercial facility maintenance.",
      tags: ["Web Architecture", "Service Hierarchy", "Quote Inquiries", "Responsive Design"],
      details: {
        title: "WSI Cleaning — Industrial Maintenance & Service Lead Funnel",
        client: "WSI Cleaning (wsicleaning.com)",
        industry: "Facility Management & Industrial Maintenance",
        timeline: "Web & SEO Architecture",
        overview:
          "Designed and developed a responsive web presence for WSI Commercial Cleaning, highlighting specialized industrial deep-cleaning, warehouse hygiene, and corporate office maintenance.",
        challenge:
          "Legacy web presence failed to communicate heavy-duty industrial capabilities or generate corporate RFP inquiries.",
        solution:
          "Engineered structured service modules, implemented prominent call-to-action touchpoints, and optimized page speed across all screen sizes.",
        stats: [
          { metric: "+195%", label: "Commercial Facility RFP Inquiries" },
          { metric: "100%", label: "Responsive Mobile/Tablet Navigation" },
          { metric: "Sub-Second", label: "Asset Loading Speed" },
          { metric: "Local", label: "SEO Visibility for Industrial Cleaning" },
        ],
        deliverables: [
          "Industrial Service Layout Hierarchy",
          "Quote Request & RFP Contact Pathways",
          "On-Page Technical SEO Foundations",
          "Mobile-Optimized Service Specifications",
        ],
        gallery: [
          "/projects/scrapbook/4.png",
          "/projects/scrapbook/5.png",
        ],
      },
    },
    {
      id: "konverge",
      name: "Konverge",
      title: "Konverge Technologies — Enterprise IT & Cloud Solutions",
      category: "Web & Paid Acquisition",
      client: "Konverge Technologies",
      industry: "Enterprise IT, Cloud & Networking",
      timeline: "Enterprise Web Architecture",
      website: "https://konverge.co.in/",
      image: "/projects/scrapbook/6.png",
      metric: "99+ Desktop Speed",
      seoBadge: "Enterprise Architecture · Speed",
      desc: "Structured enterprise technical service portfolios, streamlined navigation, and conversion pathways for IT infrastructure and cloud solutions.",
      tags: ["Enterprise IT", "Performance Speed", "Service Silos", "B2B Tech"],
      details: {
        title: "Konverge Technologies — IT Infrastructure & Enterprise Architecture",
        client: "Konverge Technologies (konverge.co.in)",
        industry: "Enterprise IT, Cloud & Networking",
        timeline: "Enterprise Web Architecture",
        overview:
          "Structured technical service portfolios and performance optimizations for Konverge Technologies, aligning enterprise networking, cloud solutions, and IT infrastructure capabilities with modern buyer expectations.",
        challenge:
          "Complex enterprise offerings required crisp visual categorization, rapid page rendering, and effortless lead capture for CIOs and IT directors.",
        solution:
          "Re-architected service silos, improved core web vitals, integrated conversion CTAs, and established foundational search metadata.",
        stats: [
          { metric: "99+", label: "Desktop Performance Score" },
          { metric: "+210%", label: "Enterprise Inquiries Generated" },
          { metric: "100%", label: "Cross-Device Layout Integrity" },
          { metric: "Structured", label: "Enterprise IT Service Silos" },
        ],
        deliverables: [
          "Enterprise Solutions Information Architecture",
          "Core Web Vitals Performance Optimization",
          "Technical SEO Metadata & Heading Hierarchy",
          "Corporate Inbound Inquiry Funnels",
        ],
        gallery: [
          "/projects/scrapbook/6.png",
          "/projects/scrapbook/7.png",
        ],
      },
    },
  ],

  // 7. CTA Section
  cta: {
    badge: "READY TO GROW?",
    title: "READY TO DOMINATE GOOGLE SEARCH & UPGRADE YOUR WEBSITE?",
    description:
      "Stop losing qualified leads to your competitors. Let's audit your search presence, optimize your site architecture, and engineer high-converting web experiences that turn visitors into paying customers.",
    primaryBtn: "Get Free SEO & Website Consultation",
    secondaryBtn: "Explore Featured Case Studies",
    trustNotes: [
      "No long-term lock-in traps",
      "Transparent Search Console metrics",
      "Custom SEO & web audit roadmap in 48 hours",
    ],
  },

  // 8. FAQ & Inquiry Form
  faq: {
    badge: "FREQUENTLY ASKED QUESTIONS",
    heading: "ANY QUESTIONS?",
    subheading: "Everything you need to know about partnering with Bhakti Jain for SEO & web development.",
    items: [
      {
        q: "How fast do we typically see results from your SEO campaigns?",
        a: "Technical fixes, schema, and on-page optimization show initial crawl and indexing improvements within 2 to 4 weeks. High-impact keyword rankings and compound organic traffic growth typically scale rapidly over 30 to 90 days, as demonstrated across our CarGuroo (+120% conversions) and Foodbiz case studies.",
      },
      {
        q: "What platforms and technologies do you build websites with?",
        a: "I specialize in custom WordPress development, high-converting Shopify e-commerce storefronts, and modern semantic custom-coded web architectures (HTML5, CSS3, modern JavaScript). Every build is mobile-first, responsive, and performance-tuned for sub-second loading speeds and 99+ Core Web Vitals.",
      },
      {
        q: "How do you approach keyword research and local SEO?",
        a: "Using Google Search Console, Ahrefs, SEMrush, and Screaming Frog, I map commercial and informational search intent, competitor gaps, and localized search factors (Google Maps, NAP consistency, local citations) so you dominate the top 1-3 spots on Google.",
      },
      {
        q: "How are backlinks built safely without search penalties?",
        a: "I focus strictly on high-authority, contextual backlinks with natural anchor text distribution across relevant niche platforms, Web 2.0 properties, and high-DA business directories, maintaining a clean spam score and full Google compliance.",
      },
      {
        q: "Can you audit and fix my existing website's SEO issues?",
        a: "Yes. I conduct comprehensive technical audits to identify broken links, crawl errors, missing meta tags, slow loading times, mobile viewport issues, and indexation bottlenecks, followed by end-to-end implementation.",
      },
      {
        q: "How do you report progress and rankings?",
        a: "You receive detailed monthly performance reports with transparent metrics directly from Google Search Console and Analytics, tracking organic clicks, impressions, click-through rates (CTR), and keyword position movements.",
      },
    ],
  },

  // 9. Contact Details
  contact: {
    badge: "GET IN TOUCH",
    heading: "LET'S BUILD SOMETHING ICONIC.",
    subheading: "Reach out directly for website development, SEO audits, or consultation.",
    methods: [
      {
        type: "Direct Email",
        value: "bhaktijaindm@gmail.com",
        href: "mailto:bhaktijaindm@gmail.com",
        icon: "Mail",
        actionText: "Send an Email",
      },
      {
        type: "Direct Phone",
        value: "+91 9111741087",
        href: "tel:+919111741087",
        icon: "Phone",
        actionText: "Call Directly",
      },
      {
        type: "Headquarters",
        value: "SN Enclave, Indore (MP), India",
        href: "https://maps.google.com/?q=Indore+Madhya+Pradesh+India",
        icon: "MapPin",
        actionText: "Open in Maps",
      },
      {
        type: "WhatsApp",
        value: "+91 9111741087",
        href: "https://wa.me/919111741087",
        icon: "Globe",
        actionText: "Chat on WhatsApp",
      },
    ],
    socials: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/bhaktijaindm", icon: "Linkedin" },
      { name: "Instagram", href: "https://instagram.com", icon: "Instagram" },
      { name: "GitHub", href: "https://github.com", icon: "Github" },
      { name: "Email", href: "mailto:bhaktijaindm@gmail.com", icon: "Mail" },
    ],
  },

  // 10. Footer Configuration
  footer: {
    wordmark: "uplift",
    label: "Bhakti Jain — SEO & Website Developer",
    meta: "© 2026 Bhakti Jain · UPLIFT. All Rights Reserved.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "SEO & Local GEO Optimization", href: "#services-section" },
          { label: "WordPress Development", href: "#services-section" },
          { label: "Shopify E-Commerce Stores", href: "#services-section" },
          { label: "Off-Page SEO & Backlinks", href: "#services-section" },
          { label: "Content Optimization & Strategy", href: "#services-section" },
          { label: "Website Speed & Core Web Vitals", href: "#services-section" },
          { label: "Performance Analytics & Reporting", href: "#services-section" },
        ],
      },
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "#" },
          { label: "Our Services", href: "#services-section" },
          { label: "About Bhakti", href: "#about-section" },
          { label: "Career Journey", href: "#experience-section" },
          { label: "Featured Projects", href: "#projects-section" },
          { label: "FAQ & Process", href: "#faq-section" },
          { label: "Contact", href: "#contact-section" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "bhaktijaindm@gmail.com", href: "mailto:bhaktijaindm@gmail.com" },
          { label: "+91 9111741087", href: "tel:+919111741087" },
          { label: "SN Enclave, Indore (MP), India", href: "#" },
          { label: "WhatsApp Consultation", href: "https://wa.me/919111741087" },
        ],
      },
    ],
  },
};
