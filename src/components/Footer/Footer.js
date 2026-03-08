import Link from 'next/link';
import { Film, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
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
                            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
                            <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
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
                            <span>+91 98765 43210</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={18} className={styles.contactIcon} />
                            <span>contact@movielifez.com</span>
                        </div>
                        <div className={styles.contactItem}>
                            <MapPin size={18} className={styles.contactIcon} />
                            <span>Film City, Hyderabad, India</span>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>&copy; {new Date().getFullYear()} Movielifez. All rights reserved.</p>
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
