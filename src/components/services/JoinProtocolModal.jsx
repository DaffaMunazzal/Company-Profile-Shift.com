import { useState } from "react";
import Modal from "../ui/Modal";
import { PROTOCOL_PACKAGE } from "../../constants";
import { getProtocolMessage, openWhatsApp } from "../../utils/whatsapp";
import { CheckCircleIcon } from "./icon";
import "./JoinProtocolModal.css";

const STEP = {
    FORM: "form",
    LOADING: "loading",
    SUCCESS: "success",
};

const INITIAL_FORM = { name: "", email: "", phone: "" };

export default function JoinProtocolModal({ open, onClose }) {
    const [step, setStep] = useState(STEP.FORM);
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});

    const resetAndClose = () => {
        setStep(STEP.FORM);
        setForm(INITIAL_FORM);
        setErrors({});
        onClose();
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const validate = () => {
        const nextErrors = {};
        if (!form.name.trim()) nextErrors.name = "Nama Wajib diisi.";
        if (!form.email.trim()) {
            nextErrors.email = "Email wajib diisi.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Format email tidak valid.";
        }
        if (!form.phone.trim()) {
            nextErrors.phone = "Nomor WhatsApp wajib diisi.";
        } else if (!/^[0-9+\s-]{8,}$/.test(form.phone)) {
            nextErrors.phone = "Format nomor WhatsApp tidak valid.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStep(STEP.LOADING);
        window.setTimeout(() => {
            setStep(STEP.SUCCESS);
        }, 1800);
    };

    const handleConfirmWhatsApp = () => {
        openWhatsApp(
            getProtocolMessage({
                name: form.name,
                email: form.email,
                phone: form.phone,
                packageName: PROTOCOL_PACKAGE.duration,
            })
        );
        resetAndClose();
    };

    return (
        <Modal
            open={open}
            onClose={resetAndClose}
            title={step === STEP.SUCCESS ? "Pembayaran Berhasil" : "Join the Protocol"}
            maxWidth={460}
        >
            {step === STEP.FORM && (
                <form className="protocol-modal__form" onSubmit={handleSubscribe} noValidate>
                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-name">Nama</label>
                        <input
                            id="protocol-name"
                            type="text"
                            value={form.name}
                            onChange={handleChange("name")}
                            placeholder="Nama Lengkap"
                        />
                        {errors.name && <span className="protocol-modal__error">{errors.name}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-email">Email</label>
                        <input
                            id="protocol-email"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            placeholder="nama@email.com"
                        />
                        {errors.email && <span className="protocol-modal__error">{errors.email}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-phone">Nomor WhatsApp</label>
                        <input
                            id="protocol-phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange("phone")}
                            placeholder="08xxxxxxxxxx"
                        />
                        {errors.phone && <span className="protocol-modal__error">{errors.phone}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-package">Paket Langganan</label>
                        <select id="protocol-package" defaultValue={PROTOCOL_PACKAGE.id} disabled>
                            <option value={PROTOCOL_PACKAGE.id}>{PROTOCOL_PACKAGE.name}</option>
                        </select>
                    </div>

                    <div className="protocol-modal__price-row">
                        <span>Total Pembayaran</span>
                        <strong>{PROTOCOL_PACKAGE.priceLabel}</strong>
                    </div>

                    <div className="protocol-modal__actions">
                        <button type="button" className="protocol-modal__btn protocol-modal__btn--ghost" onClick={resetAndClose}>
                            Cancel
                        </button>
                        <button type="submit" className="protocol-modal__btn protocol-modal__btn--primary">
                            Subscribe
                        </button>
                    </div>
                </form>
            )}

            {step === STEP.LOADING && (
                <div className="protocol-modal__status">
                    <div className="protocol-modal__spinner"/>
                    <p>Memproses Pembayaran...</p>
                    <span className="protocol-modal__status-note">Mohon tunggu sebentar (simulasi frontend).</span>
                </div>
            )}

            {step === STEP.SUCCESS && (
                <div className="protocol-modal__status">
                    <CheckCircleIcon />
                    <p className="protocol-modal__status-note">Terima kasih telah berlangganan Protocol Package selama 12 bulan.</p>
                    <span className="protocol-modal__status-note">
                        Konfirmasi pendaftaran akan dikirim melalui WhatsApp ke admin kami.
                    </span>
                    <button
                        type="button"
                        className="protocol-modal__btn protocol-modal__btn--primary protocol-modal__btn--full"
                        onClick={handleConfirmWhatsApp}
                    >
                        Konfirmasi via WhatsApp
                    </button>
                </div>
            )}
        </Modal>
    );
}