import { useLanguage } from "../../context/LanguageContext";

function getPageList(curent, total) {
    const pages = new Set([1, total, curent, curent - 1, curent + 1]);
    const sorted = [...pages].filter((v) => v >= 1 && v <= total).sort((a, b) => a - b);

    const  withGaps = [];
    sorted.forEach((page, idx) => {
        if (idx > 0 && page - sorted[idx - 1] > 1) withGaps.push("...");
        withGaps.push(page);
    });
    return withGaps;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const { t } = useLanguage();
    if (totalPages <= 1) return null;
    const pages = getPageList(currentPage, totalPages);

    return (
        <nav aria-label={t("pagination.nav")} className="pagination">
            <button
            type="button"
            aria-label={t("pagination.prev")}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="pagination__btn"
            >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 1L2 6l5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {pages.map((page, idx) => (
                page === "..." ? (
                    <span key={`gap-${idx}`} className="pagination__gap">...</span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`pagination__btn ${page === currentPage ? "pagination__btn--active" : ""}`}
                    >
                        {page}
                    </button>
                )
            ))}
            <button
                type="button"
                aria-label={t("pagination.next")}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="pagination__btn"
            >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </nav>
    );
}