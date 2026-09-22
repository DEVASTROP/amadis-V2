'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../lib/products';

const BUCKET = 'products';
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 1067; // 3/4 portrait, same as scripts/resize-and-upload.js

const CATEGORIES = [
  { value: 'pagne-wax', label: 'Pagne wax' },
  { value: 'tissu', label: 'Tissu' },
  { value: 'robe', label: 'Robe' },
];

const EMPTY_FORM = {
  name: '',
  category: 'robe',
  price: '',
  description: '',
  specs: '',
  in_stock: true,
  featured: false,
};

const inputClass =
  'w-full px-3 py-2 bg-white border border-[#D4A853]/40 text-[#1A1A1A] font-[DM_Sans] focus:outline-none focus:border-[#D4A853]';
const labelClass = 'block text-sm font-[DM_Sans] font-medium mb-2 text-[#1A1A1A]';
const primaryButton =
  'px-6 py-3 bg-[#2C1810] text-white font-[DM_Sans] font-medium hover:bg-[#3C2313] transition-colors disabled:opacity-50';
const secondaryButton =
  'px-6 py-3 border border-[#2C1810] text-[#2C1810] font-[DM_Sans] font-medium hover:bg-[#2C1810] hover:text-white transition-colors disabled:opacity-50';
const dangerButton =
  'px-4 py-2 border border-[#8B1A1A] text-[#8B1A1A] font-[DM_Sans] text-sm hover:bg-[#8B1A1A] hover:text-white transition-colors';

// Crops the photo to 3/4 portrait, aligned to the top so heads are never cut.
async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = IMAGE_WIDTH;
  canvas.height = IMAGE_HEIGHT;
  const ctx = canvas.getContext('2d');
  const scale = Math.max(IMAGE_WIDTH / bitmap.width, IMAGE_HEIGHT / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  ctx.drawImage(bitmap, (IMAGE_WIDTH - w) / 2, 0, w, h);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Conversion de la photo impossible.'))),
      'image/jpeg',
      0.85
    );
  });
}

function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'produit'
  );
}

export default function AdminPage() {
  // --- Auth ---
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // --- Products ---
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [message, setMessage] = useState(null);

  // --- Form ---
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadProducts = useCallback(async () => {
    if (!supabase) return;
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setMessage({ type: 'error', text: `Impossible de charger les produits : ${error.message}` });
    } else {
      setProducts(data || []);
    }
    setLoadingProducts(false);
  }, []);

  useEffect(() => {
    if (session) loadProducts();
  }, [session, loadProducts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError('Email ou mot de passe incorrect.');
    setLoggingIn(false);
  };

  const resetImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageUrl('');
    resetImage();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProducts([]);
    setMessage(null);
    closeForm();
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageUrl('');
    resetImage();
    setMessage(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      category: product.category || 'robe',
      price: product.price?.toString() ?? '',
      description: product.description || '',
      specs: Array.isArray(product.specs) ? product.specs.join('\n') : '',
      in_stock: product.in_stock ?? true,
      featured: product.featured ?? false,
    });
    setImageUrl(product.image_url || '');
    resetImage();
    setMessage(null);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      let finalImageUrl = imageUrl || null;

      if (imageFile) {
        let blob;
        try {
          blob = await resizeImage(imageFile);
        } catch {
          throw new Error('Cette photo est illisible. Utilisez une photo JPG ou PNG.');
        }
        const fileName = `${slugify(form.name)}-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, blob, { contentType: 'image/jpeg' });
        if (uploadError) throw new Error(`Envoi de la photo impossible : ${uploadError.message}`);
        finalImageUrl = supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
      }

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: parseInt(form.price, 10) || 0,
        description: form.description.trim() || null,
        specs: form.specs
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
        image_url: finalImageUrl,
        in_stock: form.in_stock,
        featured: form.featured,
      };

      const query = editingId
        ? supabase.from('products').update(payload).eq('id', editingId)
        : supabase.from('products').insert(payload);

      const { data, error } = await query.select();
      if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
      if (!data || data.length === 0) {
        throw new Error('Aucune modification enregistrée. Reconnectez-vous et réessayez.');
      }

      setMessage({ type: 'success', text: editingId ? 'Produit modifié.' : 'Produit ajouté.' });
      closeForm();
      await loadProducts();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Supprimer « ${product.name} » ? Cette action est définitive.`)) return;
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id)
      .select();
    if (error || !data || data.length === 0) {
      setMessage({ type: 'error', text: 'Suppression impossible. Reconnectez-vous et réessayez.' });
      return;
    }
    setMessage({ type: 'success', text: 'Produit supprimé.' });
    await loadProducts();
  };

  const categoryLabel = (value) =>
    CATEGORIES.find((c) => c.value === value)?.label || value;

  // --- Screens ---
  let content;

  if (!authReady) {
    content = (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full border-4 border-[#D4A853]/20 border-t-[#2C1810] w-12 h-12" />
      </div>
    );
  } else if (!supabase) {
    content = (
      <p className="text-center text-[#8B1A1A] font-[DM_Sans] py-20">
        Supabase n’est pas configuré. Vérifiez les variables d’environnement du site.
      </p>
    );
  } else if (!session) {
    content = (
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-[Cormorant_Garamond] text-center text-[#2C1810] mb-8">
          Espace administrateur
        </h1>
        <form onSubmit={handleLogin} className="bg-white border border-[#D4A853]/30 p-8 space-y-5">
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>
          {loginError && <p className="text-sm text-[#8B1A1A] font-[DM_Sans]">{loginError}</p>}
          <button type="submit" disabled={loggingIn} className={`${primaryButton} w-full`}>
            {loggingIn ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-[Cormorant_Garamond] text-[#2C1810]">Vos produits</h1>
            <p className="mt-2 text-[#6B6B6B] font-[DM_Sans]">
              {products.length} produit{products.length > 1 ? 's' : ''} dans la boutique
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={openAdd} className={primaryButton}>
              Ajouter un produit
            </button>
            <button type="button" onClick={handleLogout} className={secondaryButton}>
              Se déconnecter
            </button>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className={`mb-6 px-4 py-3 font-[DM_Sans] text-sm border ${
              message.type === 'error'
                ? 'border-[#8B1A1A] text-[#8B1A1A] bg-white'
                : 'border-[#D4A853] text-[#2C1810] bg-white'
            }`}
          >
            {message.text}
          </div>
        )}

        {formOpen && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#D4A853]/30 p-6 sm:p-8 mb-10 space-y-5"
          >
            <h2 className="text-2xl font-[Cormorant_Garamond] text-[#2C1810]">
              {editingId ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>

            <div>
              <label className={labelClass} htmlFor="name">Nom du produit</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="category">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="price">Prix (FCFA)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="specs">
                Caractéristiques (une par ligne)
              </label>
              <textarea
                id="specs"
                name="specs"
                rows={3}
                value={form.specs}
                onChange={handleChange}
                placeholder={'100% coton\nTaille unique'}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="photo">Photo</label>
              <div className="flex items-start gap-4">
                {(imagePreview || imageUrl) && (
                  <img
                    src={imagePreview || imageUrl}
                    alt="Aperçu"
                    className="w-24 aspect-[3/4] object-cover object-top border border-[#D4A853]/40"
                  />
                )}
                <div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFile}
                    className="font-[DM_Sans] text-sm"
                  />
                  <p className="mt-2 text-xs text-[#6B6B6B] font-[DM_Sans]">
                    La photo est recadrée automatiquement en format portrait, sans couper le haut.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 font-[DM_Sans] text-sm text-[#1A1A1A]">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={form.in_stock}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                En stock
              </label>
              <label className="flex items-center gap-2 font-[DM_Sans] text-sm text-[#1A1A1A]">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                Afficher sur la page d’accueil
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={primaryButton}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button type="button" onClick={closeForm} disabled={saving} className={secondaryButton}>
                Annuler
              </button>
            </div>
          </form>
        )}

        {loadingProducts ? (
          <p className="text-[#6B6B6B] font-[DM_Sans]">Chargement…</p>
        ) : products.length === 0 ? (
          <p className="text-[#6B6B6B] font-[DM_Sans] py-10">
            Aucun produit pour l’instant. Ajoutez votre première pièce avec le bouton ci-dessus.
          </p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-[#D4A853]/30 p-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 aspect-[3/4] object-cover object-top shrink-0"
                    />
                  ) : (
                    <div className="w-16 aspect-[3/4] bg-[#E8E0D5] shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-[Cormorant_Garamond] text-xl text-[#1A1A1A] truncate">
                      {product.name}
                    </p>
                    <p className="font-[DM_Sans] text-sm text-[#6B6B6B]">
                      {categoryLabel(product.category)} — {formatPrice(product.price)}
                    </p>
                    <p className="font-[DM_Sans] text-xs text-[#6B6B6B] mt-1">
                      {product.in_stock ? 'En stock' : 'Épuisé'}
                      {product.featured ? ' — sur la page d’accueil' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => openEdit(product)} className={secondaryButton}>
                    Modifier
                  </button>
                  <button type="button" onClick={() => handleDelete(product)} className={dangerButton}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[110px] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">{content}</div>
      </main>
      <Footer />
    </>
  );
}
