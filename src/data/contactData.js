// Data statis untuk halaman Contact.
// TODO backend: pindahkan ke API/CMS (mis. GET /api/company-profile) kalau sudah ada backend.

export const JOURNEY_TIMELINE = [
  {
    id: "genesis",
    year: "2018 — THE GENESIS",
    title: "The First Blueprint",
    desc: "Started as a boutique lab in San Francisco, focusing on liquid-cooled workstations for architects.",
  },
  {
    id: "expansion",
    year: "2020 — EXPANSION",
    title: "Going Global",
    desc: "Launched our proprietary chassis design and opened logistics hubs in Berlin and Tokyo.",
  },
  {
    id: "ai-shift",
    year: "2024 — PRESENT",
    title: "Shift into AI",
    desc: "Integrating dedicated neural processing units into every custom build for the next generation of creative AI.",
  },
];

export const BUSINESS_HOURS = [
  { id: "weekday", day: "Mon — Fri", hours: "10:00 AM — 8:00 PM" },
  { id: "saturday", day: "Saturday", hours: "11:00 AM — 6:00 PM" },
  { id: "sunday", day: "Sunday", hours: "Appointment Only", highlight: true },
];

export const PRIMARY_HUB = {
  label: "Primary Hub",
  addressLines: ["152 Precision Way, Tech District", "San Francisco, CA 94105"],
  mapQuery: "152 Precision Way, Tech District, San Francisco, CA 94105",
};

export const CONTACT_SUBJECTS = [
  "Custom PC Inquiry",
  "Technical Support",
  "Partnership & Wholesale",
  "General Question",
];

export const CONTACT_FAQS = [
  {
    id: "lead-time",
    q: "How long is the typical lead time?",
    a: "Most custom builds ship within 10–15 business days after your specification is finalized, depending on component availability.",
  },
  {
    id: "shipping",
    q: "Do you offer international shipping?",
    a: "Yes, we ship to over 40 countries with fully insured freight and real-time tracking on every order.",
  },
  {
    id: "upgrade",
    q: "Can I upgrade my SHIFTCOM later?",
    a: "Every SHIFTCOM build is designed for modular upgrades. Our team can advise on compatible components at any time.",
  },
];

export const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com/shiftcom" },
  { id: "twitter", label: "X (Twitter)", href: "https://twitter.com/shiftcom" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/shiftcom" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@shiftcom" },
];
