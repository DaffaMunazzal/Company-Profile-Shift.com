import Modal from "../ui/Modal";
import { BUSINESS_HOURS } from "../../constants";
import { getConsultationMessage, openWhatsApp } from "../../utils/whatsapp";
import "./ScheduleConsultationModal.css";

export default function ScheduleConsultationModal({ open, onClose }) {
    const handleChat = () => {
        openWhatsApp(getConsultationMessage());
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Schedule Consultation">
            <p className="schedule-modal__label">Jam Operasional</p>

            <ul className="schedule-modal__list">
                {BUSINESS_HOURS.map((item) => (
                    <li className="schedule-modal__row" key={item.day}>
                        <span className="schedule-modal__day">{item.day}</span>
                        <span
                            className={`schedule-modal__hours ${
                                item.hours === "Libur" ? "schedule-modal__hours--off" : ""
                            }`}
                        >
                            {item.hours}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="schedule-modal__actions">
                <button type="button" className="schedule-modal__btn schedule-modal__btn--ghost" onClick={onClose}>
                    Tutup
                </button>
                <button type="button" className="schedule-modal__btn schedule-modal__btn--primary" onClick={handleChat}>
                    Chat via WhatsApp
                </button>
            </div>
        </Modal>
    );
}