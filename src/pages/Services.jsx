import { useState } from "react";
import MainLayout from "../components/MainLayout";
import SmoothScroll from "../components/SmoothScroll";
import ServiceCard from "../components/services/ServiceCard";
import ScheduleConsultationModal from "../components/services/ScheduleConsultationModal";
import JoinProtocolModal from "../components/services/JoinProtocolModal";
import { ShieldIcon } from "../components/services/icon";
import { SERVICES } from "../data/servicesData";
import { getViewProcessMessage, openWhatsApp } from "../utils/whatsapp";
import "../style/Services.css";

export default function Services() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);

  const handleViewProcess = () => {
    openWhatsApp(getViewProcessMessage());
  };

  return (
    <SmoothScroll>
      <MainLayout activePath="/services">
        <div className="services-page">
          <section className="services-hero">
            <p className="services-hero__eyebrow">
              Our precision engineering services extend beyond hardware. We provide expert technical solutions to ensure your digital tools perform at the bleeding edge of possibility.
            </p>

            <h1>
              Technical Mastery for <span>High-Performance</span> Workflows.
            </h1>

            <div className="services-hero__actions">
              <button
                type="button"
                className="services-hero__btn services-hero__btn--primary"
                onClick={() => setScheduleOpen(true)}
              >
                Schedule Consultation
              </button>
              <button
                type="button"
                className="services-hero__btn services-hero__btn--outline"
                onClick={handleViewProcess}
              >
                View Process
              </button>
            </div>
          </section>

          <section className="services-grid-section">
            <div className="services-grid">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          <section className="protocol-section">
              <h2 className="protocol-section__title">The SHIFTCOM Protocol</h2>

              <div className="protocol-grid">
                <div className="protocol-card protocol-card--hero">
                  <h3>Annual Maintenance</h3>
                  <p>Our comprehensive subscription for power users. Deep cleaning, thermal paste re-application, and security audits every 12 months.</p>
                  <button type="button" onClick={() => setProtocolOpen(true)}>
                    Join the Protocol
                  </button>
                </div>

                <div className="protocol-card protocol-card--info">
                  <div className="protocol-card__icon-row">
                    <ShieldIcon size={24} color="#2a1614" />
                    <h4>Diagnostic Precision</h4>
                  </div>
                  <p>Every service begins with a 48-point technical audit using calibrated diagnostic hardware.</p>
                </div>

                <div className="protocol-card protocol-card--stat-primary">
                  <div className="protocol-card__stat-value">99.8%</div>
                  <div className="protocol-card__stat-label">Success Rate</div>
                </div>

                <div className="protocol-card protocol-card--stat-soft">
                  <div className="protocol-card__stat-value">24/7</div>
                  <div className="protocol-card__stat-label">Client Portal</div>
                </div>
              </div>
          </section>
        </div>

        <ScheduleConsultationModal open={scheduleOpen} onClose={() => setScheduleOpen(false)}/>
          <JoinProtocolModal open={protocolOpen} onClose={() => setProtocolOpen(false)}/>
      </MainLayout>
    </SmoothScroll>
  );
}