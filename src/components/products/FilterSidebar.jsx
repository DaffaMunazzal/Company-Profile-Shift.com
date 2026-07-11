import { CATEGORIES, AVAILABILITY } from "../../data/products";
import { useLanguage } from "../../context/LanguageContext";

export default function FilterSidebar({ filters, onChange, onClear, className }) {
    const { t } = useLanguage();

    const toggleCategory = (id) => {
        const next = filters.categories.includes(id)
            ? filters.categories.filter((cat) => cat !== id)
            : [...filters.categories, id];
        onChange({ ...filters, categories: next });
    };
    const toggleAvailability = (id) => onChange({ ...filters, availability: id });
    const setMaxPrice = (value) => onChange({ ...filters, maxPrice: Number(value) });

    return (
        <aside className={`filter-sidebar ${className || ""}`}>
            <div className="filter-sidebar__group">
                <h3 className="filter-sidebar__heading">{t("filters.categories")}</h3>
                <div className="filter-sidebar__options">
                    {CATEGORIES.map((cat) => (
                        <label key={cat.id} className="filter-sidebar__option">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(cat.id)}
                                onChange={() => toggleCategory(cat.id)}
                            />
                            <span>{t(`categories.${cat.id}`)}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-sidebar__group">
                <h3 className="filter-sidebar__heading">{t("filters.availability")}</h3>
                <div className="filter-sidebar__options">
                    { AVAILABILITY.map((avail) => (
                        <label key={avail.id} className="filter-sidebar__option">
                            <input
                            type="checkbox"
                            checked={filters.availability === avail.id}
                            onChange={() => toggleAvailability(avail.id)}
                            />
                            <span>{t(`availability.${avail.id}`)}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-sidebar__group">
                <h3 className="filter-sidebar__heading">{t("filters.priceRange")}</h3>
                <div className="filter-sidebar__price">
                <input
                    type="range"
                    min={0}
                    max={30000000}
                    step={500000}
                    value={filters.maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="filter-sidebar__slider"
                />
                <div className="filter-sidebar__price-labels">
                    <span>Rp0</span>
                    <span>
                    {filters.maxPrice >= 30000000
                        ? "Rp30.000.000+"
                        : `Rp${filters.maxPrice.toLocaleString("id-ID")}`}
                    </span>
                </div>
                </div>
            </div>

            <div className="filter-sidebar__clear">
                <button type="button" onClick={onClear} className="filter-sidebar__clear-btn">
                    {t("filters.clearAll")}
                </button>
            </div>
        </aside>
    );
}