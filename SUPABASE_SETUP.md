# Supabase Setup Guide

This guide will help you set up Supabase to store and retrieve the 40 rules of love.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be set up

## 2. Create the Rules Table

In your Supabase dashboard, go to the SQL Editor and run this query:

```sql
-- Create the rules table
CREATE TABLE rules (
  id SERIAL PRIMARY KEY,
  rule_number INTEGER NOT NULL UNIQUE,
  quote TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some sample data (replace with your actual 40 rules)
INSERT INTO rules (rule_number, quote) VALUES
(1, 'How we see God is a direct reflection of how we see ourselves. If God brings to mind mostly fear and blame, it means there is too much fear and blame welled inside us.'),
(2, 'The path to the Truth is a labor of the heart, not of the head. Make your heart your primary guide!'),
(3, 'You can study God through everything and everyone in the universe, because God is not confined in a mosque, synagogue, or church.'),
-- Add the remaining 37 rules here...
(40, 'A life without love is of no account. Don''t ask yourself what kind of love you should seek, spiritual or material, divine or mundane, Eastern or Western. Divisions only lead to more divisions.');

-- Create an index for faster queries
CREATE INDEX idx_rules_rule_number ON rules(rule_number);
```

## 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key

## 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Test the Connection

Restart your development server and visit the website. You should see the 40 rules loaded from Supabase instead of placeholder data.

## Database Schema

The `rules` table has the following structure:

- `id`: Primary key (auto-increment)
- `rule_number`: The rule number (1-40)
- `quote`: The actual quote/rule text
- `created_at`: Timestamp when the rule was created
- `updated_at`: Timestamp when the rule was last updated

## Row Level Security (Optional)

Since this is read-only data, you can enable RLS and create a policy to allow public read access:

```sql
-- Enable RLS
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON rules
FOR SELECT USING (true);
```
