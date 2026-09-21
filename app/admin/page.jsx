'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    category: '',
    price: '',
    description: '',
    description_en: '',
    specs: '',
    image_url: '',
    in_stock: false
  });
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch from your API or database
      // For demo purposes, we'll use mock data or leave empty
      // This would typically be replaced with actual Supabase calls
      setProducts([]); // Placeholder - replace with actual data fetching
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddProduct = () => {
    setShowAddForm(true);
    setFormData({
      name: '',
      name_en: '',
      category: '',
      price: '',
      description: '',
      description_en: '',
      specs: '',
      image_url: '',
      in_stock: false
    });
  };

  const handleEditProduct = (product) => {
    setShowEditForm(true);
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      name_en: product.name_en || '',
      category: product.category || '',
      price: product.price?.toString() || '',
      description: product.description || '',
      description_en: product.description_en || '',
      specs: product.specs || '',
      image_url: product.image_url || '',
      in_stock: product.in_stock ?? false
    });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      // In a real app, you would delete from your database
      // For demo, we'll filter it out locally
      setProducts(prev => prev.filter(p => p.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would save to your database
      // For demo, we'll simulate the operation
      
      if (editingProduct) {
        // Update existing product
        const updatedProduct = {
          ...editingProduct,
          ...formData,
          price: parseFloat(formData.price) || 0
        };
        
        setProducts(prev => 
          prev.map(p => p.id === editingProduct.id ? updatedProduct : p)
        );
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(), // Temporary ID - in real app use DB-generated ID
          ...formData,
          price: parseFloat(formData.price) || 0,
          created_at: new Date().toISOString()
        };
        
        setProducts(prev => [newProduct, ...prev]);
      }
      
      // Close forms and reset
      setShowAddForm(false);
      setShowEditForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        name_en: '',
        category: '',
        price: '',
        description: '',
        description_en: '',
        specs: '',
        image_url: '',
        in_stock: false
      });
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full border-4 border-[#D4A853]/20 border-t-[#2C1810] w-12 h-12"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-[Cormorant_Garamond] font-bold text-center text-[#2C1810] mb-4">
              Administration des produits
            </h1>
            <p className="text-center text-[#6B6B6B] max-w-xl mx-auto">
              Gérez votre catalogue de produits africains authentiques
            </p>
            <button
              onClick={handleAddProduct}
              className="mt-6 inline-flex items-center px-6 py-3 bg-[#2C1810] text-white font-medium rounded-lg hover:bg-[#3C2313] transition-colors"
            >
              Ajouter un produit
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H7"/>
              </svg>
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-[Cormorant_Garamond] font-bold mb-4 text-[#2C1810]">
                Ajouter un nouveau produit
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Nom du produit</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Nom (anglais)</label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="pagne-wax">Pagne Wax</option>
                    <option value="tissu">Tissu</option>
                    <option value="robe">Robe</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Prix (FCFA)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">En stock</label>
                    <input
                      type="checkbox"
                      name="in_stock"
                      checked={formData.in_stock}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#2C1810]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Description (anglais)</label>
                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Spécifications (séparées par des virgules)</label>
                  <input
                    type="text"
                    name="specs"
                    value={formData.specs}
                    onChange={handleInputChange}
                    placeholder="Ex: 100% coton, 120cm x 150cm, tissage traditionnel"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">URL de l'image</label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="URL de l'image dans Supabase Storage"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({
                        name: '',
                        name_en: '',
                        category: '',
                        price: '',
                        description: '',
                        description_en: '',
                        specs: '',
                        image_url: '',
                        in_stock: false
                      });
                    }}
                    className="mr-4 px-4 py-2 border border-[#D4A853]/20 rounded-lg hover:bg-[#D4A853]/10"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2C1810] text-white rounded-lg hover:bg-[#3C2313]"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Edit Product Form */}
          {showEditForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-[Cormorant_Garamond] font-bold mb-4 text-[#2C1810]">
                Modifier le produit
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Nom du produit</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Nom (anglais)</label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  >
                    <option value="pagne-wax">Pagne Wax</option>
                    <option value="tissu">Tissu</option>
                    <option value="robe">Robe</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Prix (FCFA)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">En stock</label>
                    <input
                      type="checkbox"
                      name="in_stock"
                      checked={formData.in_stock}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#2C1810]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Description (anglais)</label>
                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">Spécifications (séparées par des virgules)</label>
                  <input
                    type="text"
                    name="specs"
                    value={formData.specs}
                    onChange={handleInputChange}
                    placeholder="Ex: 100% coton, 120cm x 150cm, tissage traditionnel"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1A1A1A]">URL de l'image</label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="URL de l'image dans Supabase Storage"
                    className="w-full px-3 py-2 border border-[#D4A853]/20 rounded-lg focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingProduct(null);
                    }}
                    className="mr-4 px-4 py-2 border border-[#D4A853]/20 rounded-lg hover:bg-[#D4A853]/10"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2C1810] text-white rounded-lg hover:bg-[#3C2313]"
                    disabled={loading}
                  >
                    {loading ? 'Mise à jour...' : 'Mettre à jour'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full border-4 border-[#D4A853]/20 border-t-[#2C1810] w-12 h-12 mx-auto"></div>
              </div>
            ) : (
              <div className="px-6 py-4">
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#6B6B6B]">Aucun produit trouvé. Ajoutez votre premier produit !</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-[#D4A853]/20">
                          <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">Image</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">Nom</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">Catégorie</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">Prix (FCFA)</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">Stock</th>
                          <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-t border-[#D4A853]/10 hover:bg-[#D4A853]/5">
                            <td className="px-4 py-3">
                              {product.image_url ? (
                                <img 
                                  src={product.image_url} 
                                  alt={product.name} 
                                  className="h-12 w-12 object-cover rounded"
                                />
                              ) : (
                                <div className="h-12 w-12 bg-[#D4A853]/20 flex items-center justify-center rounded">
                                  <span className="text-xs text-[#D4A853]">Pas d'image</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">{product.name}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-[#D4A853]/20 text-[#D4A853] text-xs rounded">
                                {product.category === 'pagne-wax' ? 'Pagne Wax' :
                                 product.category === 'tissu' ? 'Tissu' : 'Robe'}
                              </span>
                            </td>
                            <td className="px-4 py-3">{parseFloat(product.price || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                            <td className="px-4 py-3">
                              {product.in_stock ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">En stock</span>
                              ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">En rupture</span>
                              )}
                            </td>
                            <td className="text-center px-4 py-3 space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="px-3 py-1 bg-[#D4A853]/10 text-[#D4A853] rounded hover:bg-[#D4A853]/20 text-xs"
                              >
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Helper function to format price in FCFA
function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}