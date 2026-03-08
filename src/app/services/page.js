"use client";

import { useEffect, useRef } from 'react';
import PageHero from '@/components/PageHero/PageHero';
import styles from './services.module.css';
import { Film, Monitor, Tv, Video, Music, Mic, Award, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-in",
                { y: 30, opacity: 0 },
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
    const services = [
        { title: "Movies", icon: <Film />, description: "Mainstream cinema and independent feature films." },
        { title: "Web Series", icon: <Tv />, description: "Original series for top streaming platforms." },
        { title: "Advertisements", icon: <Monitor />, description: "TV commercials and digital brand ads." },
        { title: "Short Films", icon: <Video />, description: "Indie shorts and creative video projects." },
        { title: "Music Videos", icon: <Music />, description: "Cinematic visuals for artists and labels." },
        { title: "TV Shows", icon: <Mic />, description: "Daily soaps and reality television programs." },
        { title: "Brand Promotions", icon: <Award />, description: "Influencer marketing and brand ambassador roles." },
        { title: "Stage Performances", icon: <Zap />, description: "Live events, theater, and corporate shows." },
    ];

    return (
        <div ref={containerRef}>
            <PageHero
                title="Our Services"
                description="Providing professional casting solutions for every segment of the entertainment industry."
                image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
            />

            {/* Services List */}
            <section className={styles.servicesList}>
                <div className="container">
                    <div className={styles.grid}>
                        {services.map((service, index) => (
                            <div key={index} className={`${styles.serviceCard} fade-in`}>
                                <div className={styles.iconWrapper}>{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.process}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className="label fade-in">Workflow</span>
                        <h2 className="fade-in">How It Works</h2>
                    </div>
                    <div className={styles.processSteps}>
                        <div className={`${styles.step} fade-in`}>
                            <span>01</span>
                            <h4>Requirements</h4>
                            <p>Clients submit their specific actor requirements and project details.</p>
                        </div>
                        <div className={`${styles.step} fade-in`}>
                            <span>02</span>
                            <h4>Shortlisting</h4>
                            <p>Our team curate a list of matching talents from our extensive database.</p>
                        </div>
                        <div className={`${styles.step} fade-in`}>
                            <span>03</span>
                            <h4>Auditions</h4>
                            <p>Virtual or physical auditions are coordinated based on availability.</p>
                        </div>
                        <div className={`${styles.step} fade-in`}>
                            <span>04</span>
                            <h4>Selection</h4>
                            <p>Final talent selection and onboarding for the project.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client CTA */}
            <section className={styles.clientCta}>
                <div className="container">
                    <div className={`${styles.ctaBox} fade-in`}>
                        <div className={styles.ctaContent}>
                            <h2>Ready to find your cast?</h2>
                            <p>Our casting experts are ready to help you find the perfect match for your next project.</p>
                        </div>
                        <Link href="/request" className={styles.ctaBtn}>
                            Submit Casting Request <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
