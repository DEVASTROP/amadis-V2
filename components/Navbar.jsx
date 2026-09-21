'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavLink = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? '#D4A853' : '#3C2313' }}
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
      <div className="grid grid-cols-3 items-center h-full px-6">
      {/* Left Links - Desktop Only */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/">Accueil</NavLink>
        <NavLink href="/contact">Contactez-nous</NavLink>
        <NavLink href="/produits?category=pagne-wax">Pagnes</NavLink>
      </div>

      {/* Center - Logo */}
      <div className="flex items-center justify-center">
        <Link href="/">
          {/* Try multiple image extensions */}
          <img src="/images/logo.png" alt="Amadis" onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/logo.jpg";
          }} onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/logo.svg";
          }} onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/logo";
          }} style={{ height: '65px', objectFit: 'contain' }} />
        </Link>
      </div>

      {/* Right Links - Desktop Only / Hamburger - Mobile */}
      <div className="flex items-center justify-end gap-8">
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/produits?category=robe-courte">Robes Courtes</NavLink>
          <NavLink href="/produits?category=robe-longue">Robes Longues</NavLink>
          <NavLink href="/a-propos">À propos</NavLink>
        </div>

        {/* Mobile - Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 flex flex-col justify-center items-end"
          aria-label="Menu"
        >
          {/* Hamburger Icon */}
          <span className="block h-[2px] w-[24px] bg-[#3C2313] mb-[4px]"></span>
          <span className="block h-[2px] w-[24px] bg-[#3C2313] mb-[4px]"></span>
          <span className="block h-[2px] w-[24px] bg-[#3C2313]"></span>
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#3C2313] z-50 flex flex-col items-center justify-center space-y-6">
          <NavLink href="/" style={{ color: '#fff' }}>
            Accueil
          </NavLink>
          <NavLink href="/contact" style={{ color: '#fff' }}>
            Contactez-nous
          </NavLink>
          <NavLink href="/produits?category=pagne-wax" style={{ color: '#fff' }}>
            Pagnes
          </NavLink>
          <NavLink href="/produits?category=robe-courte" style={{ color: '#fff' }}>
            Robes Courtes
          </NavLink>
          <NavLink href="/produits?category=robe-longue" style={{ color: '#fff' }}>
            Robes Longues
          </NavLink>
          <NavLink href="/a-propos" style={{ color: '#fff' }}>
            À propos
          </NavLink>
          {/* Close Button */}
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