"use client";

import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
    const WHATSAPP_NUMBER = "919999999999"; // Replace with actual platform number
    const message = "Hello, I have a query regarding Movielifez.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.float}
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className={styles.icon} size={32} />
            <span className={styles.tooltip}>Chat with us</span>
        </a>
    );
};

export default WhatsAppButton;
