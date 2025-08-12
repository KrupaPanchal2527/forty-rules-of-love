# Forty Rules of Love

A beautiful, modern website exploring the forty rules of love - a journey through wisdom, spirituality, and human connection.

## ✨ Features

- **Modern Design**: Built with Next.js 15, TypeScript, and Tailwind CSS v4
- **Beautiful Typography**: Custom fonts (Inter & Playfair Display) for optimal readability
- **Interactive Grid**: 4x10 grid layout showcasing all 40 rules with beautiful color variations
- **Supabase Integration**: Dynamic content loading from Supabase database
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Automatic dark/light mode support
- **Performance**: Optimized for speed and SEO
- **Developer Experience**: ESLint, Prettier, and TypeScript for clean code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use the latest LTS version)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd forty-rules-of-love
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Set up Supabase (optional - the app works with placeholder data):

```bash
# Copy the environment template
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed instructions.

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and Tailwind config
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
├── lib/               # Utility functions and configurations
├── types/             # TypeScript type definitions
└── styles/            # Additional stylesheets
```

## 🎨 Design System

The project uses a carefully crafted design system with:

- **Colors**: Beautiful gradient palette with violet, rose, emerald, and amber tones
- **Typography**: Inter for body text, Playfair Display for headings
- **Grid Layout**: 4x10 responsive grid showcasing all 40 rules
- **Interactive Cards**: Hover effects and smooth transitions
- **Spacing**: Consistent spacing scale
- **Components**: Reusable, accessible components

## 📊 The Forty Rules Grid

The main feature is a beautiful 4-column, 10-row grid displaying all 40 rules:

- **Responsive Design**: Adapts from 2 columns on mobile to 4 columns on desktop
- **Color Variations**: Each card uses a different color from a curated palette
- **Interactive**: Hover effects with scale and shadow animations
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Dynamic Content**: Rules loaded from Supabase or fallback to placeholder data

## 🌙 Dark Mode

The website automatically adapts to your system's dark/light mode preference and includes custom dark mode styling.

## 📱 Responsive Design

Fully responsive design that works beautifully on:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
