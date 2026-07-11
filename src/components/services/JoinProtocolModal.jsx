import { useState } from "react";
import Modal from "../ui/Modal";
import { PROTOCOL_PACKAGE } from "../../constants";
import { getProtocolMessage, openWhatsApp } from "../../utils/whatsapp";
import { useLanguage } from "../../context/LanguageContext";
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
    const { t } = useLanguage();

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
        if (!form.name.trim()) nextErrors.name = t("modals.protocol.errorNameRequired");
        if (!form.email.trim()) {
            nextErrors.email = t("modals.protocol.errorEmailRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = t("modals.protocol.errorEmailInvalid");
        }
        if (!form.phone.trim()) {
            nextErrors.phone = t("modals.protocol.errorPhoneRequired");
        } else if (!/^[0-9+\s-]{8,}$/.test(form.phone)) {
            nextErrors.phone = t("modals.protocol.errorPhoneInvalid");
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
        const durationTranslated = t("modals.protocol.packageDuration") || PROTOCOL_PACKAGE.duration;
        openWhatsApp(
            getProtocolMessage({
                name: form.name,
                email: form.email,
                phone: form.phone,
                packageName: durationTranslated,
            }, t)
        );
        resetAndClose();
    };

    const packageNameTranslated = t("modals.protocol.packageName") || PROTOCOL_PACKAGE.name;

    return (
        <Modal
            open={open}
            onClose={resetAndClose}
            title={step === STEP.SUCCESS ? t("modals.protocol.titleSuccess") : t("modals.protocol.titleForm")}
            maxWidth={460}
        >
            {step === STEP.FORM && (
                <form className="protocol-modal__form" onSubmit={handleSubscribe} noValidate>
                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-name">{t("modals.protocol.labelName")}</label>
                        <input
                            id="protocol-name"
                            type="text"
                            value={form.name}
                            onChange={handleChange("name")}
                            placeholder={t("modals.protocol.placeholderName")}
                        />
                        {errors.name && <span className="protocol-modal__error">{errors.name}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-email">{t("modals.protocol.labelEmail")}</label>
                        <input
                            id="protocol-email"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            placeholder={t("modals.protocol.placeholderEmail")}
                        />
                        {errors.email && <span className="protocol-modal__error">{errors.email}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-phone">{t("modals.protocol.labelPhone")}</label>
                        <input
                            id="protocol-phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange("phone")}
                            placeholder={t("modals.protocol.placeholderPhone")}
                        />
                        {errors.phone && <span className="protocol-modal__error">{errors.phone}</span>}
                    </div>

                    <div className="protocol-modal__field">
                        <label htmlFor="protocol-package">{t("modals.protocol.labelPackage")}</label>
                        <select id="protocol-package" defaultValue={PROTOCOL_PACKAGE.id} disabled>
                            <option value={PROTOCOL_PACKAGE.id}>{packageNameTranslated}</option>
                        </select>
                    </div>

                    <div className="protocol-modal__price-row">
                        <span>{t("modals.protocol.labelTotalPay")}</span>
                        <strong>{PROTOCOL_PACKAGE.priceLabel}</strong>
                    </div>

                    <div className="protocol-modal__actions">
                        <button type="button" className="protocol-modal__btn protocol-modal__btn--ghost" onClick={resetAndClose}>
                            {t("modals.protocol.btnCancel")}
                        </button>
                        <button type="submit" className="protocol-modal__btn protocol-modal__btn--primary">
                            {t("modals.protocol.btnSubscribe")}
                        </button>
                    </div>
                </form>
            )}

            {step === STEP.LOADING && (
                <div className="protocol-modal__status">
                    <div className="protocol-modal__spinner"/>
                    <p>{t("modals.protocol.statusLoading")}</p>
                    <span className="protocol-modal__status-note">{t("modals.protocol.statusLoadingNote")}</span>
                </div>
            )}

            {step === STEP.SUCCESS && (
                <div className="protocol-modal__status">
                    <CheckCircleIcon />
                    <p className="protocol-modal__status-note">{t("modals.protocol.statusSuccessMsg")}</p>
                    <span className="protocol-modal__status-note">
                        {t("modals.protocol.statusSuccessNote")}
                    </span>
                    <button
                        type="button"
                        className="protocol-modal__btn protocol-modal__btn--primary protocol-modal__btn--full"
                        onClick={handleConfirmWhatsApp}
                    >
                        {t("modals.protocol.btnConfirmWa")}
                    </button>
                </div>
            )}
        </Modal>
    );
}