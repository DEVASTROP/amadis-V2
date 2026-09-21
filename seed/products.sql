-- Sample data for AMADIS products table
-- 4 Pagnes Wax (noms authentiques)
-- 4 Tissus (Kente, Bogolan, Brodé, Kanga)
-- 4 Robes (Robe Wax, Robe Kente, Robe Bogolan, Robe Asymétrique)

INSERT INTO products (name, name_en, category, price, description, description_en, specs, image_url, in_stock) VALUES
-- Pagnes Wax
('Nkitah', 'Nkitah', 'pagne-wax', 15000, 'Pagne wax traditionnel avec motif géométrique élégant en bleu et or', 'Traditional wax cloth with elegant geometric pattern in blue and gold', '["100% coton", "120cm x 150cm", "Motif géométrique"]', 'https://example.com/images/nkitah.jpg', true),
('Kobène', 'Kobène', 'pagne-wax', 18000, 'Pagne wax premium aux couleurs vives rouges et jaunes', 'Premium wax cloth with vibrant red and yellow colors', '["100% coton", "120cm x 150cm", "Impression cire de qualité"]', 'https://example.com/images/kobene.jpg', true),
('Adowo', 'Adowo', 'pagne-wax', 16000, 'Pagne wax fleuri avec motifs floraux délicats', 'Floral wax cloth with delicate flower patterns', '["100% coton", "120cm x 150cm", "Finitions soignées"]', 'https://example.com/images/adowo.jpg', true),
('Bogolanfini', 'Bogolanfini', 'pagne-wax', 20000, 'Pagne bogolan traditionnel malien', 'Traditional Malian bogolan cloth', '["Coton teinté naturellement", "115cm x 160cm", "Motifs géométriques noirs et blancs"]', 'https://example.com/images/bogolanfini.jpg', true),

-- Tissus
('Kente Royal', 'Royal Kente', 'tissu', 25000, 'Tissu kente traditionnel ghanéen avec motifs royaux', 'Traditional Ghanaian kente cloth with royal patterns', '["Soie et coton", "150cm x 200cm", "Motifs géométriques multicolores"]', 'https://example.com/images/kente-royal.jpg', true),
('Bogolan Authentique', 'Authentic Bogolan', 'tissu', 22000, 'Tissu bogolan fait main avec teinture naturelle', 'Handmade bogolan cloth with natural dye', '["Coton biologique", "110cm x 160cm", "Teinture à base de feuilles et de boue"]', 'https://example.com/images/bogolan-authentique.jpg', true),
('Brocade Élégant', 'Elegant Brocade', 'tissu', 18000, 'Tissu broché avec fils métalliques pour occasions spéciales', 'Brocade fabric with metallic threads for special occasions', '["Polyester et fils métalliques", "140cm x 180cm", "Motifs floraux en relief"]', 'https://example.com/images/brocade-elegant.jpg', true),
('Kanga Swahili', 'Swahili Kanga', 'tissu', 12000, 'Tissu kanga traditionnel d\'Afrique de l\'Est avec proverbes', 'Traditional East African kanga cloth with proverbs', '["100% coton", "150cm x 180cm", "Imprimé avec proverbes swahilis"]', 'https://example.com/images/kanga-swahili.jpg', true),

-- Robes
('Robe Wax Classique', 'Classic Wax Dress', 'robe', 35000, 'Robe élégante en wax traditionnel avec coupe moderne', 'Elegant dress in traditional wax with modern cut', '["100% coton wax", "Taille S-XL", "Doublure en coton"]', 'https://example.com/images/robe-wax.jpg', true),
('Robe Kente Prestige', 'Prestige Kente Dress', 'robe', 45000, 'Robe de cérémonie en tissu kente traditionnel', 'Ceremonial dress in traditional kente fabric', '["Soie et coton kente", "Taille S-XL", "Finitions haute couture"]', 'https://example.com/images/robe-kente.jpg', true),
('Robe Bogolan Chic', 'Chic Bogolan Dress', 'robe', 40000, 'Robe moderne en tissu bogolan avec détails contemporains', 'Modern dress in bogolan fabric with contemporary details', '["Coton bogolan teinté naturellement", "Taille S-XL", "Coupe fluide et élégante"]', 'https://example.com/images/robe-bogolan.jpg', true),
('Robe Asymétrique Tendance', 'Trendy Asymmetric Dress', 'robe', 38000, 'Robe moderne à coupe asymétrique en wax coloré', 'Modern asymmetric dress in colorful wax', '["100% coton wax", "Taille S-XL", "Design unique et tendance"]', 'https://example.com/images/robe-asymetrique.jpg', true);