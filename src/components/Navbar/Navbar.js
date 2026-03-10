"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Film } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Film className={styles.icon} />
                    <span>Movie<span>lifez</span></span>
                </Link>

                {/* Desktop Links */}
                <div className={styles.desktopLinks}>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={styles.link}>
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/register" className={styles.ctaButton}>
                        Enroll Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.mobileHeader}>
                        <Link href="/" className={styles.mobileLogo} onClick={() => setIsMobileMenuOpen(false)}>
                            <Film className={styles.mobileIcon} />
                            <span>Movie<span style={{ color: 'var(--primary)' }}>lifez</span></span>
                        </Link>
                        <button
                            className={styles.closeToggle}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className={styles.mobileLinksWrapper}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={styles.mobileLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.mobileActions}>
                        <Link
                            href="/register"
                            className={styles.mobileCtaPrimary}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
