import { supabase } from './supabase'

const FALLBACK_PRODUCTS = [
  { id:'1', name:'Pagne Wax Royal', category:'pagne-wax', 
    price:15000, description:'Pagne wax de qualité supérieure.', 
    image_url:null, in_stock:true, featured:true },
  { id:'2', name:'Pagne Wax Soleil', category:'pagne-wax', 
    price:12000, description:'Pagne wax aux couleurs éclatantes.', 
    image_url:null, in_stock:true, featured:true },
  { id:'3', name:'Pagne Wax Floral', category:'pagne-wax', 
    price:13000, description:'Pagne wax aux motifs floraux.', 
    image_url:null, in_stock:true, featured:false },
  { id:'4', name:'Pagne Wax Géométrique', category:'pagne-wax', 
    price:14000, description:'Motifs géométriques modernes.', 
    image_url:null, in_stock:true, featured:false },
  { id:'5', name:'Tissu Kente Traditionnel', category:'tissu', 
    price:25000, description:'Tissu Kente tissé à la main.', 
    image_url:null, in_stock:true, featured:true },
  { id:'6', name:'Tissu Bogolan Authentique', category:'tissu', 
    price:18000, description:'Bogolan authentique du Mali.', 
    image_url:null, in_stock:true, featured:false },
  { id:'7', name:'Tissu Brodé Doré', category:'tissu', 
    price:22000, description:'Broderie fils dorés artisanaux.', 
    image_url:null, in_stock:true, featured:true },
  { id:'8', name:'Tissu Kanga Coloré', category:'tissu', 
    price:8000, description:'Tissu Kanga léger et coloré.', 
    image_url:null, in_stock:true, featured:false },
  { id:'9', name:'Robe Wax Élégante', category:'robe', 
    price:45000, description:'Robe wax coupe moderne.', 
    image_url:null, in_stock:true, featured:true },
  { id:'10', name:'Robe Bogolan Signature', category:'robe', 
    price:55000, description:'Robe Bogolan artisanale unique.', 
    image_url:null, in_stock:true, featured:true },
  { id:'11', name:'Robe Kente Moderne', category:'robe', 
    price:65000, description:'Robe Kente design contemporain.', 
    image_url:null, in_stock:true, featured:false },
  { id:'12', name:'Robe Asymétrique Wax', category:'robe', 
    price:50000, description:'Robe asymétrique audacieuse.', 
    image_url:null, in_stock:true, featured:false },
]

export function formatPrice(price) {
  if (!price && price !== 0) return '0 FCFA'
  return price.toLocaleString('fr-FR').replace(/\s/g, ' ') + ' FCFA'
}

export function buildWhatsAppURL(product, quantity = 1, variant = '') {
  const message = `Bonjour AMADIS ! 👋
Je souhaite commander :
- Produit : ${product.name}
- Prix : ${formatPrice(product.price)}
- Quantité : ${quantity}${variant ? `\n- Variante : ${variant}` : ''}
Merci de confirmer la disponibilité.`
  return `https://wa.me/22890126964?text=${encodeURIComponent(message)}`
}

export async function getProducts() {
  if (!supabase) {
    console.log('Using fallback products (Supabase not configured)')
    return FALLBACK_PRODUCTS
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    if (!data || data.length === 0) return FALLBACK_PRODUCTS
    return data
  } catch (err) {
    console.error('Supabase error, using fallback:', err.message)
    return FALLBACK_PRODUCTS
  }
}

export async function getProductsByCategory(category) {
  if (!category || category === 'all') return getProducts()
  if (!supabase) {
    return FALLBACK_PRODUCTS.filter(p => p.category === category)
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    if (error) throw error
    if (!data || data.length === 0) {
      return FALLBACK_PRODUCTS.filter(p => p.category === category)
    }
    return data
  } catch (err) {
    console.error('Supabase error, using fallback:', err.message)
    return FALLBACK_PRODUCTS.filter(p => p.category === category)
  }
}

export async function getFeaturedProducts(limit = 4) {
  if (!supabase) {
    return FALLBACK_PRODUCTS.filter(p => p.featured).slice(0, limit)
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(limit)
    if (error) throw error
    if (!data || data.length === 0) {
      return FALLBACK_PRODUCTS.filter(p => p.featured).slice(0, limit)
    }
    return data
  } catch (err) {
    console.error('Supabase error, using fallback:', err.message)
    return FALLBACK_PRODUCTS.filter(p => p.featured).slice(0, limit)
  }
}

export async function getProductById(id) {
  if (!supabase) {
    return FALLBACK_PRODUCTS.find(p => p.id === id) || null
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  } catch (err) {
    console.error('Supabase error:', err.message)
    return FALLBACK_PRODUCTS.find(p => p.id === id) || null
  }
}
