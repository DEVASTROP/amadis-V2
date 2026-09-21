import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageTransition from '../../components/PageTransition';

export const metadata = {
  title: 'À propos — AMADIS',
  description: "L'histoire d'AMADIS, boutique familiale de pagnes wax, tissus et robes africaines à Lomé, Togo.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
      <main className="pt-[70px]">
        {/* HERO BAND */}
        <section className="bg-[#2C1810] py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              className="text-white text-[56px] leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Notre Histoire
            </h1>
            <div className="w-16 h-px bg-[#D4A853] mx-auto mt-6"></div>
            <p className="mt-6 text-white/70 font-[DM_Sans]">
              Une boutique familiale au cœur de Lomé, Togo.
            </p>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="bg-[#FAF7F2] py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D4A853] font-[DM_Sans] mb-4">
                Notre Histoire
              </p>
              <h2
                className="text-[#2C1810] text-[40px] leading-tight mb-8"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                L&rsquo;élégance africaine depuis toujours
              </h2>

              <div className="space-y-5 font-[DM_Sans] text-[#6B6B6B] leading-relaxed">
                <p>
                  AMADIS est une boutique familiale fondée à Lomé, au Togo. Depuis
                  notre création, nous sélectionnons avec soin les plus beaux
                  pagnes wax, tissus africains et robes traditionnelles pour notre
                  clientèle.
                </p>
                <p>
                  Notre passion : vous offrir l&rsquo;élégance africaine authentique,
                  tissée dans le respect des traditions et de la qualité artisanale.
                </p>
              </div>
            </div>

            {/* Right — elegant placeholder */}
            <div
              className="w-full flex items-center justify-center"
              style={{ backgroundColor: '#E8D5B7', aspectRatio: '4 / 5' }}
            >
              <p
                className="italic text-[#2C1810]/40"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Photo de la boutique
              </p>
            </div>
          </div>
        </section>

        {/* VALUES SECTION — same dark brown style as homepage */}
        <section className="bg-[#2C1810] py-20 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs uppercase tracking-widest text-[#D4A853] font-[DM_Sans] mb-4 text-center">
              Nos Valeurs
            </p>
            <h2
              className="text-white text-[40px] leading-tight mb-8 text-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Ce qui nous guide
            </h2>
            <div className="w-16 h-px bg-[#D4A853] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Value 1 — Qualité */}
              <div className="text-center space-y-4">
                <p
                  className="text-[32px] leading-none"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(212,168,83,0.5)' }}
                >
                  01
                </p>
                <div className="w-12 h-px mx-auto bg-[#D4A853]"></div>
                <h3
                  className="text-2xl text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Qualité
                </h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto font-[DM_Sans]">
                  Chaque tissu est sélectionné à la main pour sa qualité et son authenticité.
                </p>
              </div>

              {/* Value 2 — Style */}
              <div className="text-center space-y-4">
                <p
                  className="text-[32px] leading-none"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(212,168,83,0.5)' }}
                >
                  02
                </p>
                <div className="w-12 h-px mx-auto bg-[#D4A853]"></div>
                <h3
                  className="text-2xl text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Style
                </h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto font-[DM_Sans]">
                  Des collections qui célèbrent les motifs et traditions africaines.
                </p>
              </div>

              {/* Value 3 — Service */}
              <div className="text-center space-y-4">
                <p
                  className="text-[32px] leading-none"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(212,168,83,0.5)' }}
                >
                  03
                </p>
                <div className="w-12 h-px mx-auto bg-[#D4A853]"></div>
                <h3
                  className="text-2xl text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Service
                </h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto font-[DM_Sans]">
                  Une boutique familiale à votre service à Lomé, du lundi au samedi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#D4A853] text-center">
          <h2
            className="text-[#2C1810] text-[40px] leading-tight mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Prêt à découvrir notre collection ?
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[#2C1810]/70 font-[DM_Sans]">
            Explorez nos pagnes wax, tissus et robes sélectionnés à Lomé.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
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
              Nous écrire
            </a>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </>
  );
}
