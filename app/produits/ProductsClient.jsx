'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductModal from '../../components/ProductModal';
import PageTransition from '../../components/PageTransition';

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

const FILTERS = [
  { key: 'all',       label: 'Tous' },
  { key: 'pagne-wax', label: 'Pagnes Wax' },
  { key: 'tissu',     label: 'Tissus' },
  { key: 'robe',      label: 'Robes' },
];

export default function ProductsClient({ products }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Read initial category from URL (?category=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category');
    if (urlCategory && ['all', 'pagne-wax', 'tissu', 'robe'].includes(urlCategory)) {
      setActiveFilter(urlCategory);
    }
  }, []);

  // Filter in-memory on the data passed from the server — no extra network call.
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter]);

  // Keep the URL in sync without reloading (so the link can be shared).
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (filter === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', filter);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <>
      <Navbar />
      <PageTransition>
      <main className="min-h-screen pb-20">
        {/* HEADER */}
        <header className="pt-[90px] pb-12 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="font-[Cormorant_Garamond] text-[52px] leading-tight text-[#2C1810]">
              Nos Produits
            </h1>
            <div className="w-16 h-px bg-[#D4A853] mx-auto mt-4"></div>
            <p className="mt-6 text-[#6B6B6B] font-[DM_Sans] max-w-xl mx-auto">
              Découvrez notre sélection de pagnes, tissus et robes africaines.
            </p>
          </div>
        </header>

        {/* FILTER BAR — horizontal pills */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => handleFilterClick(f.key)}
                  type="button"
                  className={
                    'px-6 py-3 text-xs uppercase tracking-widest font-[DM_Sans] transition-colors duration-300 ' +
                    (isActive
                      ? 'bg-[#2C1810] text-white border border-[#2C1810]'
                      : 'bg-transparent text-[#2C1810] border border-[#2C1810] hover:bg-[#2C1810]/5')
                  }
                  style={{ borderRadius: 0 }}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCT GRID or EMPTY STATE */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="italic text-[#6B6B6B] font-[Cormorant_Garamond] text-2xl">
                Aucun produit dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const color = CATEGORY_COLORS[product.category] || '#2C1810';
                const label = CATEGORY_LABELS[product.category] || product.category;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="group block text-left bg-white overflow-hidden transition-all duration-300 ease-out border border-transparent hover:border-[#D4A853] hover:shadow-md focus:outline-none focus:border-[#D4A853]"
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
                        {new Intl.NumberFormat('fr-FR').format(product.price)} FCFA
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
      </PageTransition>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </>
  );
}
