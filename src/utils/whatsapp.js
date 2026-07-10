import { WHATSAPP_NUMBER } from "../constants";

export function buildWhatsAppLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
}

export function getBookServiceMessage(servicesName) {
    return [
        "Halo Admin,",
        "Saya ingin melakukan booking service untuk:",
        `Service: ${servicesName}`,
        "Mohon informasi jadwal yang tersedia.",
        "Terima kasih",
    ].join("\n");
}

export function getConsultationMessage() {
    return [
        "Halo Admin",
        "Saya ingin melakukan konsultasi mengenai layanan yang tersedia.",
        "Mohon informasi jadwal konsultasi.",
        "Terima kasih.",
    ].join("\n");
}

export function getViewProcessMessage() {
    return [
        "Halo Admin,",
        "Saya ingin menanyakan progres service komputer saya.",
        "Mohon diinformasikan sudah sampai tahap mana proses pengerjaannya.",
        "Terima kasih.",
    ].join("\n");
}

export function getContactFormMessage({ name, email, subject, message }) {
    return [
        "Halo Admin,",
        "Saya ingin menghubungi melalui form contact.",
        `Nama: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Pesan: ${message}`,
        "Terima kasih.",
    ].join("\n");
}

export function getProtocolMessage({ name, email, phone, packageName }) {
    return [
        "Halo Admin,",
        "Saya telah melakukan pendaftaran Protocol Membership.",
        `Nama: ${name}`,
        `Email: ${email}`,
        `No Wa: ${phone}`,
        `Paket: ${packageName}`,
        "Mohon konfirmasi pembayaran saya.",
        "Terima kasih.",
    ].join("\n");
}