'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavLink = ({ href, children, light }) => {
  const [hovered, setHovered] = useState(false);
  const baseColor = light ? '#FFFFFF' : '#3C2313';
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? '#D4A853' : baseColor }}
      className="relative text-xs uppercase tracking-widest transition-colors duration-300"
    >
      {children}
      <motion.span
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          height: '1px',
          backgroundColor: '#D4A853',
          display: 'block'
        }}
        initial={{ width: '0%' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FAF7F2] h-[70px] fixed top-0 left-0 right-0 z-50 border-b border-[rgba(212,168,83,0.3)]">
      <div className="relative flex items-center justify-between h-full px-6">
        {/* Left Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/produits">Produits</NavLink>
        </div>

        {/* Logo - always centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="Amadis"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/logo.svg';
              }}
              style={{ height: '65px', objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* Right Links - Desktop Only */}
        <div className="hidden md:flex items-center justify-end gap-8 flex-1">
          <NavLink href="/contact">Contactez-nous</NavLink>
          <NavLink href="/a-propos">À propos</NavLink>
        </div>

        {/* Mobile - Hamburger Button, pinned to the right */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-auto p-2 flex flex-col justify-center items-end"
          aria-label="Menu"
        >
          <span className="block h-[2px] w-[24px] bg-[#3C2313] mb-[4px]"></span>
          <span className="block h-[2px] w-[24px] bg-[#3C2313] mb-[4px]"></span>
          <span className="block h-[2px] w-[24px] bg-[#3C2313]"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#3C2313] z-50 flex flex-col items-center justify-center space-y-6">
          <NavLink href="/" light>Accueil</NavLink>
          <NavLink href="/produits" light>Produits</NavLink>
          <NavLink href="/contact" light>Contactez-nous</NavLink>
          <NavLink href="/a-propos" light>À propos</NavLink>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;