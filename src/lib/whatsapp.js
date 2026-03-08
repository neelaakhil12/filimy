export const sendToWhatsApp = (formData, formType) => {
    const WHATSAPP_NUMBER = "919999999999"; // Replace with actual platform number

    let message = `*New ${formType} Submission from Movielifez*\n\n`;

    Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value !== 'object') {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            message += `*${formattedKey}:* ${value}\n`;
        }
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
};
