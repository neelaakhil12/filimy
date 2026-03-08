"use client";

import { useState } from 'react';
import PageHero from '@/components/PageHero/PageHero';
import styles from './contact.module.css';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { sendToWhatsApp } from '@/lib/whatsapp';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendToWhatsApp(formData, "Contact Form Inquiry");
        alert("Inquiry sent via WhatsApp!");
    };

    return (
        <div>
            <PageHero
                title="Contact Us"
                description="Have questions? We're here to help you navigate your journey in the film industry."
                image="https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop"
            />

            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.contactGrid}>
                        <div className={styles.infoBox}>
                            <div className={styles.sectionHeader}>
                                <span className="label">Get In Touch</span>
                                <h2>Contact Details</h2>
                                <p>Reach out to us for any queries related to actor registration or casting requirements.</p>
                            </div>

                            <div className={styles.detailsList}>
                                <div className={styles.detailItem}>
                                    <div className={styles.iconCircle}><Phone size={24} /></div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(-10) : '77992 02129'}</p>
                                    </div>
                                </div>
                                <div className={styles.detailItem}>
                                    <div className={styles.iconCircle}><Mail size={24} /></div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Movielifez4u@gmail.com'}</p>
                                    </div>
                                </div>
                                <div className={styles.detailItem}>
                                    <div className={styles.iconCircle}><MapPin size={24} /></div>
                                    <div>
                                        <h4>Office</h4>
                                        <p>{process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'CCHF+9V7, Krishna Nagar, Jubli Hills, Hyderabad, Telangana 500034'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.socialBox}>
                                <h4>Follow Us</h4>
                                <div className={styles.socials}>
                                    <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=m5jec1k" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                                    <a href="https://www.facebook.com/share/1XALDgCPid/" target="_blank" rel="noopener noreferrer"><Facebook /></a>
                                    <a href="https://youtube.com/@movielifez-o7e?si=2NOTNPk8r_5DTOnY" target="_blank" rel="noopener noreferrer"><Youtube /></a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formBox}>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Subject</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows="5" required></textarea>
                                </div>
                                <button type="submit" className={styles.submitBtn}>
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.mapSection}>
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'CCHF+9V7, Krishna Nagar, Jubli Hills, Hyderabad, Telangana 500034')}&output=embed`}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
