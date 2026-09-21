'use client';

import { formatPrice } from '../lib/products';

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

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#2C1810';
}

export default function ProductCard({ product, onSelect }) {
  const color = getCategoryColor(product.category);
  const label = getCategoryLabel(product.category);

  const handleActivate = () => {
    if (typeof onSelect === 'function') onSelect(product);
  };

  return (
    <button
      type="button"
      onClick={handleActivate}
      className="group block w-full text-left bg-white overflow-hidden transition-all duration-300 ease-out border border-transparent hover:border-[#D4A853] hover:shadow-md focus:outline-none focus:border-[#D4A853]"
      style={{ borderRadius: 0 }}
    >
      {/* Image placeholder — 3/4 aspect, category color */}
      <div
        className="relative aspect-[3/4] flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="italic text-white font-[Cormorant_Garamond] text-xl">À venir</span>
        {/* Category badge — top-left pill */}
        <span className="absolute top-3 left-3 bg-white/90 text-[#2C1810] text-[10px] uppercase tracking-widest px-3 py-1 font-[DM_Sans]">
          {label}
        </span>
      </div>

      {/* Card footer */}
      <div className="p-4">
        <h3 className="font-[Cormorant_Garamond] text-[20px] text-[#1A1A1A] leading-tight">
          {product.name}
        </h3>
        <p className="mt-2 font-[DM_Sans] text-[#D4A853] font-medium">
          {Number(product.price || 0).toLocaleString('fr-FR')} FCFA
        </p>
      </div>
    </button>
  );
}
