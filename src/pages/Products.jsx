import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* ─── CATEGORY METADATA ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "immuno-assay",  label: "Immuno Assay",  icon: "🧬", color: "#2563eb", accent: "#3b82f6" },
  { id: "molecular",     label: "Molecular",      icon: "🔬", color: "#7c3aed", accent: "#8b5cf6" },
  { id: "microbiology",  label: "Microbiology",   icon: "🦠", color: "#059669", accent: "#10b981" },
  { id: "haematology",   label: "Haematology",    icon: "🩸", color: "#c41e3a", accent: "#e84060" },
  { id: "coagulation",   label: "Coagulation",    icon: "🧪", color: "#d97706", accent: "#f59e0b" },
  { id: "chemistry",     label: "Chemistry",      icon: "⚗️",  color: "#0891b2", accent: "#06b6d4" },
  { id: "urinalysis",    label: "Urinalysis",     icon: "🔭", color: "#16a34a", accent: "#22c55e" },
];

/* ─── PRODUCT DATA ───────────────────────────────────────────────────────── */
const PRODUCTS = {
  "immuno-assay": [
    {
      id: "vidas-30",
      name: "VIDAS® 30",
      manufacturer: "bioMérieux",
      badge: "AUTOMATED",
      tagline: "Fully automated ELFA immunoassay system",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/vidas_30_left_0-300x193.jpg",
      description: "The VIDAS® 30 is a fully automated benchtop immunoassay analyser using the ELFA (Enzyme Linked Fluorescent Assay) technique. It provides reliable, reproducible results across a broad menu of infectious disease, endocrinology, and cardiac markers.",
      features: ["30 simultaneous tests", "ELFA technology", "Open 24/7 – random access", "80+ assay menu", "Minimal hands-on time", "CE-IVD certified"],
      specs: { "Capacity": "30 tests simultaneously", "Technology": "ELFA (Enzyme Linked Fluorescent Assay)", "Menu": "80+ parameters", "Sample types": "Serum, plasma, urine, CSF", "Throughput": "Random access", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/SsMM2m_R2dM",
      highlights: ["Random access", "80+ assay menu", "ELFA technology"],
      useCases: ["Hospital labs", "Reference centres", "Blood banks"]
    },
    {
      id: "mini-vidas",
      name: "mini VIDAS®",
      manufacturer: "bioMérieux",
      badge: "COMPACT",
      tagline: "Compact immunoassay for urgent testing",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/minvidas-300x248.jpg",
      description: "The mini VIDAS® is a compact, semi-automated immunoassay system ideal for emergency testing and low-volume laboratories. Using the same proven ELFA technology as the VIDAS 30, it delivers trusted results from a small footprint.",
      features: ["6 test positions", "ELFA technology", "Stat testing ready", "No sample pre-treatment", "Simple 2-step operation", "Wide assay menu"],
      specs: { "Capacity": "6 simultaneous tests", "Technology": "ELFA", "Footprint": "Compact benchtop", "Sample": "Minimal volume required", "Mode": "Semi-automated", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/SsMM2m_R2dM",
      highlights: ["Emergency STAT", "6-position compact", "Simple operation"],
      useCases: ["Emergency labs", "Small hospitals", "POC testing"]
    },
  ],

  "molecular": [
    {
      id: "biofire-filmarray",
      name: "BioFire® FilmArray®",
      manufacturer: "bioMérieux",
      badge: "RAPID PCR",
      tagline: "Syndromic testing in under 60 minutes",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Biofire-Film-array-300x255.jpg",
      description: "The BioFire FilmArray is a rapid multiplex PCR system that simultaneously tests for dozens of pathogens in a single closed pouch. Delivering syndromic panel results in 45–60 minutes, it transforms clinical decision-making in sepsis, respiratory, meningitis, and GI disease.",
      features: ["45–60 min results", "Multiplex PCR (20–40 targets per panel)", "Fully closed pouch system", "No open amplification risk", "Multiple syndromic panels", "Minimal hands-on time"],
      specs: { "Time to result": "45–60 minutes", "Technology": "Nested multiplex PCR", "Panels": "Respiratory, Blood Culture ID, GI, Meningitis, NP", "Pouch": "Fully closed, self-contained", "Sample": "1–200 µL", "Certification": "CE-IVD, FDA cleared" },
      youtube: "https://www.youtube.com/embed/1p8JNQZ5Xak",
      highlights: ["45-min results", "Syndromic panels", "Closed PCR system"],
      useCases: ["Emergency departments", "ICUs", "Microbiology labs"]
    },
  ],

  "microbiology": [
    {
      id: "vitek-2-compact",
      name: "VITEK® 2 Compact",
      manufacturer: "bioMérieux",
      badge: "#1 WORLDWIDE",
      tagline: "Gold standard automated ID/AST system",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/vitek-2-compact-1-300x225.png",
      description: "The VITEK 2 Compact is the world's leading automated microbial identification and antimicrobial susceptibility testing system. Using miniaturised card technology, it identifies gram-positive, gram-negative bacteria, yeasts, and anaerobes in 2–10 hours.",
      features: ["2–10 hour ID results", "15/30/60 card capacity", "Miniaturised card format", "Gram +/- bacteria, yeasts, anaerobes", "21 CFR Part 11 compliant", "Automated interpretation"],
      specs: { "ID time": "2–10 hours", "Capacity": "15, 30, or 60 cards", "Organisms": "Gram+/-, yeasts, anaerobes", "Technology": "Colorimetric", "Compliance": "21 CFR Part 11", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/GLYP9vGylAY",
      highlights: ["2–10hr ID", "Worldwide #1", "AST + ID in one"],
      useCases: ["Clinical microbiology", "Infection control", "Reference labs"]
    },
    {
      id: "bact-alert-3d",
      name: "BACT/ALERT® 3D",
      manufacturer: "bioMérieux",
      badge: "BLOOD CULTURE",
      tagline: "Automated blood culture detection system",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Bact-alert-3d-120-_14028-243x300.jpg",
      description: "The BACT/ALERT 3D is an automated, non-invasive blood culture detection system using colorimetric CO₂ sensors for real-time monitoring. It supports optimal recovery of bacteria, fungi, and mycobacteria with 120–240 bottle capacity.",
      features: ["Real-time colorimetric detection", "120–240 bottle capacity", "Only 2 bottle types", "Modular & scalable", "Remote monitoring ready", "Plastic triple-layer bottles"],
      specs: { "Capacity": "120–240 bottles", "Detection": "Colorimetric CO₂", "Bottle types": "2 (aerobic + anaerobic)", "Monitoring": "Continuous, real-time", "Design": "Modular + scalable", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/wHkPB2I0Wmc",
      highlights: ["Non-invasive detection", "Scalable to 240 bottles", "2 bottle types only"],
      useCases: ["Sepsis diagnosis", "Blood banks", "Infection labs"]
    },
    {
      id: "vitek-ms",
      name: "VITEK® MS",
      manufacturer: "bioMérieux",
      badge: "MALDI-TOF",
      tagline: "Mass spectrometry for rapid microbial ID",
      image: "https://hasscientific.com/wp-content/uploads/2020/06/slider4-300x134.png",
      description: "VITEK MS uses MALDI-TOF mass spectrometry to identify microorganisms in less than 1 minute per organism. It can process hundreds of isolates per day from a single technician, dramatically reducing time-to-result in clinical microbiology.",
      features: ["< 1 minute per ID", "Bacteria, fungi, mycobacteria", "Hundreds of isolates/day", "Minimal sample prep", "Continually updated database", "CE-IVD compliant"],
      specs: { "ID time": "< 1 minute", "Technology": "MALDI-TOF MS", "Database": "> 25,000 spectra", "Organisms": "Bacteria, yeasts, mycobacteria", "Throughput": "High – hundreds/day", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/tVMkBBnC4YY",
      highlights: ["< 1 min ID", "MALDI-TOF precision", "Massive throughput"],
      useCases: ["High-volume labs", "Reference centres", "Teaching hospitals"]
    },
  ],

  "haematology": [
    {
      id: "xp-300", name: "XP-300", manufacturer: "Sysmex", badge: "COMPACT",
      tagline: "Reliable 3-part differential for any lab",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/Sysmex-XP-300-400x400-1-300x300.jpg",
      description: "The XP-300 is a compact 3-part differential haematology analyser for small to mid-sized labs. With 19 parameters and up to 60 samples/hr, it delivers reliable CBC results with minimal footprint and reagent consumption.",
      features: ["3-part differential CBC", "Up to 60 samples/hr", "19 reportable parameters", "Minimal maintenance", "Reagent optimisation", "USB & LAN connectivity"],
      specs: { "Throughput": "Up to 60 samples/hr", "Parameters": "19 reportable", "Sample Volume": "10 µL (whole blood)", "Differential": "3-part", "Connectivity": "USB, LAN", "Display": "LCD color screen" },
      youtube: "https://www.youtube.com/embed/5rl4N8OFvXg",
      highlights: ["Compact footprint", "Low reagent consumption", "Easy operation"],
      useCases: ["Clinics", "Small hospitals", "POC labs"]
    },
    {
      id: "xn-350", name: "XN-350", manufacturer: "Sysmex", badge: "5-PART DIFF",
      tagline: "5-part differential intelligence, compact form",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/Sysmex-XN-350-400x400-1-300x300.jpg",
      description: "The XN-350 delivers cutting-edge 5-part differential analysis in a compact stand-alone configuration. With integrated IPU and touchscreen — no separate PC needed. Future-proof with scalable upgrades.",
      features: ["Compact 5-part differential", "Single sample open mode", "Fully integrated IPU + touchscreen", "25 µL aspiration volume", "Scalable upgrades", "Cyanide-free SLS haemoglobin"],
      specs: { "Throughput": "Up to 60 samples/hr", "Parameters": "30+ reportable", "Sample Volume": "25 µL (whole blood)", "Differential": "5-part DIFF", "Technology": "Fluorescence flow cytometry", "Display": "Integrated LCD touchscreen" },
      youtube: "https://www.youtube.com/embed/rC_LSOY0f0w",
      highlights: ["No PC required", "Fluorescence FCM", "Future-proof upgrades"],
      useCases: ["District hospitals", "Independent labs", "Mid-volume settings"]
    },
    {
      id: "xn-450", name: "XN-450", manufacturer: "Sysmex", badge: "RETICULOCYTE",
      tagline: "Advanced parameters, clinical confidence",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/Sysmex-XN-450-400x400-1-300x300.jpg",
      description: "The XN-450 bridges mid-volume labs with reticulocyte and extended analytical capabilities. Multi-mode operation supports CBC, DIFF, and RET analysis in a single run.",
      features: ["5-part DIFF with RET channel", "Reticulocyte parameter reporting", "Up to 80 samples/hr", "35+ reportable parameters", "4 operational modes", "Network + remote servicing"],
      specs: { "Throughput": "Up to 80 samples/hr", "Parameters": "35+ reportable", "Sample Volume": "25 µL", "Modes": "CBC, CBC+DIFF, CBC+DIFF+RET", "Technology": "Fluorescence + SLS", "Connectivity": "LAN, remote servicing" },
      youtube: "https://www.youtube.com/embed/5rl4N8OFvXg",
      highlights: ["Reticulocyte reporting", "80 samples/hr", "4 modes"],
      useCases: ["Regional hospitals", "Specialty labs", "High-acuity settings"]
    },
    {
      id: "xn-550", name: "XN-550", manufacturer: "Sysmex", badge: "HIGH-THROUGHPUT",
      tagline: "High-throughput with clinical-grade precision",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/Sysmex-XN-550-400x400-1-300x300.jpg",
      description: "The XN-550 is engineered for busy laboratories requiring high-throughput CBC+DIFF analysis with advanced reporting and NRBC capability.",
      features: ["Up to 100 samples/hr", "Extended 5-part differential", "40+ reportable parameters", "NRBC reporting", "5 operational modes", "Sampler + open mode"],
      specs: { "Throughput": "Up to 100 samples/hr", "Parameters": "40+ reportable", "Sample Volume": "25 µL", "Modes": "5 (CBC to PLT-F)", "Technology": "Multi-angle fluorescence", "NRBC": "Included" },
      youtube: "https://www.youtube.com/embed/rC_LSOY0f0w",
      highlights: ["100 samples/hr", "NRBC reporting", "5 modes"],
      useCases: ["Large hospitals", "Central labs", "High-volume reference labs"]
    },
    {
      id: "xn-1000", name: "XN-1000", manufacturer: "Sysmex", badge: "FLAGSHIP",
      tagline: "42 parameters. Uncompromising diagnostic depth",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/Sysmex-XN-1000-XN-10-400x400-1-300x300.jpg",
      description: "The XN-1000 is the gold standard in standalone haematology analysis. 42 parameters, 4 modes, NRBC with every count, and 100 samples/hr make it the preferred choice for oncology and critical care.",
      features: ["42 reportable parameters", "NRBC for every blood count", "4 operational modes", "Up to 100 samples/hr", "CBC+DIFF+RET configurations", "Full network + remote servicing"],
      specs: { "Throughput": "Up to 100 samples/hr", "Parameters": "42 reportable", "Modes": "CBC, CBC+DIFF, CBC+DIFF+RET, CBC+RET", "Technology": "Fluorescence flow cytometry", "NRBC": "Standard with every CBC", "Connectivity": "LAN + remote servicing" },
      youtube: "https://www.youtube.com/embed/M60ndKMPNT4",
      highlights: ["42 parameters", "NRBC standard", "Network ready"],
      useCases: ["Teaching hospitals", "Oncology centres", "Critical care labs"]
    },
    {
      id: "xn-9000", name: "XN-9000", manufacturer: "Sysmex", badge: "AUTOMATED LINE",
      tagline: "Fully automated. Infinite scalability.",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-XN-9000-400x400-1-300x300.jpg",
      description: "The XN-9000 combines up to 6 XN modules with automated sample transport and digital morphology integration for over 500 samples/hour — a complete automated haematology laboratory.",
      features: ["Up to 6 XN modules", "500+ samples/hr combined", "Full automation + transport", "93+ reportable parameters", "Digital morphology integration", "Bidirectional LIS connectivity"],
      specs: { "Throughput": "500+ samples/hr", "Parameters": "93+ reportable", "Modules": "Up to 6 XN units", "Automation": "Full track + routing", "Morphology": "DI-60 compatible", "LIS": "Bidirectional HL7/ASTM" },
      youtube: "https://www.youtube.com/embed/dJaI44mKn3I",
      highlights: ["500+ samples/hr", "6-module system", "Full lab automation"],
      useCases: ["Reference labs", "Hospital networks", "National programmes"]
    },
  ],

  "coagulation": [
    {
      id: "ca-101", name: "CA-101", manufacturer: "Sysmex", badge: "ENTRY",
      tagline: "Reliable coagulation for smaller labs",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-CA-101-400x400-1-300x300.jpg",
      description: "The CA-101 is a semi-automated coagulation analyser designed for small to medium laboratories. It provides reliable results for routine coagulation tests including PT, APTT, and fibrinogen with an optical detection system.",
      features: ["Semi-automated coagulation", "PT, APTT, Fibrinogen", "Optical turbidimetric detection", "Up to 60 tests/hr", "Minimal footprint", "Simple operation"],
      specs: { "Throughput": "Up to 60 tests/hr", "Tests": "PT, APTT, Fibrinogen, TT", "Detection": "Optical turbidimetry", "Mode": "Semi-automated", "Display": "LCD screen", "Sample": "Citrated plasma" },
      youtube: "https://www.youtube.com/embed/REkVBXMwxdU",
      highlights: ["Semi-automated", "Routine coag panel", "Compact design"],
      useCases: ["Small labs", "Clinics", "District hospitals"]
    },
    {
      id: "ca-104", name: "CA-104", manufacturer: "Sysmex", badge: "ADVANCED",
      tagline: "Extended coagulation with specialty testing",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-CA-104-400x400-2-300x300.jpg",
      description: "The CA-104 extends the coagulation menu with specialty tests including D-Dimer, Factor assays, and Lupus anticoagulant detection alongside routine PT/APTT panels.",
      features: ["Routine + specialty tests", "D-Dimer capability", "Factor assay support", "Lupus anticoagulant", "80+ tests/hr", "Expanded reagent compatibility"],
      specs: { "Throughput": "Up to 80 tests/hr", "Tests": "PT, APTT, Fibrinogen, D-Dimer, Factors", "Detection": "Optical + mechanical", "Special": "Lupus anticoagulant", "Sample": "Citrated plasma", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/REkVBXMwxdU",
      highlights: ["D-Dimer included", "Factor assays", "Expanded menu"],
      useCases: ["Regional hospitals", "Thrombosis clinics", "Specialty labs"]
    },
    {
      id: "ca-660", name: "CA-660", manufacturer: "Sysmex", badge: "HIGH-THROUGHPUT",
      tagline: "High-throughput coagulation automation",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-CA-660-400x400-2-300x300.jpg",
      description: "The CA-660 is a fully automated, high-throughput coagulation system capable of processing 400+ tests per hour. It integrates routine and special haemostasis testing with random access and bidirectional LIS connectivity.",
      features: ["400+ tests/hr", "Fully automated random access", "Routine + special haemostasis", "Bidirectional LIS", "Multiple sample loading", "Barcode reader integrated"],
      specs: { "Throughput": "400+ tests/hr", "Tests": "Full coagulation + haemostasis panel", "Access": "Random access", "Detection": "Optical turbidimetry", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/REkVBXMwxdU",
      highlights: ["400+ tests/hr", "Full random access", "Bidirectional LIS"],
      useCases: ["Central labs", "Large hospitals", "Reference centres"]
    },
  ],

  "chemistry": [
    {
      id: "erba-xl-200", name: "ERBA XL 200", manufacturer: "ERBA Mannheim", badge: "COMPACT",
      tagline: "Entry-level clinical chemistry for any lab",
      image: "https://hasscientific.com/wp-content/uploads/2018/11/era-200x300.jpg",
      description: "The ERBA XL 200 is a compact, fully automated clinical chemistry analyser for small to mid-size laboratories. It features liquid stable reagents, wide linearity, and a broad biochemistry test menu.",
      features: ["Fully automated random access", "200 tests/hr", "Liquid stable ready-to-use reagents", "Broad biochemistry menu", "ISE module available", "Compact benchtop design"],
      specs: { "Throughput": "200 tests/hr", "Reagent positions": "Up to 30 onboard", "Technology": "Photometric analysis", "ISE": "Optional Na/K/Cl", "Sample": "Serum, plasma, urine", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/7xKbISnHKnI",
      highlights: ["200 tests/hr", "Liquid stable reagents", "ISE option"],
      useCases: ["Small hospitals", "District labs", "Clinics"]
    },
    {
      id: "erba-xl-180", name: "ERBA XL 180", manufacturer: "ERBA Mannheim", badge: "MID-RANGE",
      tagline: "Reliable chemistry for mid-volume settings",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/EBRA-XL180-300x214.jpg",
      description: "The ERBA XL 180 delivers reliable photometric testing for routine biochemistry panels with enhanced sensitivity and precision, ideal for mid-volume clinical laboratories.",
      features: ["180 tests/hr", "Photometric detection", "High precision reagents", "Broad parameter menu", "LIS connectivity", "Automated calibration"],
      specs: { "Throughput": "180 tests/hr", "Technology": "Photometric", "Parameters": "Wide biochemistry panel", "Connectivity": "LIS/LAN", "Calibration": "Automated", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/7xKbISnHKnI",
      highlights: ["Automated calibration", "High precision", "Broad panel"],
      useCases: ["District hospitals", "Mid-volume labs", "Routine testing"]
    },
    {
      id: "erba-xl-300", name: "ERBA XL300", manufacturer: "ERBA Mannheim", badge: "HIGH-VOLUME",
      tagline: "High-performance chemistry for demanding labs",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/EBRA-XL-300-228x300.jpg",
      description: "The ERBA XL300 is a high-throughput fully automated clinical chemistry system supporting routine and specialty assays with novel biomarkers, ideal for large hospital laboratories.",
      features: ["300 tests/hr", "Novel biomarker testing", "Ready-to-use reagents", "Enhanced linearity", "Bidirectional LIS", "Advanced QC module"],
      specs: { "Throughput": "300 tests/hr", "Special tests": "Novel biomarkers", "Reagents": "Liquid stable, ready-to-use", "Linearity": "Extended", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/7xKbISnHKnI",
      highlights: ["300 tests/hr", "Novel biomarkers", "Bidirectional LIS"],
      useCases: ["Large hospitals", "Reference labs", "Research centres"]
    },
    {
      id: "erba-lyte", name: "ERBA LYTE", manufacturer: "ERBA Mannheim", badge: "ELECTROLYTES",
      tagline: "Precision electrolyte analysis with ISE technology",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/ebralight.jpg",
      description: "The ERBA LYTE uses ion-selective electrode (ISE) technology for rapid, accurate electrolyte measurements in serum, plasma, and whole blood with minimal sample volume.",
      features: ["ISE electrolyte technology", "Na, K, Cl, Li measurement", "Whole blood compatible", "STAT testing ready", "Low maintenance", "Minimal sample volume"],
      specs: { "Technology": "ISE (Ion-Selective Electrode)", "Analytes": "Na, K, Cl, Li", "Sample": "Serum, plasma, whole blood", "Mode": "STAT + routine", "Maintenance": "Low — self-cleaning", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/7xKbISnHKnI",
      highlights: ["ISE technology", "Whole blood capable", "STAT ready"],
      useCases: ["Emergency labs", "ICU monitoring", "STAT testing"]
    },
  ],

  "urinalysis": [
    {
      id: "uc-1000", name: "UC-1000", manufacturer: "Sysmex", badge: "AUTOMATED",
      tagline: "Automated urine chemistry analysis",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-UC-1000-400x400-1-300x300.jpg",
      description: "The UC-1000 is a fully automated urine strip reader offering fast, reliable chemical urinalysis. It reads up to 22 parameters from standardised test strips with digital image capture for consistent, operator-independent results.",
      features: ["Up to 500 strips/hr", "22 chemical parameters", "Digital image capture", "Operator-independent results", "Automatic QC", "Bidirectional LIS connectivity"],
      specs: { "Throughput": "Up to 500 strips/hr", "Parameters": "22 chemical", "Detection": "Digital image capture", "QC": "Automatic", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/ZJ5b0QiO2Ws",
      highlights: ["500 strips/hr", "22 parameters", "Digital image"],
      useCases: ["Hospital labs", "Outpatient clinics", "Screening programmes"]
    },
    {
      id: "uc-3500", name: "UC-3500", manufacturer: "Sysmex", badge: "ADVANCED",
      tagline: "Integrated urine chemistry + particle analysis",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-UC-3500-400x400-2-300x300.jpg",
      description: "The UC-3500 combines automated urine chemistry with particle analysis for a comprehensive urinalysis solution. It enables reflex testing to reduce unnecessary sediment microscopy.",
      features: ["Combined chemistry + sediment", "Reflex testing capability", "Digital particle images", "Reduced manual microscopy", "Up to 120 samples/hr", "LIS integrated"],
      specs: { "Throughput": "Up to 120 samples/hr", "Analysis": "Chemistry + particle combined", "Reflex": "Automatic reflex testing", "Particles": "Digital image classification", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/ZJ5b0QiO2Ws",
      highlights: ["Chemistry + particles", "Reflex testing", "120 samples/hr"],
      useCases: ["Regional hospitals", "Nephrology units", "Mid-volume labs"]
    },
    {
      id: "uf-4000", name: "UF-4000", manufacturer: "Sysmex", badge: "PARTICLE EXPERT",
      tagline: "High-definition fluorescence particle analysis",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/UF-4000-300x300.jpg",
      description: "The UF-4000 is a dedicated fluorescence flow cytometry urine particle analyser providing highly differentiated sediment classification and digital particle images, reducing unnecessary sediment microscopy by up to 70%.",
      features: ["Fluorescence flow cytometry", "High-definition particle images", "Up to 70% microscopy reduction", "120 samples/hr", "Bacteria detection", "Bidirectional LIS"],
      specs: { "Throughput": "120 samples/hr", "Technology": "Fluorescence flow cytometry", "Particles": "10 classes reported", "Bacteria": "Quantitative detection", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/ZJ5b0QiO2Ws",
      highlights: ["Fluorescence FCM", "70% less microscopy", "Bacteria detection"],
      useCases: ["High-volume labs", "Nephrology centres", "Research labs"]
    },
  ],
};

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function getCatMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}

/* ─── PRODUCT MODAL ──────────────────────────────────────────────────────── */
function ProductModal({ product, catColor, isDarkMode, onClose }) {
  const [tab, setTab] = useState("overview");
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .2s ease" }}
    >
      <div className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl`}
        style={{ animation: "slideUp .3s cubic-bezier(.23,1,.32,1)" }}>
        {/* Header */}
        <div className={`flex ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} border-b`}>
          <div className="w-56 flex-shrink-0 flex items-center justify-center p-8"
            style={{ background: `${catColor}12` }}>
            <img src={product.image} alt={product.name} className="max-h-40 max-w-full object-contain"
              style={{ filter: `drop-shadow(0 8px 20px ${catColor}50)` }} />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: catColor }}>
                {product.badge}
              </span>
              <button onClick={onClose} className={`p-1.5 rounded-lg text-sm ${isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-200"} transition-colors`}>✕</button>
            </div>
            <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{product.name}</h2>
            <div className={`text-xs mb-3 font-mono ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{product.manufacturer}</div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{product.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} px-6`}>
          {["overview", "specifications", "video"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                tab === t ? "border-current" : "border-transparent"
              } ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              style={tab === t ? { color: catColor, borderColor: catColor } : {}}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: catColor }}>◆</span>
                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}>{h}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Ideal For</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.useCases.map((u, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-xs ${isDarkMode ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-gray-100 text-gray-600 border-gray-200"} border`}>{u}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "specifications" && (
            <div>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}>
                {Object.entries(product.specs).map(([k, v], i) => (
                  <div key={i} className={`flex justify-between px-4 py-3 ${
                    i % 2 === 0
                      ? isDarkMode ? "bg-gray-800" : "bg-gray-50"
                      : isDarkMode ? "bg-gray-800/50" : "bg-white"
                  }`}>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{k}</span>
                    <span className={`text-sm font-medium text-right max-w-xs ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "video" && (
            <div>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${catColor}30` }}>
                <iframe width="100%" height="360" src={product.youtube} title={product.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen style={{ border: "none", display: "block" }} />
              </div>
              <p className={`text-xs text-center mt-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                Product demo · For enquiries contact Hass Scientific
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"} flex justify-end gap-3`}>
          <button onClick={onClose} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${isDarkMode ? "border-gray-600 text-gray-400 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}>
            Close
          </button>
          <a href="https://hasscientific.com/enquiry/" target="_blank" rel="noreferrer"
            className="px-5 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: catColor }}>
            Enquire Now ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────── */
function ProductCard({ product, catColor, isDarkMode, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
      className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
        isDarkMode
          ? hovered ? "border-gray-600 bg-gray-800" : "border-gray-700 bg-gray-800/70"
          : hovered ? "border-gray-300 bg-white shadow-xl" : "border-gray-200 bg-white shadow-sm"
      }`}
      style={{ transform: hovered ? "translateY(-6px)" : "none", boxShadow: hovered ? `0 20px 50px ${catColor}22` : undefined }}
    >
      {/* Image */}
      <div className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ background: `${catColor}08` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${catColor}18 0%, transparent 70%)` }} />
        <img src={product.image} alt={product.name}
          className="max-h-36 max-w-[80%] object-contain relative z-10 transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)", filter: hovered ? `drop-shadow(0 6px 18px ${catColor}50)` : "none" }}
          onError={(e) => { e.target.style.display = "none"; }} />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white z-10"
          style={{ background: catColor }}>{product.badge}</span>
        <span className={`absolute bottom-3 right-3 text-xs font-mono z-10 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
          {product.manufacturer}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{product.name}</h3>
          <p className={`text-xs italic ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{product.tagline}</p>
        </div>
        <ul className="space-y-1.5">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span style={{ color: catColor }} className="flex-shrink-0 mt-0.5 text-xs">◆</span>
              <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{f}</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-auto w-full py-2.5 rounded-xl text-sm font-bold border transition-all duration-200"
          style={hovered
            ? { background: catColor, color: "#fff", borderColor: catColor }
            : { background: "transparent", color: catColor, borderColor: catColor }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

/* ─── CATEGORY SIDEBAR PILL ──────────────────────────────────────────────── */
function CategorySwitcher({ current, isDarkMode, onSwitch }) {
  return (
    <div className={`flex flex-wrap gap-2 mb-8 p-4 rounded-2xl border ${isDarkMode ? "bg-gray-800/60 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
      <span className={`self-center text-xs font-bold uppercase tracking-widest mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        Switch Category:
      </span>
      {CATEGORIES.map((cat) => {
        const active = cat.id === current;
        return (
          <Link
            key={cat.id}
            to={`/products/${cat.id}`}
            onClick={() => onSwitch && onSwitch(cat.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
            style={active
              ? { background: cat.color, color: "#fff", borderColor: cat.color }
              : { background: "transparent", color: isDarkMode ? "#9ca3af" : "#6b7280", borderColor: isDarkMode ? "#374151" : "#d1d5db" }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}

/* ─── MAIN PRODUCTS PAGE ─────────────────────────────────────────────────── */
export default function ProductsPage() {
  const { isDarkMode } = useTheme();
  const { category } = useParams();          // e.g. "haematology"
  const navigate = useNavigate();

  const activeCatId = CATEGORIES.find((c) => c.id === category)?.id || "haematology";
  const catMeta     = getCatMeta(activeCatId);
  const catProducts = PRODUCTS[activeCatId] || [];

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Reset selected product when category changes
  useEffect(() => { setSelectedProduct(null); }, [activeCatId]);

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroIn  { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-50"} transition-colors duration-300`}>

        {/* ── HERO BANNER ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${catMeta.color}22 0%, ${isDarkMode ? "#030712" : "#f8fafc"} 60%)` }}>
          {/* Decorative circle */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${catMeta.color}, transparent)` }} />

          <div className="max-w-7xl mx-auto px-6 py-12 relative z-10" style={{ animation: "heroIn .5s ease" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs font-medium">
              <Link to="/" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors`}>Home</Link>
              <span className={isDarkMode ? "text-gray-600" : "text-gray-300"}>›</span>
              <Link to="/products" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors`}>Products</Link>
              <span className={isDarkMode ? "text-gray-600" : "text-gray-300"}>›</span>
              <span style={{ color: catMeta.color }} className="font-semibold">{catMeta.label}</span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${catMeta.color}20`, border: `1.5px solid ${catMeta.color}40` }}>
                {catMeta.icon}
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Hass Scientific · Product Line
                </p>
                <h1 className={`text-4xl md:text-5xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {catMeta.label}
                </h1>
              </div>
            </div>

            <p className={`text-base max-w-2xl mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              World-class diagnostic instruments distributed across East Africa by Hass Scientific & Medical Supplies Ltd — serving Kenya since 1993.
            </p>

            <div className="flex items-center gap-6 mt-6">
              <div>
                <span className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>{catProducts.length}</span>
                <span className={`text-xs ml-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>instruments</span>
              </div>
              <div className={`w-px h-6 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`} />
              <div>
                <span className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>7</span>
                <span className={`text-xs ml-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>categories</span>
              </div>
              <div className={`w-px h-6 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`} />
              <div>
                <span className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>1993</span>
                <span className={`text-xs ml-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Est.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Category switcher */}
          <CategorySwitcher current={activeCatId} isDarkMode={isDarkMode} />

          {/* Section divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${catMeta.color}50, transparent)` }} />
            <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
              {catProducts.length} Instrument{catProducts.length !== 1 ? "s" : ""} Available
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${catMeta.color}50, transparent)` }} />
          </div>

          {/* Product grid */}
          {catProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  catColor={catMeta.color}
                  isDarkMode={isDarkMode}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className={`text-center py-20 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
              No products listed yet for this category. Contact us to enquire.
            </div>
          )}

          {/* Bottom CTA */}
          <div className={`mt-16 rounded-3xl p-10 text-center border ${isDarkMode ? "bg-gray-800/60 border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}>
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{ background: `${catMeta.color}20`, border: `1px solid ${catMeta.color}30` }}>
              {catMeta.icon}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Need Help Choosing?
            </h3>
            <p className={`text-sm mb-6 max-w-lg mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Our technical specialists will help you select the right instrument for your laboratory's throughput, budget, and clinical requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://hasscientific.com/enquiry/" target="_blank" rel="noreferrer"
                className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${catMeta.color}, ${catMeta.accent})` }}>
                Request Consultation →
              </a>
              <a href="tel:+254720416144"
                className={`px-7 py-3 rounded-xl text-sm font-bold border transition-all ${isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                +254 720 416 144
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          catColor={catMeta.color}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}