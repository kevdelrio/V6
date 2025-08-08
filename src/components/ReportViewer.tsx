import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GALLERY_IMAGES } from '@/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ReportViewer: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [ref, isVisible] = useScrollAnimation();
    const timeoutRef = useRef<number | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const pauseAutoPlay = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsPaused(true);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % GALLERY_IMAGES.length);
    }, []);

    useEffect(() => {
        if (!isPaused && isVisible) {
            pauseAutoPlay();
            timeoutRef.current = window.setTimeout(nextSlide, 5000);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, isPaused, isVisible, nextSlide, pauseAutoPlay]);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const handleInteraction = (action: () => void) => () => {
        pauseAutoPlay();
        action();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        pauseAutoPlay();
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextSlide();
        }

        if (touchStartX.current - touchEndX.current < -50) {
            prevSlide();
        }
    };

    return (
        <section id="ReportViewer" ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Un Rapport Clair et Détaillé</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Découvrez un exemple de rapport d'état des lieux pour apprécier la rigueur et la précision de mon travail.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>

                <div className="relative max-w-2xl mx-auto shadow-2xl rounded-lg" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <div className="relative aspect-[1/1.414] overflow-hidden rounded-lg">
                        {GALLERY_IMAGES.map((image, index) => (
                            <div key={image.id} className="absolute w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}>
                                <img src={image.src} alt={`Page ${index + 1} du rapport`} className="w-full h-full object-contain bg-gray-100" />
                            </div>
                        ))}
                    </div>

                    <button onClick={handleInteraction(prevSlide)} aria-label="Page précédente" className="absolute top-1/2 left-2 md:-left-12 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md hover:shadow-lg transition text-blue-deep z-10">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={handleInteraction(nextSlide)} aria-label="Page suivante" className="absolute top-1/2 right-2 md:-right-12 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md hover:shadow-lg transition text-blue-deep z-10">
                        <ChevronRightIcon />
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                        {GALLERY_IMAGES.map((_, index) => (
                            <button key={_.id} onClick={handleInteraction(() => goToSlide(index))} aria-label={`Aller à la page ${index + 1}`} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-orange-vif scale-125' : 'bg-blue-deep/50 hover:bg-blue-deep/75'}`}></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportViewer;