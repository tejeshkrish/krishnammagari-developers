/*
  # Create plots table for Krishnammagari Developers

  1. New Tables
    - `plots`
      - `id` (uuid, primary key)
      - `plot_number` (integer, unique)
      - `width` (text) - width dimension
      - `height` (text) - height dimension
      - `status` (text) - available, reserved, sold
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow public read access to plots
    - Allow public insert access to inquiries
*/

CREATE TABLE IF NOT EXISTS plots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_number integer UNIQUE NOT NULL,
  width text NOT NULL,
  height text NOT NULL,
  status text DEFAULT 'available' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plots"
  ON plots FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert plot data based on the layout
INSERT INTO plots (plot_number, width, height) VALUES
  (1, '50''', '34'''),
  (2, '50''', '30'''),
  (3, '50''', '30'''),
  (4, '50''', '30'''),
  (5, '50''', '30'''),
  (6, '50''', '30'''),
  (7, '50''', '30'''),
  (8, '50''', '30'''),
  (9, '57''-6"', '30'''),
  (10, '57''-6"', '30'''),
  (11, '57''-6"', '30'''),
  (12, '57''-6"', '30'''),
  (13, '57''', '30'''),
  (14, '53''-3"', '30'''),
  (15, '49''-6"', '30'''),
  (16, '46''-9"', '30'''),
  (17, '44''-6"', '19''-6"'),
  (18, '40''', '39''-4"'),
  (19, '35''', '39''-4"'),
  (20, '40''-6"', '39''-4"'),
  (21, '42''', '39''-4"'),
  (22, '40''', '100'''),
  (23, '35''', '100'''),
  (24, '40''-6"', '100'''),
  (25, '42''', '100''')
ON CONFLICT (plot_number) DO NOTHING;