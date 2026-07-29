import { useEffect } from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Solutions from '../../components/Solutions';
import Pricing from '../../components/Pricing';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

export default function Home() {
    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));

        // Cleanup
        return () => observer.disconnect();
    }, []);

    // Intersection Observer for Active Nav Link (Scroll Spy)
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const spyOptions = {
            root: null,
            rootMargin: '-40% 0px -60% 0px',
            threshold: 0
        };

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Handle 'Produto' link mapped to hero
                        if (id === 'hero' && link.getAttribute('href') === '#') {
                            link.classList.add('active');
                        } else if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, spyOptions);

        sections.forEach(sec => spyObserver.observe(sec));

        return () => spyObserver.disconnect();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Solutions />
                <Pricing />
                <FinalCTA />
            </main>
            <Footer />
        </>
    );
}
