import { useEffect, useRef } from 'react';
import styles from './PageHero.module.css';
import gsap from 'gsap';

const PageHero = ({ title, description, image }) => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo("h1, p",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.2
                }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className={styles.hero}
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${image})` }}
        >
            <div className="container">
                <div className={styles.content}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
