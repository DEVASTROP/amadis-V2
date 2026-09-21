-- Seed data for AMADIS boutique
INSERT INTO products 
  (name, name_en, category, price, description, 
   description_en, specs, image_url, in_stock, featured)
VALUES
  (
    'Pagne Wax Royal',
    'Royal Wax Fabric',
    'pagne-wax',
    15000,
    'Pagne wax de qualité supérieure aux motifs royaux. Tissé avec soin pour les grandes occasions.',
    'Premium royal wax fabric with intricate motifs for special occasions.',
    ARRAY['Matière: 100% coton', 'Longueur: 6 yards', 'Origine: Afrique de l''Ouest', 'Lavage: Main recommandé'],
    NULL,
    true,
    true
  ),
  (
    'Pagne Wax Soleil',
    'Sunshine Wax Fabric',
    'pagne-wax',
    12000,
    'Pagne wax aux couleurs éclatantes inspirées du soleil africain. Parfait pour toutes les occasions.',
    'Vibrant wax fabric inspired by the African sun.',
    ARRAY['Matière: 100% coton', 'Longueur: 6 yards', 'Couleurs: Jaune, orange, rouge', 'Lavage: Main recommandé'],
    NULL,
    true,
    true
  ),
  (
    'Pagne Wax Floral',
    'Floral Wax Fabric',
    'pagne-wax',
    13000,
    'Pagne wax aux motifs floraux colorés. Une explosion de couleurs pour sublimer votre style.',
    'Colorful floral wax fabric to elevate your style.',
    ARRAY['Matière: 100% coton', 'Longueur: 6 yards', 'Motif: Floral multicolore', 'Lavage: Main recommandé'],
    NULL,
    true,
    false
  ),
  (
    'Pagne Wax Géométrique',
    'Geometric Wax Fabric',
    'pagne-wax',
    14000,
    'Pagne wax aux motifs géométriques modernes. Alliance parfaite de tradition et modernité.',
    'Modern geometric wax fabric blending tradition and modernity.',
    ARRAY['Matière: 100% coton', 'Longueur: 6 yards', 'Motif: Géométrique', 'Lavage: Main recommandé'],
    NULL,
    true,
    false
  ),
  (
    'Tissu Kente Traditionnel',
    'Traditional Kente Fabric',
    'tissu',
    25000,
    'Tissu Kente tissé à la main avec des fils dorés. Un patrimoine africain d''une beauté exceptionnelle.',
    'Hand-woven Kente fabric with golden threads. An exceptional African heritage.',
    ARRAY['Matière: Soie et coton mélangés', 'Largeur: 4 pouces', 'Origine: Ghana', 'Usage: Cérémonie'],
    NULL,
    true,
    true
  ),
  (
    'Tissu Bogolan Authentique',
    'Authentic Bogolan Fabric',
    'tissu',
    18000,
    'Tissu Bogolan authentique du Mali. Teinture naturelle traditionnelle aux motifs symboliques.',
    'Authentic Bogolan fabric from Mali with traditional natural dye.',
    ARRAY['Matière: 100% coton', 'Teinture: Naturelle', 'Origine: Mali', 'Lavage: Eau froide'],
    NULL,
    true,
    false
  ),
  (
    'Tissu Brodé Doré',
    'Golden Embroidered Fabric',
    'tissu',
    22000,
    'Tissu brodé avec des fils dorés artisanaux. Élégance et raffinement pour vos créations.',
    'Fabric embroidered with artisanal golden threads for elegant creations.',
    ARRAY['Matière: Coton brodé', 'Broderie: Fils dorés', 'Usage: Tenues de soirée', 'Entretien: Pressing conseillé'],
    NULL,
    true,
    true
  ),
  (
    'Tissu Kanga Coloré',
    'Colorful Kanga Fabric',
    'tissu',
    8000,
    'Tissu Kanga léger et coloré. Polyvalent et parfait pour le quotidien comme pour les fêtes.',
    'Light and colorful Kanga fabric, versatile for daily wear and celebrations.',
    ARRAY['Matière: 100% coton', 'Légèreté: Très légère', 'Polyvalence: Haute', 'Lavage: Machine possible'],
    NULL,
    true,
    false
  ),
  (
    'Robe Wax Élégante',
    'Elegant Wax Dress',
    'robe',
    45000,
    'Robe confectionnée en wax de qualité supérieure. Coupe moderne qui valorise la silhouette.',
    'Dress made from premium wax fabric with a modern cut.',
    ARRAY['Matière: Wax 100% coton', 'Coupe: Ajustée', 'Tailles: S, M, L, XL', 'Entretien: Lavage main'],
    NULL,
    true,
    true
  ),
  (
    'Robe Bogolan Signature',
    'Signature Bogolan Dress',
    'robe',
    55000,
    'Robe Bogolan artisanale, pièce unique. Un chef-d''œuvre de l''artisanat africain.',
    'Artisanal Bogolan dress, unique piece. A masterpiece of African craftsmanship.',
    ARRAY['Matière: Bogolan naturel', 'Style: Pièce unique', 'Tailles: S à XL sur mesure', 'Origine: Mali'],
    NULL,
    true,
    true
  ),
  (
    'Robe Kente Moderne',
    'Modern Kente Dress',
    'robe',
    65000,
    'Robe en tissu Kente revisitée avec un design contemporain. Tradition et modernité fusionnées.',
    'Kente fabric dress with contemporary design fusing tradition and modernity.',
    ARRAY['Matière: Kente soie/coton', 'Style: Contemporain', 'Tailles: S, M, L, XL', 'Occasion: Cérémonie'],
    NULL,
    true,
    false
  ),
  (
    'Robe Asymétrique Wax',
    'Asymmetric Wax Dress',
    'robe',
    50000,
    'Robe asymétrique en wax, coupe unique et audacieuse. Pour les femmes qui osent se démarquer.',
    'Asymmetric wax dress with a bold and unique cut for women who dare to stand out.',
    ARRAY['Matière: Wax premium', 'Coupe: Asymétrique', 'Tailles: XS à XXL', 'Style: Avant-garde'],
    NULL,
    true,
    false
  );
