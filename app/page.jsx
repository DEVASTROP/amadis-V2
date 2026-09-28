'use client';

import { motion, useMotionValue, useSpring, LayoutGroup } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TextRotate } from '../components/ui/TextRotate';
import FeaturedProducts from '../components/FeaturedProducts';
import { useState, useEffect, useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const HeroDecoration = () => (
  <svg
    viewBox="0 0 1440 700"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 2,
      opacity: 0.12
    }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A853" stopOpacity="0" />
        <stop offset="50%" stopColor="#D4A853" stopOpacity="1" />
        <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Large flowing curve top right */}
    <path
      d="M 1100 -50 Q 1300 200 1000 350 Q 700 500 900 700"
      stroke="url(#goldGrad)" strokeWidth="80"
      fill="none" strokeLinecap="round"
    />

    {/* Secondary curve bottom left */}
    <path
      d="M -50 400 Q 150 300 300 500 Q 450 700 600 600"
      stroke="url(#goldGrad)" strokeWidth="50"
      fill="none" strokeLinecap="round"
    />

    {/* Thin accent line */}
    <path
      d="M 800 0 Q 1100 150 950 400 Q 800 600 1100 700"
      stroke="#D4A853" strokeWidth="1.5"
      fill="none" strokeLinecap="round"
      opacity="0.4"
    />

    {/* Small decorative circles */}
    <circle cx="1350" cy="120" r="60" fill="#D4A853" opacity="0.06" />
    <circle cx="1380" cy="150" r="30" fill="#D4A853" opacity="0.08" />
    <circle cx="80" cy="580" r="80" fill="#D4A853" opacity="0.05" />
    <circle cx="50" cy="550" r="40" fill="#D4A853" opacity="0.07" />
  </svg>
)

const SparkleField = () => {
  const sparkles = [
    { id:1, top:'12%', left:'8%', delay:'0s', duration:'3s' },
    { id:2, top:'25%', left:'85%', delay:'0.5s', duration:'4s' },
    { id:3, top:'60%', left:'15%', delay:'1s', duration:'3.5s' },
    { id:4, top:'75%', left:'78%', delay:'1.5s', duration:'2.8s' },
    { id:5, top:'40%', left:'92%', delay:'0.8s', duration:'3.2s' },
    { id:6, top:'88%', left:'45%', delay:'2s', duration:'4.2s' },
    { id:7, top:'18%', left:'55%', delay:'1.2s', duration:'3.8s' },
    { id:8, top:'50%', left:'5%', delay:'0.3s', duration:'2.5s' },
    { id:9, top:'35%', left:'70%', delay:'1.8s', duration:'3.6s' },
    { id:10, top:'70%', left:'30%', delay:'0.6s', duration:'4.5s' },
    { id:11, top:'8%', left:'40%', delay:'2.2s', duration:'3.1s' },
    { id:12, top:'92%', left:'65%', delay:'1.4s', duration:'2.9s' },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 3, overflow: 'hidden'
    }}>
      {sparkles.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          top: s.top, left: s.left,
          animation: `sparkle ${s.duration} ${s.delay} infinite ease-in-out`,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M6 0 L6.8 5.2 L12 6 L6.8 6.8 L6 12 L5.2 6.8 L0 6 L5.2 5.2 Z"
              fill="#D4A853"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
      {[
        {id:'c1', top:'20%', left:'20%', size:'3px', delay:'0.4s'},
        {id:'c2', top:'65%', left:'80%', size:'2px', delay:'1.1s'},
        {id:'c3', top:'45%', left:'50%', size:'4px', delay:'1.9s'},
        {id:'c4', top:'80%', left:'10%', size:'2px', delay:'0.7s'},
        {id:'c5', top:'10%', left:'75%', size:'3px', delay:'2.4s'},
        {id:'c6', top:'55%', left:'35%', size:'2px', delay:'1.6s'},
      ].map(c => (
        <div key={c.id} style={{
          position: 'absolute',
          top: c.top, left: c.left,
          width: c.size, height: c.size,
          borderRadius: '50%',
          background: '#D4A853',
          animation: `float 6s ${c.delay} infinite ease-in-out`,
          opacity: 0.5,
        }} />
      ))}
    </div>
  )
}

const brandIcons = [
  { id: 1, src: '/images/brands/vlisco.svg', name: 'Vlisco',
    top: '4%', left: '8%', delay: 0 },
  { id: 2, src: '/images/brands/DaViva.svg', name: 'DaViva',
    top: '4%', left: '52%', delay: 0.2 },
  { id: 3, src: '/images/brands/woodin.svg', name: 'Woodin',
    top: '22%', left: '30%', delay: 0.4 },
  { id: 4, src: '/images/brands/ABC.svg', name: 'ABC Wax',
    top: '38%', left: '6%', delay: 0.6 },
  { id: 5, src: '/images/brands/ATL.svg', name: 'ATL',
    top: '38%', left: '52%', delay: 0.8 },
  { id: 6, src: '/images/brands/GTP.svg', name: 'GTP',
    top: '58%', left: '25%', delay: 1.0 },
  { id: 7, src: '/images/brands/julius holland.svg', name: 'Julius Holland',
    top: '74%', left: '50%', delay: 1.2 },
  { id: 8, src: '/images/brands/uniwax.svg', name: 'Uniwax',
    top: '76%', left: '5%', delay: 1.4 },
]

const BrandIcon = ({ brand, index, mouseX, mouseY }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        )
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          )
          const force = (1 - distance / 150) * 50
          x.set(-Math.cos(angle) * force)
          y.set(-Math.sin(angle) * force)
        } else {
          x.set(0)
          y.set(0)
        }
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        top: brand.top,
        left: brand.left,
        x: springX,
        y: springY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: brand.delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0, 10, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 5 + index,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        style={{
          width: '112px',
          height: '112px',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '20px',
          padding: '14px',
          boxShadow: '0 8px 32px rgba(44,24,16,0.10), 0 2px 8px rgba(44,24,16,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212,168,83,0.25)',
        }}
      >
        <img
          src={brand.src}
          alt={brand.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const FloatingBrands = () => {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  const handleMouseMove = (e) => {
    mouseX.current = e.clientX
    mouseY.current = e.clientY
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '8px',
      }}
    >
      {brandIcons.map((brand, index) => (
        <BrandIcon
          key={brand.id}
          brand={brand}
          index={index}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const slideOverlayColors = [
    'rgba(245, 230, 211, 0.45)',
    'rgba(232, 213, 183, 0.45)',
    'rgba(212, 196, 168, 0.45)',
  ]

  const images = [
    '/images/heroes_women_1.png',
    '/images/heroes_women_2.png',
    '/images/heroes_women_3.png'
  ];

  const getPosition = (index) => {
    if (index === currentSlide) return 'center';
    if (index === (currentSlide - 1 + 3) % 3) return 'prev';
    return 'next';
  };

    const slideStyles = isMobile ? {
        center: {
      left: '50%',
      transform: 'translateX(-50%) scale(1) rotateY(0deg)',
      opacity: 1,
      zIndex: 20,
      filter: 'brightness(1)',
      cursor: 'default',
      width: 'auto',
      height: '96%'
    },
    prev: {
      transform: 'translateX(-62%) scale(0.6) rotateY(15deg)',
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.8)',
      cursor: 'pointer',
      width: '55%',
      height: '78%'
    },
    next: {
      transform: 'translateX(62%) scale(0.6) rotateY(-15deg)',
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.8)',
      cursor: 'pointer',
      width: '55%',
      height: '78%'
    }
  } : {
    center: {
      transform: 'translateX(0) scale(1.15) rotateY(0deg)',
      opacity: 1,
      zIndex: 20,
      filter: 'brightness(1)',
      cursor: 'default',
      width: '52%',
      height: '95%'
    },
    prev: {
      transform: 'translateX(-46%) scale(0.72) rotateY(15deg)',
      opacity: 0.8,
      zIndex: 10,
      filter: 'brightness(0.85)',
      cursor: 'pointer',
      width: '40%',
      height: '85%'
    },
    next: {
      transform: 'translateX(46%) scale(0.72) rotateY(-15deg)',
      opacity: 0.8,
      zIndex: 10,
      filter: 'brightness(0.85)',
      cursor: 'pointer',
      width: '40%',
      height: '85%'
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction >= 8000) {
        setCurrentSlide((prev) => (prev + 1) % 3);
        setLastInteraction(Date.now());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastInteraction]);

  const handleManualSlide = (index) => {
    setCurrentSlide(index);
    setLastInteraction(Date.now());
  };

  return (
    <>
      <Navbar />
      <main>
        {/* SECTION 1 — HERO (full viewport height, animated gradient background) */}
        <section
          className="hero-silk-bg min-h-screen grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] pt-[70px]"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: slideOverlayColors[currentSlide],
              transition: 'background-color 1s ease',
              pointerEvents: 'none',
              zIndex: 1,
              mixBlendMode: 'multiply',
            }}
          />
          <SparkleField />
          <HeroDecoration />
          {/* LEFT COLUMN - Text */}
          <div className="flex flex-col justify-center pl-12 md:pl-16 py-12 order-1 md:order-1" style={{ position: 'relative', zIndex: 10 }}>
            <LayoutGroup>
              <motion.div layout style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}>
                {/* L'élégance */}
                <motion.div layout style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                  lineHeight: 1.05,
                  color: '#2C1810',
                }}>
                  L'élégance
                </motion.div>

                {/* africaine */}
                <motion.div layout style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                  lineHeight: 1.05,
                  color: '#2C1810',
                }}>
                  africaine,
                </motion.div>

                {/* tissée pour [TextRotate] */}
                <motion.div layout style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.2,
                  color: '#2C1810',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  flexWrap: 'nowrap',
                }}>
                  <motion.span layout>tissée pour</motion.span>
                  <TextRotate
                    texts={[
                      'vous',
                      'Lomé',
                      "l'Afrique",
                      'demain',
                      "l'élite",
                      'toujours',
                    ]}
                    rotationInterval={2500}
                    staggerDuration={0.04}
                    staggerFrom="last"
                    mainClassName=""
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                </motion.div>

                {/* Gold divider */}
                <motion.div layout style={{
                  width: '48px',
                  height: '1px',
                  backgroundColor: '#D4A853',
                  margin: '12px 0',
                }} />

                {/* Subtitle */}
                <motion.p layout style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '15px',
                  color: '#2C1810',
                  opacity: 0.65,
                  lineHeight: 1.7,
                  maxWidth: '320px',
                }}>
                  Pagnes wax, tissus et robes africaines.<br />
                  Sélectionnés avec soin à Lomé, Togo.
                </motion.p>

                {/* Buttons */}
                <motion.div layout style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '16px',
                }}>
                  <a href="/produits" style={{
                    background: '#2C1810',
                    color: 'white',
                    padding: '14px 28px',
                    fontSize: '11px',
                    fontFamily: 'DM Sans, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    maxWidth: '300px',
                  }}>
                    Découvrir la collection
                  </a>
                  <a href="/contact" style={{
                    border: '1px solid #2C1810',
                    color: '#2C1810',
                    padding: '14px 28px',
                    fontSize: '11px',
                    fontFamily: 'DM Sans, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    maxWidth: '300px',
                    background: 'transparent',
                  }}>
                    Nous contacter
                  </a>
                </motion.div>
              </motion.div>
            </LayoutGroup>
          </div>

                              {/* CENTER COLUMN - 3D Carousel */}
          <div
            className="relative w-full order-3 md:order-2"
            style={
              isMobile
                ? {
                    position: 'relative',
                    alignSelf: 'end',
                    width: '100%',
                    aspectRatio: '6 / 5',
                    perspective: '1000px',
                    overflow: 'hidden',
                    zIndex: 5,
                  }
                : {
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    perspective: '1000px',
                    overflow: 'hidden',
                    zIndex: 5,
                  }
            }
          >
            {(() => {
              const mobileSlide = {
                center: {
                  transform: 'translateX(-50%) scale(1) rotateY(0deg)',
                  opacity: 1,
                  zIndex: 20,
                  filter: 'brightness(1)',
                  cursor: 'default',
                },
                prev: {
                  transform: 'translateX(-120%) scale(0.78) rotateY(15deg)',
                  opacity: 0.75,
                  zIndex: 10,
                  filter: 'brightness(0.85)',
                  cursor: 'pointer',
                },
                next: {
                  transform: 'translateX(20%) scale(0.78) rotateY(-15deg)',
                  opacity: 0.75,
                  zIndex: 10,
                  filter: 'brightness(0.85)',
                  cursor: 'pointer',
                },
              };

              return [0, 1, 2].map((index) => {
                const pos = getPosition(index);
                const style = isMobile ? mobileSlide[pos] : slideStyles[pos];
                const layout = isMobile
                  ? {
                     left: '50%',
                      top: 0,
                      width: '62%',
                      height: '100%',
                      objectFit: 'cover',
                      transformOrigin: 'center bottom',
                    }
                  : { objectFit: 'contain' };
                return (
                  <img
                    key={index}
                    src={images[index]}
                    alt={`Collection ${index + 1}`}
                    onClick={() => {
                      if (pos !== 'center') {
                        handleManualSlide(index);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      objectPosition: isMobile ? 'top center' : 'center center',
                      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      ...layout,
                      ...style,
                    }}
                  />
                );
              });
            })()}
          </div>
          
          {/* RIGHT COLUMN - Floating brand icons (desktop only) */}
                    <div className="order-3" style={{
            position: 'relative',
            height: '100%',
            zIndex: 5,
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
          }}>
            <FloatingBrands />
          </div>
        </section>
        
        {/* SECTION 2 — CATEGORIES ("Nos Collections") */}
        <section className="pt-[70px] pb-24 bg-white">
          <div className="container mx-auto px-6">
            {/* Header row (2 columns) */}
            <div className="flex justify-between items-end mb-12">
              {/* Left: section-label "Collections" + h2 "Nos Collections" section-title */}
              <div className="space-y-2">
                <p className="section-label">Collections</p>
                <h2 className="section-title">Nos Collections</h2>
              </div>

              {/* Right: link "Voir tout →" in gold, aligned bottom */}
              <a href="/produits" className="text-[#D4A853] hover:underline">
                Voir tout →
              </a>
            </div>

            {/* 3 category cards (grid 3 cols desktop, 1 col mobile) */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Card 1 — PAGNES WAX */}
              <motion.div variants={fadeInUp}>
              <a
                              
                href="/produits?category=pagne-wax"
                className="group relative h-[320px] overflow-hidden rounded-lg block bg-[#D4A853] transition-transform duration-500 ease-out hover:scale-[1.02]"
              >
                <img
                  src="/images/collections/pagnes-wax.jpg"
                  alt="Pagnes wax"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />


                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-white font-[DM_Sans]">
                    PAGNES WAX
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Tissus vibrants aux motifs authentiques
                  </p>
                  <span className="mt-4 block text-xs text-white transition-colors duration-300 hover:text-[#2C1810]">
                    Découvrir →
                  </span>
                 </div>
              </a>
              </motion.div>

              {/* Card 2 — TISSUS */}
              <motion.div variants={fadeInUp}>
              <a
                              
                href="/produits?category=tissu"
                className="group relative h-[320px] overflow-hidden rounded-lg block bg-[#2C1810] transition-transform duration-500 ease-out hover:scale-[1.02]"
              >
                <img
                  src="/images/collections/tissus.jpg"
                  alt="Tissus africains"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-white font-[DM_Sans]">
                    TISSUS AFRICAINS
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Kente, Bogolan, Brodé et bien plus
                  </p>
                  <span className="mt-4 block text-xs text-white transition-colors duration-300 hover:text-[#D4A853]">
                    Découvrir →
                  </span>
                 </div>
              </a>
              </motion.div>

              {/* Card 3 — ROBES */}
              <motion.div variants={fadeInUp}>
              <a
                              
                href="/produits?category=robe"
                className="group relative h-[320px] overflow-hidden rounded-lg block bg-[#8B1A1A] transition-transform duration-500 ease-out hover:scale-[1.02]"
              >
                <img
                  src="/images/collections/robes.jpg"
                  alt="Robes et tenues"
                  loading="lazy"
                  style={{ objectPosition: 'center 25%' }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-white font-[DM_Sans]">
                    ROBES & TENUES
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Élégance traditionnelle pour sublimer votre silhouette
                  </p>
                  <span className="mt-4 block text-xs text-white transition-colors duration-300 hover:text-[#D4A853]">
                    Découvrir →
                  </span>
                </div>
              </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* SECTION 3 — FEATURED PRODUCTS ("Pièces Vedettes") */}
        <section className="py-24 bg-[#FAF7F2]">
          <div className="container mx-auto px-6">
            {/* Header — label above, then title left + link right, no overlap */}
            <div className="mb-12">
              <p className="section-label">Sélection</p>
              <div className="flex justify-between items-end">
                <h2 className="section-title">Pièces Vedettes</h2>
                <a href="/produits" className="text-[#D4A853] hover:underline">
                  Voir tout →
                </a>
              </div>
            </div>

            {/* 4 product cards — data from Supabase via getFeaturedProducts(4) */}
            <FeaturedProducts />
          </div>
        </section>
        
        {/* SECTION 4 — VALUES */}
        <section className="py-24 bg-[#2C1810] text-white">
          <div className="container mx-auto px-6">
            {/* section-label in gold "Notre Engagement" */}
            <p className="section-label mb-6">Notre Engagement</p>

            {/* h2 in Cormorant white "Pourquoi choisir AMADIS ?" */}
            <h2 className="section-title text-white mb-8 text-center">Pourquoi choisir AMADIS ?</h2>

            {/* gold-line */}
            <div className="w-24 h-0.5 mx-auto mb-12 bg-[#D4A853]"></div>

            {/* 3 columns (grid desktop, stack mobile), gap-12 */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Value block 1 */}
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                {/* Large number — gold, opacity 0.5 */}
                <p className="text-[32px] font-[Cormorant_Garamond] text-[#D4A853]/50 leading-none">01</p>
                {/* Gold divider under number */}
                <div className="w-12 h-px mx-auto mt-3 bg-[#D4A853]"></div>
                <h3 className="text-2xl font-[Cormorant_Garamond] mb-2 text-white">
                  Qualité Authentique
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-xs mx-auto font-[DM_Sans]">
                  Chaque tissu est soigneusement sélectionné pour sa qualité et son authenticité.
                </p>
              </motion.div>

              {/* Value block 2 */}
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <p className="text-[32px] font-[Cormorant_Garamond] text-[#D4A853]/50 leading-none">02</p>
                <div className="w-12 h-px mx-auto mt-3 bg-[#D4A853]"></div>
                <h3 className="text-2xl font-[Cormorant_Garamond] mb-2 text-white">
                  Style Africain
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-xs mx-auto font-[DM_Sans]">
                  Nos collections célèbrent la richesse des motifs et traditions africaines.
                </p>
              </motion.div>

              {/* Value block 3 */}
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <p className="text-[32px] font-[Cormorant_Garamond] text-[#D4A853]/50 leading-none">03</p>
                <div className="w-12 h-px mx-auto mt-3 bg-[#D4A853]"></div>
                <h3 className="text-2xl font-[Cormorant_Garamond] mb-2 text-white">
                  Service à Lomé
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mt-3 max-w-xs mx-auto font-[DM_Sans]">
                  Boutique familiale à votre service à Agoè-Nyivé, Lomé, du lundi au samedi.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* SECTION 5 — TESTIMONIALS */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            {/* section-label "Témoignages" */}
            <p className="section-label mb-6">Témoignages</p>
            
            {/* h2 centered "Ils nous font confiance" */}
            <h2 className="section-title mb-8 text-center">Ils nous font confiance</h2>
            
            {/* gold-line centered (mx-auto) */}
            <div className="w-24 h-0.5 mx-auto mb-12 bg-[#D4A853]"></div>
            
            {/* 3 testimonial blocks (grid 3 cols desktop, 1 mobile) — gap-12 */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Testimonial 1 */}
              <motion.div variants={fadeInUp} className="space-y-4">
                {/* Large opening quote Cormorant text-7xl gold */}
                <p className="text-7xl text-[#D4A853] leading-none font-[Cormorant_Garamond]">&ldquo;</p>

                <p className="text-xl italic text-[#1A1A1A] leading-relaxed font-[Cormorant_Garamond]">
                  Les tissus sont d&rsquo;une qualité exceptionnelle. Je recommande AMADIS à toutes mes amies !
                </p>

                {/* Small gold divider before the author */}
                <div className="w-10 h-px bg-[#D4A853]"></div>

                 <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-[DM_Sans]">
                   Ama K., Lomé
                 </p>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-7xl text-[#D4A853] leading-none font-[Cormorant_Garamond]">&ldquo;</p>
                <p className="text-xl italic text-[#1A1A1A] leading-relaxed font-[Cormorant_Garamond]">
                  Service impeccable, les pagnes wax sont authentiques et magnifiques.
                </p>
                <div className="w-10 h-px bg-[#D4A853]"></div>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-[DM_Sans]">
                  Komi S., Lomé
                </p>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-7xl text-[#D4A853] leading-none font-[Cormorant_Garamond]">&ldquo;</p>
                <p className="text-xl italic text-[#1A1A1A] leading-relaxed font-[Cormorant_Garamond]">
                  Ma robe de mariage était parfaite. Merci à toute l&rsquo;équipe AMADIS !
                </p>
                <div className="w-10 h-px bg-[#D4A853]"></div>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-[DM_Sans]">
                  Adjoa F., Lomé
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* SECTION 6 — CTA FINALE */}
        <motion.div
          className="py-24 bg-[#D4A853] text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* h2 in Cormorant text-[#2C1810] text-5xl */}
          <h2 className="text-5xl font-[Cormorant_Garamond] text-[#2C1810] mb-4">
            Découvrez notre collection
          </h2>

          {/* Subtitle DM Sans text-[#2C1810]/70 mt-4 max-w-md mx-auto */}
          <p className="mt-4 max-w-md mx-auto text-[#2C1810]/70 font-[DM_Sans]">
            Pagnes wax, tissus et robes livrés à Lomé, Togo.
          </p>

          {/* Two centered inline buttons with gap-6 */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 px-6">
            <a
              href="/produits"
              className="inline-flex justify-center px-10 py-4 bg-[#2C1810] text-white text-sm uppercase tracking-widest transition-colors duration-300 hover:bg-[#1a0f0a]"
            >
              Voir les produits
            </a>

            <a
              href="https://wa.me/22890126964"
              className="inline-flex justify-center px-10 py-4 bg-[#25D366] text-white text-sm uppercase tracking-widest transition-colors duration-300 hover:bg-[#1da851]"
            >
              Commander sur WhatsApp
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}