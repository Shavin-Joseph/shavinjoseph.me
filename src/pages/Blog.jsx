import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiEye, FiClock, FiTrendingUp, FiArrowLeft, FiShare2, FiBookOpen, FiSearch, FiFilter, FiZap, FiX, FiTag, FiArrowRight, FiCopy, FiCheck, FiSun, FiMoon, FiList, FiExternalLink, FiUser, FiCheckCircle, FiSliders, FiMail } from 'react-icons/fi';
import { db } from '../firebase'; // Ensure your firebase config is correct
import { doc, setDoc, updateDoc, increment, collection, onSnapshot } from 'firebase/firestore';
import { Helmet } from "react-helmet-async";

// --- HARDCODED CONTENT DATABASE (Fast, Secure, Free) ---
 export const HARDCODED_ARTICLES = [
  {
    id: "1",
    title: "Why Traditional Full-Stack Development is Dead (And What I'm Building Instead)",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2026-07-22",
    tags: ["AI Integration", "Full Stack", "System Architecture", "Future Tech"],
    summary: "The era of simple CRUD applications is over. Modern platforms require predictive intelligence, real-time tracking, and automated workflows. Here is how I am rewiring my approach to full-stack architecture.",
    content: `For the past few years, "Full-Stack Development" meant spinning up a React frontend, attaching a Node or Python backend, connecting a database, and calling it a day. But as I started building production-level systems, I realized something: **that architecture is no longer enough.**\n\nWhen I was architecting **Flux Service**, an enterprise-level AC maintenance software, I realized that business owners didn't just want to record data—they wanted the system to *think* for them.\n\n### The Shift to Intelligent Systems\nInstead of just logging when a technician serviced an AC unit, the system needed to predict *when* the next failure would occur. This meant moving away from static databases and integrating AI prediction models directly into the routing architecture.\n\nModern development is no longer about just connecting the frontend to the backend. It's about:\n• **Real-Time Data Pipelines:** Ensuring inventory and fuel tracking sync globally with zero latency.\n• **Automated Workflows:** Generating quotations and invoices without human intervention.\n• **Predictive Analytics:** Using historical data to inform future business decisions automatically.\n\n### What This Means for Developers\nAs developers, we have to stop thinking like "coders" and start thinking like "Systems Architects." Understanding how to write a Python endpoint is great, but understanding how that endpoint interacts with a Cisco network infrastructure, secures user data, and feeds into an AI diagnostic tool is what separates a basic app from an enterprise solution.\n\nThe systems of tomorrow are self-monitoring, self-healing, and deeply interconnected. That is exactly what I am focusing on building next with the KWAS ecosystem.`
  },
  {
    id: "2",
    title: "Bridging the Gap: Hardware Diagnostics Meets Web Infrastructure",
    category: "Hardware & Networking",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-07-15",
    tags: ["Cisco Networks", "Hardware", "Troubleshooting", "Infrastructure"],
    summary: "A deep dive into why full-stack developers need to understand the physical network layer. Exploring Cisco configurations, hardware troubleshooting, and how physical latency impacts digital code.",
    content: `There is a massive disconnect in the modern development community: software engineers rarely understand the hardware their code runs on, and network engineers rarely look at the application layer.\n\nI've always believed that to be a true Systems Architect, you must understand the entire pipeline—from the JavaScript rendering in the browser all the way down to the Cisco routing protocols directing the packets.\n\n### The Physical Impact on Digital Code\nYou can write the most optimized Python algorithm in the world, but if your network architecture is flawed, your application will fail under load. Understanding subnetting, hardware diagnostics, and server limits changes how you write software. It forces you to write lighter, more efficient, and highly resilient code.`
  },
  {
    id: "3",
    title: "Injecting AI into Legacy Industries: How Flux Service Predicts Hardware Failures",
    category: "Artificial Intelligence",
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-06-18",
    tags: ["AI", "Python", "Flask", "Machine Learning"],
    summary: "Air conditioning maintenance hasn't changed in decades. By integrating Python-based AI models into the Flux Service platform, we turned a reactive industry into a proactive one.",
    content: `When building **Flux Service**, I noticed a fundamental flaw in how service management software operates: it is entirely reactive. A client’s air conditioner breaks, they call, and a technician is dispatched. 

To create a true enterprise solution, the software needed to anticipate problems before they happened.

### The Power of Predictive Maintenance
By utilizing Python and Flask, I integrated automated AI predictions into the core workflow. Instead of waiting for a breakdown, the system analyzes historical service records, unit specifications (down to the 60 BTU level), and usage patterns to calculate the probability of a future failure.

### Real-Time Ecosystems
This isn't just about throwing AI at a wall. The predictions tie directly into a real-time tracking system. If the AI flags a unit for potential failure, the platform automatically syncs this data with inventory control to ensure the correct parts are in the van, and tracks the technician's fuel usage for the route. 

Bringing legacy industries into the future doesn't require reinventing the wheel—it requires giving the wheel a brain.`
  },
  {
    id: "4",
    title: "Beyond the Screen: Programming ESP32 for 23-Foot Structural Lighting",
    category: "IoT & Hardware",
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    date: "2026-05-04",
    tags: ["ESP32", "Hardware", "IoT", "C++", "Architecture"],
    summary: "Software doesn't just live in browsers. Here is how I architected the network and code for a massive 23-foot smart lighting installation using ESP32 controllers.",
    content: `As a developer, there is a profound satisfaction in seeing your code physically manipulate the real world. In December 2025, I stepped away from the IDE to manage a large-scale, 23-foot structural lighting project for a community installation.

### The Hardware-Software Bridge
The brain of the operation was the **ESP32 microcontroller**. Working with structural lighting at scale is an entirely different beast than writing a web app. 
• **Latency is visible:** If your data packets drop, a section of your 23-foot structure goes dark. 
• **Memory limits are absolute:** You can't just buy more RAM; your C++ code has to be ruthlessly efficient.

### Network Administration in the Real World
This is where Cisco networking fundamentals shine. Managing the data flow for thousands of LEDs requires a flawless local network architecture to prevent bottlenecks and signal degradation. 

Building physical tech forces you to write better code. It teaches you that "full stack" doesn't just mean frontend and backend—it means understanding the silicon, the copper wire, and the visual output.`
  },
  {
    id: "5",
    title: "Real-Time Location Tracking in Android: The FrostLink Architecture",
    category: "Mobile Development",
    coverImage: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2026-04-12",
    tags: ["Android Studio", "Kotlin", "Firebase", "Mobile Apps"],
    summary: "Building native Android apps that handle real-time location data without draining batteries or dropping connections is a delicate balancing act.",
    content: `When architecting **FrostLink Sales**, the primary challenge wasn't building the UI—it was managing state and location tracking in real-time. FrostLink is designed for daily sales analytics with live location features, which means the app has to constantly communicate with the server without destroying the user's mobile battery.

### The Challenge of Native Android Location
Modern Android OS versions (especially Android 13+) heavily restrict background location tracking for privacy and battery preservation. 

To overcome this, I leveraged optimized foreground services and intelligent polling intervals. The app doesn't just blindly send data every second; it batches location packets and utilizes Firebase's real-time sync only when meaningful movement occurs.

### Unified Analytics
Because FrostLink ties directly into a broader sales ecosystem, the mobile app acts as an edge node. The data collected by the Android device is instantly pushed to the central database, populating the daily sales analytics dashboards for admins. Mobile development isn't just about Kotlin and XML—it's about edge computing.`
  },
  {
    id: "6",
    title: "The Anatomy of a High-Converting E-Commerce Store (Spicera.store)",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-03-28",
    tags: ["E-Commerce", "React", "Stripe", "UI/UX"],
    summary: "Creating an e-commerce platform goes far beyond rendering a shopping cart. It requires psychological design, zero-friction payment gateways, and flawless mobile responsiveness.",
    content: `When a user lands on an online store, you have exactly three seconds to convince them that your brand is trustworthy. When I developed **Spicera.store**, an e-commerce platform for an online spice merchant, the entire architecture was built around building trust through speed and design.

### Frictionless UI/UX
The product catalog was designed to be vibrant but minimalist. Heavy, unoptimized images kill conversions. Every product mockup was generated and compressed to load in milliseconds, ensuring that the mobile shopping experience was identical in quality to the desktop experience.

### Secure Gateway Integration
A store is useless if users are afraid to pull out their credit cards. By integrating Stripe's robust payment gateway directly into the React architecture, the checkout process remains securely on the site. No jarring redirects, no clunky third-party popups. 

Building Spicera reinforced a golden rule: Great code should be invisible to the user. All they should see is a beautiful product and a fast checkout.`
  },
  {
    id: "7",
    title: "Why I Built KWAS: The Future of Independent Software Ecosystems",
    category: "Software Ecosystem",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-02-15",
    tags: ["KWAS", "Entrepreneurship", "SaaS", "Full Stack"],
    summary: "The story behind Key Web App Solutions (KWAS) and why the future of software belongs to independent, highly specialized ecosystem builders.",
    content: `The tech industry is dominated by massive, bloated SaaS platforms that force businesses to adapt to the software. I believe software should adapt to the business. That is why I founded **KWAS (Key Web App Solutions)**.

### The Incubator Concept
KWAS operates as an incubator brand. Instead of building one massive, complex app that tries to do everything for everyone, KWAS focuses on proprietary, highly targeted software and mobile applications. 

Whether it is a full-stack platform like Flux Service for AC maintenance, or a bespoke web architecture for Roy J Tailors, the goal is the same: streamline client operations through custom deployment.

### Commercial Scale
The next phase of KWAS is expanding into a suite of downloadable desktop software and mobile apps. By keeping the development independent, we retain the agility to deploy commercial-grade tools without the overhead of a massive corporation. The future of software is agile, independent, and fiercely customized.`
  },
  {
    id: "8",
    title: "Mastering Framer Motion & Tailwind: Building Kinetic UIs",
    category: "Frontend Architecture",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-01-30",
    tags: ["React", "Framer Motion", "TailwindCSS", "Animation"],
    summary: "Static websites are obsolete. Learn how to combine Framer Motion and Tailwind CSS to create fluid, physics-based interfaces that respond to user touch.",
    content: `If your website doesn't react to the user, it feels dead. Modern frontend architecture requires a marriage between rapid styling and complex physics engines. 

### The Tailwind + Framer Synergy
Tailwind CSS handles the grid, the typography, and the absolute positioning with utility classes. But Framer Motion brings it to life. 

By tracking mouse and touch positions via \`useMotionValue\`, we can create effects like holographic masking and draggable physics orbs that don't just look cool—they feel physically satisfying to interact with.

### Touch Optimization is Mandatory
A frequent mistake developers make is building incredible hover animations for desktop and completely forgetting mobile users. Using \`onTouchMove\` event listeners ensures that the kinetic energy of a site translates perfectly to smartphones without breaking the native scroll experience.`
  },
  {
    id: "9",
    title: "Scaling Software While Studying: Life as a UoC Undergraduate",
    category: "Developer Journey",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-01-10",
    tags: ["University of Colombo", "Productivity", "Student Life", "Startup"],
    summary: "Balancing a Bachelor of Information and Communication Technology degree with running a software startup and building enterprise apps requires ruthless efficiency.",
    content: `Studying at the University of Colombo while actively deploying commercial software is an exercise in extreme time management. 

### Theory vs. Application
There is a profound synergy between academic coursework and real-world development. While the university curriculum builds a rock-solid foundation in data structures, algorithms, and computing theory, my work with KWAS and freelance clients forces me to apply those theories to messy, real-world problems.

When a university exam tests you on database normalization, it becomes incredibly relevant when you are actively designing the PostgreSQL schema for a live e-commerce platform like Spicera.store.

### The Power of Automation
To survive the workload, you have to automate your life. This necessity is what drove me to build complex Notion templates and leverage AI tools for branding and mockups. When you automate the repetitive tasks, you leave your brain free to focus on studying and architecting.`
  },
  {
    id: "10",
    title: "Building the Ultimate Language Learning Lab in Notion",
    category: "Digital Products",
    coverImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-12-28",
    tags: ["Notion", "Gumroad", "Productivity", "Creator Economy"],
    summary: "How I engineered complex database logic inside Notion to create a commercially viable Language Learning Lab template for Gumroad.",
    content: `Notion is no longer just a note-taking app; it is a full-fledged relational database system disguised as a workspace. 

### Engineering the Template
When I launched the "Language Learning Lab" template on Gumroad, I approached it like software development. It wasn't just about making it look pretty. I utilized complex database relations, rollups, and formula properties to create a system that automatically tracks vocabulary retention and spaced repetition.

### The Digital Creator Economy
Building templates is an excellent entry point into digital product architecture. You learn how to package logic, write documentation, and market a digital asset. Platforms like Gumroad and Fiverr allow developers to diversify their income streams by turning internal workflow tools into commercial assets.`
  },
  {
    id: "11",
    title: "Cisco Packet Tracer in 2026: Why Virtual Networks Build Better Coders",
    category: "Networking",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-12-10",
    tags: ["Cisco", "Networking", "Infrastructure", "Packet Tracer"],
    summary: "Before you deploy your code to the cloud, you need to understand how the cloud actually routes your data. A look at virtual network simulation.",
    content: `There is a tendency for modern developers to treat the cloud as "magic." Code goes up, website comes down. But understanding the physical architecture beneath that magic is what makes a senior engineer.

### Simulating the World
Cisco Packet Tracer remains one of the most powerful tools in an architect's arsenal. By simulating complex network topologies, switches, routers, and firewalls, you gain an intimate understanding of packet loss, latency, and routing protocols.

When you spend hours configuring virtual subnets and troubleshooting dead access points, you start to view your frontend API calls entirely differently. You stop taking the network for granted and start building in robust error handling, fallbacks, and optimized data payloads.`
  },
  {
    id: "12",
    title: "Diversifying Digital Income: From Client Sites to Adobe Assets",
    category: "Digital Economy",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-11-20",
    tags: ["Freelance", "Passive Income", "Design Assets", "Strategy"],
    summary: "A blueprint for developers and creators to step out of the time-for-money trap by leveraging AI, Adobe Stock, and the gig economy.",
    content: `Client work is fantastic for building skills and capital, but it scales linearly: you only get paid when you work. To truly scale in the digital economy, you must decouple your time from your income.

### The Asset Portfolio
In addition to building bespoke sites like Roy J Tailors, I dedicate time to AI-assisted content creation. By generating professional logos, branding mockups, and cinematic assets, I am able to operate as an Adobe Stock Contributor.

These digital assets live on servers permanently, generating passive income while I focus on coding my next application. 

### The Gig Economy Pipeline
Platforms like Fiverr act as the perfect testing ground. You can rapidly prototype a service—whether it's web development, bug fixing, or Notion templates—see what the market responds to, and then package that service into an automated, standalone digital product.`
  },
  {
    id: "13",
    title: "State Management in 2026: Why We Stopped Overcomplicating Redux",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-11-05",
    tags: ["React", "State Management", "Zustand", "Frontend"],
    summary: "For years, developers spent more time writing boilerplate for state containers than building features. Here is why lightweight state engines and React server state have won.",
    content: `State management used to be the most contentious topic in web development. We spent years creating actions, reducers, and dispatchers just to toggle a modal or update a user name in a sidebar.

### The Shift to Atomic and Server State
In modern web applications, state naturally breaks down into two distinct categories:
• **Server State:** Data that belongs to the database (cached via tools like React Query or SWR).
• **UI State:** Temporary interface changes (handled via local atomic stores like Zustand or React context).

When you decouple client-side UI toggles from your remote data fetching layer, your codebase instantly becomes cleaner, faster, and far easier to debug.

### Performance Under Load
In complex platforms where dozens of components need real-time data sync, over-engineered state containers cause unnecessary re-renders. Moving to lightweight, targeted state sub-subscriptions keeps frame rates locked at 60fps even on low-end mobile devices.`
  },
  {
    id: "14",
    title: "How AI Agents Are Replacing Standard Web APIs in Enterprise Systems",
    category: "AI & Automation",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-10-28",
    tags: ["AI Agents", "Python", "API", "Automation"],
    summary: "Static REST endpoints are no longer the peak of backend integration. Autonomous AI agents are now dynamic middleware that interpret user intent in real time.",
    content: `Traditional software relies on hardcoded logic paths: \`IF user clicks X, THEN call endpoint Y\`. But enterprise operations aren't always linear.

### Autonomous Middleware
When building intelligent platforms, we are moving toward agentic middleware. Instead of forcing a user to fill out a 15-field form to generate an invoice or schedule a technician, an AI agent takes raw text, parses the intent, validates inventory databases, and executes the database mutation autonomously.

### The Python Ecosystem Advantage
Python continues to dominate this domain due to its native integration with LLM orchestration frameworks. By exposing structured tools to AI agents via Flask backends, we allow system components to dynamically negotiate workflows. The API of tomorrow isn't just a list of JSON schemas—it's an active conversation between intelligent microservices.`
  },
  {
    id: "15",
    title: "Building Offline-First Mobile Apps: Native Kotlin vs. Hybrid PWAs",
    category: "Mobile Development",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-10-14",
    tags: ["Android Studio", "Kotlin", "PWA", "Offline First"],
    summary: "When connectivity drops in the field, your software cannot fail. A technical comparison between native Android storage engines and browser service workers.",
    content: `Field technicians, sales representatives, and logistics managers frequently operate in poor signal zones. If an app requires a continuous internet connection to function, it is unreliable in commercial environments.

### Native Room DB vs. IndexedDB
When architecting native apps in Kotlin, Android's **Room persistence library** allows local SQLite databases to act as the single source of truth. The UI observes the local database, and background workers silently attempt network syncs when signal returns.

In hybrid PWAs, **IndexedDB** managed via Service Workers provides a similar experience in the browser. 

### Which Should You Choose?
If your platform requires precise background hardware access—such as low-power Bluetooth sync, background location tracking, or direct camera hardware acceleration—native Kotlin is non-negotiable. For content-heavy catalogs and lightweight portals, an offline-first PWA offers faster deployment cycles.`
  },
  {
    id: "16",
    title: "Zero-Trust Web Security: Lessons Learned from Cisco Network Architectures",
    category: "Cyber Security",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-09-30",
    tags: ["Security", "Cisco", "Zero Trust", "Backend"],
    summary: "Never trust, always verify. Applying network-level access control lists and perimeter isolation to modern full-stack web applications.",
    content: `In traditional network administration, security focused on perimeter defense: build a strong firewall around the internal network, and trust everything inside. Modern cyber security has completely discarded this model in favor of **Zero-Trust Architecture**.

### Applying Network Control to Web Apps
Web applications must adopt the exact same principles used in Cisco network design:
• **Principle of Least Privilege:** JWT tokens and session cookies should grant access only to granular endpoints required for the current action.
• **Perimeter Isolation:** Microservices should never expose database connections directly to client-facing web servers.
• **Continuous Verification:** Re-authenticating sensitive operations (like updating billing data or altering system access) rather than relying solely on an active browser session.

Treating every request—even those originating from internal microservices—as untrusted guarantees your system remains resilient against unauthorized access.`
  },
  {
    id: "17",
    title: "Optimizing Flask Backends for High-Frequency Automated Quotations",
    category: "Backend Engineering",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-09-12",
    tags: ["Python", "Flask", "Backend", "Performance"],
    summary: "Generating PDF documents and complex pricing matrices dynamically can quickly lock up server threads. Here is how to keep Flask backends asynchronous and blazing fast.",
    content: `Dynamic PDF generation and real-time quotation calculation are surprisingly resource-intensive tasks. If handled synchronously inside a standard HTTP request cycle, a few concurrent requests can easily exhaust your WSGI worker threads.

### Asynchronous Queue Pipelines
When building quotation systems in Flask, intensive generation tasks must be offloaded to asynchronous task queues (such as Celery or RQ) backed by Redis.

1. **Client Request:** The user clicks "Generate Quotation".
2. **Immediate Response:** Flask instantly returns a job tracking ID.
3. **Background Worker:** A worker process calculates hardware pricing matrices, formats the document, and uploads it to storage.
4. **Real-time Notify:** WebSockets push the completed download link to the user interface.

This architecture ensures your primary API remains lightning fast, regardless of heavy document processing loads.`
  },
  {
    id: "18",
    title: "The Psychology of Micro-Interactions: Why Small Animations Drive Conversions",
    category: "UI/UX Design",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-08-25",
    tags: ["UI/UX", "Framer Motion", "Design", "Productivity"],
    summary: "Subtle feedback loops—like text scrambling, border glows, and tactile button presses—reassure users and dramatically lower bounce rates.",
    content: `Great interface design isn't about flashy graphics; it's about clear feedback loops. When a user interacts with a digital element, they expect instant tactile confirmation that their action was registered.

### The Physics of Digital Tactility
Using spring physics rather than linear CSS transitions makes digital interfaces feel natural. A linear transition feels synthetic; a spring-loaded button press mimicking momentum feels real.

Micro-interactions serve key psychological purposes:
• **State Confirmation:** A subtle scramble or glow tells the user the system is processing.
• **Spatial Orientation:** Smooth page transitions prevent cognitive disorientation when routing across views.
• **Reward Loops:** Engaging hover animations encourage exploration and keep visitors on page longer.

When implemented with restraint, micro-interactions turn a standard utility website into a memorable digital experience.`
  },
  {
    id: "19",
    title: "Building Real-Time Multi-Tenant E-Commerce Engines in React",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-08-10",
    tags: ["React", "E-Commerce", "Multi-Tenant", "UI/UX"],
    summary: "How to structure scalable product databases, client-side cart states, and seamless checkout integrations for growing retail merchants.",
    content: `E-commerce development is often underestimated. Beyond rendering a list of items, a production-grade store must handle concurrent inventory reservation, complex variant logic, dynamic shipping calculations, and instant search filtering.

### Modular Architecture
When engineering platforms like **Spicera.store**, isolating concerns is essential:
• **Cart Context:** An optimistic, client-side store that persists local items across sessions.
• **Product Indexing:** Fast filtering using Memoized selectors to eliminate UI stutters when searching large catalogs.
• **Payment Gateways:** Secure PCI-compliant Stripe mounts that handle card validation client-side before communicating with the server.

Building with a modular architecture allows merchants to easily scale from a few dozen specialized products to thousands without requiring a complete system rebuild.`
  },
  {
    id: "20",
    title: "Dark Mode Engineering: Managing CSS Variables and Theme Flickers",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-07-29",
    tags: ["CSS", "React", "Dark Mode", "Performance"],
    summary: "Eliminating the dreaded 'white flash' on page reload and architecting dynamic CSS color tokens for seamless theme customization.",
    content: `Implementing dark mode looks easy on the surface, but doing it correctly without flash-of-unstyled-content (FOUC) or sluggish CSS overrides requires careful planning.

### CSS Custom Properties Over Theme Classes
Instead of hardcoding color hex codes across hundreds of Tailwind or CSS classes, establish dynamic RGB CSS variables:

\`\`\`css
:root {
  --theme-main: #00f0ff;
  --theme-rgb: 0, 240, 255;
}
\`\`\`

By storing both hex and RGB values as custom properties, you can effortlessly apply opacity overlays in Framer Motion spotlights and dynamic borders without writing separate styling logic for every element.

### Preventing Theme Flickers
To stop dark-themed sites from flashing bright white on page load, read local storage preference via a blocking inline script in your \`index.html\` *before* the main React bundle executes.`
  },
  {
    id: "21",
    title: "The Developer's Guide to Automation: Turning Workflows into Products",
    category: "Productivity & SaaS",
    coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-07-14",
    tags: ["Automation", "SaaS", "Productivity", "Notion"],
    summary: "Every internal tool or automation script you write to solve your own problem is a potential commercial digital asset waiting to be packaged.",
    content: `Developers automate things by nature. We write bash scripts to deploy code, build Notion databases to track our tasks, and train AI workflows to speed up branding. 

What many developers overlook is that the broader market actively pays for these exact solutions.

### The Productization Pipeline
1. **Solve Your Own Problem:** Build a custom tracking system or automated workflow for your own daily operations.
2. **Refine and Document:** Abstract the business logic so anyone can use it without technical support.
3. **Package and Distribute:** List the asset on Gumroad, Adobe Stock, or as a template product.

By treating your internal developer scripts and templates as commercial assets, you create digital assets that generate ongoing revenue long after the initial code is written.`
  },
  {
    id: "22",
    title: "From Code to Leadership: Lessons Learned Heading a Youth Organization",
    category: "Leadership & Growth",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-07-01",
    tags: ["Leadership", "Community", "Soft Skills", "Growth"],
    summary: "How serving as President of a youth association taught me communication, delegation, and project management skills that made me a better Systems Architect.",
    content: `Writing code is clean. Logic either works or it throws an error. Leading people, on the other hand, is complex, subjective, and unpredictable.

Serving as President of a local youth association completely transformed my approach to software engineering.

### Project Management in the Real World
Managing multi-phase community projects taught me how to break massive initiatives into deliverable milestones—a skill that directly translates to planning full-stack software architectures.

### Clear Technical Communication
If you cannot explain complex technical decisions to non-technical stakeholders, clients, or team members, even the most brilliant code will fail to get deployed. Leadership forces you to strip away technical jargon and focus on value, objectives, and practical outcomes.`
  },
  {
    id: "23",
    title: "The Serverless Illusion: Why I Moved Back to Long-Lived Containers",
    category: "Cloud Architecture",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "12 min read",
    date: "2025-06-18",
    tags: ["DevOps", "Serverless", "AWS", "Backend", "Docker"],
    summary: "Serverless functions are marketed as the holy grail of infinite scaling. But for complex, data-heavy enterprise applications, they introduce devastating latency, database connection exhaustion, and architectural nightmares.",
    content: `For the past five years, the development industry has been completely obsessed with the "Serverless" paradigm. The promise was intoxicating: deploy your code, let the cloud provider handle the infrastructure, pay only for the exact milliseconds your code executes, and watch your application scale infinitely. 

When I first began architecting scalable web applications, I bought into this hype. I broke monolithic APIs down into dozens of micro-functions deployed via AWS Lambda and Vercel Edge Functions. But as I started building highly complex platforms with intense data-sync requirements—like the real-time tracking engines behind FrostLink Sales—the cracks in the serverless foundation became impossible to ignore.

### The Cold Start Phenomenon
The first major architectural hurdle is the infamous "cold start." When a serverless function is not invoked for a certain period, the cloud provider spins down the container to save resources. When a new request comes in, the provider must provision a new container, load the runtime environment (like Node.js or Python), pull in your dependencies, and execute your code.

In a traditional long-lived server, this environment is always hot. A request hits the server and is processed in 20-50 milliseconds. In a serverless architecture, a cold start can introduce a latency spike of anywhere from 800 milliseconds to over 3 seconds. 

If you are building an e-commerce platform like Spicera.store, a 3-second delay on the checkout API endpoint is a conversion killer. Users are conditioned to expect instantaneous tactile feedback. While you can implement "provisioned concurrency" to keep functions warm, you are essentially paying for a permanent server anyway, entirely defeating the cost-saving purpose of the serverless model.

### Database Connection Exhaustion
This is the silent killer of serverless applications, and it stems from a fundamental misunderstanding of network layer protocols. 

When you write a traditional Python Flask backend or a Node.js Express server, you open a connection pool to your PostgreSQL database. Let's say you allow 20 concurrent connections. The server boots up, establishes the TCP handshakes with the database, and keeps those 20 connections open. When 1,000 users hit your API, the server efficiently multiplexes those 1,000 requests through the 20 open connections.

Serverless completely destroys this paradigm. 

Because serverless functions are ephemeral (short-lived) and isolated, they cannot share a connection pool. If 1,000 users hit your serverless API simultaneously, the cloud provider spins up 1,000 isolated containers. Each container attempts to open a brand new TCP connection to your PostgreSQL database. 

Databases are not designed to handle thousands of rapid-fire connection handshakes. The database CPU spikes to 100% just managing the network overhead, legitimate queries are dropped, and your entire application crashes under the weight of its own infrastructure. 

While tools like PgBouncer or serverless database proxies attempt to mitigate this, they are ultimately band-aids over a fundamentally flawed architectural pairing. You are forcing a stateless computing model to interact with a highly stateful data persistence layer.

### The Network Routing Reality
My background in Cisco networking heavily influences how I view cloud infrastructure. In the physical networking world, establishing a connection requires a three-way TCP handshake (SYN, SYN-ACK, ACK). This physical reality doesn't disappear just because we call it "the cloud."

Every time a serverless function boots up and connects to a managed database, packets are traversing physical routers, switches, and fiber-optic cables. By relying on long-lived Docker containers, we maintain persistent network tunnels. The three-way handshake happens once upon deployment, not ten thousand times an hour. 

### The Hybrid Architecture Approach
I am not entirely anti-serverless. The technology is brilliant for specific, isolated workflows. If you need an event-driven function to resize an image after a user uploads it to an S3 bucket, serverless is the perfect tool.

However, for the core business logic, the primary API gateway, and the heavy database transactions, I have transitioned back to containerized architectures using Docker and Kubernetes. By deploying persistent containers, we maintain total control over our connection pools, eliminate cold starts entirely, and establish a predictable, flat-rate financial model.

As I continue to build out the KWAS (Key Web App Solutions) ecosystem, the architecture relies on a hybrid model: edge-cached static assets and lightweight middleware for immediate user delivery, backed by highly robust, long-lived backend containers for the heavy lifting.`
  },
  {
    id: "24",
    title: "Engineering Data Consistency Across Distributed E-Commerce Systems",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "11 min read",
    date: "2025-05-22",
    tags: ["E-Commerce", "Databases", "System Design", "Architecture"],
    summary: "When thousands of users attempt to purchase the same inventory simultaneously, simple database queries result in overselling and catastrophic data failure. Here is how to architect true distributed consistency.",
    content: `Building a localized, single-user application is easy. You read data, you mutate it, and you write it back. But when you step into the world of multi-tenant enterprise software or high-traffic digital commerce, that simplistic approach leads to catastrophic data corruption.

When I was designing the backend architecture for high-conversion platforms, the most complex engineering challenge wasn't the UI or the payment gateway—it was managing state and data consistency across distributed systems under load.

### The Fallacy of the Single Source of Truth
In academic computer science, we are taught to maintain a single source of truth—usually a normalized relational database. The theory is that if all microservices query the exact same database table, the data will always be accurate.

In the real world, physics gets in the way. 

Let's look at a practical scenario: a flash sale on an e-commerce platform. You have exactly 5 units of a specific product left in stock. Suddenly, 500 users click the "Checkout" button at the exact same millisecond. 

If your backend is a simple CRUD API, here is what happens:
1. 500 API threads query the database: "How many units are in stock?"
2. The database responds to all 500 threads simultaneously: "There are 5 units left."
3. All 500 threads process the logic: "5 is greater than 1, so proceed with the sale."
4. All 500 threads deduct 1 from the inventory and charge the customers.

You have just sold 500 items when you only had 5 in stock. You now have 495 angry customers who need refunds, and your inventory count is a negative integer. This is known as a Race Condition, and it destroys poorly architected platforms.

### Row-Level Locking and Transactions
To solve this, junior developers often turn to standard database transactions. They wrap the inventory check and the inventory deduction in a single SQL transaction. While this guarantees accuracy, it introduces a severe performance bottleneck.

If you lock the inventory row while a transaction processes, the other 499 requests are forced to wait in a queue. If the payment gateway takes 3 seconds to process the credit card for the first user, the 500th user will have to wait 25 minutes just to get a response from the server. The database connection pool will exhaust, and the server will crash.

### The Saga Pattern and Eventual Consistency
To build a system that is both accurate AND highly performant, we must abandon the idea of immediate, synchronous consistency and embrace Eventual Consistency using the Saga Pattern.

Instead of locking the database while waiting for Stripe to process a credit card, the architecture works like this:
1. When a user clicks checkout, a lightweight, lightning-fast Redis cache handles the inventory reservation. Redis is single-threaded and operates in memory, meaning it can process thousands of atomic decrements per second without race conditions.
2. The system generates an "Order Pending" event and places it into a message queue (like RabbitMQ or Apache Kafka).
3. The API immediately returns a success response to the user's browser, keeping the UI fast and responsive.
4. In the background, worker microservices pick up the event from the queue. They process the Stripe payment and finalize the database write asynchronously.

If the payment fails, a compensating transaction is fired to release the inventory reservation back into the Redis cache.

### Network Partitions and Idempotency
Because we are passing data between mobile applications, backend APIs, payment gateways, and message queues, we have to assume that the network will fail. A packet will drop. A webhook will misfire. 

This requires the implementation of Idempotency Keys. 

When the FrostLink Sales Android app sends a daily sales analytics packet to the backend, it includes a unique UUID generated on the mobile device. If the mobile app loses cell service halfway through the transmission, it doesn't know if the server received the data. When the signal returns, the app sends the exact same packet again.

Because the backend is architected to be idempotent, it checks the UUID. If it has already processed that specific key, it safely ignores the duplicate request without corrupting the sales analytics data. 

Engineering systems at this level requires you to stop trusting your code, stop trusting the network, and design architectures that are inherently resilient to failure.`
  },
  {
    id: "25",
    title: "Advanced Component Architecture: Inversion of Control in React Applications",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    readTime: "10 min read",
    date: "2025-04-10",
    tags: ["React", "Architecture", "JavaScript", "Design Patterns"],
    summary: "As React applications scale, standard prop-drilling and context APIs become unmaintainable. Discover how to apply enterprise-grade design patterns like Dependency Injection to modern frontend development.",
    content: `The React ecosystem is brilliant for rapid prototyping, but it gives developers enough rope to hang themselves. Because React is unopinionated about how you structure your code, it is incredibly easy to build a massive, tangled web of components that are impossible to test, maintain, or scale.

When I audit legacy codebases, the most common anti-pattern I see is the tight coupling of UI presentation and business logic. A single React component will fetch data from an API, parse the JSON, handle loading states, manage error boundaries, and render the HTML. 

This violates the Single Responsibility Principle and makes the component entirely untestable in isolation.

### The Pitfalls of Standard Prop Drilling
As applications grow, developers typically handle state by lifting it to a high-level parent component and passing it down through props. When a component is nested five layers deep, you end up passing props through four intermediate components that don't actually care about the data. 

The community's response to this was the Context API and global state managers like Redux. While these solve the prop-drilling issue, they introduce a new problem: your components are now permanently tethered to a global state structure. You cannot pick up a dashboard widget and drop it into another project, because it relies on a highly specific Redux store to function.

### Applying Inversion of Control (IoC)
In strictly typed, object-oriented languages like Java or C#, enterprise developers rely heavily on Inversion of Control and Dependency Injection. We can—and should—adapt these patterns for modern functional React.

Instead of a component importing an API service directly, we inject the service into the component. 

Consider a component designed to display a list of air conditioning units for the Flux Service platform. 

Instead of writing this inside the component:
    import { fetchACUnits } from './api/services';
    const units = fetchACUnits();

We architect the component to accept a data-fetching strategy as a prop or through a highly localized context provider. 

By passing the behavior *into* the component rather than hardcoding it, we decouple the UI from the network layer. This allows us to instantly swap out a live PostgreSQL API call for a mock data service during testing, without altering a single line of the component's internal code.

### The Strategy Pattern in UI Engineering
This architectural concept shines when dealing with complex, multi-tenant systems. 

Imagine building a dynamic data table for the KWAS ecosystem that needs to display different columns depending on whether the user is viewing Sales Analytics or Hardware Inventory.

Instead of writing massive, unreadable \`if/else\` statements inside the JSX renderer, we use the Strategy Pattern. We define discrete "Configuration Objects" outside of the component lifecycle. The React component simply takes in the raw data and the configuration strategy, and maps over the data based on the provided ruleset. 

### Render Optimization
By completely abstracting business logic and data fetching out of the visual components, we drastically reduce unnecessary re-renders. 

When a React component only receives primitive data types (strings, numbers, booleans) and purely deterministic functions, we can safely wrap it in \`React.memo\`. The React reconciliation engine can instantly compare the previous props with the new props, realize nothing has changed on the visual layer, and skip the render cycle entirely.

Frontend development is no longer just "HTML and CSS." It is complex software engineering that requires the exact same structural discipline and design patterns as enterprise backend architecture.`
  },
  {
    id: "26",
    title: "Next.js vs. Vite + React in 2026: When to Drop SSR for SPA",
    category: "Frontend Architecture",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2025-03-15",
    tags: ["React", "Next.js", "Vite", "Performance"],
    summary: "Server-Side Rendering (SSR) has dominated the React ecosystem for years. But for highly interactive enterprise dashboards and internal tools, returning to a blazing-fast Vite Single Page Application (SPA) is often the superior architectural choice.",
    content: `For the last few years, the React ecosystem has aggressively pushed developers toward Server-Side Rendering (SSR) frameworks like Next.js. The marketing promises perfect SEO, zero-layout-shift, and faster initial page loads. 

While Next.js is an absolute powerhouse for public-facing e-commerce sites and blogs, it introduces a massive layer of backend complexity that is often entirely unnecessary for authenticated web applications.

### The Cost of Server-Side Rendering
When you build a dashboard in Next.js using the App Router, your server must execute React code for every single incoming request before it can send HTML to the browser. This requires active compute resources. If you are building an internal CRM, a SaaS dashboard, or a B2B tracking tool like **Flux Service**, your users are already authenticated. SEO does not matter behind a login screen.

Furthermore, managing state across server components and client boundaries introduces severe hydration complexities. You spend more time debugging "Context cannot be used in Server Components" errors than actually building business logic.

### The Vite + SPA Renaissance
This is why I frequently architect closed-system enterprise platforms using **Vite + React**. 
Vite compiles your entire application into a highly optimized, static bundle of HTML, CSS, and JavaScript. 

Once compiled, this bundle can be hosted on incredibly cheap, lightning-fast edge CDNs (like Cloudflare Pages or AWS CloudFront) without requiring a running Node.js server. 
1. The user downloads the JavaScript bundle once.
2. The browser takes over all routing via React Router instantly.
3. The application communicates directly with a separate Python or Node backend purely via JSON APIs.

By decoupling the frontend visual layer from the backend data layer, you achieve a cleaner architecture, cheaper hosting, and instantaneous route transitions that feel like a native desktop application.`
  },
  {
    id: "27",
    title: "Case Study: How Stripe Architected a $1.9 Trillion Payment Engine",
    category: "FinTech & Systems",
    coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop",
    readTime: "10 min read",
    date: "2025-02-28",
    tags: ["Stripe", "FinTech", "Architecture", "API", "Case Study"],
    summary: "An architectural breakdown of how Stripe's API maintains 99.9999% uptime and processes hundreds of millions of requests a day without dropping a single financial transaction.",
    content: `When examining financial infrastructure, the scale of operations is difficult to comprehend. In 2025, Stripe processed a staggering $1.9 trillion in total payment volume, equivalent to roughly 1.6% of the global GDP, marking a 34% year-over-year increase. This relentless scaling pushed their valuation to an all-time high of $159 billion following a February 2026 tender offer. 

Processing this kind of volume requires an architecture where failure is literally not an option.

### The Power of Idempotency
In distributed systems, networks drop packets constantly. If a mobile app sends a "charge customer $50" request to a backend, and the cell signal drops before the server can reply, the app doesn't know if the charge succeeded. If it retries, it might accidentally double-charge the customer.

Stripe solved this beautifully by pioneering **Idempotent APIs**. 
Every API request sent to Stripe includes a unique \`Idempotency-Key\` in the header. When Stripe's servers receive a request, they check a lightning-fast Redis cluster for that specific key. 
• If the key doesn't exist, they process the payment and save the result.
• If the key *does* exist, they skip the payment processing entirely and simply return the exact same cached response from the first attempt.

This allows developers to safely retry failed network requests infinitely without ever risking a double-charge.

### Database Sharding and Horizontal Scale
To maintain 99.9999% uptime during massive traffic spikes (like Black Friday), Stripe cannot rely on a single massive database. They utilize intense database sharding—splitting customer data across hundreds of independent database clusters. If one cluster experiences hardware failure, only a tiny fraction of requests are delayed while traffic is rerouted, leaving the rest of the global economy entirely unaffected.`
  },
  {
    id: "28",
    title: "Case Study: Cloudflare vs. The 31.4 Tbps DDoS Attack",
    category: "Cyber Security",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2025-01-14",
    tags: ["Cloudflare", "Security", "Networking", "Case Study"],
    summary: "How do you keep a server online when millions of infected IoT devices fire 30+ Terabits of junk data at it every second? Exploring Anycast routing and edge-level packet dropping.",
    content: `Distributed Denial of Service (DDoS) attacks are brute-force network warfare. An attacker commands a botnet (millions of hacked smart TVs, routers, and IoT devices) to send garbage HTTP requests to a target server simultaneously, exhausting its bandwidth and crashing the system.

In the final quarter of 2025, Cloudflare's network absorbed and mitigated a record-setting DDoS attack peaking at a mind-bending 31.4 Tbps (Terabits per second). 

### The Anycast Architecture
If 31.4 Tbps of traffic hits a traditional data center, the physical fiber optic cables will literally reach their light-pulse capacity, and the routers will melt down. Cloudflare survives this by utilizing an **Anycast Network**.

In a standard Unicast network, one IP address points to one physical server. In an Anycast network, one IP address points to hundreds of data centers scattered across the globe simultaneously. 

When the 31.4 Tbps botnet attacked, the traffic didn't funnel into a single location. The Border Gateway Protocol (BGP) automatically routed the malicious packets from the infected devices to whichever Cloudflare data center was geographically closest to them.

### Dropping Packets at the Edge
By distributing the massive flood of data across hundreds of global facilities, the attack was diluted. Within each data center, highly optimized Linux kernels utilized **eBPF (Extended Berkeley Packet Filter)**. 

Instead of passing the malicious HTTP requests up to the application layer to be analyzed, eBPF allows Cloudflare to inspect the packets directly inside the operating system's network card drivers. Identifying the junk signatures, the servers silently dropped the malicious packets in microseconds before they could consume any CPU resources. 

Understanding how to protect applications at the infrastructure edge is just as critical as writing secure backend logic.`
  },
  {
    id: "29",
    title: "PostgreSQL vs. MongoDB: The Polyglot Persistence Myth",
    category: "Database Engineering",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop",
    readTime: "11 min read",
    date: "2024-12-05",
    tags: ["Databases", "PostgreSQL", "MongoDB", "SQL vs NoSQL"],
    summary: "For years, NoSQL databases were touted as the ultimate solution for schema flexibility. But modern PostgreSQL has effectively destroyed the primary arguments for choosing MongoDB in standard web applications.",
    content: `When architecting a new application, developers face an immediate crossroad: SQL (Relational) or NoSQL (Document-based). Ten years ago, if you had a highly dynamic data structure where fields changed constantly, MongoDB was the undeniable choice. 

Today, that architectural advice is largely obsolete.

### The Rise of JSONB in PostgreSQL
The primary argument for MongoDB is schema flexibility. You can throw a JSON object with any arbitrary fields into a collection, and it just works. 

However, PostgreSQL completely neutralized this advantage with the introduction of the \`JSONB\` data type. \`JSONB\` allows you to store highly nested, dynamic JSON objects directly inside a relational column. More importantly, PostgreSQL indexes this JSON data, allowing you to run lightning-fast queries against deeply nested keys as if they were standard relational columns.

### ACID Compliance and Data Integrity
When building multi-tenant SaaS platforms or e-commerce engines like Spicera.store, data integrity is paramount. If an order is placed, the inventory must be deducted, and the user's payment record must be updated. This requires **ACID (Atomicity, Consistency, Isolation, Durability)** transactions. 

While MongoDB has retrofitted transaction support into its engine, PostgreSQL was built from the ground up for strict relational integrity. Foreign keys, constraints, and cascading deletes prevent orphaned data and silent database corruption.

### When NoSQL Actually Makes Sense
This doesn't mean MongoDB is useless. NoSQL databases shine in highly specific edge cases:
• Massive IoT telemetry ingestion where write-speed is prioritized over relational integrity.
• Real-time chat logs and gaming state dumps.

But for 95% of enterprise software, starting with PostgreSQL provides you with the rigid structure needed for financial/user data, alongside the exact same dynamic JSON flexibility offered by NoSQL. It is the ultimate hybrid engine.`
  },
  {
    id: "30",
    title: "Case Study: Netflix's Open Connect and Global Edge Caching",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-11-12",
    tags: ["Netflix", "CDN", "Networking", "Architecture", "Case Study"],
    summary: "How Netflix avoids clogging the global internet by installing custom-built FreeBSD hardware directly inside your local Internet Service Provider's facilities.",
    content: `When millions of people press play on a 4K movie at 8:00 PM on a Friday night, the resulting bandwidth requirement is astronomical. If Netflix streamed every movie from a centralized AWS server in Virginia, the entire internet backbone would collapse under the load.

To solve this, Netflix bypassed traditional cloud infrastructure and built **Open Connect**—their own proprietary global Content Delivery Network (CDN).

### Hardware Inside the ISP
Instead of making users fetch video files across the ocean, Netflix builds physical server appliances running highly optimized FreeBSD operating systems. They literally ship these red metal boxes for free to Internet Service Providers (ISPs) around the world (like Comcast, AT&T, and local telecom hubs).

When you press play on "Stranger Things," you aren't streaming it from California. You are streaming it from a Netflix box sitting in a server rack less than 10 miles from your house. 

### Predictive Edge Caching
How do the local boxes know what movies to hold? During the middle of the night, when internet traffic is at its lowest, Netflix’s central AWS servers push terabytes of data to these edge appliances. 

They use AI viewing analytics to predict exactly what shows will be popular in your specific city the next day, and proactively load those exact video files onto the physical hard drives of the local ISP appliance. 

This architectural mastery proves that for true global scale, you cannot rely purely on software. You must control the physical network hardware.`
  },
  {
    id: "31",
    title: "Tailwind CSS vs. Styled Components: The Performance Breakdown",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    date: "2024-10-05",
    tags: ["CSS", "Tailwind", "React", "Performance"],
    summary: "A deep dive into why enterprise React teams are abandoning runtime CSS-in-JS solutions like Styled Components in favor of utility-first CSS frameworks like Tailwind.",
    content: `In the early days of React, CSS-in-JS libraries like Styled Components were revolutionary. They solved global namespace collisions and allowed developers to pass JavaScript variables directly into CSS logic. 

However, as applications scaled, a massive performance bottleneck emerged: **Runtime CSS Parsing**.

### The Cost of CSS-in-JS
When you use a library like Styled Components, the CSS doesn't actually exist when the browser downloads the HTML. Instead, the browser has to download your massive JavaScript bundle, parse the React components, execute the CSS-in-JS engine, generate unique class names on the fly, and inject them into a \`<style>\` tag in the document head.

This entire process blocks the main thread. On lower-end Android devices, evaluating this CSS logic causes severe UI stuttering and massive delays in the First Contentful Paint (FCP).

### The Tailwind Architecture
Tailwind CSS approaches styling from the exact opposite direction. It is a build-time tool.

When you run your build process, Tailwind scans your React components for utility classes (e.g., \`flex\`, \`bg-blue-500\`, \`pt-4\`). It generates a static, highly minified CSS file containing *only* the classes you actually used. 

When the user loads the page, the browser downloads a standard \`.css\` file. The rendering engine parses it instantly in parallel with the HTML, requiring zero JavaScript execution. 

Furthermore, because Tailwind uses a finite set of utility classes, your CSS bundle size plateaus. Whether you build a 5-page site or a 500-page enterprise dashboard, your final CSS file rarely exceeds 10kb. This architectural shift from runtime execution to build-time compilation is the key to maintaining 60fps web applications.`
  },
  {
    id: "32",
    title: "Case Study: Uber's Shift from Microservices to Macroservices (DOMA)",
    category: "Backend Engineering",
    coverImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-09-18",
    tags: ["Uber", "Microservices", "Architecture", "Case Study"],
    summary: "Uber famously broke their monolithic backend into over 4,000 microservices. It resulted in a debugging nightmare. Here is how they fixed it by inventing the Domain-Oriented Microservice Architecture (DOMA).",
    content: `In 2015, the tech industry declared that Monolithic architectures were dead, and Microservices were the future. Uber embraced this aggressively, breaking their backend into over 4,000 independent microservices. 

The theory was that small, isolated teams could deploy code faster. The reality was architectural chaos.

### The Microservice Dependency Web
When a user requested a ride, the network call had to traverse through 50 different microservices before returning a response. If a failure occurred, tracing the bug through 50 independent codebases maintained by 50 different teams was nearly impossible. 

Furthermore, network latency compounded. If each microservice took 10 milliseconds to respond, hopping through 50 of them added a half-second of pure architectural latency to every single user action.

### The Invention of DOMA
Uber realized they had swung the pendulum too far. To fix this, they introduced **Domain-Oriented Microservice Architecture (DOMA)**.

Instead of thousands of tiny services communicating with each other chaotically, they grouped related services into "Domains" (e.g., the Driver Domain, the Payments Domain, the Routing Domain). 
Crucially, they placed a strict API Gateway in front of every Domain. 

Microservices *inside* the Payments Domain could talk to each other freely. But if the Routing Domain needed billing info, it was strictly forbidden from talking to individual payment microservices. It had to request data through the Payment Domain's single, unified Gateway API.

This approach—often called "Macroservices" or "Moduliths"—restored order. It drastically reduced cross-network chatter, simplified debugging, and proved that hyper-fragmentation is just as dangerous as monolithic bloat.`
  },
  {
    id: "33",
    title: "REST vs. GraphQL vs. gRPC: Selecting the Right API Protocol",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "10 min read",
    date: "2024-08-22",
    tags: ["API", "REST", "GraphQL", "gRPC", "Backend"],
    summary: "Modern web architecture requires picking the perfect communication protocol for the job. Understanding when to use REST for caching, GraphQL for mobile data, and gRPC for microservice speed.",
    content: `For a decade, REST (Representational State Transfer) was the undisputed king of web APIs. Today, Systems Architects must choose between REST, GraphQL, and gRPC based on strict performance requirements. 

Here is the architectural breakdown of when to use each protocol.

### 1. REST: The Undisputed King of Caching
REST APIs send data over standard HTTP protocols. Their greatest advantage is infrastructural compatibility. Because REST uses standard HTTP GET requests, responses can be easily cached by edge CDNs like Cloudflare or browser service workers. 

If you are building a public-facing blog, an e-commerce product catalog, or any system where the data is read far more often than it is mutated, REST remains the gold standard.

### 2. GraphQL: The Mobile Optimization Engine
REST suffers from "Over-fetching." If a mobile app needs a user's name, it calls the \`/users/1\` endpoint, which might return 50 fields of data (address, billing history, preferences). Sending 49 unused fields drains mobile data and battery life.

GraphQL solves this by flipping the control structure. The client sends a specific query asking *only* for the name. The server aggregates the data and returns exactly what was requested, no more, no less. It is the optimal choice for mobile applications and complex frontend dashboards where bandwidth is at a premium.

### 3. gRPC: The Microservice Speed Demon
Both REST and GraphQL send data as plain text (JSON). Parsing massive JSON strings is highly CPU intensive. 

Developed by Google, gRPC transmits data as binary using Protocol Buffers (Protobufs) over HTTP/2. Because the data is already binary, serialization and deserialization happen in microseconds. 

While gRPC is difficult to implement directly in web browsers, it is the absolute undisputed champion for backend Server-to-Server communication. If you have a Python analytics engine that needs to stream millions of rows of data to a Node.js billing service, gRPC is the only protocol fast enough to handle the throughput without melting your CPUs.`
  },
  {
    id: "34",
    title: "Case Study: Figma's C++ and WebAssembly Browser Engine",
    category: "Software Ecosystem",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-07-10",
    tags: ["Figma", "WebAssembly", "C++", "Case Study", "Performance"],
    summary: "How Figma achieved 60fps vector graphics rendering in the browser by completely abandoning the HTML DOM and writing their rendering engine in C++.",
    content: `Before Figma, professional design software (like Adobe Illustrator or Sketch) was strictly confined to heavy, native desktop applications. The browser was considered far too slow and resource-constrained to handle complex vector math and real-time multiplayer rendering.

Figma didn't just build a web app; they bypassed the traditional web entirely.

### Escaping the DOM
Standard web applications use HTML and CSS, which the browser translates into the Document Object Model (DOM). If you try to render 10,000 vector shapes using standard HTML \`<div>\` or \`<svg>\` tags, the browser's layout engine will crash completely. 

Figma realized they couldn't use the DOM. Instead, they placed a single, massive \`<canvas>\` element on the screen and used **WebGL** (Web Graphics Library) to communicate directly with the computer's physical GPU. 

### WebAssembly (Wasm)
To calculate the complex physics and vector math required to draw the UI at 60 frames per second, standard JavaScript was too slow and its garbage collection caused random frame drops.

Figma's engineering team wrote the core rendering engine in **C++** (a low-level, highly performant systems language). They then compiled that C++ code into **WebAssembly (Wasm)**. WebAssembly allows pre-compiled binary code to run securely inside the browser at near-native speeds. 

When you drag a rectangle across the screen in Figma, you aren't running JavaScript. You are running C++ code, executing in a WebAssembly sandbox, sending pixels directly to your GPU via WebGL. It is a masterclass in pushing web architecture to its absolute physical limits.`
  },
  {
    id: "35",
    title: "System Design: Redis vs. RabbitMQ for Async Event-Driven Architecture",
    category: "Backend Engineering",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-06-25",
    tags: ["Redis", "RabbitMQ", "Architecture", "Backend", "System Design"],
    summary: "Message brokers are the backbone of distributed systems. Understanding the architectural differences between Redis Pub/Sub and RabbitMQ's persistent queues is critical for preventing data loss.",
    content: `When transitioning an application from a synchronous monolith to an asynchronous, event-driven architecture, you need a way for your services to talk to each other in the background. The two most common tools for this are **Redis** and **RabbitMQ**. 

Choosing the wrong one can result in silent, catastrophic data loss.

### Redis: In-Memory Speed and Pub/Sub
Redis is an in-memory data structure store. It is blindingly fast. When used as a message broker (via its Pub/Sub feature), it broadcasts messages to any service currently listening.

**The Danger:** Redis Pub/Sub operates on a "fire and forget" model. If Service A broadcasts an "Invoice Generated" event, but Service B (the email sender) happens to be restarting or crashing at that exact millisecond, the event is gone forever. Redis does not store the message if the receiver isn't actively listening. 

**Use Case:** Redis is perfect for ephemeral data where loss is acceptable. Real-time chat apps, live sports score updates, and multiplayer game positions are perfect for Redis. If a packet drops, the next one will overwrite it a second later anyway.

### RabbitMQ: Guaranteed Delivery
RabbitMQ is a traditional message broker built for reliability. When Service A fires an event, RabbitMQ catches it and writes it to a persistent, on-disk queue. 

**The Safety Net:** If Service B is completely offline, RabbitMQ safely holds the message in the queue. It will sit there for hours or days if necessary. Once Service B boots back up, it will pull the message from the queue and process the invoice. Furthermore, RabbitMQ requires an "Acknowledgment" (ACK) from Service B. If Service B crashes halfway through sending the email, RabbitMQ realizes the ACK was never sent, and places the message back in the queue to be retried.

**Use Case:** RabbitMQ (or Apache Kafka for extreme scale) is mandatory for financial transactions, user registrations, and billing events. 

In enterprise architecture, speed is irrelevant if the data is lost. Designing robust systems requires balancing the blistering speed of Redis caches with the unbreakable persistence of RabbitMQ queues.`
  },
   {
    id: "36",
    title: "Microservices vs. Monolith: Choosing the Right Architecture in 2025",
    category: "System Design",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-07-02",
    tags: ["Microservices", "Monolith", "System Design", "Architecture", "Scalability"],
    summary: "Every growing engineering team eventually debates splitting the monolith. Here's an honest, practical breakdown of when microservices actually solve problems — and when they just create new ones.",
    content: `Every engineering team hits the same fork in the road eventually: "Should we break this monolith into microservices?" The internet is full of confident answers on both sides, but the real decision depends entirely on your team size, deployment maturity, and where your actual bottlenecks are.

### The Monolith: Simplicity at Scale
A monolith is a single deployable unit — one codebase, one build, one database (usually). Critics treat "monolith" as a dirty word, but companies like Shopify and Basecamp have run monoliths at massive scale for years. The advantages are real: a single stack trace across a request, no network calls between "services" that live in the same process, and one deployment pipeline to maintain. For a team of fewer than 20 engineers, a well-organized monolith is almost always faster to build and easier to reason about than a distributed system.

**The Catch:** As the codebase grows, coupling creeps in. A change to the billing module can accidentally break the shipping module because they share the same memory space and, often, the same database tables. Deploys become risky because everything ships together — one bad migration takes down the entire application.

### Microservices: Independent Scaling, Independent Failure
Microservices split that single application into independently deployable services, each owning its own data and its own release cycle. The payoff is real isolation: the recommendation engine can crash without taking down checkout, and the team that owns search can deploy ten times a day without asking permission from the team that owns payments.

**The Catch:** You've traded one set of problems for another. Now a single user request might hop across five services over the network, and each hop is a new opportunity for latency, timeouts, and partial failures. Debugging requires distributed tracing instead of a single stack trace. You now need service discovery, API contracts between teams, and a strategy for handling the case where Service B is down while Service A is still trying to call it.

### The Hidden Cost: Organizational Complexity
The uncomfortable truth is that microservices are primarily an organizational solution, not a technical one. They exist to let large teams work independently without stepping on each other. If you only have one team, splitting the codebase into ten services just means that one team now has to coordinate ten deployments, ten sets of logs, and ten sets of infrastructure — with no organizational benefit to show for it.

### Which One Should You Choose?
Start with a monolith, but build it with clear internal module boundaries — sometimes called a "modular monolith." This gets you the development speed of a single codebase while keeping your domains decoupled enough that a future split (if you ever need one) is a refactor, not a rewrite. Reach for microservices only when you have a specific, painful problem they solve: independent scaling of a hot path, or multiple teams that are actively blocking each other on a shared deploy pipeline.`
  },
  {
    id: "37",
    title: "Database Indexing Explained: How to Make SQL Queries 100x Faster",
    category: "Databases",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-07-09",
    tags: ["SQL", "Database", "Indexing", "Performance", "Backend"],
    summary: "A slow query is rarely the database's fault — it's usually a missing index. Here's how indexes actually work under the hood, and how to use them without silently wrecking your write performance.",
    content: `If a query that used to take 20 milliseconds suddenly takes 4 seconds as your table grows, the cause is almost always the same: the database is scanning every single row to find what you asked for, because nothing is telling it where to look.

### What an Index Actually Is
Most relational databases use a **B-Tree** structure for indexes. Think of it like the index at the back of a textbook — instead of reading every page to find "distributed systems," you jump straight to page 214. A database index works the same way: it stores a sorted, searchable structure that maps a column's values directly to the physical rows containing them.

Without an index, looking up a user by email forces a **full table scan** — the database reads every row in the table, checking each one against your WHERE clause. On a table with 500 rows, you won't notice. On a table with 50 million rows, that query will bring your application to its knees.

### Reading an EXPLAIN Plan
Every major database (PostgreSQL, MySQL, SQL Server) lets you prefix a query with EXPLAIN to see exactly how it plans to execute it. The single most important thing to look for is the difference between a "Seq Scan" (sequential/full table scan) and an "Index Scan." If you're filtering, joining, or sorting on a column and you see a Seq Scan on a large table, that's your signal to add an index.

### Composite Indexes and Column Order
A composite index spans multiple columns, but column **order matters enormously**. An index on (user_id, created_at) can efficiently serve a query that filters by user_id alone, or by user_id and created_at together — but it cannot efficiently serve a query that filters by created_at alone. The database reads the index left to right, the same way you can't look up a phone book by first name.

### The Hidden Cost: Write Performance
Indexes aren't free. Every INSERT, UPDATE, or DELETE has to update every index on that table, not just the underlying data. A table with eight indexes on it will be noticeably slower to write to than a table with two. This is why blindly adding an index to every column is a common mistake — it optimizes reads at the direct expense of writes, and on write-heavy tables (like an events or logs table), that trade-off can backfire badly.

### The Practical Rule
Index columns that appear in WHERE clauses, JOIN conditions, and ORDER BY clauses on tables that are read far more often than they're written to. Measure with EXPLAIN before and after. An index you can't justify with a query plan is just a tax on every future write.`
  },
  {
    id: "38",
    title: "REST API vs. GraphQL: A Practical Comparison for Modern Backends",
    category: "API Design",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-07-16",
    tags: ["REST", "GraphQL", "API", "Backend", "Web Development"],
    summary: "REST and GraphQL solve the same problem in fundamentally different ways. Understanding over-fetching, under-fetching, and the N+1 problem will tell you exactly which one your API needs.",
    content: `REST has been the default choice for web APIs for two decades, and GraphQL was built specifically to fix its most common pain points. Neither one is universally "better" — they optimize for different shapes of data and different kinds of clients.

### REST: Predictable, but Rigid
A REST API exposes a fixed set of endpoints, each returning a fixed shape of data. GET /users/42 returns a user object with a predetermined set of fields, every time. This is simple, cacheable at the HTTP layer, and easy to reason about.

**The Problem:** Real applications rarely need the exact shape an endpoint returns. A mobile app screen that only needs a user's name and avatar still receives the full object — bio, settings, timestamps, and all. This is called **over-fetching**. The opposite problem, **under-fetching**, happens when a single screen needs data from three different endpoints (user, their posts, their followers), forcing the client to make three separate round trips.

### GraphQL: Ask for Exactly What You Need
GraphQL exposes a single endpoint and lets the client specify the exact shape of the response in the query itself. Need only a user's name and their five most recent posts? You ask for exactly that, in one request, and receive exactly that — nothing more. This eliminates both over-fetching and under-fetching in one move, which is why GraphQL became popular for mobile apps where every kilobyte and every round trip matters.

### The Hidden Cost: The N+1 Problem
GraphQL's flexibility comes with a trap. A naive resolver for "get 20 posts and each post's author" will often fire one query to get the 20 posts, then **one additional query per post** to fetch each author — 21 database queries for a single API request. This is the N+1 problem, and it's the single most common performance bug in production GraphQL APIs. The standard fix is a batching tool like Dataloader, which collects individual lookups within a request and turns them into one batched query.

### Caching Gets Harder
REST's biggest quiet advantage is HTTP caching. A GET request to a REST endpoint can be cached by browsers, CDNs, and proxies using standard HTTP headers with zero extra code. GraphQL, since it typically uses a single POST endpoint for everything, loses this for free — caching has to be handled manually at the application layer, often with a normalized client-side cache like Apollo or Relay.

### Which One to Choose
REST remains the pragmatic default for public APIs, simple CRUD services, and anywhere HTTP caching matters. GraphQL earns its complexity when you have multiple client types (web, iOS, Android) with very different data needs hitting the same backend, or when under-fetching is causing a real, measured performance problem.`
  },
  {
    id: "39",
    title: "Docker vs. Kubernetes: Understanding Containers vs. Orchestration",
    category: "DevOps",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-07-23",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers", "Cloud"],
    summary: "Docker and Kubernetes get lumped together constantly, but they solve completely different problems. One packages your app. The other keeps hundreds of copies of it alive across a fleet of machines.",
    content: `"Docker vs. Kubernetes" is a slightly misleading comparison, because the two tools aren't really competitors — Kubernetes exists to manage large fleets of the exact containers Docker builds. But understanding where one ends and the other begins is essential to using either correctly.

### Docker: Packaging Your Application
Docker solves the "it works on my machine" problem. A **Dockerfile** describes exactly how to build an image: the base operating system, the runtime, the dependencies, and the application code, all frozen into a single portable artifact. That image runs identically on your laptop, your CI server, and production, because it carries its entire environment with it instead of depending on whatever happens to be installed on the host.

A single container is a running instance of that image. For a side project or a small app running on one server, Docker alone — maybe with docker-compose to wire together a few containers — is often all you need.

### The Problem Docker Doesn't Solve
Docker packages and runs containers, but it doesn't answer questions like: what happens when a container crashes at 3 AM? How do you run 50 copies of your API across 10 physical machines and route traffic evenly between them? How do you roll out a new version without downtime, and roll it back instantly if something breaks?

### Kubernetes: Orchestrating the Fleet
Kubernetes (K8s) is a container **orchestrator**. You describe your desired state — "I want 6 replicas of this API container running, each with these resource limits, exposed on this port" — and Kubernetes continuously works to make reality match that description. If a container crashes, Kubernetes notices and restarts it automatically. If a physical node dies, Kubernetes reschedules its containers onto healthy nodes without a human touching a keyboard.

Kubernetes also handles **rolling deployments** (gradually replacing old containers with new ones), **service discovery** (letting containers find each other by name instead of hardcoded IPs), and **horizontal autoscaling** (spinning up more containers automatically under load).

### The Hidden Cost: Operational Complexity
Kubernetes has a notoriously steep learning curve — YAML manifests for deployments, services, ingresses, and config maps pile up fast, and running your own cluster means managing etcd, control planes, and networking plugins. For a small team running one or two services, this overhead can easily outweigh the benefit. Managed offerings (EKS, GKE, AKS) remove some of this pain, but the conceptual complexity remains.

### The Practical Rule
Reach for Docker on every project — it's the industry standard for packaging, full stop. Reach for Kubernetes only once you're running enough containers, across enough machines, that manually managing their lifecycle has become a genuine operational burden. Plenty of successful companies run Docker containers on simpler platforms (like a single VM with docker-compose, or managed container services) for years before Kubernetes' complexity is actually justified.`
  },
  {
    id: "40",
    title: "Caching Strategies Explained: Cache-Aside, Write-Through, and Write-Behind",
    category: "Backend Engineering",
    coverImage: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-07-30",
    tags: ["Caching", "Redis", "Performance", "System Design", "Backend"],
    summary: "There are only three real ways to keep a cache in sync with your database — cache-aside, write-through, and write-behind — and each one makes a different trade-off between speed, complexity, and staleness.",
    content: `Phil Karlton's famous line — "there are only two hard things in computer science: cache invalidation and naming things" — exists because caching looks simple until you actually have to keep the cache correct. There are three well-established patterns, and picking the right one depends on how tolerant your system is of stale data.

### Cache-Aside (Lazy Loading)
This is the most common pattern, and the one most people mean when they say "we use Redis as a cache." The application checks the cache first. On a miss, it reads from the database, then writes that value into the cache for next time. On the next request, the cache hit skips the database entirely.

**The Trade-off:** The very first request for any given piece of data is always a cache miss and pays the full database cost. Worse, if that key is updated in the database, the cache now holds stale data until it expires or is explicitly invalidated — which is why most cache-aside implementations pair a Time-To-Live (TTL) with explicit deletion on writes.

### Write-Through
Here, every write goes to the cache and the database at the same time, as a single logical operation. The cache is always up to date immediately after a write, which eliminates the staleness window that cache-aside has.

**The Trade-off:** Every write now takes as long as the slower of the two operations, since both have to succeed before the write is considered complete. You've traded read-path staleness for write-path latency.

### Write-Behind (Write-Back)
The application writes only to the cache, and the cache asynchronously flushes that data to the database moments later, in the background. This makes writes extremely fast, since the client doesn't wait on the database at all.

**The Trade-off:** This is the riskiest pattern. If the cache crashes before it flushes to the database, that data is gone permanently. Write-behind is only appropriate for data where an occasional lost write is an acceptable cost — view counters or analytics events, for example — never for financial transactions or anything that needs a durability guarantee.

### Choosing the Right Pattern
Use **cache-aside** as your default — it's simple, well-understood, and tolerates the occasional stale read. Use **write-through** when read-after-write consistency actually matters to the user (like a profile page that must reflect an edit instantly). Reserve **write-behind** for high-throughput, loss-tolerant data where raw write speed matters more than durability. Whichever pattern you pick, always set a TTL as a safety net — a cache that can go stale forever is a bug waiting to be discovered in production.`
  },
  {
    id: "41",
    title: "SQL vs. NoSQL: How to Choose the Right Database for Your Application",
    category: "Databases",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-08-06",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "Database Design"],
    summary: "The SQL vs. NoSQL debate isn't about which database is 'modern' — it's about whether your data needs strict relationships and transactions, or flexible schemas and massive horizontal scale.",
    content: `"Should we use SQL or NoSQL?" is one of the first architectural decisions any new project makes, and it's frequently made for the wrong reasons — usually because NoSQL sounds more modern, rather than because the data actually calls for it.

### SQL: Structure, Relationships, and ACID Guarantees
Relational databases like PostgreSQL and MySQL enforce a fixed schema: every row in a table has the same columns, with defined types and constraints. This structure is what enables **JOINs** — efficiently combining data across tables, like matching orders to the customers who placed them.

Relational databases also guarantee **ACID** properties (Atomicity, Consistency, Isolation, Durability). A bank transfer that debits one account and credits another either completes entirely or not at all — there's no in-between state where money vanishes because a process crashed halfway through. This makes SQL databases the default, correct choice for financial data, inventory systems, and anything where data integrity is non-negotiable.

### NoSQL: Flexible Schemas and Horizontal Scale
NoSQL is really an umbrella term for several different models: document stores (MongoDB), key-value stores (DynamoDB, Redis), wide-column stores (Cassandra), and graph databases (Neo4j). What they share is a rejection of the rigid, fixed schema — a document store lets every record have a different shape, which is ideal for data that evolves quickly or naturally varies, like user-generated content or product catalogs with wildly different attributes per category.

NoSQL databases are also generally designed from the ground up to **scale horizontally** — spreading data across many commodity servers — rather than scaling vertically on a single powerful machine, which is how traditional SQL databases have historically scaled.

### The Trade-off: Consistency vs. Availability
Most NoSQL databases relax strict consistency in exchange for availability and partition tolerance (see the CAP theorem). MongoDB, for instance, defaults to **eventual consistency** in many configurations — a write to one node may take a moment to propagate to others, meaning a read immediately after a write could return stale data. For a social media "like" counter, that's invisible. For an account balance, that's a serious bug.

### Making the Actual Decision
Choose SQL when your data is highly relational (orders, customers, inventory, users with permissions), when you need multi-row transactions, or when data integrity is more important than raw write throughput. Choose NoSQL when your schema changes frequently, when you need to scale writes horizontally across many servers, or when your data is naturally document-shaped (a single JSON blob per user profile, for example) rather than naturally tabular. Many production systems use both — PostgreSQL for the transactional core of the business, and a NoSQL store for logs, sessions, or a product catalog — rather than treating it as an all-or-nothing choice.`
  },
  {
    id: "42",
    title: "What Is Load Balancing? A Complete Guide to Scaling Web Applications",
    category: "System Design",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-08-13",
    tags: ["Load Balancing", "Scalability", "System Design", "Networking", "DevOps"],
    summary: "A load balancer is the piece of infrastructure standing between your users and your servers, deciding which server handles which request. Here's how it actually works, and why the wrong algorithm can silently overload one server while others sit idle.",
    content: `Once an application outgrows a single server, you need something to decide which of your many servers handles each incoming request. That something is a load balancer, and the algorithm it uses matters far more than most teams realize.

### Layer 4 vs. Layer 7 Load Balancing
A **Layer 4** load balancer operates at the transport layer, making routing decisions based on IP address and port alone, without inspecting the actual content of the request. It's extremely fast, but it's also blind to anything above the network layer.

A **Layer 7** load balancer operates at the application layer, meaning it can read the actual HTTP request — the URL path, headers, or cookies — and route accordingly. This is what lets a single load balancer send /api/* traffic to one set of servers and /images/* traffic to another, or route based on a user's session cookie.

### Load Balancing Algorithms
**Round Robin** is the simplest approach: requests are handed to servers in sequential order, cycling back to the first once it reaches the last. It works well when every server has identical capacity and every request costs roughly the same to process.

**Least Connections** routes each new request to whichever server currently has the fewest active connections. This handles the far more realistic scenario where some requests take much longer to process than others — round robin would happily keep sending new requests to a server that's already struggling under a handful of slow ones, while least-connections routes around it.

**IP Hash** consistently routes a given client's IP to the same server every time. This is useful for **sticky sessions**, where a user's session data is only cached on the server that first handled them.

### Health Checks: The Silent Safety Net
A production load balancer constantly pings each backend server with health checks — small requests to confirm the server is still responsive. The moment a server fails several checks in a row, the load balancer stops sending it traffic entirely, without any human intervention. This is what allows a single server to crash, restart, or be redeployed without users ever noticing.

### The Hidden Complexity: Statelessness
Load balancing works best when your application servers are **stateless** — meaning any server can handle any request, because no server holds unique in-memory state about a particular user. The moment you introduce sticky sessions or in-memory session storage, you've coupled a user to a specific server, which limits how freely the load balancer can distribute traffic and complicates deployments. The more scalable pattern is to keep servers stateless and store session data in a shared store like Redis, so any server behind the load balancer can serve any request at any time.`
  },
  {
    id: "43",
    title: "JWT Authentication Explained: How Token-Based Auth Actually Works",
    category: "Security",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
    readTime: "9 min read",
    date: "2024-08-20",
    tags: ["JWT", "Authentication", "Security", "Backend", "API"],
    summary: "JWTs replaced server-side sessions for a good reason — but they come with a sharp trade-off almost nobody explains clearly: once issued, a token can't truly be revoked until it expires.",
    content: `JSON Web Tokens became the default authentication method for modern APIs because they solve a real scaling problem — but that convenience comes with a security trade-off that catches a lot of teams off guard.

### The Structure of a JWT
A JWT is a string made of three Base64-encoded parts separated by dots: a **header** (describing the signing algorithm), a **payload** (the actual claims — user ID, roles, expiration time), and a **signature**. The signature is generated by hashing the header and payload together with a secret key the server holds. This signature is what makes the token tamper-proof: change a single character in the payload, and the signature no longer matches, so the server instantly rejects it.

Crucially, the payload is only **encoded**, not encrypted. Anyone can decode a JWT and read its contents — you should never put sensitive data like passwords or credit card numbers inside one.

### Why JWTs Replaced Server-Side Sessions
The traditional approach to authentication was server-side sessions: the server generates a session ID, stores the associated user data in memory or a database, and gives the client just the ID. Every request requires the server to look up that session ID in the session store. This works fine on one server, but on a horizontally scaled system with dozens of servers, it means every one of them needs access to the same shared session store, adding a dependency and a potential bottleneck to every single request.

JWTs remove that dependency entirely. Because the token is self-contained and cryptographically signed, any server can verify it independently, with no database lookup at all. This is what makes JWTs so well-suited to stateless, horizontally scaled APIs and microservices.

### The Sharp Trade-off: You Can't Revoke a JWT
This is the detail that trips up the most teams. Because a JWT is verified by its signature alone, and not by checking against a central store, there's no clean way to invalidate one before it expires. If a user's account is compromised, or you need to force a logout, a traditional session can simply be deleted from the session store. A JWT, by design, remains valid until its expiration timestamp arrives, no matter what happens on the server after it was issued.

The standard mitigation is to keep JWTs **short-lived** — often just 15 minutes — paired with a longer-lived **refresh token** stored more securely (and which the server can revoke, since refresh tokens are typically checked against a database). This way, even a stolen access token only remains dangerous for a short window.

### Where to Store the Token
Storing a JWT in localStorage is common but risky: it's accessible to any JavaScript running on the page, so a single XSS vulnerability anywhere in your app exposes every user's token. The more secure pattern is storing it in an **httpOnly cookie**, which JavaScript cannot read at all, combined with proper CSRF protections. This one decision — localStorage versus httpOnly cookies — is responsible for a large share of real-world JWT-related security incidents.`
  },
  {
    id: "44",
    title: "CAP Theorem Explained: Why You Can't Have It All in Distributed Systems",
    category: "System Design",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "8 min read",
    date: "2024-08-27",
    tags: ["CAP Theorem", "Distributed Systems", "System Design", "Databases", "Architecture"],
    summary: "Every distributed database interview question eventually comes back to CAP theorem. Here's what Consistency, Availability, and Partition Tolerance actually mean — and why the real-world choice is almost always between the first two.",
    content: `CAP theorem shows up in nearly every system design interview, but it's often memorized as a slogan ("pick two of three") without really understanding why that framing is slightly misleading in practice.

### The Three Properties
**Consistency** means every node in the system returns the most recent write, no matter which node you ask. Read from any replica, and you get the same, up-to-date answer.

**Availability** means every request receives a response — success or failure — without indefinitely waiting, even if some nodes in the system are down.

**Partition Tolerance** means the system keeps functioning even when network communication between nodes breaks down — a "partition," where some nodes can't talk to others.

### Why It's Really "Pick Two of Three... Sort Of"
The classic explanation is that you can only guarantee two of the three properties at once. But partitions in a real distributed network are not optional — they happen. A router fails, a data center loses connectivity, a cable gets cut. **Partition tolerance isn't really a choice at all in a distributed system; it's a fact you have to design around.**

This means the actual decision system designers make isn't which two of three to pick — it's what happens during the partition that inevitably occurs: do you sacrifice Consistency, or do you sacrifice Availability?

### CP Systems: Consistency Over Availability
A CP system, when a partition occurs, will refuse to serve a request rather than risk returning stale or conflicting data. Traditional relational databases configured for strong consistency, along with systems like HBase and ZooKeeper, fall into this camp. If a node can't confirm it has the latest data, it simply returns an error rather than guessing.

**Use Case:** Banking systems, inventory counts, and anything where showing a user incorrect data is worse than showing them an error message.

### AP Systems: Availability Over Consistency
An AP system keeps responding to every request during a partition, even if that means different nodes might temporarily disagree about the current state of the data. Cassandra and DynamoDB are classic examples — they favor staying online and accepting **eventual consistency**, where all replicas will converge to the same value eventually, but not necessarily right now.

**Use Case:** Social media feeds, shopping cart items, and product catalogs, where a user seeing slightly stale data for a few seconds is a far better experience than the app refusing to load at all.

### The Practical Takeaway
CAP theorem isn't really about picking a database brand — it's about knowing, for each specific piece of data in your system, whether staleness or unavailability is the worse failure mode. A single application often needs both: strong consistency for the checkout and payment flow, and eventual consistency for the product recommendation feed sitting right next to it.`
  },
  {
    id: "45",
    title: "Horizontal vs. Vertical Scaling: Choosing the Right Strategy for Growth",
    category: "System Design",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    date: "2024-09-03",
    tags: ["Scalability", "System Design", "Cloud", "Infrastructure", "Backend"],
    summary: "When your application slows down under load, you have exactly two options: make one machine bigger, or add more machines. Each comes with a very different set of engineering trade-offs.",
    content: `Scaling always comes down to the same two options: throw more power at a single machine, or spread the work across many. Both work — but they demand fundamentally different architectures, and picking the wrong one early can be expensive to unwind later.

### Vertical Scaling: A Bigger Machine
Vertical scaling ("scaling up") means adding more CPU, RAM, or faster storage to the single server you already have. It's the simplest possible way to handle more load — there's no new architecture to design, no distributed systems complexity to introduce, and your application code doesn't need to change at all. For a startup's first year, vertically scaling a single well-provisioned database server is often the fastest and cheapest way to buy headroom.

**The Ceiling:** Every machine has a physical limit — there's a most powerful server your cloud provider offers, and eventually you'll hit it. Vertical scaling also does nothing for reliability: that single powerful machine is a **single point of failure**. If it goes down, your entire application goes down with it, no matter how much RAM it has.

### Horizontal Scaling: More Machines
Horizontal scaling ("scaling out") means adding more servers and distributing the workload across all of them, typically behind a load balancer. This is how virtually every large-scale system — Google, Netflix, Amazon — actually operates: not a handful of enormous machines, but thousands of much smaller, replaceable ones working together.

The reliability benefit is significant: if one server in a fleet of twenty fails, the other nineteen keep serving traffic without interruption, and the failed one can simply be replaced.

**The Catch:** Horizontal scaling isn't free of engineering cost — it demands it up front. Your application servers generally need to be **stateless**, meaning no server holds unique data that only it knows about, or a user routed to a different server on their next request would lose that data. Your database also becomes the harder problem: a single database server can only be horizontally scaled through techniques like **read replicas** (for read-heavy workloads) or **sharding** (splitting data across multiple database servers by some key, like user ID), both of which add real complexity to your queries and your consistency guarantees.

### Choosing a Strategy
Start by scaling vertically — it buys you time cheaply while your product and traffic patterns are still uncertain, and premature horizontal scaling (and the stateless-architecture discipline it requires) is a common form of over-engineering for a system that doesn't need it yet. Move to horizontal scaling once you've identified a specific, measured bottleneck that a bigger single machine can no longer solve, or once uptime requirements mean you can no longer tolerate a single point of failure. Most mature systems eventually use both together: horizontally scaled, stateless application servers sitting in front of a database that itself has been vertically scaled as far as reasonably possible before sharding becomes necessary.`
  },
  {
  id: "46",
  title: "AI Agents Are Changing Software Development: How Autonomous AI Will Transform Programming",
  category: "Artificial Intelligence",
  coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  readTime: "8 min read",
  date: "2026-07-24",

  tags: [
    "AI Agents",
    "Artificial Intelligence",
    "Software Development",
    "Automation",
    "Future of Programming"
  ],

  summary:
    "AI agents are transforming software development by helping developers analyze requirements, generate code, automate testing, and build intelligent applications. Learn how autonomous AI systems are shaping the future of programming.",

  references: [
    {
      name: "OpenAI Developer Documentation",
      url: "https://platform.openai.com/docs"
    },
    {
      name: "Google AI Research",
      url: "https://ai.google/research/"
    },
    {
      name: "Microsoft AI",
      url: "https://www.microsoft.com/en-us/ai"
    }
  ],

  relatedPosts: [
    {
      title: "Why Traditional Full-Stack Development is Dead (And What I'm Building Instead)",
      url: "/blog/1"
    },
    {
      title: "The Future of Full-Stack Development: From CRUD Apps to Intelligent Platforms",
      url: "/blog/49"
    }
  ],

  content: `
For decades, software development followed a simple process:

A developer understands a requirement, writes code, tests the application, and deploys the solution.

However, artificial intelligence is changing this workflow.

The next generation of software development is moving towards autonomous AI agents that can understand problems, create solutions, test implementations, and continuously improve software systems.

## From AI Assistants To AI Agents

Traditional AI assistants mainly answer questions or generate small pieces of code.

AI agents are different.

They can:

• Analyze complex requirements.
• Plan development tasks.
• Generate and modify code.
• Execute testing workflows.
• Identify and fix problems.

This creates a new development model where developers work together with intelligent systems.

## How AI Agents Are Changing Development

### 1. Faster Software Creation

Developers can now describe a feature and receive an initial implementation within seconds.

Instead of spending hours writing repetitive code, developers can focus on architecture, business logic, and user experience.

### 2. Intelligent Debugging

Finding software bugs is one of the most time-consuming tasks.

AI systems can analyze:

• Error messages.
• Application logs.
• Code structures.
• Previous solutions.

This allows developers to solve problems faster.

### 3. Automated Testing

Quality assurance is becoming smarter.

AI-powered systems can generate test cases, identify possible failures, and improve application reliability.

## The New Role Of Developers

AI will not eliminate software developers.

Instead, the role of developers will evolve.

Future developers will need stronger skills in:

• System architecture.
• AI integration.
• Data management.
• Security.
• Cloud infrastructure.

Writing code is becoming easier.

Designing reliable systems is becoming more valuable.

## Building Intelligent Applications

Modern applications are moving beyond simple database operations.

The future includes systems that can:

• Predict customer needs.
• Automate business workflows.
• Analyze large amounts of data.
• Provide intelligent recommendations.

This is the direction I am focusing on while building modern software platforms and business automation systems.

## Final Thoughts

The future developer is not someone who only writes code.

The future developer is someone who understands problems, designs intelligent solutions, and uses AI as a powerful engineering partner.

AI agents are not replacing software development.

They are redefining what software developers can build.
`
},
{
  id: "47",

  title: "Why Every Software Developer Must Learn Cybersecurity: Secure Coding in the Modern Web",

  category: "Cybersecurity",

  coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",

  readTime: "8 min read",

  date: "2026-07-24",

  tags: [
    "Cybersecurity",
    "Secure Coding",
    "Web Security",
    "Application Security",
    "Data Protection"
  ],


  summary:
    "Cybersecurity is no longer only the responsibility of security teams. Modern software developers must understand secure coding practices, authentication, API security, and data protection to build trustworthy applications.",


  references: [
    {
      name: "OWASP Top 10 Web Application Security Risks",
      url: "https://owasp.org/www-project-top-ten/"
    },
    {
      name: "NIST Cybersecurity Framework",
      url: "https://www.nist.gov/cyberframework"
    },
    {
      name: "Mozilla Web Security Guidelines",
      url: "https://infosec.mozilla.org/guidelines/web_security"
    }
  ],


  relatedPosts: [
    {
      title: "AI Agents Are Changing Software Development: How Autonomous AI Will Transform Programming",
      url: "/blog/46"
    },
    {
      title: "Cloud Computing Explained: Why Modern Applications Are Moving Beyond Traditional Servers",
      url: "/blog/48"
    },
    {
      title: "Why Traditional Full-Stack Development is Dead (And What I'm Building Instead)",
      url: "/blog/1"
    }
  ],


  content: `
When developers build software applications, the main focus is usually functionality.

Can users log in?
Can data be saved?
Can the application perform the required tasks?

However, one important question is often ignored:

Is the application secure?

In today's digital world, cybersecurity is not only the responsibility of security specialists. Every software developer plays an important role in protecting user data and preventing vulnerabilities.


## Why Developers Need Cybersecurity Knowledge

Modern applications handle sensitive information:

• User accounts.
• Personal information.
• Financial transactions.
• Business data.
• Internal company systems.

A single security mistake can expose thousands of users.

Security must become part of the development process from the beginning.


## Common Security Problems In Modern Applications


### 1. Weak Authentication

Authentication is the first protection layer of an application.

Common mistakes include:

• Weak password policies.
• Storing passwords incorrectly.
• Missing multi-factor authentication.
• Poor session management.


Developers should implement:

• Secure password hashing.
• Token-based authentication.
• Proper access control.


### 2. SQL Injection Attacks

SQL injection happens when attackers manipulate database queries through unsafe user input.

Example problems:

• Directly inserting user input into SQL queries.
• Missing input validation.
• Poor database permissions.


Modern applications should use:

• Prepared statements.
• ORM systems.
• Input validation.


### 3. API Security

Today's applications depend heavily on APIs.

An insecure API can expose:

• User information.
• Internal systems.
• Business operations.


Developers should consider:

• API authentication.
• Rate limiting.
• Data encryption.
• Proper error handling.


## Security During Software Development

Security should not be a final testing step.

A better approach is:

Planning → Secure Design → Development → Testing → Deployment


This concept is known as "Security by Design."


## The Developer's Responsibility

A modern developer should understand:

• Secure programming practices.
• Network security basics.
• Encryption concepts.
• Authentication systems.
• Cloud security.


A developer who understands security can create applications that users trust.


## The Future Of Secure Software

As applications become more connected with artificial intelligence, cloud platforms, and automation systems, security becomes even more important.

Future software developers will not only create features.

They will create secure digital environments where businesses and users can safely operate.


## Final Thoughts

Cybersecurity is becoming a fundamental skill for every developer.

Writing code that works is important.

Writing code that works securely is what separates professional software developers from ordinary programmers.
`
},
{
  id: "48",
  title: "Windows 11 Activation and License Management via Command Line (SLMGR Guide)",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-28",
  tags: ["Windows 11", "CMD", "SLMGR", "System Administration", "Licensing"],
  summary: "Learn how Windows activation and product key management works using the built-in Software Licensing Management Tool (SLMGR) in Windows 11.",
  content: `Managing Windows 11 product keys and activation states is a fundamental skill for system administrators and power users. While the Windows Settings app provides a graphical interface, the command line offers deeper diagnostic control through **SLMGR** (Software Licensing Management Tool).

## What is SLMGR?

SLMGR is a VBScript tool built into Windows that allows administrators to configure licensing, view expiration dates, and manage product keys directly from an elevated Command Prompt or PowerShell terminal.

### Essential SLMGR Commands for System Administrators

To run these commands, open **Command Prompt as Administrator**:

1. **Check Current License & Expiration Status:**
\`\`\`cmd
slmgr /dli
\`\`\`
This displays basic license information and current activation state.

2. **Detailed Activation Information:**
\`\`\`cmd
slmgr /dlv
\`\`\`
Provides complete diagnostic data including installation ID, activation renewal intervals, and KMS server details.

3. **Verify Activation Expiration Date:**
\`\`\`cmd
slmgr /xpr
\`\`\`
Displays whether the system is permanently activated or shows the exact expiration date for volume licenses.

4. **Installing a Genuine Product Key:**
\`\`\`cmd
slmgr /ipk YOUR-PRODUCT-KEY-HERE
\`\`\`

5. **Trigger Online Activation:**
\`\`\`cmd
slmgr /ato
\`\`\`

### Enterprise KMS Volume Activation

In corporate networks, organizations use Key Management Service (KMS) servers to activate devices locally:
\`\`\`cmd
slmgr /skms kms.yourdomain.com:1688
slmgr /ato
\`\`\`

Understanding command-line license management ensures quick troubleshooting when configuring enterprise Windows images or verifying activation status.`
},
{
  id: "49",
  title: "Top 15 Hidden Windows 11 Hacks and Secret Shortcuts Every Power User Should Know",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-28",
  tags: ["Windows 11", "Productivity", "Shortcuts", "OS Tricks", "Power User"],
  summary: "Discover secret Windows 11 keyboard shortcuts, snap layout tricks, hidden menus, and workflow boosters for maximum daily productivity.",
  content: `Windows 11 is packed with subtle features and keyboard shortcuts designed to accelerate your workflow. Here are 15 hidden tricks every developer and power user should master.

## 1. Advanced Clipboard History (\`Win + V\`)
Press \`Win + V\` to enable the clipboard history manager. You can pin frequently used code snippets, text blocks, and images across reboots.

## 2. Windows Terminal Quick Launch (\`Win + X, I\`)
The Power User Menu (\`Win + X\`) gives instant access to Device Manager, Disk Management, and Terminal. Pressing \`Win + X\` then \`I\` opens Terminal immediately.

## 3. Instant Snap Layouts (\`Win + Z\`)
Hover over any window's maximize button or press \`Win + Z\` to trigger pre-configured grid layouts for multi-monitor multitasking.

## 4. Secret Emoji & Kaomoji Picker (\`Win + .\`)
Access symbols, emoticons, GIFs, and special characters system-wide by hitting \`Win + .\` or \`Win + ;\`.

## 5. Screen Recording with Xbox Game Bar (\`Win + Alt + R\`)
No third-party app needed: start recording your screen instantly for demos or bug reports using \`Win + Alt + R\`.

## 6. Virtual Desktop Switching (\`Win + Ctrl + Left/Right\`)
Separate your dev tools, messaging apps, and personal browsing across Virtual Desktops. Switch seamlessly with arrow keys.

## 7. Shake to Minimize (Title Bar Shake)
Enable "Title bar window shake" in Settings -> System -> Multitasking. Click and shake a window's title bar to minimize all other open apps instantly.

## 8. God Mode Folder
Create a new folder on your desktop and rename it to:
\`GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}\`
This reveals a master control panel with over 200 system administrative settings in one list.`
},
{
  id: "50",
  title: "PowerShell vs Command Prompt (CMD) in Windows 11: Key Differences & When to Use Which",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-28",
  tags: ["PowerShell", "CMD", "Windows 11", "CLI", "Scripting"],
  summary: "A comprehensive comparison between Windows PowerShell and legacy Command Prompt (CMD), object pipelines vs text streams, and modern terminal usage.",
  content: `Many Windows users use Command Prompt (CMD) and PowerShell interchangeably, but under the hood, they are fundamentally different command-line environments.

## The Core Difference: Text Streams vs Object Pipelines

- **Command Prompt (cmd.exe):** Developed in the 1980s as an extension of MS-DOS. CMD operates entirely on **text streams**. Commands output plain text, and piping (\`|\`) passes raw text string characters to the next command.
- **PowerShell (pwsh / powershell.exe):** Introduced in 2006, PowerShell is an object-oriented shell built on the .NET framework. Commands (called **cmdlets**) output structured **.NET objects**. Piping passes rich object properties directly without parsing string output.

### Code Comparison

#### Finding Running Services Consuming Memory in CMD:
In CMD, you must parse text using \`tasklist\` or \`wmic\` with string manipulation.

#### Finding Running Services Consuming Memory in PowerShell:
\`\`\`powershell
Get-Process | Where-Object WorkingSet -gt 100MB | Sort-Object WorkingSet -Descending
\`\`\`
PowerShell filters objects cleanly using actual properties (\`WorkingSet\`) rather than string matching.

### Summary Table

| Feature | Command Prompt (CMD) | PowerShell |
|---|---|---|
| Architecture | MS-DOS Legacy | .NET Object-Oriented |
| Data Type | Plain Text Strings | Structured .NET Objects |
| Cross-Platform | Windows Only | Windows, Linux, macOS |
| Script File | \`.bat\` / \`.cmd\` | \`.ps1\` |
| Execution Policy | Unrestricted | Configurable Security Rules |

For quick system diagnostics, CMD is fast and lightweight. For serious automation, cloud management, and system administration, PowerShell is superior.`
},
{
  id: "51",
  title: "How to Speed Up Windows 11: Essential System Cleanup & Performance Tweaks",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-27",
  tags: ["Windows 11", "Performance", "Optimization", "System Cleanup", "Hardware"],
  summary: "Optimize Windows 11 for maximum speed and responsiveness by disabling visual bloat, managing startup apps, and running CLI cleanup tasks.",
  content: `Over time, Windows 11 can accumulate temporary files, background startup applications, and unnecessary visual effects that degrade system responsiveness. Here is an engineering guide to restoring peak performance.

## 1. CLI Storage Cleanup via Disk Cleanup & Cleanmgr

Open Command Prompt as Administrator and launch automated cleanup:
\`\`\`cmd
cleanmgr /sageset:1
cleanmgr /sagerun:1
\`\`\`
This purges cached Windows updates, memory dump files, temporary files, and system logs.

## 2. Disable Non-Essential Startup Apps

High startup impact applications consume CPU and RAM before you even launch your browser.
Open Task Manager (\`Ctrl + Shift + Esc\`) -> **Startup apps** -> Disable everything except essential drivers and security software.

## 3. Flush DNS & Reset Network Caches

Run these commands in CMD to clear stale network caches:
\`\`\`cmd
ipconfig /flushdns
netsh winsock reset
\`\`\`

## 4. Optimize Visual Effects for Speed

1. Press \`Win + R\`, type \`sysdm.cpl\`, hit Enter.
2. Go to **Advanced** tab -> **Performance Settings**.
3. Select **Adjust for best performance**, then re-enable only smooth edges of screen fonts and drop shadows under desktop icons.

## 5. Enable Storage Sense
Navigate to **Settings -> System -> Storage** and enable **Storage Sense** to automatically delete temporary files when disk space runs low.`
},
{
  id: "52",
  title: "Mastering Windows Subsystem for Linux (WSL2) on Windows 11: Ultimate Developer Setup",
  category: "Software Engineering",
  coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
  readTime: "8 min read",
  date: "2026-07-27",
  tags: ["WSL2", "Linux", "Windows 11", "Ubuntu", "Docker"],
  summary: "Run native Linux distributions directly on Windows 11 with WSL2. Setup Docker, zsh, and VS Code integration seamlessly.",
  content: `Windows Subsystem for Linux 2 (WSL2) brings a real Linux kernel directly to Windows 11, allowing developers to execute Linux binaries, bash scripts, and Docker containers without dual-booting or virtual machine overhead.

## One-Command Installation

Open PowerShell as Administrator and run:
\`\`\`powershell
wsl --install
\`\`\`
This installs Ubuntu by default, along with the required Virtual Machine Platform components.

## Setting WSL Version to WSL2

Ensure your default WSL architecture is set to version 2:
\`\`\`powershell
wsl --set-default-version 2
wsl -l -v
\`\`\`

## Integrating VS Code with WSL2

1. Install Visual Studio Code on Windows.
2. Install the **WSL extension** in VS Code.
3. Open your Linux terminal and type:
\`\`\`bash
code .
\`\`\`
VS Code will launch on Windows while executing code and extensions inside the Linux environment!

## Performance Tip: Store Files in the Linux File System

For lightning-fast file read/write speeds, store your project repositories inside the Linux root directory (\`~/projects/\`) rather than accessing Windows drives (\`/mnt/c/\`).`
},
{
  id: "53",
  title: "How to Fix High CPU & RAM Usage in Windows 11: Diagnostics & Task Manager Secrets",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-27",
  tags: ["Windows 11", "Troubleshooting", "RAM", "CPU", "Diagnostics"],
  summary: "Identify memory leaks, background process spikes, and unneeded telemetry services slowing down your system.",
  content: `Spikes in CPU and RAM usage can freeze applications and drain laptop batteries. Here is how to diagnose and resolve high resource consumption in Windows 11.

## Diagnosing Spikes with Resource Monitor

Press \`Win + R\`, type \`resmon\`, and press Enter. 
Resource Monitor provides deeper insights than Task Manager:
- **CPU Tab:** Shows process threads, handle counts, and CPU frequency throttling.
- **Memory Tab:** Differentiates between In Use, Modified, Standby, and Free physical RAM.

## Common Culprits & Fixes

### 1. High CPU from \`System Interrupts\`
If System Interrupts consumes high CPU (>5%), it usually indicates a faulty driver or hardware component. Update network, GPU, and chipset drivers immediately.

### 2. High Disk/CPU from \`SysMain\` (Superfetch)
If your disk usage hits 100%, disable SysMain in PowerShell:
\`\`\`powershell
Stop-Service -Name "SysMain" -Force
Set-Service -Name "SysMain" -StartupType Disabled
\`\`\`

### 3. Windows Search Indexing Spikes
To pause background indexing temporarily during heavy compiling tasks:
\`\`\`powershell
Stop-Service -Name "WSearch"
\`\`\`

Using these diagnostic tools helps you keep system resource usage under control.`
},
{
  id: "54",
  title: "Essential Network Troubleshooting Commands in Windows 11 (Ping, Tracert, Netstat & Nslookup)",
  category: "Hardware & Networking",
  coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-27",
  tags: ["Networking", "CMD", "Windows 11", "Ping", "Netstat"],
  summary: "Diagnose internet outages, open ports, DNS resolution issues, and network latency using native Windows command prompt tools.",
  content: `Network issues can disrupt developer workflows and server connections. Windows 11 includes powerful built-in command-line tools to diagnose network bottlenecks.

## 1. \`ping\` - Testing Connectivity & Latency
Test connection to a target host or gateway:
\`\`\`cmd
ping 8.8.8.8 -t
\`\`\`
The \`-t\` flag continuous pings until stopped with \`Ctrl + C\`.

## 2. \`tracert\` - Trace Network Hop Route
Discover where packets drop along the routing path to a remote server:
\`\`\`cmd
tracert shavinjoseph.me
\`\`\`

## 3. \`netstat\` - Inspect Active Connections & Open Ports
Identify what applications are using open network ports on your machine:
\`\`\`cmd
netstat -ano | findstr :8080
\`\`\`
The \`-a\` lists all connections, \`-n\` displays numerical IPs/ports, and \`-o\` displays the process ID (PID).

## 4. \`nslookup\` - DNS Domain Resolution Troubleshooting
Query DNS servers directly to test domain resolution:
\`\`\`cmd
nslookup google.com
\`\`\`

## 5. \`pathping\` - Combined Ping & Trace Diagnostic
\`pathping\` sends packets to every router along the route over time to measure packet loss per hop.`
},
{
  id: "55",
  title: "Package Management in Windows 11: How to Use Winget and Chocolatey",
  category: "Software Engineering",
  coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-26",
  tags: ["Winget", "Chocolatey", "Windows 11", "CLI", "Automation"],
  summary: "Install, update, and manage all your Windows software from the terminal just like apt or brew.",
  content: `Installing applications by manually downloading \`.exe\` installers from browser sites is inefficient. Windows 11 includes **Winget** natively, providing package management directly in your command line.

## Using Winget (Windows Package Manager)

Winget comes built into Windows 11.

### 1. Search for Applications:
\`\`\`cmd
winget search Git.Git
\`\`\`

### 2. Install Applications:
\`\`\`cmd
winget install --id Git.Git -e
winget install --id Microsoft.VisualStudioCode -e
winget install --id Python.Python.3.12 -e
\`\`\`

### 3. Upgrade All Installed Packages at Once:
\`\`\`cmd
winget upgrade --all
\`\`\`
This single command updates every application on your machine in seconds!

## Chocolatey: Enterprise Package Management

Chocolatey is a third-party package manager for Windows widely used in CI/CD pipelines.

To install Chocolatey via PowerShell:
\`\`\`powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
\`\`\`

Using Winget or Chocolatey automates environment setup for new developer machines.`
},
{
  id: "56",
  title: "Windows 11 Registry Editing 101: Safe Tweaks to Customize Your Operating System",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-26",
  tags: ["Registry", "Windows 11", "Regedit", "Customization", "OS"],
  summary: "Learn how the Windows Registry works, how to back it up safely, and how to apply custom system tweaks.",
  content: `The Windows Registry is a centralized database storing configuration settings for the operating system, hardware devices, and installed applications.

## Registry Architecture Overview

The registry is divided into five main hives:
- **HKEY_CLASSES_ROOT (HKCR):** File associations and OLE data.
- **HKEY_CURRENT_USER (HKCU):** Settings for the currently logged-in user.
- **HKEY_LOCAL_MACHINE (HKLM):** Settings applying to the system and all users.
- **HKEY_USERS (HKU):** Profiles for all users on the machine.
- **HKEY_CURRENT_CONFIG (HKCC):** Hardware profile information gathered at startup.

## Rule #1: Always Export a Backup First

Before modifying any registry key:
1. Open \`regedit\` (\`Win + R\` -> \`regedit\`).
2. Click **File -> Export**.
3. Save the backup \`.reg\` file safely. If a tweak causes issues, double-clicking the backup restores the original keys instantly.

## Useful Registry Tweak Example: Restore Full Classic Context Menu

To restore the classic full right-click context menu in Windows 11 via Command Prompt:
\`\`\`cmd
reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32" /f /ve
taskkill /f /im explorer.exe && start explorer.exe
\`\`\`

Modifying the registry safely unlocks deep customization options.`
},
{
  id: "57",
  title: "Automating Daily Tasks with PowerShell Scripts and Task Scheduler",
  category: "Automation",
  coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-26",
  tags: ["PowerShell", "Automation", "Task Scheduler", "Scripting", "Windows"],
  summary: "Automate file management, backup routines, and maintenance scripts on Windows 11 using PowerShell and Task Scheduler.",
  content: `Repetitive computer tasks waste valuable engineering time. By combining PowerShell scripts with Windows Task Scheduler, you can automate routine tasks seamlessly.

## Sample PowerShell Backup Script (\`backup.ps1\`)

Create a script that backs up a specific project folder to an archive location:
\`\`\`powershell
$source = "C:\\Projects\\MyApp"
$destination = "D:\\Backups\\MyApp_$(Get-Date -Format 'yyyy-MM-dd').zip"

Compress-Archive -Path $source -DestinationPath $destination -Force
Write-Host "Backup completed successfully at $destination"
\`\`\`

## Scheduling the Script in Task Scheduler

1. Press \`Win + R\`, type \`taskschd.msc\`, hit Enter.
2. Click **Create Basic Task** -> Name it "Daily Project Backup".
3. Trigger: **Daily at 18:00**.
4. Action: **Start a program**.
   - Program/script: \`powershell.exe\`
   - Add arguments: \`-ExecutionPolicy Bypass -File "C:\\Scripts\\backup.ps1"\`
5. Click **Finish**.

Now your backup script executes automatically every day in the background!`
},
{
  id: "58",
  title: "How to Repair Corrupted Windows 11 System Files Using SFC and DISM Commands",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-26",
  tags: ["SFC", "DISM", "Windows 11", "Repair", "CMD"],
  summary: "Step-by-step guide on running System File Checker (SFC) and DISM to repair damaged system files and resolve Windows crashes.",
  content: `Unexpected crashes, Blue Screen errors, or missing DLL files often stem from corrupted system files. Windows provides two command-line repair tools: **DISM** and **SFC**.

## Step 1: Run DISM (Deployment Image Servicing and Management)

DISM checks and repairs the underlying Windows component store image from Microsoft Update servers.

Open Command Prompt as Administrator:
\`\`\`cmd
DISM.exe /Online /Cleanup-Image /ScanHealth
DISM.exe /Online /Cleanup-Image /RestoreHealth
\`\`\`

## Step 2: Run System File Checker (SFC)

Once the component store is repaired by DISM, run SFC to scan and replace corrupted protected system files:
\`\`\`cmd
sfc /scannow
\`\`\`

## Intercepting Log Results

If SFC finds corrupted files it cannot fix, inspect the CBS log file:
\`\`\`cmd
findstr /c:"[SR]" %windir%\\Logs\\CBS\\CBS.log > "%userprofile%\\Desktop\\sfcdetails.txt"
\`\`\`

Running DISM followed by SFC resolves the vast majority of Windows stability issues.`
},
{
  id: "59",
  title: "Mastering Windows Terminal: Tabs, Profiles, Themes, and Shortcuts",
  category: "Software Engineering",
  coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-25",
  tags: ["Windows Terminal", "CLI", "Customization", "PowerShell", "DevTools"],
  summary: "Transform your Windows terminal environment with custom themes, split panes, GPU acceleration, and shell profiles.",
  content: `Windows Terminal is an open-source, modern command-line application featuring GPU-accelerated text rendering, tabs, split panes, and deep customization.

## Essential Keyboard Shortcuts

- **Open New Tab:** \`Ctrl + Shift + T\`
- **Split Pane Horizontally:** \`Alt + Shift + -\`
- **Split Pane Vertically:** \`Alt + Shift + +\`
- **Close Pane:** \`Ctrl + Shift + W\`
- **Command Palette:** \`Ctrl + Shift + P\`

## Customizing \`settings.json\`

Press \`Ctrl + ,\` to open settings, then click **Open JSON file** to edit configuration properties directly:
\`\`\`json
{
  "profiles": {
    "defaults": {
      "font": {
        "face": "Cascadia Code PL",
        "size": 11
      },
      "opacity": 85,
      "useAcrylic": true,
      "colorScheme": "One Half Dark"
    }
  }
}
\`\`\`

Configuring Windows Terminal improves daily command-line productivity.`
},
{
  id: "60",
  title: "Building Modern Web Applications with Next.js 15: App Router & React Server Components",
  category: "Web Development",
  coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-25",
  tags: ["Next.js", "React", "Web Development", "Server Components", "Frontend"],
  summary: "Explore Next.js 15 features including Server Components, Server Actions, TurboPack, and advanced SEO optimization.",
  content: `Next.js 15 continues to refine web development architecture with the App Router model, React Server Components (RSC), and enhanced caching primitives.

## Why React Server Components Matter

Traditional React applications render components on the client, requiring large JavaScript bundles to be downloaded by the browser. 

Server Components render HTML on the server, streaming lightweight markup directly to the client with zero bundle size impact.

### Code Example: Server Component Data Fetching
\`\`\`tsx
// app/blog/page.tsx (Server Component by default)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', { next: { revalidate: 3600 } });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main>
      <h1>Latest Posts</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  );
}
\`\`\`

Next.js 15 delivers faster initial page loads and built-in search engine optimization.`
},
{
  id: "61",
  title: "Python Scripting for System Administrators: Automating File & Network Operations",
  category: "Artificial Intelligence",
  coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-25",
  tags: ["Python", "Automation", "System Admin", "Scripting", "DevOps"],
  summary: "Use Python to write cross-platform scripts for monitoring server health, parsing log files, and sending automated alerts.",
  content: `Python is one of the most versatile languages for system administration and DevOps automation due to its extensive standard library.

## Automating Server Health Checks with \`psutil\`

The \`psutil\` library provides cross-platform metrics on CPU, RAM, disk, and network interfaces:

\`\`\`python
import psutil

def check_system_health():
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()
    disk_info = psutil.disk_usage('/')

    print(f"CPU Usage: {cpu_usage}%")
    print(f"RAM Usage: {memory_info.percent}% ({memory_info.used // (1024**2)}MB used)")
    print(f"Disk Usage: {disk_info.percent}% ({disk_info.free // (1024**3)}GB free)")

    if cpu_usage > 85:
        print("[WARNING] High CPU usage detected!")

if __name__ == "__main__":
    check_system_health()
\`\`\`

Python scripts keep infrastructure running smoothly.`
},
{
  id: "62",
  title: "Cisco Router & Switch Initial Configuration: Essential CLI Commands Guide",
  category: "Hardware & Networking",
  coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-25",
  tags: ["Cisco", "Networking", "CLI", "Router", "Switch"],
  summary: "Learn essential Cisco IOS commands to configure hostnames, IP addresses, SSH access, and VLANs on enterprise hardware.",
  content: `Configuring Cisco networking hardware requires familiarity with Cisco IOS command modes: User EXEC, Privileged EXEC, and Global Configuration.

## Basic Cisco IOS Initial Setup Sequence

Connecting via Console cable:
\`\`\`text
Router> enable
Router# configure terminal
Router(config)# hostname Core-Router-01
Core-Router-01(config)# enable secret AdminPassword123
\`\`\`

## Configuring Interface IP Address

\`\`\`text
Core-Router-01(config)# interface GigabitEthernet0/0/0
Core-Router-01(config-if)# ip address 192.168.1.1 255.255.255.0
Core-Router-01(config-if)# no shutdown
Core-Router-01(config-if)# exit
\`\`\`

## Saving Running Configuration to Startup NVRAM

\`\`\`text
Core-Router-01# copy running-config startup-config
\`\`\`

Understanding Cisco CLI commands is vital for managing corporate network backbones.`
},
{
  id: "63",
  title: "How to Secure Your Web Application Against OWASP Top 10 Vulnerabilities",
  category: "Cybersecurity",
  coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
  readTime: "8 min read",
  date: "2026-07-25",
  tags: ["Cybersecurity", "OWASP", "Web Security", "AppSec", "Secure Coding"],
  summary: "Protect your web apps against SQL injection, XSS, CSRF, broken authentication, and security misconfigurations.",
  content: `Application security must be designed from the start. The OWASP Top 10 lists the most critical web application security risks.

## Key Vulnerabilities & Defenses

### 1. Injection (SQLi)
Never concatenate untrusted user input into SQL queries. Always use parameterized queries or ORMs.

### 2. Broken Authentication
Implement multi-factor authentication (MFA), secure password hashing (bcrypt/argon2), and proper session expiration.

### 3. Cross-Site Scripting (XSS)
Sanitize all user inputs and enforce a strict **Content Security Policy (CSP)** HTTP header.

### 4. Security Misconfigurations
Disable default admin credentials, remove unused endpoints, and set security headers (\`X-Frame-Options\`, \`Strict-Transport-Security\`).

Prioritizing AppSec protects user data and builds trust.`
},
{
  id: "64",
  title: "Running Local AI Models (Ollama & Llama 3) on Windows 11: Step-by-Step Setup",
  category: "Artificial Intelligence",
  coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-24",
  tags: ["AI", "Ollama", "Llama 3", "Local AI", "Windows 11"],
  summary: "Run powerful open-source Large Language Models offline on your Windows 11 PC using Ollama and GPU acceleration.",
  content: `Running LLMs locally on your own machine ensures complete privacy and zero API costs.

## Installing Ollama on Windows

1. Download Ollama for Windows from \`ollama.com\`.
2. Open Windows Terminal and run your first model:
\`\`\`powershell
ollama run llama3
\`\`\`
Ollama downloads the weights and launches an interactive chat prompt directly in your terminal!

## Integrating Local LLM with Node.js / Python

Ollama exposes a local REST API on port \`11434\`:
\`\`\`javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    prompt: 'Explain REST API security in 2 sentences.',
    stream: false
  })
});
const data = await response.json();
console.log(data.response);
\`\`\`

Local AI gives developers complete control over prompt engineering and private data inference.`
},
{
  id: "65",
  title: "Docker Desktop on Windows 11: Setup, Containerization, and WSL2 Integration",
  category: "Software Engineering",
  coverImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-24",
  tags: ["Docker", "Containers", "DevOps", "Windows 11", "WSL2"],
  summary: "Containerize applications using Docker Desktop for Windows 11 with Hyper-V and WSL2 backend integration.",
  content: `Docker eliminates the "it works on my machine" problem by packaging applications with all runtime dependencies into isolated containers.

## Dockerfile Basics

Create a \`Dockerfile\` for a Node.js application:
\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Building and Running the Container

\`\`\`cmd
docker build -t my-web-app .
docker run -p 3000:3000 -d my-web-app
\`\`\`

Integrating Docker Desktop with WSL2 ensures fast container execution on Windows 11.`
},
{
  id: "66",
  title: "How to Backup and Restore Environment Variables in Windows 11 via CMD & PowerShell",
  category: "Windows & System Admin",
  coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  readTime: "6 min read",
  date: "2026-07-24",
  tags: ["Windows 11", "PATH", "Environment Variables", "CLI", "Dev Setup"],
  summary: "Manage System and User PATH variables from the command line, export configurations, and restore lost variables.",
  content: `Environment variables (like \`PATH\`) tell Windows where executable programs reside. Accidental deletion of the PATH variable can break development tools.

## Viewing Environment Variables in PowerShell

\`\`\`powershell
Get-ChildItem Env:
$env:PATH -split ';'
\`\`\`

## Backing Up PATH Variable to a File

\`\`\`powershell
$env:PATH | Out-File -FilePath "$env:USERPROFILE\\Desktop\\path_backup.txt"
\`\`\`

## Adding a New Directory to User PATH Permanently via CLI

\`\`\`powershell
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\\MyTools", "User")
\`\`\`

Managing PATH programmatically avoids manual errors in the Windows GUI.`
},
{
  id: "67",
  title: "Mastering Git Terminal Commands: From Undo Operations to Advanced Rebase",
  category: "Software Engineering",
  coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1200&auto=format&fit=crop",
  readTime: "7 min read",
  date: "2026-07-24",
  tags: ["Git", "GitHub", "Version Control", "Terminal", "DevTools"],
  summary: "Essential Git terminal workflows: cherry-picking, interactive rebasing, stash management, and reflog recovery.",
  content: `Git is the industry standard for version control. Beyond basic \`git add\` and \`git commit\`, advanced terminal commands help fix mistakes.

## 1. Undoing Last Commit (Keep Changes Staged)
\`\`\`bash
git reset --soft HEAD~1
\`\`\`

## 2. Recover Lost Commits with Reflog
If you accidentally deleted a branch or reset hard:
\`\`\`bash
git reflog
git checkout -b recovered-branch <COMMIT_HASH>
\`\`\`

## 3. Interactive Rebase (Clean Commit History)
Combine multiple small commits before merging:
\`\`\`bash
git rebase -i HEAD~3
\`\`\`

## 4. Stashing Specific Files
\`\`\`bash
git stash push -m "work in progress" src/components/Header.jsx
git stash pop
\`\`\`

Mastering Git command line gives you total control over version history.`
}];

// --- PRO MARKDOWN RENDERER & CODE HIGHLIGHTER COMPONENT ---
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0d1117] shadow-2xl text-left font-mono">
      {/* IDE Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-700/70 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-bold uppercase tracking-widest text-emerald-400 text-[11px]">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs border border-slate-700 shadow-sm"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <FiCheck className="text-emerald-400" size={14} />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={13} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content Area */}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed text-[#e6edf3] font-mono scrollbar-thin scrollbar-thumb-slate-700">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ProMarkdownRenderer = ({ content, isLightMode, fontSizeClass }) => {
  // Parse inline markdown: bold, inline code, links, italic
  const renderInline = (text) => {
    if (!text) return '';
    const parts = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
    let match;
    let lastIndex = 0;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={key++} className={isLightMode ? "font-extrabold text-slate-950" : "font-extrabold text-white"}>
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={key++}
            className={`px-2 py-0.5 mx-0.5 rounded text-sm font-mono font-medium ${
              isLightMode
                ? "bg-slate-200/90 text-emerald-800 border border-slate-300"
                : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            }`}
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith('[') && token.includes('](')) {
        const linkText = token.slice(1, token.indexOf(']('));
        const linkUrl = token.slice(token.indexOf('](') + 2, -1);
        parts.push(
          <a
            key={key++}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--theme-main)] font-semibold underline underline-offset-4 hover:opacity-80 inline-flex items-center gap-1"
          >
            {linkText} <FiExternalLink size={12} />
          </a>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(<em key={key++} className="italic">{token.slice(1, -1)}</em>);
      } else {
        parts.push(token);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Parse block-level markdown structures
  const renderBlocks = () => {
    const blocks = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 1. Code Blocks (```)
      if (line.trim().startsWith('```')) {
        const lang = line.trim().replace('```', '').trim();
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        blocks.push(
          <CodeBlock key={`code-${i}`} language={lang} code={codeLines.join('\n')} />
        );
        continue;
      }

      // 2. Headings (##, ###, ####)
      if (line.startsWith('## ')) {
        const titleText = line.replace('## ', '').trim();
        const slug = titleText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        blocks.push(
          <h2
            key={`h2-${i}`}
            id={slug}
            className={`text-2xl md:text-3xl font-extrabold tracking-tight mt-12 mb-6 pb-3 border-b flex items-center gap-3 scroll-mt-28 ${
              isLightMode
                ? "text-slate-900 border-slate-200"
                : "text-white border-white/10"
            }`}
          >
            <span className="w-2.5 h-7 rounded-full bg-[color:var(--theme-main)] inline-block flex-shrink-0" />
            {titleText}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        const titleText = line.replace('### ', '').trim();
        const slug = titleText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        blocks.push(
          <h3
            key={`h3-${i}`}
            id={slug}
            className={`text-xl md:text-2xl font-bold tracking-tight mt-9 mb-4 scroll-mt-28 ${
              isLightMode ? "text-slate-900" : "text-white"
            }`}
          >
            {titleText}
          </h3>
        );
        i++;
        continue;
      }

      if (line.startsWith('#### ')) {
        const titleText = line.replace('#### ', '').trim();
        blocks.push(
          <h4
            key={`h4-${i}`}
            className={`text-lg font-bold mt-7 mb-3 ${
              isLightMode ? "text-slate-800" : "text-slate-200"
            }`}
          >
            {titleText}
          </h4>
        );
        i++;
        continue;
      }

      // 3. Tables (| col1 | col2 |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableLines = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0].split('|').slice(1, -1).map(c => c.trim());
          const bodyRows = tableLines.slice(2).map(r => r.split('|').slice(1, -1).map(c => c.trim()));

          blocks.push(
            <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className={isLightMode ? "bg-slate-100 text-slate-900 border-b border-slate-300" : "bg-[#161b22] text-white border-b border-white/10"}>
                    {headerCells.map((h, idx) => (
                      <th key={idx} className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs">
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={isLightMode ? "divide-y divide-slate-200 bg-white" : "divide-y divide-white/5 bg-[#0f131a]"}>
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={isLightMode ? "hover:bg-slate-50 transition-colors" : "hover:bg-white/5 transition-colors"}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`px-5 py-3.5 ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // 4. Blockquotes (> quote)
      if (line.trim().startsWith('>')) {
        const quoteText = line.trim().replace(/^>\s*/, '');
        blocks.push(
          <blockquote
            key={`quote-${i}`}
            className={`my-7 pl-6 py-4 rounded-r-2xl border-l-4 border-[color:var(--theme-main)] italic font-serif ${
              isLightMode
                ? "bg-slate-100/90 text-slate-800"
                : "bg-white/5 text-slate-300"
            }`}
          >
            {renderInline(quoteText)}
          </blockquote>
        );
        i++;
        continue;
      }

      // 5. Bullet Lists (- or *)
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ') || line.trim().startsWith('* ')) {
        const listItems = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• ') || lines[i].trim().startsWith('* '))
        ) {
          const itemText = lines[i].trim().replace(/^[-•*]\s*/, '');
          listItems.push(itemText);
          i++;
        }
        blocks.push(
          <ul key={`ul-${i}`} className="my-6 space-y-3.5 pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[color:var(--theme-main)] mt-2.5 flex-shrink-0" />
                <span className={isLightMode ? "text-slate-800 leading-relaxed" : "text-slate-200 leading-relaxed"}>
                  {renderInline(item)}
                </span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // 6. Numbered Lists (1. 2.)
      if (/^\d+\.\s/.test(line.trim())) {
        const listItems = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          const itemText = lines[i].trim().replace(/^\d+\.\s*/, '');
          listItems.push(itemText);
          i++;
        }
        blocks.push(
          <ol key={`ol-${i}`} className="my-6 space-y-3.5 pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[color:var(--theme-main)]/15 border border-[color:var(--theme-main)]/30 text-[color:var(--theme-main)] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className={isLightMode ? "text-slate-800 leading-relaxed" : "text-slate-200 leading-relaxed"}>
                  {renderInline(item)}
                </span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // 7. Regular Paragraphs
      if (line.trim() !== '') {
        blocks.push(
          <p
            key={`p-${i}`}
            className={`my-6 leading-[1.85] tracking-normal ${fontSizeClass} ${
              isLightMode ? "text-slate-800 font-normal" : "text-slate-300 font-normal"
            }`}
          >
            {renderInline(line)}
          </p>
        );
      }

      i++;
    }

    return blocks;
  };

  return <div className="pro-markdown-body">{renderBlocks()}</div>;
};

// --- PRO SINGLE BLOG POST READER PAGE ---
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = HARDCODED_ARTICLES.find(a => a.id === id);

  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => !document.documentElement.classList.contains('dark'));
  const [fontSizeLevel, setFontSizeLevel] = useState('base'); // 'sm' | 'base' | 'lg'
  const [scrollProgress, setScrollProgress] = useState(0);

  const recordedArticleId = useRef(null);

  // Sync with global theme switcher (Dark/Light mode)
  useEffect(() => {
    const syncTheme = () => {
      setIsLightMode(!document.documentElement.classList.contains('dark'));
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Scroll Reading Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!article) return;
    setIsLiked(false);

    const docRef = doc(db, 'articleStats', article.id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setStats({
          views: docSnap.data().views || 0,
          likes: docSnap.data().likes || 0
        });
      }
    });

    if (recordedArticleId.current !== article.id) {
      recordedArticleId.current = article.id;
      setDoc(docRef, { views: increment(1) }, { merge: true }).catch(console.error);
    }

    return () => unsubscribe();
  }, [article]);

  const handleLike = async () => {
    if (isLiked || !article) return;
    setIsLiked(true);
    const docRef = doc(db, 'articleStats', article.id);
    try {
      await setDoc(docRef, { likes: increment(1) }, { merge: true });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article Transmission Link Copied!");
  };

  if (!article) return <div className="min-h-screen flex items-center justify-center text-white">Article Not Found</div>;

  // Extract table of contents headings (## )
  const tocHeadings = article.content
    .split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => {
      const title = l.replace('## ', '').trim();
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { title, slug };
    });

  // Related articles (same category or top trending)
  const relatedArticles = HARDCODED_ARTICLES
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  const fontSizeClasses = {
    sm: 'text-base md:text-lg',
    base: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl'
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Shavin Heshan Joseph</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.tags.join(", ")} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={`https://shavinjoseph.me/blog/${article.id}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.summary,
            "image": article.coverImage,
            "datePublished": article.date,
            "author": {
              "@type": "Person",
              "name": "Shavin Heshan Joseph",
              "url": "https://shavinjoseph.me"
            },
            "publisher": {
              "@type": "Person",
              "name": "Shavin Heshan Joseph"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://shavinjoseph.me/blog/${article.id}`
            },
            "keywords": article.tags.join(", ")
          })}
        </script>
      </Helmet>

      {/* TOP SCROLL READING PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-[color:var(--theme-main)] transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className={`w-full min-h-screen transition-colors duration-500 ${
        isLightMode ? "bg-[#f8fafc] text-slate-900" : "bg-[#090b0f] text-slate-100"
      }`}>
        <motion.article 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-full pt-28 pb-32 md:pt-32 md:pb-24 px-5 md:px-8 max-w-[920px] mx-auto overflow-x-hidden"
        >
          {/* NAVIGATION RETURN LINK */}
          <div className="mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
            <button 
              onClick={() => navigate('/blog')} 
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors text-[color:var(--theme-main)] font-bold hover:underline"
            >
              <FiArrowLeft size={14} /> Back to Vault
            </button>
          </div>

          {/* CATEGORY & METADATA */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider mb-6">
            <span className="px-3.5 py-1 rounded-full bg-[color:var(--theme-main)]/15 text-[color:var(--theme-main)] font-bold border border-[color:var(--theme-main)]/30">
              {article.category}
            </span>
            <span className={isLightMode ? "text-slate-500 font-semibold" : "text-[#5b6472]"}>
              {article.date}
            </span>
          </div>

          {/* ARTICLE TITLE */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.15] ${
            isLightMode ? "text-slate-950" : "text-white"
          }`}>
            {article.title}
          </h1>

          {/* AUTHOR & METRICS BAR */}
          <div className={`flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl mb-10 border ${
            isLightMode 
              ? "bg-white border-slate-200 shadow-sm text-slate-700" 
              : "bg-[#12151b] border-white/10 text-slate-300"
          }`}>
            {/* Author Badge */}
            <div className="flex items-center gap-3">
              <img 
                src="/profile.jpg" 
                alt="Shavin Heshan Joseph" 
                className="w-11 h-11 rounded-full object-cover border-2 border-[color:var(--theme-main)]"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span className={isLightMode ? "text-slate-900" : "text-white"}>Shavin Heshan Joseph</span>
                  <FiCheckCircle className="text-emerald-500" size={14} />
                </div>
                <div className="text-xs text-slate-500 font-mono">Software & App Developer • University of Colombo</div>
              </div>
            </div>

            {/* Read Time & Stats */}
            <div className="flex items-center gap-5 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-slate-500"><FiClock size={14} /> {article.readTime}</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold"><FiEye size={14} /> {stats.views} Reads</span>
              
              {/* Share & Like */}
              <div className="flex items-center gap-2 ml-2">
                <button 
                  onClick={handleShare} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    isLightMode ? "border-slate-300 hover:bg-slate-100 text-slate-700" : "border-white/10 hover:bg-white/10 text-slate-300"
                  }`}
                  title="Share Transmission"
                >
                  <FiShare2 size={14} />
                </button>

                <button 
                  onClick={handleLike} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs font-bold transition-all ${
                    isLiked 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-500' 
                      : isLightMode 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' 
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                  }`}
                >
                  <FiHeart className={isLiked ? "fill-rose-500" : ""} size={14} /> {stats.likes}
                </button>
              </div>
            </div>
          </div>

          {/* COVER IMAGE */}
          {article.coverImage && (
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-slate-200 dark:border-white/10 shadow-2xl">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* TABLE OF CONTENTS (IF HEADINGS EXIST) */}
          {tocHeadings.length > 0 && (
            <div className={`p-6 rounded-2xl mb-12 border ${
              isLightMode 
                ? "bg-slate-50 border-slate-200 text-slate-900" 
                : "bg-[#12151b]/80 border-white/10 text-white"
            }`}>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider mb-3 text-[color:var(--theme-main)]">
                <FiList size={16} /> Table of Contents
              </div>
              <ul className="space-y-2 text-sm font-medium">
                {tocHeadings.map((h, i) => (
                  <li key={i}>
                    <a 
                      href={`#${h.slug}`} 
                      className={`hover:text-[color:var(--theme-main)] transition-colors flex items-center gap-2 ${
                        isLightMode ? "text-slate-700" : "text-slate-300"
                      }`}
                    >
                      <span className="text-xs text-[color:var(--theme-main)] font-mono">0{i+1}.</span> {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PRO MARKDOWN CONTENT RENDERER */}
          <ProMarkdownRenderer 
            content={article.content} 
            isLightMode={isLightMode} 
            fontSizeClass={fontSizeClasses[fontSizeLevel]} 
          />

          {/* TAGS */}
          <div className="flex flex-wrap gap-2.5 my-12 pt-8 border-t border-slate-200 dark:border-white/10">
            {article.tags.map((tag, i) => (
              <span 
                key={i} 
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                  isLightMode 
                    ? "bg-slate-100 border-slate-300 text-slate-700" 
                    : "bg-white/5 border-white/10 text-[#8a93a6]"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* RELATED ARTICLES FOOTER */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
            <h3 className={`font-mono text-xs uppercase tracking-widest mb-6 font-bold flex items-center gap-2 ${
              isLightMode ? "text-slate-900" : "text-white"
            }`}>
              <FiBookOpen className="text-[color:var(--theme-main)]" size={16} /> Recommended Transmissions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <Link key={rel.id} to={`/blog/${rel.id}`} className="block group">
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isLightMode 
                      ? "bg-white border-slate-200 group-hover:border-[color:var(--theme-main)] shadow-sm" 
                      : "bg-[#12151b] border-white/10 group-hover:border-[color:var(--theme-main)]"
                  }`}>
                    <span className="font-mono text-[10px] uppercase font-bold text-[color:var(--theme-main)]">
                      {rel.category}
                    </span>
                    <h4 className={`font-bold text-base mt-2 line-clamp-2 transition-colors ${
                      isLightMode ? "text-slate-900 group-hover:text-[color:var(--theme-main)]" : "text-white group-hover:text-[color:var(--theme-main)]"
                    }`}>
                      {rel.title}
                    </h4>
                    <p className={`text-xs mt-2 line-clamp-2 ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
                      {rel.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </>
  );
};

// --- 2. MAIN BLOG LIST PAGE WITH FLAWLESS MAGAZINE EDITORIAL DESIGN ---
const BlogHome = () => {
  const [stats, setStats] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'popular' | 'likes'
  const [visibleCount, setVisibleCount] = useState(9);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "articleStats"), (snapshot) => {
      const statsData = {};
      snapshot.forEach((doc) => {
        statsData[doc.id] = doc.data();
      });
      setStats(statsData);
    });

    return () => unsubscribe();
  }, []);

  const intelligentArticles = HARDCODED_ARTICLES.map(article => ({
    ...article,
    views: stats[article.id]?.views || 0,
    likes: stats[article.id]?.likes || 0
  }));

  const totalViews = Object.values(stats).reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalLikes = Object.values(stats).reduce((acc, curr) => acc + (curr.likes || 0), 0);

  const rawCategories = Array.from(new Set(HARDCODED_ARTICLES.map(a => a.category)));
  const categoryCounts = {
    All: HARDCODED_ARTICLES.length,
    ...rawCategories.reduce((acc, cat) => {
      acc[cat] = HARDCODED_ARTICLES.filter(a => a.category === cat).length;
      return acc;
    }, {})
  };
  const categories = ['All', ...rawCategories];

  // Featured Spotlight Post (#1 Newest or Top Rated)
  const featuredArticle = intelligentArticles[0];

  // Sorting & Filtering
  const sortedArticles = [...intelligentArticles].sort((a, b) => {
    if (sortBy === 'popular') return (b.views + b.likes * 2) - (a.views + a.likes * 2);
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.date) - new Date(a.date);
  });

  const trendingArticles = [...intelligentArticles].sort((a, b) => (b.views + b.likes * 2) - (a.views + a.likes * 2)).slice(0, 3);

  const filteredArticles = sortedArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Engineering Logs & Transmissions | Shavin Heshan Joseph</title>
        <meta name="description" content="Technical engineering logs, architectural deep dives, AI research, Windows power user guides, and software development transmissions by Shavin Heshan Joseph." />
        <link rel="canonical" href="https://shavinjoseph.me/blog" />
        <meta property="og:title" content="Engineering Logs | Shavin Heshan Joseph" />
        <meta property="og:description" content="Technical engineering logs, architectural deep dives, and system development transmissions by Shavin Heshan Joseph." />
        <meta property="og:url" content="https://shavinjoseph.me/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full min-h-screen pt-28 pb-32 md:pt-32 md:pb-24 overflow-x-hidden"
      >
        {/* --- 1. HERO MAGAZINE HEADER --- */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="font-mono text-xs md:text-sm tracking-[0.08em] text-[color:var(--theme-main)] mb-3 flex items-center gap-3 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-main)] animate-pulse" />
                <span className="uppercase tracking-widest">Engineering & Architecture Publication</span>
              </div>
              <h1 className="font-bold text-[clamp(38px,7vw,84px)] leading-[0.9] tracking-tight uppercase hero-title-solid mb-4">
                Engineering <span className="hero-title-stroke">Logs.</span>
              </h1>
              <p className="max-w-2xl text-slate-600 dark:text-[#8a93a6] text-sm md:text-base leading-relaxed">
                Technical engineering logs, architectural deep dives, Windows 11 kernel diagnostics, Cisco networking protocols, AI systems, and full-stack software transmissions by Shavin Heshan Joseph.
              </p>
            </div>

            {/* METRICS STATS BADGES */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-3 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-main)]" />
                <span className="text-slate-500 dark:text-[#8a93a6] uppercase text-[10px] tracking-wider font-bold">Transmissions</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{HARDCODED_ARTICLES.length}</span>
              </div>

              {totalViews > 0 && (
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-3 font-mono text-xs">
                  <FiEye className="text-emerald-500" size={16} />
                  <span className="text-slate-500 dark:text-[#8a93a6] uppercase text-[10px] tracking-wider font-bold">Reads</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{totalViews}</span>
                </div>
              )}

              {totalLikes > 0 && (
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-3 font-mono text-xs">
                  <FiHeart className="text-rose-500" size={16} />
                  <span className="text-slate-500 dark:text-[#8a93a6] uppercase text-[10px] tracking-wider font-bold">Likes</span>
                  <span className="font-extrabold text-rose-500 text-sm">{totalLikes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- 2. FEATURED SPOTLIGHT EDITORIAL BANNER (#1 ARTICLE) --- */}
        {featuredArticle && !searchQuery && selectedCategory === 'All' && (
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 mb-16">
            <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl lg:grid lg:grid-cols-12 items-stretch transition-all duration-500 hover:border-[color:var(--theme-main)]/60">
              
              {/* Left Column: Big Cover Image */}
              <div className="lg:col-span-7 relative min-h-[300px] md:min-h-[380px] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[color:var(--theme-main)] text-black shadow-md flex items-center gap-1.5">
                    <FiZap size={12} /> Spotlight Transmission
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Details */}
              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-[#8a93a6] uppercase tracking-wider mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FiClock size={13} /> {featuredArticle.readTime}</span>
                  </div>

                  <Link to={`/blog/${featuredArticle.id}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-4 group-hover:text-[color:var(--theme-main)] transition-colors">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 dark:text-[#8a93a6] text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>

                {/* Footer & CTA */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                      SJ
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">Shavin Heshan Joseph</div>
                      <div className="font-mono text-[10px] text-slate-500 dark:text-[#8a93a6]">{featuredArticle.date}</div>
                    </div>
                  </div>

                  <Link 
                    to={`/blog/${featuredArticle.id}`} 
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-[color:var(--theme-main)] hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- 3. TOP 3 TRENDING SPOTLIGHT GRID --- */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 mb-16">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest mb-6 border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                <FiTrendingUp className="text-rose-500 animate-pulse" size={16} /> 
                <span>Popular & Trending Transmissions</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-[#5b6472]">Most Read Engineering Logs</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {trendingArticles.map((article, index) => (
                <Link key={`trending-grid-${article.id}`} to={`/blog/${article.id}`}>
                  <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-[color:var(--theme-main)]">
                    
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md flex items-center gap-1">
                          <FiZap size={10} /> #{index + 1} Trending
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px]">
                        <FiEye size={11} className="text-emerald-400" /> {article.views} Reads
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 dark:text-[#8a93a6] uppercase tracking-wider mb-2">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-base md:text-lg leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover:text-[color:var(--theme-main)] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-[#8a93a6] text-xs leading-relaxed line-clamp-2 flex-grow">
                        {article.summary}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. CONTROL TOOLBAR (SEARCH + SORT + CATEGORY TABS) --- */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between bg-white dark:bg-[#12151b] backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-4 md:p-6 shadow-md dark:shadow-2xl">
            
            {/* SEARCH INPUT BOX */}
            <div className="relative flex-grow max-w-lg">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#5b6472]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
                placeholder="Search by title, keyword, tag, or topic..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-[#090b0f]/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-[#5b6472] focus:outline-none focus:border-[color:var(--theme-main)] transition-colors font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>

            {/* SORT SELECTOR DROPDOWN */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-500 dark:text-[#5b6472] uppercase tracking-wider flex items-center gap-1 shrink-0">
                <FiSliders size={12} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-[#090b0f] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold focus:outline-none focus:border-[color:var(--theme-main)] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular (Reads)</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>

          </div>

          {/* CATEGORY TABS WITH COUNTS */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setVisibleCount(9); }}
                  className={`whitespace-nowrap px-4 py-2 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[var(--theme-main)] text-black font-bold shadow-md'
                      : 'bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8a93a6] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 5. EDITORIAL ARTICLES STREAM GRID --- */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-200">
              <FiClock className="text-[color:var(--theme-main)]" size={16} /> 
              <span>
                {selectedCategory !== 'All' ? `${selectedCategory} Transmissions` : 'All Engineering Logs'}
              </span>
            </div>
            <span className="text-slate-500 dark:text-[#5b6472] text-[11px]">
              Showing {filteredArticles.length} Transmissions
            </span>
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#12151b]/40 rounded-3xl border border-slate-200 dark:border-white/5 font-mono shadow-sm">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold uppercase mb-2">No Transmissions Found</h3>
              <p className="text-slate-600 dark:text-[#8a93a6] text-xs max-w-sm mx-auto mb-6">No matching engineering logs were found for "{searchQuery}". Try adjusting your keywords or clearing topic filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-6 py-3 rounded-2xl bg-[var(--theme-main)] text-black font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <motion.div 
                    whileHover={{ y: -6 }} 
                    className="flex flex-col bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-[color:var(--theme-main)] transition-all duration-300 h-full group shadow-sm hover:shadow-xl"
                  >
                    {/* IMAGE HEADER */}
                    <div className="w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                      <img 
                        src={article.coverImage} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                        alt={article.title} 
                      />
                      
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/20 text-emerald-800 dark:text-emerald-400 shadow-sm">
                          {article.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-4 flex items-center gap-3 font-mono text-[10px] text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                        <span className="flex items-center gap-1"><FiEye className="text-emerald-400" /> {article.views}</span>
                        <span className="flex items-center gap-1"><FiHeart className="text-rose-400" /> {article.likes}</span>
                      </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 dark:text-[#5b6472] uppercase tracking-widest mb-3">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-[#8a93a6]"><FiClock size={11} /> {article.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug line-clamp-2 group-hover:text-[color:var(--theme-main)] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-slate-600 dark:text-[#8a93a6] text-sm leading-relaxed mb-6 flex-grow line-clamp-3 font-sans">
                        {article.summary}
                      </p>

                      {/* TAG CHIPS */}
                      {article.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {article.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="font-mono text-[9px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-[#8a93a6]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-4 border-t border-slate-200 dark:border-white/5 font-mono text-xs text-[color:var(--theme-main)] font-semibold flex items-center justify-between group-hover:translate-x-1 transition-transform">
                        <span className="flex items-center gap-2">Read Transmission <FiBookOpen size={13} /></span>
                        <FiArrowRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.main>
    </>
  );
};

// --- 3. MASTER ROUTER COMPONENT ---
const Blog = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogHome />} />
      <Route path="/:id" element={<BlogPost />} />
    </Routes>
  );
};

export default Blog;