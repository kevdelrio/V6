import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '@/constants';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, CheckCircleGreenIcon } from '@/components/Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ref, isVisible] = useScrollAnimation();
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        if (isVisible) {
            resetTimeout();
            timeoutRef.current = window.setTimeout(
                () => setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length),
                7000
            );
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isVisible]);
    
    const nextTestimonial = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section id="Testimonials" ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Ce que disent mes clients</h2>
                    <div className="mt-4 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-inner overflow-hidden">
                        <div className="absolute top-4 left-6 text-8xl text-orange-vif font-serif opacity-20">“</div>
                        <div className="relative z-10 min-h-[150px] md:min-h-[120px]">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <div key={testimonial.id} className={`transition-opacity duration-500 ease-in-out absolute w-full px-4 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                    <p className="text-lg md:text-xl text-slate-700 italic mb-4">{testimonial.quote}</p>
                                    <div className="flex items-center mb-6">
                                        {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => <StarIcon key={i} />)}
                                        <CheckCircleGreenIcon/>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-blue-deep">{testimonial.author}</p>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition text-blue-deep">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition text-blue-deep">
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;