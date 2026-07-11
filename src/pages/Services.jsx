import { useState } from "react";
import MainLayout from "../components/MainLayout";
import ServiceCard from "../components/services/ServiceCard";
import ScheduleConsultationModal from "../components/services/ScheduleConsultationModal";
import JoinProtocolModal from "../components/services/JoinProtocolModal";
import { ShieldIcon } from "../components/services/icon";
import { SERVICES } from "../data/servicesData";
import { getViewProcessMessage, openWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "../context/LanguageContext";
import "../style/Services.css";

export default function Services() {
  const { t } = useLanguage();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);

  const handleViewProcess = () => {
    openWhatsApp(getViewProcessMessage(t));
  };

  const translatedServices = SERVICES.map((service) => {
    const labels = t(`services.items.${service.id}.meta`);
    return {
      ...service,
      name: t(`services.items.${service.id}.name`),
      description: t(`services.items.${service.id}.description`),
      meta: service.meta.map((m, i) => ({ ...m, label: Array.isArray(labels) ? labels[i] : m.label })),
    };
  });

  return (
    <MainLayout activePath="/services">
      <div className="services-page">
        <section className="services-hero">
          <p className="services-hero__eyebrow" data-aos="fade-up">
            {t("services.eyebrow")}
          </p>

          <h1 data-aos="fade-up" data-aos-delay="100">
            {t("services.titlePrefix")} <span>{t("services.titleHighlight")}</span> {t("services.titleSuffix")}
          </h1>

          <div className="services-hero__actions" data-aos="fade-up" data-aos-delay="200">
            <button
              type="button"
              className="services-hero__btn services-hero__btn--primary"
              onClick={() => setScheduleOpen(true)}
            >
              {t("services.scheduleBtn")}
            </button>
            <button
              type="button"
              className="services-hero__btn services-hero__btn--outline"
              onClick={handleViewProcess}
            >
              {t("services.viewProcessBtn")}
            </button>
          </div>
        </section>

        <section className="services-grid-section">
          <div className="services-grid">
            {translatedServices.map((service, i) => (
              <div key={service.id} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </section>

        <section className="protocol-section">
            <h2 className="protocol-section__title" data-aos="fade-up">{t("services.protocolTitle")}</h2>

            <div className="protocol-grid">
              <div className="protocol-card protocol-card--hero" data-aos="fade-up">
                <h3>{t("services.maintenanceTitle")}</h3>
                <p>{t("services.maintenanceDesc")}</p>
                <button type="button" onClick={() => setProtocolOpen(true)}>
                  {t("services.joinBtn")}
                </button>
              </div>

              <div className="protocol-card protocol-card--info" data-aos="fade-up" data-aos-delay="80">
                <div className="protocol-card__icon-row">
                  <ShieldIcon size={24} color="#2a1614" />
                  <h4>{t("services.diagnosticTitle")}</h4>
                </div>
                <p>{t("services.diagnosticDesc")}</p>
              </div>

              <div className="protocol-card protocol-card--stat-primary" data-aos="fade-up" data-aos-delay="160">
                <div className="protocol-card__stat-value">99.8%</div>
                <div className="protocol-card__stat-label">{t("services.successRateLabel")}</div>
              </div>

              <div className="protocol-card protocol-card--stat-soft" data-aos="fade-up" data-aos-delay="240">
                <div className="protocol-card__stat-value">24/7</div>
                <div className="protocol-card__stat-label">{t("services.clientPortalLabel")}</div>
              </div>
            </div>
        </section>
      </div>

      <ScheduleConsultationModal open={scheduleOpen} onClose={() => setScheduleOpen(false)}/>
        <JoinProtocolModal open={protocolOpen} onClose={() => setProtocolOpen(false)}/>
    </MainLayout>
  );
}