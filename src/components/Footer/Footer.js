import Link from 'next/link';
import { Film, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Info */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Film className={styles.icon} />
                            <span>Movie<span>lifez</span></span>
                        </Link>
                        <p className={styles.description}>
                            Connecting the brightest talents with the world's leading filmmakers and production houses. Your journey to stardom begins here.
                        </p>
                        <div className={styles.socials}>
                            <a href="https://www.facebook.com/share/1XALDgCPid/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=m5jec1k" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Instagram size={20} /></a>
                            <a href="https://youtube.com/@movielifez-o7e?si=2NOTNPk8r_5DTOnY" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksBlock}>
                        <h3>Platform</h3>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Services</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className={styles.linksBlock}>
                        <h3>Resources</h3>
                        <ul>
                            <li><Link href="/register">Actor Registration</Link></li>
                            <li><Link href="/request">Client Request</Link></li>
                            <li><Link href="/contact">Support Center</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contact}>
                        <h3>Get in Touch</h3>
                        <div className={styles.contactItem}>
                            <Phone size={18} className={styles.contactIcon} />
                            <span>+91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(-10) : '77992 02129'}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={18} className={styles.contactIcon} />
                            <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Movielifez4u@gmail.com'}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <MapPin size={18} className={styles.contactIcon} />
                            <span>{process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'CCHF+9V7, Krishna Nagar, Jubli Hills, Hyderabad, Telangana 500034'}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>
                        &copy; {new Date().getFullYear()} Movielifez. All rights reserved. | Developed by <a href="https://www.codtechitsolutions.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary, #00B4D8)', textDecoration: 'none', fontWeight: 'bold' }}>CODTECH IT SOLUTION</a>
                    </p>
                    <div className={styles.bottomLinks}>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
