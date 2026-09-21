-- Create products table for AMADIS boutique
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  category TEXT NOT NULL CHECK (
    category IN ('pagne-wax', 'tissu', 'robe')
  ),
  price INTEGER NOT NULL,
  description TEXT,
  description_en TEXT,
  specs TEXT[],
  image_url TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view products)
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to manage products (admin)
CREATE POLICY "Authenticated can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_products_category 
  ON products(category);

CREATE INDEX IF NOT EXISTS idx_products_featured 
  ON products(featured);
