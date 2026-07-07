import { useMemo, useState } from "react";
import MainLayout from "../components/MainLayout"
import FilterSidebar from "../components/products/FilterSidebar"
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/products/Pagination";
import { PRODUCTS, SORT_OPTIONS } from "../data/products";
import "../style/Products.css"

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
    categories: [],
    availability: "all",
    maxPrice: 30000000
}

export default function Products() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [page, setPage] = useState(1);
    const [sortOpen, setSortOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        let result = PRODUCTS.filter((p) => {
            if (filters.categories.length && !filters.categories.includes(p.category)) return false;
            if (filters.availability === "in-stock" && p.stockStatus === "out-of-stock") return false;
            if (filters.availability === "pre-order" && p.stockStatus !== "pre-order") return false
            if (p.price > filters.maxPrice) return false;
            if (search.trim()){
                const q = search.toLowerCase();
                const haystack = `${p.name} ${p.variant} ${p.sku} ${p.categoryLabel}`.toLowerCase();
                if (!haystack.includes(q)) return false
            }
            return true
        });

        switch (sortBy){
            case "price-asc":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                result = [...result].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return result
    }, [filters, search, sortBy]);
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const currentPages = Math.min(page, totalPages);
    const pageItems = filteredProducts.slice((currentPages - 1) * PAGE_SIZE, currentPages * PAGE_SIZE);

    const rangeStart = filteredProducts.length === 0 ? 0 : (currentPages - 1) * PAGE_SIZE + 1;
    const rangeEnd = Math.min(currentPages * PAGE_SIZE, filteredProducts.length);

    const handleFiltersChange = (next) => {
        setFilters(next);
        setPage(1);
    }

    const handleClearFilters = () => {
        setFilters(DEFAULT_FILTERS);
        setSearch("");
        setSearchInput("");
        setPage(1);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    const currentSortLabel = SORT_OPTIONS.find((o) => o.id === sortBy)?.label;

    return(
        <MainLayout activePath="/products">
            <div className="products-page">
                <div className="products-page__container">
                    <section className="products-hero">
                        <h1 className="products-hero__title">Professional Grade Hardware.</h1>
                        <p className="products-hero__subtitle">
                            Browse our curated selection of high-performance components, engineered for
                            creators and technical enthusiasts who demand perfection.
                        </p>
                    </section>

                    <section className="products-layout">
                        <button type="button"
                            onClick={() => setMobileFiltersOpen((o) => !o)}
                            className="products-layout__mobile-toggle">
                            Filters
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ transform: mobileFiltersOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                            >
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>                                
                            </svg>
                        </button>

                        <FilterSidebar
                            filters={filters}
                            onChange={handleFiltersChange}
                            onClear={handleClearFilters}
                            className={mobileFiltersOpen ? "filter-sidebar--open" : ""}
                        />
                        <div className="products-main">
                            <form onSubmit={handleSearchSubmit} className="products-search">
                                <div className="products-search__field">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="products-search__icon">
                                        <circle cx="11" cy="11" r="7"/>
                                        <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                                    </svg>
                                    <input type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder="Search by model, SKU, or series..."
                                        className="products-search__input"
                                    />
                                </div>
                                <button type="submit" className="products-search__submit">
                                    Search Inventory
                                </button>
                            </form>
                            <div className="products-toolbar">
                                <p className="products-toolbar__count"> {filteredProducts.length === 0 ? "No products found" : `Showing ${rangeStart}-${rangeEnd} of ${filteredProducts.length} products`}</p>
                                <div className="products-sort">
                                    <span className="products-sort__label">Sort by:</span>
                                    <button type="button" onClick={() => setSortOpen((o) => !o)} className="products-sort__trigger">
                                        {currentSortLabel}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    {sortOpen && (
                                        <ul className="products-sort__menu">
                                            {SORT_OPTIONS.map((opt) => (
                                                <li key={opt.id}>
                                                    <button type="button" onClick={() => {
                                                        setSortBy(opt.id);
                                                        setSortOpen(false)
                                                    }} className={`products-sort__item ${opt.id === sortBy ? "products-sort__item--active" : ""}`}>
                                                        {opt.label}
                                                    </button>
                                                </li>
                                            ))}
                                            
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {pageItems.length > 0 ? (
                                <div className="products-grid">
                                    {pageItems.map((products) => (
                                        <ProductCard key={products.id} product={products}/>
                                    ))}
                                </div>
                            ) : (
                                <div className="products-empty">
                                    <p className="products-empty__title">No products match those filters</p>
                                    <p className="products-empty__subtitle">Try widening your price range or clearing a filter.</p>
                                    <button type="button" onClick={handleClearFilters} className="products-empty__btn">
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                            <Pagination
                            currentPage={currentPages}
                            totalPages={totalPages}
                            onPageChange={(p) => {
                                setPage(p);
                                window.scrollTo({ top: 0, behavior: "smooth"});
                            }}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
}
