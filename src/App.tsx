import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import ReportViewer from '@/components/ReportViewer';
import Benefits from '@/components/Benefits';
import Zones from '@/components/Zones';
import Pricing from '@/components/Pricing';
import Calculator from '@/components/Calculator';
import Booking from '@/components/Booking';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Legal from '@/components/Legal';
import Footer from '@/components/Footer';

const App: React.FC = () => {
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 200);
        }
    }, []);

    return (
        <div className="bg-white text-slate-700 font-sans">
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Process />
                <ReportViewer />
                <Benefits />
                <Zones />
                <Pricing />
                <Calculator />
                <Booking />
                <Testimonials />
                <Faq />
                <Contact />
                <Legal />
            </main>
            <Footer />
        </div>
    );
};

export default App;
