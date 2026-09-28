import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[70px] flex items-center justify-center px-6">
        <div className="text-center py-24">
          <p className="text-[#D4A853] text-xs uppercase tracking-widest font-[DM_Sans] mb-4">
            Erreur 404
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[120px] md:text-[180px] leading-none text-[#2C1810]">
            404
          </h1>
          <div className="w-12 h-px bg-[#D4A853] mx-auto my-6" />
          <h2 className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#2C1810]">
            Page introuvable
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[#6B6B6B] font-[DM_Sans]">
            La page que vous cherchez n’existe pas ou a été déplacée.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex justify-center px-10 py-4 bg-[#2C1810] text-white text-xs uppercase tracking-widest font-[DM_Sans] hover:bg-[#3C2313] transition-colors"
            >
              Retour à l’accueil
            </Link>
            <Link
              href="/produits"
              className="inline-flex justify-center px-10 py-4 border border-[#2C1810] text-[#2C1810] text-xs uppercase tracking-widest font-[DM_Sans] hover:bg-[#2C1810] hover:text-white transition-colors"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
