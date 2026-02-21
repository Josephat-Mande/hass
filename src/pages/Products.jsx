import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Phone, Mail, ArrowRight } from "lucide-react";

/* ─── CATEGORY METADATA ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "immuno-assay",  label: "Immuno Assay",  icon: "🧬", color: "#1a3a6b", accent: "#2563eb" },
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
      name: "VIDAS® Kube",
      manufacturer: "bioMérieux",
      badge: "AUTOMATED",
      tagline: "Fully automated ELFA immunoassay system",
      image: "https://s7g10.scene7.com/is/image/biomerieux/vidas-kube?qlt=85&wid=1600&ts=1766424760929&dpr=off",
      description: "The VIDAS® Kube is a fully automated benchtop immunoassay analyser using the ELFA (Enzyme Linked Fluorescent Assay) technique. It provides reliable, reproducible results across a broad menu of infectious disease, endocrinology, and cardiac markers.",
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
      description: "The mini VIDAS® is a compact, semi-automated immunoassay system ideal for emergency testing and low-volume laboratories.",
      features: ["6 test positions", "ELFA technology", "Stat testing ready", "No sample pre-treatment", "Simple 2-step operation", "Wide assay menu"],
      specs: { "Capacity": "6 simultaneous tests", "Technology": "ELFA", "Footprint": "Compact benchtop", "Sample": "Minimal volume required", "Mode": "Semi-automated", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/SsMM2m_R2dM",
      highlights: ["Emergency STAT", "6-position compact", "Simple operation"],
      useCases: ["Emergency labs", "Small hospitals", "POC testing"]
    },
    {
      id: "vidas-pc",
      name: "VIDAS® PC",
      manufacturer: "bioMérieux",
      badge: "COMPACT",
      tagline: "Compact immunoassay for urgent testing",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/vidas_30_left_0-300x193.jpg",
      description: "The VIDAS® PC is a compact, semi-automated immunoassay system ideal for emergency testing and low-volume laboratories.",
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
      description: "The BioFire FilmArray is a rapid multiplex PCR system that simultaneously tests for dozens of pathogens in a single closed pouch.",
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
      description: "The VITEK 2 Compact is the world's leading automated microbial identification and antimicrobial susceptibility testing system.",
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
      description: "The BACT/ALERT 3D is an automated, non-invasive blood culture detection system using colorimetric CO₂ sensors for real-time monitoring.",
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
      description: "VITEK MS uses MALDI-TOF mass spectrometry to identify microorganisms in less than 1 minute per organism.",
      features: ["< 1 minute per ID", "Bacteria, fungi, mycobacteria", "Hundreds of isolates/day", "Minimal sample prep", "Continually updated database", "CE-IVD compliant"],
      specs: { "ID time": "< 1 minute", "Technology": "MALDI-TOF MS", "Database": "> 25,000 spectra", "Organisms": "Bacteria, yeasts, mycobacteria", "Throughput": "High – hundreds/day", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/tVMkBBnC4YY",
      highlights: ["< 1 min ID", "MALDI-TOF precision", "Massive throughput"],
      useCases: ["High-volume labs", "Reference centres", "Teaching hospitals"]
    },
  ],
  "haematology": [
    {
      id: "xp-300", name: "H-560", manufacturer: "Sysmex", badge: "COMPACT",
      tagline: "Reliable 3-part differential for any lab",
      image: "https://product.erbamannheim.com/upload/instrument/h560-side-257-x-257-4246.jpg",
      description: "The H-560 is a compact 3-part differential haematology analyser for small to mid-sized labs.",
      features: ["3-part differential CBC", "Up to 60 samples/hr", "19 reportable parameters", "Minimal maintenance", "Reagent optimisation", "USB & LAN connectivity"],
      specs: { "Throughput": "Up to 60 samples/hr", "Parameters": "19 reportable", "Sample Volume": "10 µL (whole blood)", "Differential": "3-part", "Connectivity": "USB, LAN", "Display": "LCD color screen" },
      youtube: "https://www.youtube.com/embed/5rl4N8OFvXg",
      highlights: ["Compact footprint", "Low reagent consumption", "Easy operation"],
      useCases: ["Clinics", "Small hospitals", "POC labs"]
    },
    {
      id: "xn-350", name: "H-360", manufacturer: "Sysmex", badge: "5-PART DIFF",
      tagline: "5-part differential intelligence, compact form",
      image: "https://product.erbamannheim.com/upload/instrument/h360-side-257-x-257-4076.jpg",
      description: "The H-360 delivers cutting-edge 5-part differential analysis in a compact stand-alone configuration.",
      features: ["Compact 5-part differential", "Single sample open mode", "Fully integrated IPU + touchscreen", "25 µL aspiration volume", "Scalable upgrades", "Cyanide-free SLS haemoglobin"],
      specs: { "Throughput": "Up to 60 samples/hr", "Parameters": "30+ reportable", "Sample Volume": "25 µL (whole blood)", "Differential": "5-part DIFF", "Technology": "Fluorescence flow cytometry", "Display": "Integrated LCD touchscreen" },
      youtube: "https://www.youtube.com/embed/rC_LSOY0f0w",
      highlights: ["No PC required", "Fluorescence FCM", "Future-proof upgrades"],
      useCases: ["District hospitals", "Independent labs", "Mid-volume settings"]
    },
    {
      id: "xn-450", name: "Elite-580", manufacturer: "Sysmex", badge: "RETICULOCYTE",
      tagline: "Advanced parameters, clinical confidence",
      image: "https://product.erbamannheim.com/upload/instrument/elite---580---257-x-257-pix_1958.jpg",
      description: "The Elite-580 bridges mid-volume labs with reticulocyte and extended analytical capabilities.",
      features: ["5-part DIFF with RET channel", "Reticulocyte parameter reporting", "Up to 80 samples/hr", "35+ reportable parameters", "4 operational modes", "Network + remote servicing"],
      specs: { "Throughput": "Up to 80 samples/hr", "Parameters": "35+ reportable", "Sample Volume": "25 µL", "Modes": "CBC, CBC+DIFF, CBC+DIFF+RET", "Technology": "Fluorescence + SLS", "Connectivity": "LAN, remote servicing" },
      youtube: "https://www.youtube.com/embed/5rl4N8OFvXg",
      highlights: ["Reticulocyte reporting", "80 samples/hr", "4 modes"],
      useCases: ["Regional hospitals", "Specialty labs", "High-acuity settings"]
    },
  ],
  "coagulation": [
    {
      id: "ca-101", name: "CA-101", manufacturer: "Sysmex", badge: "ENTRY",
      tagline: "Reliable coagulation for smaller labs",
      image: "https://hasscientific.com/wp-content/uploads/2020/05/Sysmex-CA-101-400x400-1-300x300.jpg",
      description: "The CA-101 is a semi-automated coagulation analyser designed for small to medium laboratories.",
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
      description: "The CA-104 extends the coagulation menu with specialty tests including D-Dimer, Factor assays, and Lupus anticoagulant detection.",
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
      description: "The CA-660 is a fully automated, high-throughput coagulation system capable of processing 400+ tests per hour.",
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
      description: "The ERBA XL 200 is a compact, fully automated clinical chemistry analyser for small to mid-size laboratories.",
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
      description: "The ERBA XL 180 delivers reliable photometric testing for routine biochemistry panels.",
      features: ["180 tests/hr", "Photometric detection", "High precision reagents", "Broad parameter menu", "LIS connectivity", "Automated calibration"],
      specs: { "Throughput": "180 tests/hr", "Technology": "Photometric", "Parameters": "Wide biochemistry panel", "Connectivity": "LIS/LAN", "Calibration": "Automated", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/7xKbISnHKnI",
      highlights: ["Automated calibration", "High precision", "Broad panel"],
      useCases: ["District hospitals", "Mid-volume labs", "Routine testing"]
    },
    {
      id: "erba-xl-300", name: "ERBA XL650", manufacturer: "ERBA Mannheim", badge: "HIGH-VOLUME",
      tagline: "High-performance chemistry for demanding labs",
      image: "https://product.erbamannheim.com/upload/instrument/xl-640-banner_1368.jpg",
      description: "The ERBA XL650 is a high-throughput fully automated clinical chemistry system supporting routine and specialty assays.",
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
      description: "The ERBA LYTE uses ion-selective electrode (ISE) technology for rapid, accurate electrolyte measurements.",
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
      description: "The UC-1000 is a fully automated urine strip reader offering fast, reliable chemical urinalysis.",
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
      description: "The UC-3500 combines automated urine chemistry with particle analysis for a comprehensive urinalysis solution.",
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
      description: "The UF-4000 is a dedicated fluorescence flow cytometry urine particle analyser providing highly differentiated sediment classification.",
      features: ["Fluorescence flow cytometry", "High-definition particle images", "Up to 70% microscopy reduction", "120 samples/hr", "Bacteria detection", "Bidirectional LIS"],
      specs: { "Throughput": "120 samples/hr", "Technology": "Fluorescence flow cytometry", "Particles": "10 classes reported", "Bacteria": "Quantitative detection", "LIS": "Bidirectional", "Certification": "CE-IVD" },
      youtube: "https://www.youtube.com/embed/ZJ5b0QiO2Ws",
      highlights: ["Fluorescence FCM", "70% less microscopy", "Bacteria detection"],
      useCases: ["High-volume labs", "Nephrology centres", "Research labs"]
    },
  ],
};

function getCatMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}

/* ─── PRODUCT MODAL ──────────────────────────────────────────────────────── */
function ProductModal({ product, catMeta, onClose }) {
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);

  if (!product) return null;
  const color = catMeta.color;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,25,50,0.6)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "fadeIn .2s ease"
      }}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl border border-slate-200"
        style={{ animation: "slideUp .3s cubic-bezier(.23,1,.32,1)" }}
      >
        {/* Header */}
        <div className="flex border-b border-slate-100" style={{ background: `linear-gradient(135deg, ${color}08, #f8fafc)` }}>
          <div className="w-52 flex-shrink-0 flex items-center justify-center p-8" style={{ background: `${color}06` }}>
            <img
              src={product.image} alt={product.name}
              className="max-h-36 max-w-full object-contain"
              style={{ filter: `drop-shadow(0 8px 24px ${color}40)` }}
            />
          </div>
          <div className="flex-1 p-7">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: color }}>
                {product.badge}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all text-sm font-bold"
              >✕</button>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: `${color}99` }}>{product.manufacturer}</p>
            <h2 className="text-2xl font-black text-slate-800 mb-2">{product.name}</h2>
            <p className="text-sm leading-relaxed text-slate-500">{product.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50">
          {["overview", "specifications", "video"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all"
              style={tab === t
                ? { color, borderColor: color }
                : { color: "#94a3b8", borderColor: "transparent" }}
            >{t}</button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-7">
          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">Key Features</h4>
                <ul className="space-y-2.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-xs flex-shrink-0" style={{ color }}>◆</span>
                      <span className="text-sm text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-400">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `${color}10`, color, border: `1px solid ${color}25` }}>{h}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-400">Ideal For</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.useCases.map((u, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-500 border border-slate-200">{u}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "specifications" && (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div key={i} className={`flex justify-between px-5 py-3.5 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{k}</span>
                  <span className="text-sm font-semibold text-right max-w-xs text-slate-700">{v}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "video" && (
            <div>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}20` }}>
                <iframe width="100%" height="340" src={product.youtube} title={product.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen style={{ border: "none", display: "block" }} />
              </div>
              <p className="text-xs text-center mt-3 text-slate-400">Product demo · For enquiries contact Hass Scientific</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 hover:bg-slate-100 transition-all"
          >Close</button>
          <a
            href="https://hasscientific.com/enquiry/" target="_blank" rel="noreferrer"
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${color}, ${catMeta.accent})` }}
          >Enquire Now →</a>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────── */
function ProductCard({ product, catMeta, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = catMeta.color;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
      className="cursor-pointer rounded-2xl overflow-hidden border flex flex-col bg-white transition-all duration-300"
      style={{
        borderColor: hovered ? `${color}40` : "#e2e8f0",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 50px ${color}15, 0 4px 12px rgba(0,0,0,0.06)` : "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Image area */}
      <div
        className="h-52 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}06, #f8fafc)` }}
      >
        {/* Subtle radial highlight */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${color}12 0%, transparent 65%)` }} />

        <img
          src={product.image} alt={product.name}
          className="max-h-36 max-w-[75%] object-contain relative z-10 transition-all duration-300"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", filter: hovered ? `drop-shadow(0 8px 20px ${color}45)` : "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />

        {/* Badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white z-10"
          style={{ background: color }}
        >{product.badge}</span>

        {/* Manufacturer */}
        <span className="absolute bottom-3 right-3 text-xs font-mono z-10 text-slate-400 bg-white/80 px-2 py-0.5 rounded-full">
          {product.manufacturer}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-800 mb-1">{product.name}</h3>
          <p className="text-xs text-slate-400 italic">{product.tagline}</p>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 flex-1">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span style={{ color }} className="flex-shrink-0 mt-0.5 text-xs">◆</span>
              <span className="text-slate-600">{f}</span>
            </li>
          ))}
        </ul>

        {/* Highlight pills */}
        <div className="flex flex-wrap gap-1.5">
          {product.highlights.slice(0, 2).map((h, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>{h}</span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 flex items-center justify-center gap-2"
          style={hovered
            ? { background: color, color: "#fff", borderColor: color }
            : { background: "transparent", color, borderColor: `${color}50` }}
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── CATEGORY TABS ──────────────────────────────────────────────────────── */
function CategoryTabs({ current }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const active = cat.id === current;
        return (
          <Link
            key={cat.id}
            to={`/products/${cat.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
            style={active
              ? { background: cat.color, color: "#fff", borderColor: cat.color, boxShadow: `0 4px 14px ${cat.color}30` }
              : { background: "white", color: "#64748b", borderColor: "#e2e8f0" }}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* ─── MAIN PRODUCTS PAGE ─────────────────────────────────────────────────── */
export default function ProductsPage() {
  const { category } = useParams();
  const activeCatId = CATEGORIES.find((c) => c.id === category)?.id || "haematology";
  const catMeta     = getCatMeta(activeCatId);
  const catProducts = PRODUCTS[activeCatId] || [];
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => { setSelectedProduct(null); }, [activeCatId]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroIn  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

        {/* ── HERO BANNER ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
          {/* Diagonal tinted panel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(120deg, ${catMeta.color}06 0%, transparent 55%)`,
            }}
          />
          {/* Large ghost icon */}
          <div
            className="absolute right-10 top-1/2 -translate-y-1/2 text-9xl select-none pointer-events-none"
            style={{ opacity: 0.04, fontSize: 220, lineHeight: 1 }}
          >{catMeta.icon}</div>

          <div className="max-w-7xl mx-auto px-8 py-14 relative" style={{ animation: "heroIn .5s ease" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-slate-700 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/products" className="hover:text-slate-700 transition-colors">Products</Link>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: catMeta.color }}>{catMeta.label}</span>
            </div>

            <div className="flex items-start gap-6 mb-6">
              {/* Category icon pill */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 mt-1"
                style={{
                  background: `${catMeta.color}10`,
                  border: `2px solid ${catMeta.color}20`,
                }}
              >{catMeta.icon}</div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: catMeta.color }}>
                  Hass Scientific · Product Line
                </p>
                <h1
                  className="font-black text-slate-800 leading-none mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)" }}
                >
                  {catMeta.label}
                </h1>
                <p className="text-slate-500 text-base max-w-xl leading-relaxed">
                  World-class diagnostic instruments distributed across East & Central Africa by Hass Scientific & Medical Supplies Ltd.
                </p>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-slate-100">
              {[
                { val: catProducts.length, label: "Instruments" },
                { val: 7, label: "Categories" },
                { val: "1997", label: "Est." },
                { val: "500+", label: "Labs Served" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-6 bg-slate-200" />}
                  <div>
                    <span className="font-black text-slate-800 text-xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.val}</span>
                    <span className="text-xs text-slate-400 ml-1.5">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* Category tabs */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Browse Categories</p>
            <CategoryTabs current={activeCatId} />
          </div>

          {/* Divider with count */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${catMeta.color}40, transparent)` }} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: catMeta.color }} />
              {catProducts.length} Instrument{catProducts.length !== 1 ? "s" : ""} Available
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${catMeta.color}40, transparent)` }} />
          </div>

          {/* Product grid */}
          {catProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catProducts.map((p) => (
                <ProductCard key={p.id} product={p} catMeta={catMeta} onClick={setSelectedProduct} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              No products listed yet for this category. Contact us to enquire.
            </div>
          )}

          {/* ── BOTTOM CTA ── */}
          <div className="mt-20 relative overflow-hidden rounded-3xl" style={{ background: `linear-gradient(135deg, #1a3a6b, #0f2549)` }}>
            {/* Decorative blob */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: catMeta.color }} />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10" style={{ background: catMeta.accent }} />

            <div className="relative z-10 p-12 text-center">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-2xl"
                style={{ background: `${catMeta.color}25`, border: `1.5px solid ${catMeta.color}40` }}
              >{catMeta.icon}</div>

              <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Need Help Choosing?
              </h3>
              <p className="text-blue-200 text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Our technical specialists will help you select the right instrument for your laboratory's throughput, budget, and clinical requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://hasscientific.com/enquiry/" target="_blank" rel="noreferrer"
                  className="px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 flex items-center gap-2 justify-center"
                  style={{ background: `linear-gradient(135deg, ${catMeta.color}, ${catMeta.accent})`, boxShadow: `0 8px 24px ${catMeta.color}40` }}
                >
                  <Mail className="w-4 h-4" />
                  Request Consultation
                </a>
                <a
                  href="tel:+256414250655"
                  className="px-8 py-3.5 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                >
                  <Phone className="w-4 h-4" />
                  +256 (0)414 250 655
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          catMeta={catMeta}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}