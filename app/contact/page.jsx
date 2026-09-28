'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageTransition from '../../components/PageTransition';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const text = `Bonjour, je m'appelle ${name} (${email}).\n\n${message}`;
    window.open(`https://wa.me/22890126964?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <PageTransition>
      <main className="pt-[70px]">
        {/* HEADER */}
        <header className="bg-[#FAF7F2] py-16 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              className="text-[#2C1810] text-[52px] leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Contactez-nous
            </h1>
            <div className="w-16 h-px bg-[#D4A853] mx-auto mt-6"></div>
          </div>
        </header>

        {/* TWO-COLUMN LAYOUT */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT — INFO */}
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#D4A853] font-[DM_Sans] mb-6">
                  Nos Coordonnées
                </p>
              </div>

              {/* Address */}
              <div>
                <h3
                  className="text-[#2C1810] text-2xl mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Adresse
                </h3>
                <p className="font-[DM_Sans] text-[#1A1A1A] leading-relaxed">
                  Agoè-Nyivé, Lomé, Togo
                </p>
              </div>

              {/* Hours */}
              <div>
                <h3
                  className="text-[#2C1810] text-2xl mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Horaires
                </h3>
                <p className="font-[DM_Sans] text-[#1A1A1A] leading-relaxed">
                  Lundi – Samedi<br />
                  7h00 – 17h00
                </p>
              </div>

              {/* WhatsApp block */}
              <div>
                <h3
                  className="text-[#2C1810] text-2xl mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/22890126964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto text-center bg-[#25D366] text-white px-8 py-4 text-sm uppercase tracking-widest font-[DM_Sans] hover:bg-[#1da851] transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  +228 90 12 69 64
                </a>
                <p className="mt-3 font-[DM_Sans] text-[#6B6B6B] text-sm">
                  Écrire sur WhatsApp →
                </p>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-12 h-px bg-[#D4A853] mb-6"></div>
                  <p
                    className="text-[#2C1810] text-2xl mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    Message envoyé !
                  </p>
                  <p className="font-[DM_Sans] text-[#6B6B6B]">
                    Nous vous répondrons bientôt.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-widest text-[#6B6B6B] font-[DM_Sans] mb-2"
                    >
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent border-b py-3 font-[DM_Sans] text-[#1A1A1A] focus:outline-none transition-colors duration-300"
                      style={{ borderColor: 'rgba(212,168,83,0.3)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A853')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-widest text-[#6B6B6B] font-[DM_Sans] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent border-b py-3 font-[DM_Sans] text-[#1A1A1A] focus:outline-none transition-colors duration-300"
                      style={{ borderColor: 'rgba(212,168,83,0.3)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A853')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-widest text-[#6B6B6B] font-[DM_Sans] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-transparent border-b py-3 font-[DM_Sans] text-[#1A1A1A] focus:outline-none transition-colors duration-300 resize-none"
                      style={{ borderColor: 'rgba(212,168,83,0.3)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A853')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-[#2C1810] text-white text-sm uppercase tracking-widest font-[DM_Sans] hover:bg-[#1a0f0a] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </>
  );
}
