import { WHATSAPP_NUMBER } from "../constants";

export function buildWhatsAppLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
}

export function getBookServiceMessage(servicesName, t) {
    if (t) {
        return t("whatsapp.bookService", { name: servicesName });
    }
    return [
        "Halo Admin,",
        "Saya ingin melakukan booking service untuk:",
        `Service: ${servicesName}`,
        "Mohon informasi jadwal yang tersedia.",
        "Terima kasih.",
    ].join("\n");
}

export function getConsultationMessage(t) {
    if (t) {
        return t("whatsapp.consultation");
    }
    return [
        "Halo Admin,",
        "Saya ingin melakukan konsultasi mengenai layanan yang tersedia.",
        "Mohon informasi jadwal konsultasi.",
        "Terima kasih.",
    ].join("\n");
}

export function getViewProcessMessage(t) {
    if (t) {
        return t("whatsapp.viewProcess");
    }
    return [
        "Halo Admin,",
        "Saya ingin menanyakan progres service komputer saya.",
        "Mohon diinformasikan sudah sampai tahap mana proses pengerjaannya.",
        "Terima kasih.",
    ].join("\n");
}

export function getContactFormMessage({ name, email, subject, message }, t) {
    if (t) {
        return t("whatsapp.contactForm", { name, email, subject, message });
    }
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

export function getProtocolMessage({ name, email, phone, packageName }, t) {
    if (t) {
        return t("whatsapp.protocol", { name, email, phone, packageName });
    }
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

export function getCartCheckoutMessage(items, totalPrice, t) {
    const formatIDR = (v) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(v);

    const lines = items.map(
        (item) => `• ${item.name}${item.variant ? ` (${item.variant})` : ""} x${item.qty} — ${formatIDR(item.price * item.qty)}`
    );

    if (t) {
        const header = t("whatsapp.cartCheckoutHeader");
        const footer = t("whatsapp.cartCheckoutTotal", { total: formatIDR(totalPrice) });
        return `${header}${lines.join("\n")}${footer}`;
    }

    return [
        "Halo Admin SHIFTCOM,",
        "Saya ingin melakukan pemesanan untuk produk berikut:",
        "",
        ...lines,
        "",
        `Total: ${formatIDR(totalPrice)}`,
        "",
        "Mohon informasi untuk proses pembayaran & pengiriman selanjutnya.",
        "Terima kasih.",
    ].join("\n");
}