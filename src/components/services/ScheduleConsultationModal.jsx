import Modal from "../ui/Modal";
import { BUSINESS_HOURS } from "../../constants";
import { getConsultationMessage, openWhatsApp } from "../../utils/whatsapp";
import { useLanguage } from "../../context/LanguageContext";
import "./ScheduleConsultationModal.css";

export default function ScheduleConsultationModal({ open, onClose }) {
    const { t } = useLanguage();

    const handleChat = () => {
        openWhatsApp(getConsultationMessage(t));
        onClose();
    };

    const translatedHours = BUSINESS_HOURS.map((item, idx) => {
        const dayLabels = [
            t("common.monFri"),
            t("common.sat"),
            t("common.sun"),
        ];
        return {
            day: dayLabels[idx] || item.day,
            hours: item.hours === "Libur" ? t("common.holiday") : item.hours,
        };
    });

    return (
        <Modal open={open} onClose={onClose} title={t("modals.schedule.title")}>
            <p className="schedule-modal__label">{t("modals.schedule.hoursLabel")}</p>

            <ul className="schedule-modal__list">
                {translatedHours.map((item) => (
                    <li className="schedule-modal__row" key={item.day}>
                        <span className="schedule-modal__day">{item.day}</span>
                        <span
                            className={`schedule-modal__hours ${
                                item.hours === t("common.holiday") ? "schedule-modal__hours--off" : ""
                            }`}
                        >
                            {item.hours}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="schedule-modal__actions">
                <button type="button" className="schedule-modal__btn schedule-modal__btn--ghost" onClick={onClose}>
                    {t("modals.schedule.closeBtn")}
                </button>
                <button type="button" className="schedule-modal__btn schedule-modal__btn--primary" onClick={handleChat}>
                    {t("modals.schedule.chatBtn")}
                </button>
            </div>
        </Modal>
    );
}