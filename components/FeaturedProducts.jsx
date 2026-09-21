'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '../lib/products';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CATEGORY_COLORS = {
  'pagne-wax': '#D4A853',
  'tissu': '#2C1810',
  'robe': '#8B1A1A',
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getFeaturedProducts(4)
      .then((data) => {
        if (mounted) {
          setProducts(data || []);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Error fetching featured products:', err);
        if (mounted) setLoaded(true);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {loaded && products.length > 0 ? (
        products.map((product) => {
          const color = CATEGORY_COLORS[product.category] || '#D4A853';
          return (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              className="relative group aspect-[3/4] overflow-hidden transition-[border] duration-300 ease-out border border-transparent hover:border-[#D4A853]"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="italic text-white text-xl font-[Cormorant_Garamond]">À venir</p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                <p className="text-center font-[Cormorant_Garamond] text-[20px] text-[#1A1A1A]">
                  {product.name}
                </p>
                <p className="mt-1 text-center text-[#D4A853] font-[DM_Sans] font-medium">
                  {new Intl.NumberFormat('fr-FR').format(product.price)} FCFA
                </p>
              </div>
            </motion.div>
          );
        })
      ) : (
        // Skeleton placeholders while loading (preserve layout, no visual jump)
        Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            variants={fadeInUp}
            className="relative group aspect-[3/4] bg-[#E8E0D5] overflow-hidden border border-transparent"
          />
        ))
      )}
    </motion.div>
  );
}
