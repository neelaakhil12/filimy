"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { ChevronRight, Play, Star, Users, Film, Award } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const adImages = [
  { src: '/images/ad1.png', label: 'Advertisement 1' },
  { src: '/images/ad2.png', label: 'Advertisement 2' },
  { src: '/images/ad3.png', label: 'Advertisement 3' },
  { src: '/images/ad4.png', label: 'Advertisement 4' },
];

export default function Home() {
  const containerRef = useRef(null);
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex(prev => (prev + 1) % adImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo(".slide-in",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2
        }
      );

      gsap.fromTo(".fade-in",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Section Animations
      const sections = gsap.utils.toArray('section');
      sections.forEach(section => {
        gsap.fromTo(section.querySelectorAll(`.${styles.serviceCard}, .${styles.actorCard}, .${styles.testimonialCard}, h2, .${styles.label}`),
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.home} ref={containerRef}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className="slide-in">We are looking for talented <span>actors</span> for our next project</h1>
          <p className="fade-in">
            Connecting talented actors with world-class filmmakers, production houses, and casting directors.
            From movies to web series, discover the faces that bring stories to life.
          </p>
          <div className={`${styles.heroButtons} fade-in`}>
            <Link href="/register" className={styles.primaryBtn}>
              Enroll Now <ChevronRight size={18} />
            </Link>
            <Link href="/request" className={styles.secondaryBtn}>
              <Play size={18} fill="currentColor" /> Hire Actors
            </Link>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Our Expertise</span>
            <h2>Premium Casting Solutions</h2>
          </div>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <Film className={styles.cardIcon} />
              <h3>Movies & Web Series</h3>
              <p>Professional actors for feature films and high-end streaming content.</p>
            </div>
            <div className={styles.serviceCard}>
              <Star className={styles.cardIcon} />
              <h3>Advertisements</h3>
              <p>Fresh faces for brand commercials and commercial photography.</p>
            </div>
            <div className={styles.serviceCard}>
              <Users className={styles.cardIcon} />
              <h3>Short Films & Events</h3>
              <p>Talent for independent projects, corporate films, and live stage events.</p>
            </div>
            <div className={styles.serviceCard}>
              <Award className={styles.cardIcon} />
              <h3>Brand Promotions</h3>
              <p>Influencers and actors for digital campaigns and brand activations.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Advertising Slides Section */}
      <section className={styles.adSlider}>
        <div className={styles.adSliderInner}>
          <div className={styles.sectionHeader} style={{ marginBottom: '40px' }}>
            <span className={styles.label}>Featured</span>
            <h2>Advertising Highlights</h2>
          </div>

          <div className={styles.adSlideTrack}>
            {adImages.map((ad, i) => (
              <div
                key={i}
                className={`${styles.adSlide} ${i === adIndex ? styles.adSlideActive : ''}`}
              >
                <img src={ad.src} alt={ad.label} className={styles.adImage} />
              </div>
            ))}

            {/* Prev / Next arrows */}
            <button
              className={`${styles.adArrow} ${styles.adArrowLeft}`}
              onClick={() => setAdIndex(prev => (prev - 1 + adImages.length) % adImages.length)}
              aria-label="Previous"
            >&#8249;</button>
            <button
              className={`${styles.adArrow} ${styles.adArrowRight}`}
              onClick={() => setAdIndex(prev => (prev + 1) % adImages.length)}
              aria-label="Next"
            >&#8250;</button>
          </div>

          {/* Dot indicators */}
          <div className={styles.adDots}>
            {adImages.map((_, i) => (
              <button
                key={i}
                className={`${styles.adDot} ${i === adIndex ? styles.adDotActive : ''}`}
                onClick={() => setAdIndex(i)}
                aria-label={`Go to ad ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Success Stories</span>
            <h2>What Industry Leaders Say</h2>
          </div>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>{"★".repeat(5)}</div>
              <p>"Movielifez made it incredibly easy for us to find the right talent for our latest web series. The quality of actors is exceptional."</p>
              <div className={styles.author}>
                <h4>Abhishek Sharma</h4>
                <span>Casting Director, Red Chillies</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>{"★".repeat(5)}</div>
              <p>"A highly professional platform. Every actor we've hired through them has been well-prepared and talented."</p>
              <div className={styles.author}>
                <h4>Priya Kapoor</h4>
                <span>Producer, Dharma Productions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Watch Now</span>
            <h2>Our Featured Content</h2>
          </div>
          <div className={styles.videoGrid}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/LXb3EKWsInQ"
                title="Featured Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                title="Featured Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/jNQXAC9IVRw"
                title="Featured Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaFlex}>
            <div className={styles.ctaText}>
              <h2>Are you a filmmaker looking for talent?</h2>
              <p>Submit your casting requirement and let us find the perfect match for your production.</p>
            </div>
            <Link href="/request" className={styles.ctaBtn}>
              Submit Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
