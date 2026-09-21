export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-white/90 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About + social */}
          <div className="space-y-4">
            {/* Logo — white via brightness(0) invert(1) */}
            <a href="/" className="block">
              <img
                src="/images/logo.png"
                alt="Amadis"
                style={{
                  height: '45px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </a>
            <p className="text-white/70 text-sm font-[DM_Sans] max-w-xs leading-relaxed">
              Boutique de mode africaine basée à Lomé, Togo. Spécialisée dans les
              pagnes wax, tissus africains et robes traditionnelles.
            </p>

            {/* Social links — elegant text symbols */}
            <div className="flex items-center gap-6 pt-2">
              <a
                href="https://wa.me/22890126964"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-white/70 hover:text-[#D4A853] transition-colors"
              >
                WA
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-white/70 hover:text-[#D4A853] transition-colors"
              >
                IG
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-white/70 hover:text-[#D4A853] transition-colors"
              >
                FB
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-[Cormorant_Garamond] text-xl mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/70 hover:text-[#D4A853] transition-colors text-sm font-[DM_Sans]">Accueil</a></li>
              <li><a href="/produits" className="text-white/70 hover:text-[#D4A853] transition-colors text-sm font-[DM_Sans]">Produits</a></li>
              <li><a href="/a-propos" className="text-white/70 hover:text-[#D4A853] transition-colors text-sm font-[DM_Sans]">À propos</a></li>
              <li><a href="/contact" className="text-white/70 hover:text-[#D4A853] transition-colors text-sm font-[DM_Sans]">Contact</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-[Cormorant_Garamond] text-xl mb-4">Contact</h3>
            <ul className="space-y-3 text-sm font-[DM_Sans] text-white/70">
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#D4A853] mb-1">Adresse</span>
                Agoè-Nyivé, Lomé, Togo
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#D4A853] mb-1">Horaires</span>
                Lundi – Samedi, 7h00 – 17h00
              </li>
              <li>
                <span className="block text-xs uppercase tracking-widest text-[#D4A853] mb-1">WhatsApp</span>
                <a href="https://wa.me/22890126964" className="hover:text-[#D4A853] transition-colors">
                  +228 90 12 69 64
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D4A853]/20 text-center text-sm text-white/50 font-[DM_Sans]">
          &copy; {new Date().getFullYear()} AMADIS. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
