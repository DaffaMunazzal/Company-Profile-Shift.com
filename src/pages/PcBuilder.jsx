import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../style/PcBuilder.css";

const categories = [
  { name: "Processor", icon: "cpu" },
  { name: "Motherboard", icon: "motherboard" },
  { name: "Memory (RAM)", icon: "ram" },
  { name: "Graphics Card", icon: "gpu" },
  { name: "Storage", icon: "storage" },
  { name: "Power Supply", icon: "psu" },
  { name: "Cooling", icon: "cooling" },
  { name: "Case", icon: "case" },
];

const processors = [
  {
    id: 1,
    name: "Core i9-14900K",
    desc: "24 Cores (8P + 16E), Up to 6.0 GHz Turbo....",
    price: 589,
    image: "https://www.tokopedia.com/gamingpcstore/intel-core-i9-14900k-lga-1700-gen14-processor?utm_source=google&utm_medium=organic&utm_campaign=pdp4",
    clock: "3.2 GHz",
    tdp: "125W",
  },
  {
    id: 2,
    name: "Ryzen 9 7950X3D",
    desc: "16 Cores, 32 Threads, 144MB Cache....",
    price: 629,
    image: "https://m.media-amazon.com/images/I/51gOOgBPHaL._AC_SL1500_.jpg",
    cores: "16 / 32",
    clock: "4.2 GHz",
    tdp: "120W",
  },
  {
    id: 3,
    name: "Core i7-14700K",
    desc: "20 Cores (8P + 12E), Up to 5.6 GHz....",
    price: 409,
    image: "https://m.media-amazon.com/images/I/51GIaKPdZ4L._AC_SL1500_.jpg",
    cores: "20 / 28",
    clock: "3.4 GHz",
    tdp: "125W",
  },
];

const compatibilityItems = [
  { status: "green", text: "Socket LGA 1700 compatible with chosen Motherboard." },
  { status: "yellow", text: "DDR5 RAM mismatch with DDR4 slots on selected Board." },
  { status: "green", text: "850W Gold PSU covers estimated 420W load." },
];

const savedConfigs = [
  { name: "Workstation X1", time: "Saved 2 days ago" },
  { name: "Gaming Beast v2", time: "Saved 5 hours ago" },
];

function CategoryIcon({ type }) {
  if (type === "cpu") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    );
  }
  if (type === "motherboard") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="7" y="7" width="5" height="5" />
        <rect x="15" y="14" width="3" height="3" />
        <line x1="7" y1="16" x2="11" y2="16" />
        <line x1="7" y1="18" x2="11" y2="18" />
      </svg>
    );
  }
  if (type === "ram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="1" />
        <line x1="6" y1="10" x2="6" y2="14" />
        <line x1="10" y1="10" x2="10" y2="14" />
        <line x1="14" y1="10" x2="14" y2="14" />
        <line x1="18" y1="10" x2="18" y2="14" />
      </svg>
    );
  }
  if (type === "gpu") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="12" r="3" />
      </svg>
    );
  }
  if (type === "storage") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <circle cx="7" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (type === "psu") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M13 5L10 12H14L11 19" />
      </svg>
    );
  }
  if (type === "cooling") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    );
  }
  if (type === "case") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="7" r="2" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    );
  }
  return null;
}

export default function PcBuilder() {
  const [activeCategory, setActiveCategory] = useState("Processor");
  const [selectedProcessor, setSelectedProcessor] = useState(1);
  const [activeTab, setActiveTab] = useState("GAMING");

  const tabs = ["GAMING", "EDITING", "AI/DEV"];

  return (
    <MainLayout activePath="/pc-builder">
      <div className="pcb">
        <div className="pcb-topbar">
          <div className="pcb-topbar-left">
            <div className="pcb-topbar-info">
              <span className="pcb-topbar-label">TOTAL CONFIGURATION</span>
              <span className="pcb-topbar-value">$2,459.00</span>
            </div>
            <div className="pcb-topbar-info">
              <span className="pcb-topbar-label">POWER DRAW</span>
              <span className="pcb-topbar-value">420W <span className="pcb-dot pcb-dot--green"></span></span>
            </div>
          </div>

          <div className="pcb-topbar-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pcb-tab ${activeTab === tab ? "pcb-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pcb-topbar-right">
            <button className="pcb-share-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share Build
            </button>
            <button className="pcb-checkout-btn">
              Checkout →
            </button>
          </div>
        </div>

        <div className="pcb-body">
          <aside className="pcb-sidebar">
            <div className="pcb-categories">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className={`pcb-cat-btn ${activeCategory === cat.name ? "pcb-cat-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  <CategoryIcon type={cat.icon} />
                  <span>{cat.name}</span>
                  {activeCategory === cat.name && <span className="pcb-dot pcb-dot--green pcb-cat-dot"></span>}
                </button>
              ))}
            </div>

            <div className="pcb-compat">
              <h4 className="pcb-compat-title">Compatibility Check</h4>
              {compatibilityItems.map((item, i) => (
                <div key={i} className="pcb-compat-item">
                  <span className={`pcb-compat-dot pcb-compat-dot--${item.status}`}></span>
                  <span className="pcb-compat-text">{item.text}</span>
                </div>
              ))}
            </div>
          </aside>

          <main className="pcb-main">
            <div className="pcb-main-header">
              <h2 className="pcb-main-title">Select Processor</h2>
              <p className="pcb-main-desc">High-performance CPUs for your next breakthrough.</p>
            </div>

            <div className="pcb-filters">
              <button className="pcb-filter-btn">All Brands ▾</button>
              <button className="pcb-filter-btn">Sort by: Popular ▾</button>
            </div>

            <div className="pcb-products">
              {processors.map((proc) => (
                <div
                  key={proc.id}
                  className={`pcb-product-card ${selectedProcessor === proc.id ? "pcb-product-card--selected" : ""}`}
                >
                  {selectedProcessor === proc.id && (
                    <span className="pcb-product-badge">SELECTED</span>
                  )}
                  <div className="pcb-product-img">
                    <img src={proc.image} alt={proc.name} />
                  </div>
                  <h4 className="pcb-product-name">{proc.name}</h4>
                  <p className="pcb-product-desc">{proc.desc}</p>
                  <div className="pcb-product-bottom">
                    <span className="pcb-product-price">${proc.price}.00</span>
                    {selectedProcessor === proc.id ? (
                      <button
                        className="pcb-product-remove"
                        onClick={() => setSelectedProcessor(null)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="pcb-product-select"
                        onClick={() => setSelectedProcessor(proc.id)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pcb-comparison">
              <div className="pcb-comparison-header">
                <h3 className="pcb-comparison-title">Spec Comparison</h3>
                <button className="pcb-fullscreen-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                  </svg>
                </button>
              </div>
              <table className="pcb-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Cores/Threads</th>
                    <th>Base Clock</th>
                    <th>Power (TDP)</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {processors.map((proc) => (
                    <tr key={proc.id} className={selectedProcessor === proc.id ? "pcb-table-row--active" : ""}>
                      <td className="pcb-table-model">{proc.name}</td>
                      <td>{proc.cores}</td>
                      <td>{proc.clock}</td>
                      <td>{proc.tdp}</td>
                      <td className="pcb-table-price">${proc.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>

          <aside className="pcb-right">
            <div className="pcb-actions">
              <h4 className="pcb-actions-title">BUILD ACTIONS</h4>
              <button className="pcb-action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Export PDF Summary
              </button>
              <button className="pcb-action-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                WhatsApp Expert
              </button>
            </div>

            <div className="pcb-saved">
              <h4 className="pcb-saved-title">Saved Configs</h4>
              {savedConfigs.map((config, i) => (
                <div key={i} className="pcb-saved-item">
                  <span className="pcb-saved-name">{config.name}</span>
                  <span className="pcb-saved-time">{config.time}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}