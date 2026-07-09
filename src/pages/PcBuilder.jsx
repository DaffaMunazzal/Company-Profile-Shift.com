import { useState, useMemo } from "react";
import MainLayout from "../components/MainLayout";
import { PRODUCTS } from "../data/products";
import "../style/PcBuilder.css";

// ── Category definitions ────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Processor",     icon: "cpu",         key: "cpu"         },
  { name: "Motherboard",   icon: "motherboard", key: "motherboard" },
  { name: "Memory (RAM)",  icon: "ram",         key: "ram"         },
  { name: "Graphics Card", icon: "gpu",         key: "gpu"         },
  { name: "Storage",       icon: "storage",     key: "storage"     },
  { name: "Power Supply",  icon: "psu",         key: "psu"         },
  { name: "Case",          icon: "case",        key: "case"        },
];

// ── Build presets ────────────────────────────────────────────────────────────
const BUILD_PRESETS = {
  GAMING: {
    cpu:         "shft-r7-7800x3d",
    gpu:         "shft-4070ti",
    ram:         "shft-r32-6k",
    motherboard: "shft-b650-elite",
    storage:     "shft-ssd-2tb-gen4",
    psu:         "shft-850w-gold",
    case:        "shft-case-4000d",
  },
  EDITING: {
    cpu:         "shft-i9-14",
    gpu:         "shft-4080s",
    ram:         "shft-r64-8k",
    motherboard: "shft-z790-ult",
    storage:     "shft-v5-2tb",
    psu:         "shft-1000t",
    case:        "shft-case-h510",
  },
  "AI/DEV": {
    cpu:         "shft-r9-9950",
    gpu:         "shft-4090-x",
    ram:         "shft-r64-8k",
    motherboard: "shft-x670e-extreme",
    storage:     "shft-v5-4tb",
    psu:         "shft-1600t",
    case:        "shft-case-o11d",
  },
};

// ── SVG category icons ───────────────────────────────────────────────────────
function CategoryIcon({ type }) {
  if (type === "cpu")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    );
  if (type === "motherboard")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="7" y="7" width="5" height="5" /><rect x="15" y="14" width="3" height="3" />
        <line x1="7" y1="16" x2="11" y2="16" /><line x1="7" y1="18" x2="11" y2="18" />
      </svg>
    );
  if (type === "ram")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="1" />
        <line x1="6" y1="10" x2="6" y2="14" /><line x1="10" y1="10" x2="10" y2="14" />
        <line x1="14" y1="10" x2="14" y2="14" /><line x1="18" y1="10" x2="18" y2="14" />
      </svg>
    );
  if (type === "gpu")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" />
      </svg>
    );
  if (type === "storage")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <circle cx="7" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  if (type === "psu")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M13 5L10 12H14L11 19" />
      </svg>
    );
  if (type === "case")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="7" r="2" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    );
  return null;
}

// ── Price formatter (IDR) ────────────────────────────────────────────────────
function formatIDR(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ── Stock badge ──────────────────────────────────────────────────────────────
function StockBadge({ status }) {
  const map = {
    "in-stock":   { label: "In Stock",   cls: "pcb-stock--green"  },
    "pre-order":  { label: "Pre-Order",  cls: "pcb-stock--blue"   },
    limited:      { label: "Limited",    cls: "pcb-stock--yellow" },
    "out-of-stock": { label: "Out of Stock", cls: "pcb-stock--red" },
  };
  const info = map[status] || { label: status, cls: "" };
  return <span className={`pcb-stock-badge ${info.cls}`}>{info.label}</span>;
}

// ── Compatibility check ──────────────────────────────────────────────────────
function getCompatibility(selections) {
  const items = [];
  const cpu = PRODUCTS.find((p) => p.id === selections.cpu);
  const mb  = PRODUCTS.find((p) => p.id === selections.motherboard);
  const psu = PRODUCTS.find((p) => p.id === selections.psu);
  const gpu = PRODUCTS.find((p) => p.id === selections.gpu);
  const ram = PRODUCTS.find((p) => p.id === selections.ram);

  const totalSelected = Object.values(selections).filter(Boolean).length;

  if (totalSelected === 0) {
    items.push({ status: "yellow", text: "No components selected yet. Start building!" });
    return items;
  }

  if (cpu && mb) {
    // Very basic: Intel CPUs → LGA socket boards, AMD → AM5
    const intelCpu = cpu.name.toLowerCase().includes("core i") || cpu.name.toLowerCase().includes("intel");
    const amdCpu   = cpu.name.toLowerCase().includes("ryzen")  || cpu.name.toLowerCase().includes("amd");
    const intelMb  = mb.name.toLowerCase().includes("z790") || mb.name.toLowerCase().includes("b760") || mb.name.toLowerCase().includes("h610") || mb.name.toLowerCase().includes("b660");
    const amdMb    = mb.name.toLowerCase().includes("x870") || mb.name.toLowerCase().includes("x670") || mb.name.toLowerCase().includes("b650") || mb.name.toLowerCase().includes("a520");

    if ((intelCpu && intelMb) || (amdCpu && amdMb)) {
      items.push({ status: "green", text: `${cpu.name} is compatible with ${mb.name}.` });
    } else if ((intelCpu && amdMb) || (amdCpu && intelMb)) {
      items.push({ status: "red", text: `⚠ CPU/Motherboard socket mismatch! Check compatibility.` });
    } else {
      items.push({ status: "green", text: `${cpu.name} selected with ${mb.name}.` });
    }
  } else if (cpu) {
    items.push({ status: "yellow", text: `${cpu.name} selected. Add a Motherboard.` });
  } else if (mb) {
    items.push({ status: "yellow", text: `${mb.name} selected. Add a CPU.` });
  }

  if (ram && mb) {
    items.push({ status: "green", text: `RAM ${ram.name} added to your build.` });
  }

  if (gpu) {
    items.push({ status: "green", text: `${gpu.name} ready for your build.` });
  }

  if (psu) {
    // Estimate wattage needed (very rough)
    let estimatedWatts = 100;
    if (cpu) estimatedWatts += 125;
    if (gpu) {
      const gpuName = gpu.name.toLowerCase();
      if (gpuName.includes("4090")) estimatedWatts += 450;
      else if (gpuName.includes("4080")) estimatedWatts += 320;
      else if (gpuName.includes("4070")) estimatedWatts += 285;
      else estimatedWatts += 200;
    }
    const psuName = psu.name;
    const psuWatts = parseInt(psuName.match(/\d{3,4}W/)?.[0] || "0");
    if (psuWatts >= estimatedWatts) {
      items.push({ status: "green", text: `${psuWatts}W PSU covers estimated ~${estimatedWatts}W load.` });
    } else if (psuWatts > 0) {
      items.push({ status: "red", text: `⚠ PSU ${psuWatts}W may be insufficient for ~${estimatedWatts}W load.` });
    } else {
      items.push({ status: "green", text: `${psu.name} added.` });
    }
  }

  if (totalSelected >= 5) {
    items.push({ status: "green", text: "Build is taking shape! Almost complete." });
  }

  if (items.length === 0) {
    items.push({ status: "yellow", text: "Keep adding components to check compatibility." });
  }

  return items;
}

// ── Main component ───────────────────────────────────────────────────────────
export default function PcBuilder() {
  const [activeCategory, setActiveCategory] = useState("Processor");
  const [selections, setSelections]         = useState({});   // { cpu: id, gpu: id, … }
  const [activeTab, setActiveTab]           = useState("GAMING");
  const [sortOption, setSortOption]         = useState("latest");
  const [filterBrand, setFilterBrand]       = useState("all");
  const [showSortMenu, setShowSortMenu]     = useState(false);
  const [showBrandMenu, setShowBrandMenu]   = useState(false);

  const tabs = ["GAMING", "EDITING", "AI/DEV"];

  // Current category key (e.g. "cpu")
  const currentCatKey = CATEGORIES.find((c) => c.name === activeCategory)?.key ?? "cpu";

  // Products for current category
  const baseProducts = PRODUCTS.filter((p) => p.category === currentCatKey);

  // Unique brands for filter
  const brands = useMemo(() => {
    const all = PRODUCTS.filter((p) => p.category === currentCatKey).map((p) =>
      p.categoryLabel
    );
    return ["all", ...Array.from(new Set(all))];
  }, [currentCatKey]);

  // Filtered + sorted products
  const displayProducts = useMemo(() => {
    let list = [...baseProducts];
    if (filterBrand !== "all") {
      list = list.filter((p) => p.categoryLabel === filterBrand);
    }
    switch (sortOption) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return list;
  }, [baseProducts, filterBrand, sortOption]);

  // Selected product for current category
  const selectedId = selections[currentCatKey];

  // Total price of all selected components
  const totalPrice = Object.values(selections).reduce((sum, id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price : 0);
  }, 0);

  // Estimated power draw
  const estimatedPower = useMemo(() => {
    let w = 50;
    const gpu = PRODUCTS.find((p) => p.id === selections.gpu);
    const cpu = PRODUCTS.find((p) => p.id === selections.cpu);
    if (cpu) w += 125;
    if (gpu) {
      const n = gpu.name.toLowerCase();
      if (n.includes("4090")) w += 450;
      else if (n.includes("4080")) w += 320;
      else if (n.includes("4070")) w += 285;
      else if (n.includes("7900")) w += 350;
      else w += 200;
    }
    if (selections.ram) w += 15;
    if (selections.storage) w += 10;
    return w;
  }, [selections]);

  // Compatibility items
  const compatibilityItems = useMemo(() => getCompatibility(selections), [selections]);

  // Select / deselect a product
  function toggleSelect(catKey, productId) {
    setSelections((prev) => ({
      ...prev,
      [catKey]: prev[catKey] === productId ? undefined : productId,
    }));
  }

  // Apply build preset
  function applyPreset(tabName) {
    const preset = BUILD_PRESETS[tabName];
    if (preset) setSelections({ ...preset });
    setActiveTab(tabName);
  }

  // Sort label map
  const sortLabels = {
    latest:      "Latest Arrivals",
    "price-asc": "Price: Low to High",
    "price-desc":"Price: High to Low",
    "name-asc":  "Name: A to Z",
  };

  // ── Export PDF ────────────────────────────────────────────────────────────
  function handleExportPDF() {
    const selectedComponents = Object.entries(selections)
      .filter(([, id]) => id)
      .map(([catKey, id]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        const catName = CATEGORIES.find((c) => c.key === catKey)?.name ?? catKey;
        return { catName, product };
      })
      .filter(({ product }) => product);

    if (selectedComponents.length === 0) {
      alert("Please select at least one component to export.");
      return;
    }

    const buildName = `SHIFTCOM PC Build - ${activeTab}`;
    const date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let rows = selectedComponents
      .map(
        ({ catName, product }) =>
          `<tr>
            <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:600;color:#111;">${catName}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#333;">${product.name}${product.variant ? " – " + product.variant : ""}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#555;">${product.specs?.[1] ?? ""}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:700;color:#bc000b;text-align:right;">${formatIDR(product.price)}</td>
          </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${buildName}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background:#f9f9f9; color:#111; }
    .header { background:#111; color:#fff; padding:32px 40px; display:flex; justify-content:space-between; align-items:center; }
    .header h1 { font-size:24px; letter-spacing:2px; }
    .header .badge { background:#bc000b; color:#fff; padding:6px 16px; border-radius:4px; font-size:13px; font-weight:700; }
    .section { padding:32px 40px; }
    .meta { display:flex; gap:40px; margin-bottom:32px; }
    .meta-item { display:flex; flex-direction:column; gap:4px; }
    .meta-label { font-size:11px; font-weight:700; letter-spacing:1.5px; color:#888; text-transform:uppercase; }
    .meta-value { font-size:16px; font-weight:700; color:#111; }
    table { width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
    thead { background:#f3f3f3; }
    th { padding:12px 14px; text-align:left; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#555; }
    .total-row td { padding:16px 14px; font-size:17px; font-weight:800; background:#111; color:#fff; }
    .footer { text-align:center; padding:24px 40px; font-size:12px; color:#aaa; }
  </style>
</head>
<body>
  <div class="header">
    <h1>SHIFTCOM PC BUILDER</h1>
    <span class="badge">${activeTab} BUILD</span>
  </div>
  <div class="section">
    <div class="meta">
      <div class="meta-item"><span class="meta-label">Generated</span><span class="meta-value">${date}</span></div>
      <div class="meta-item"><span class="meta-label">Components</span><span class="meta-value">${selectedComponents.length} Parts</span></div>
      <div class="meta-item"><span class="meta-label">Est. Power</span><span class="meta-value">~${estimatedPower}W</span></div>
      <div class="meta-item"><span class="meta-label">Total</span><span class="meta-value" style="color:#bc000b;">${formatIDR(totalPrice)}</span></div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Product</th>
          <th>Specs</th>
          <th style="text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="total-row">
          <td colspan="3">TOTAL CONFIGURATION</td>
          <td style="text-align:right;">${formatIDR(totalPrice)}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer">SHIFTCOM.COM — Professional PC Building Services — This quote is valid for 7 days</div>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }

  // ── WhatsApp Expert ───────────────────────────────────────────────────────
  function handleWhatsApp() {
    const selectedComponents = Object.entries(selections)
      .filter(([, id]) => id)
      .map(([catKey, id]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        const catName = CATEGORIES.find((c) => c.key === catKey)?.name ?? catKey;
        return product ? `• ${catName}: ${product.name} (${formatIDR(product.price)})` : null;
      })
      .filter(Boolean);

    let message = `Halo SHIFTCOM! Saya ingin konsultasi tentang PC Build saya:\n\n`;
    message += `🖥️ *${activeTab} BUILD*\n\n`;
    if (selectedComponents.length > 0) {
      message += selectedComponents.join("\n");
      message += `\n\n💰 *Total: ${formatIDR(totalPrice)}*\n\n`;
    } else {
      message += `Saya belum memilih komponen. Bisa bantu saya memilih?\n\n`;
    }
    message += `Mohon bantu saya untuk mendapatkan penawaran terbaik. Terima kasih!`;

    const phone   = "6281234567890"; // replace with actual WhatsApp number
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <MainLayout activePath="/pc-builder">
      <div className="pcb">
        {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
        <div className="pcb-topbar">
          <div className="pcb-topbar-left">
            <div className="pcb-topbar-info">
              <span className="pcb-topbar-label">TOTAL CONFIGURATION</span>
              <span className="pcb-topbar-value">
                {totalPrice > 0 ? formatIDR(totalPrice) : "—"}
              </span>
            </div>
            <div className="pcb-topbar-info">
              <span className="pcb-topbar-label">POWER DRAW</span>
              <span className="pcb-topbar-value">
                ~{estimatedPower}W{" "}
                <span className={`pcb-dot ${estimatedPower < 500 ? "pcb-dot--green" : "pcb-dot--yellow"}`} />
              </span>
            </div>
            <div className="pcb-topbar-info">
              <span className="pcb-topbar-label">COMPONENTS</span>
              <span className="pcb-topbar-value">
                {Object.values(selections).filter(Boolean).length} / {CATEGORIES.length}
              </span>
            </div>
          </div>

          {/* Build-type tabs */}
          <div className="pcb-topbar-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pcb-tab ${activeTab === tab ? "pcb-tab--active" : ""}`}
                onClick={() => applyPreset(tab)}
                title={`Load ${tab} preset`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pcb-topbar-right">
            <button className="pcb-share-btn" onClick={handleExportPDF}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share Build
            </button>
            <button
              className="pcb-checkout-btn"
              onClick={handleWhatsApp}
            >
              Order via WA →
            </button>
          </div>
        </div>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="pcb-body">
          {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
          <aside className="pcb-sidebar">
            <div className="pcb-categories">
              {CATEGORIES.map((cat) => {
                const hasSelection = Boolean(selections[cat.key]);
                return (
                  <button
                    key={cat.name}
                    className={`pcb-cat-btn ${activeCategory === cat.name ? "pcb-cat-btn--active" : ""}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    <CategoryIcon type={cat.icon} />
                    <span>{cat.name}</span>
                    {hasSelection && (
                      <span className="pcb-cat-check" title="Component selected">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pcb-compat">
              <h4 className="pcb-compat-title">Compatibility</h4>
              {compatibilityItems.map((item, i) => (
                <div key={i} className="pcb-compat-item">
                  <span className={`pcb-compat-dot pcb-compat-dot--${item.status}`} />
                  <span className="pcb-compat-text">{item.text}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
          <main className="pcb-main">
            <div className="pcb-main-header">
              <h2 className="pcb-main-title">Select {activeCategory}</h2>
              <p className="pcb-main-desc">
                {displayProducts.length} products available · Click a card to select it for your build.
              </p>
            </div>

            {/* Filters */}
            <div className="pcb-filters">
              {/* Brand filter */}
              <div className="pcb-dropdown-wrap">
                <button
                  className="pcb-filter-btn"
                  onClick={() => { setShowBrandMenu((v) => !v); setShowSortMenu(false); }}
                >
                  {filterBrand === "all" ? "All Brands" : filterBrand} ▾
                </button>
                {showBrandMenu && (
                  <div className="pcb-dropdown-menu">
                    {brands.map((b) => (
                      <button
                        key={b}
                        className={`pcb-dropdown-item ${filterBrand === b ? "pcb-dropdown-item--active" : ""}`}
                        onClick={() => { setFilterBrand(b); setShowBrandMenu(false); }}
                      >
                        {b === "all" ? "All Brands" : b}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="pcb-dropdown-wrap">
                <button
                  className="pcb-filter-btn"
                  onClick={() => { setShowSortMenu((v) => !v); setShowBrandMenu(false); }}
                >
                  Sort: {sortLabels[sortOption]} ▾
                </button>
                {showSortMenu && (
                  <div className="pcb-dropdown-menu">
                    {Object.entries(sortLabels).map(([key, label]) => (
                      <button
                        key={key}
                        className={`pcb-dropdown-item ${sortOption === key ? "pcb-dropdown-item--active" : ""}`}
                        onClick={() => { setSortOption(key); setShowSortMenu(false); }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset category selection */}
              {selectedId && (
                <button
                  className="pcb-filter-btn pcb-filter-btn--clear"
                  onClick={() => toggleSelect(currentCatKey, selectedId)}
                >
                  ✕ Clear Selection
                </button>
              )}
            </div>

            {/* Product cards */}
            <div className="pcb-products">
              {displayProducts.length === 0 ? (
                <p className="pcb-no-products">No products found for this filter.</p>
              ) : (
                displayProducts.map((product) => {
                  const isSelected = selectedId === product.id;
                  return (
                    <div
                      key={product.id}
                      className={`pcb-product-card ${isSelected ? "pcb-product-card--selected" : ""}`}
                      onClick={() => toggleSelect(currentCatKey, product.id)}
                    >
                      {isSelected && <span className="pcb-product-badge">SELECTED ✓</span>}

                      {/* Discount badge */}
                      {product.discountPercent > 0 && (
                        <span className="pcb-discount-badge">-{product.discountPercent}%</span>
                      )}

                      {/* Product image */}
                      <div className="pcb-product-img">
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML =
                              '<div class="pcb-img-fallback"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
                          }}
                        />
                      </div>

                      {/* Category label */}
                      <span className="pcb-product-category">{product.categoryLabel}</span>

                      <h4 className="pcb-product-name">{product.name}</h4>
                      {product.variant && (
                        <span className="pcb-product-variant">{product.variant}</span>
                      )}
                      <p className="pcb-product-desc">{product.description}</p>

                      {/* Specs tags */}
                      {product.specs && product.specs.length > 0 && (
                        <div className="pcb-product-specs">
                          {product.specs.map((spec, si) => (
                            <span key={si} className="pcb-spec-tag">{spec}</span>
                          ))}
                        </div>
                      )}

                      <StockBadge status={product.stockStatus} />

                      <div className="pcb-product-bottom">
                        <div className="pcb-price-block">
                          <span className="pcb-product-price">{formatIDR(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="pcb-product-original">
                              {formatIDR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          className={isSelected ? "pcb-product-remove" : "pcb-product-select"}
                          onClick={(e) => { e.stopPropagation(); toggleSelect(currentCatKey, product.id); }}
                        >
                          {isSelected ? "Remove" : "Select"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Spec Comparison Table */}
            {displayProducts.length > 0 && (
              <div className="pcb-comparison">
                <div className="pcb-comparison-header">
                  <h3 className="pcb-comparison-title">Spec Comparison</h3>
                </div>
                <table className="pcb-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Key Spec</th>
                      <th>Stock</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProducts.map((product) => (
                      <tr
                        key={product.id}
                        className={`${selectedId === product.id ? "pcb-table-row--active" : ""} pcb-table-row-clickable`}
                        onClick={() => toggleSelect(currentCatKey, product.id)}
                      >
                        <td className="pcb-table-model">{product.name}</td>
                        <td>{product.categoryLabel}</td>
                        <td className="pcb-table-spec">{product.specs?.[1] ?? "—"}</td>
                        <td>
                          <span className={`pcb-table-stock pcb-table-stock--${product.stockStatus}`}>
                            {product.stockStatus === "in-stock"
                              ? "✓ In Stock"
                              : product.stockStatus === "pre-order"
                              ? "Pre-Order"
                              : product.stockStatus === "limited"
                              ? "Limited"
                              : "Out"}
                          </span>
                        </td>
                        <td className="pcb-table-price">{formatIDR(product.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>

          {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
          <aside className="pcb-right">
            <div className="pcb-actions">
              <h4 className="pcb-actions-title">BUILD ACTIONS</h4>
              <button className="pcb-action-btn pcb-action-btn--pdf" onClick={handleExportPDF}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Export PDF Summary
              </button>
              <button className="pcb-action-btn pcb-action-btn--wa" onClick={handleWhatsApp}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                WhatsApp Expert
              </button>
              <button
                className="pcb-action-btn pcb-action-btn--reset"
                onClick={() => setSelections({})}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-4" />
                </svg>
                Reset Build
              </button>
            </div>

            {/* Build Summary */}
            <div className="pcb-summary">
              <h4 className="pcb-saved-title">Your Build</h4>
              {CATEGORIES.map((cat) => {
                const selId = selections[cat.key];
                const product = selId ? PRODUCTS.find((p) => p.id === selId) : null;
                return (
                  <div key={cat.key} className="pcb-summary-item">
                    <div className="pcb-summary-cat">
                      <CategoryIcon type={cat.icon} />
                      <span className="pcb-summary-cat-name">{cat.name}</span>
                    </div>
                    {product ? (
                      <div className="pcb-summary-product">
                        <span className="pcb-summary-name">{product.name}</span>
                        <span className="pcb-summary-price">{formatIDR(product.price)}</span>
                      </div>
                    ) : (
                      <span className="pcb-summary-empty">Not selected</span>
                    )}
                  </div>
                );
              })}

              {totalPrice > 0 && (
                <div className="pcb-summary-total">
                  <span>TOTAL</span>
                  <span>{formatIDR(totalPrice)}</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}