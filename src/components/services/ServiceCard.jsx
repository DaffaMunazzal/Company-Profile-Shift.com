import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { getBookServiceMessage, openWhatsApp } from "../../utils/whatsapp";
import { META_ICONS, CartPlusIcon } from "./icon";
import "./ServiceCard.css";

export default function ServiceCard({ service }) {
    const { addItem } = useCart();
    const { t } = useLanguage();
    const [added, setAdded] = useState(false);

    const handleBookService = () => {
        openWhatsApp(getBookServiceMessage(service.name, t));
    };

    const handleAddToCart = () => {
        addItem(
            {
                id: service.id,
                name: service.name,
                price: service.price,
                priceLabel: service.priceLabel,
                image: service.image,
                type: "service",
            },
            1
        );
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
    };

    return (
        <article className="service-card">
            <div className="service-card__image-wrap">
                <img src={service.image} alt={service.name} className="service-card__image" loading="lazy" />
            </div>

            <div className="service-card__body">
                <div className="service-card__heading">
                    <h3 className="service-card__name">{service.name}</h3>
                    <span className="service-card__price">{service.priceLabel}</span>
                </div>

                <p className="service-card__description">{service.description}</p>

                <div className="service-card__meta">
                    {service.meta.map((item) => {
                        const Icon = META_ICONS[item.icon] || META_ICONS.clock;
                        return (
                            <span className="service-card__meta-item" key={item.label}>
                                <Icon size={15}/>
                                {item.label}
                            </span>
                        );
                    })}
                </div>

                <div className="service-card__actions">
                    <button type="button" className="service-card__book-btn" onClick={handleBookService}>
                        {t("services.bookService")}
                    </button>
                    <button
                        type="button"
                        className={`service-card__cart-btn ${added ? "service-card__cart-btn--added" : ""}`}
                        onClick={handleAddToCart}
                        aria-label={t("services.addToCartAria", { name: service.name })}
                        title={t("services.addToCartTitle")}
                    >
                        {added ? "✓" : <CartPlusIcon size={17} color="#ffffff" />}
                    </button>
                </div>
            </div>
        </article>
    );
}