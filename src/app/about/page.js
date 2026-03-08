"use client";

import PageHero from '@/components/PageHero/PageHero';
import styles from './about.module.css';
import { Target, Eye, Heart, Users, Shield, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-in",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <PageHero
                title="Our Story"
                description="Simplifying the connection between talent and the entertainment industry."
                image="https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=2069&auto=format&fit=crop"
            />

            {/* Intro Section */}
            <section className={styles.intro}>
                <div className="container">
                    <div className={styles.introGrid}>
                        <div className={styles.introText}>
                            <span className="label">Who We Are</span>
                            <h2 className="fade-in">Dedicated to the Art of <span>Casting</span></h2>
                            <p className="fade-in">
                                Movielifez is a trusted platform designed to bridge the gap between talented actors and visionary filmmakers.
                                We believe that every great project starts with the right faces, and our mission is to make the discovery
                                process seamless, professional, and rewarding for both parties.
                            </p>
                        </div>
                        <div className={`${styles.introStats} fade-in`}>
                            <div className={styles.stat}>
                                <h3>5000+</h3>
                                <p>Registered Actors</p>
                            </div>
                            <div className={styles.stat}>
                                <h3>200+</h3>
                                <p>Projects Casted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className={styles.missionVision}>
                <div className="container">
                    <div className={styles.mvGrid}>
                        <div className={`${styles.mvCard} fade-in`}>
                            <Eye className={styles.mvIcon} />
                            <h3>Our Vision</h3>
                            <p>To become the world's most trusted and efficient platform for entertainment talent discovery, empowering millions of artists to reach their full potential.</p>
                        </div>
                        <div className={`${styles.mvCard} fade-in`}>
                            <Target className={styles.mvIcon} />
                            <h3>Our Mission</h3>
                            <p>To simplify and modernize the casting process through technology, transparency, and a curated approach to talent management.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={styles.values}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className="label">Why Us</span>
                        <h2>Our Core Values</h2>
                    </div>
                    <div className={styles.valueGrid}>
                        <div className={`${styles.valueCard} fade-in`}>
                            <Shield className={styles.valueIcon} />
                            <h4>Professionalism</h4>
                            <p>We maintain the highest standards of integrity in all our interactions.</p>
                        </div>
                        <div className={`${styles.valueCard} fade-in`}>
                            <Zap className={styles.valueIcon} />
                            <h4>Creativity</h4>
                            <p>We embrace innovative ways to showcase talent and connect partners.</p>
                        </div>
                        <div className={`${styles.valueCard} fade-in`}>
                            <Heart className={styles.valueIcon} />
                            <h4>Talent Growth</h4>
                            <p>We are committed to nurturing and supporting the growth of our artists.</p>
                        </div>
                        <div className={`${styles.valueCard} fade-in`}>
                            <Users className={styles.valueIcon} />
                            <h4>Collaboration</h4>
                            <p>We foster a community based on mutual respect and shared success.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
