'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice, buildWhatsAppURL } from '../lib/products';

const CATEGORY_COLORS = {
  'pagne-wax': '#D4A853',
  'tissu': '#2C1810',
  'robe': '#8B1A1A',
};

const CATEGORY_LABELS = {
  'pagne-wax': 'Pagne Wax',
  'tissu': 'Tissu',
  'robe': 'Robe',
};

export default function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState('');

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setVariant('');
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const color = product ? (CATEGORY_COLORS[product.category] || '#2C1810') : '#2C1810';
  const label = product ? (CATEGORY_LABELS[product.category] || product.category) : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppURL(product, quantity, variant);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51, width: '90%', maxWidth: '700px' }}
          >
            <div
              className="bg-white w-full overflow-hidden"
              style={{ borderRadius: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={product.name}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-4 right-4 z-10 text-[#1A1A1A] text-xl leading-none w-10 h-10 flex items-center justify-center hover:text-[#D4A853] transition-colors"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              >
                ×
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
                {/* LEFT — image placeholder */}
                <div
  className="relative flex items-center justify-center min-h-[280px] md:min-h-[420px]"
  style={{ backgroundColor: color }}
>
  {product.image_url ? (
    <img
      src={product.image_url}
      alt={product.name}
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
  ) : (
    <span className="italic text-white font-[Cormorant_Garamond] text-2xl">À venir</span>
  )}
</div>

                {/* RIGHT — info + form */}
                <div className="p-8">
                  {/* Category badge */}
                  <span className="inline-block bg-[#2C1810] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-[DM_Sans]">
                    {label}
                  </span>

                  {/* Product name */}
                  <h2 className="mt-4 font-[Cormorant_Garamond] text-[32px] leading-tight text-[#1A1A1A]">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <p className="mt-2 font-[DM_Sans] text-[#D4A853] text-2xl font-medium">
                    {formatPrice(product.price)}
                  </p>

                  {/* Description */}
                  {product.description ? (
                    <p className="mt-4 font-[DM_Sans] text-[#6B6B6B] leading-relaxed text-sm">
                      {product.description}
                    </p>
                  ) : null}

                  {/* Gold divider */}
                  <div className="w-12 h-px bg-[#D4A853] my-6"></div>

                  {/* Order form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Quantité */}
                    <div>
                      <label
                        htmlFor="modal-quantity"
                        className="block text-xs uppercase tracking-widest text-[#6B6B6B] font-[DM_Sans] mb-2"
                      >
                        Quantité
                      </label>
                      <input
                        id="modal-quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                          const v = parseInt(e.target.value, 10);
                          setQuantity(Number.isFinite(v) && v >= 1 ? v : 1);
                        }}
                        className="w-20 bg-transparent border-b py-2 font-[DM_Sans] text-[#1A1A1A] focus:outline-none"
                        style={{ borderColor: 'rgba(212,168,83,0.3)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A853')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)')}
                      />
                    </div>

                    {/* Variante */}
                    <div>
                      <label
                        htmlFor="modal-variant"
                        className="block text-xs uppercase tracking-widest text-[#6B6B6B] font-[DM_Sans] mb-2"
                      >
                        Variante (optionnel)
                      </label>
                      <input
                        id="modal-variant"
                        type="text"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        placeholder="Ex: Taille M"
                        className="w-full bg-transparent border-b py-2 font-[DM_Sans] text-[#1A1A1A] focus:outline-none placeholder-[#6B6B6B]/50"
                        style={{ borderColor: 'rgba(212,168,83,0.3)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A853')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)')}
                      />
                    </div>

                    {/* WhatsApp button */}
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-[#25D366] text-white text-sm uppercase tracking-widest font-[DM_Sans] hover:bg-[#1da851] transition-colors"
                      style={{ borderRadius: 0 }}
                    >
                      Commander sur WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
