import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants';
import { MenuIcon, CloseIcon } from '@/components/Icons';

const Logo = () => (
    <a href="#Home" className="flex items-center space-x-2">
        <img
            src="/assets/logo.png"
            alt="KD Expertise"
            className="h-16 w-auto sm:h-20"
        />
        <span className="sr-only">KD Expertise</span>
    </a>
);


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const current = window.scrollY;
            const isMobile = window.innerWidth < 1024; // lg breakpoint
            if (!isMobile) {
                setIsCollapsed(false);
                return;
            }
            if (current > lastScrollY) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
            lastScrollY = current;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur z-30 shadow-sm">
            <div className={`container mx-auto flex items-center justify-between px-4 lg:px-0 transition-all duration-300 ${isCollapsed ? 'py-1' : 'py-3'} lg:py-3`}>
                <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block transition-opacity duration-300`}>
                    <Logo />
                </div>
                <nav className="hidden lg:flex items-center space-x-6">
                    {NAV_LINKS.map((link) => (
                        <a key={link.name} href={link.href} className="font-semibold text-blue-deep hover:text-orange-vif transition-colors duration-200">
                            {link.name}
                        </a>
                    ))}
                    <a href="#Contact" className="bg-orange-vif text-white px-4 py-2 rounded-lg shadow hover:bg-orange-vif-dark transition">
                        Contactez-moi
                    </a>
                </nav>
                <button onClick={toggleMenu} aria-label="Ouvrir le menu" className="lg:hidden text-blue-deep focus:outline-none">
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
            {isMenuOpen && (
                <nav className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 lg:hidden">
                    {NAV_LINKS.map((link) => (
                        <a key={link.name} href={link.href} className="block text-center py-2 font-semibold text-blue-deep hover:text-orange-vif transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                     <a href="#Contact" className="mt-2 inline-block mx-auto bg-orange-vif text-white px-4 py-2 rounded-lg shadow hover:bg-orange-vif-dark transition" onClick={() => setIsMenuOpen(false)}>
                        Contactez-moi
                    </a>
                </nav>
            )}
        </header>
    );
};

export default Header;
