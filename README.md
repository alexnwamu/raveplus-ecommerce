# RavePlus E-commerce

A production-ready Nigerian women's fashion e-commerce platform built with Next.js 14, Supabase, Tailwind CSS, and Paystack.

![RavePlus Homepage](docs/homepage.png)

## Features

### Customer Features
- ✅ Product catalog with categories
- ✅ Product search and filtering
- ✅ Product detail pages with image gallery
- ✅ Color and size selectors
- ✅ Add to cart / remove from cart
- ✅ Persistent cart (localStorage)
- ✅ Checkout flow
- ✅ User authentication (login/register)
- ✅ Naira (₦) currency formatting

### Admin Dashboard
- ✅ Dashboard overview with analytics
- ✅ Product management (view, create, edit, delete)
- ✅ Order management with status tracking
- ✅ Category management
- ✅ Customer management

### Technical Features
- ✅ Next.js 14 App Router
- ✅ TypeScript (strict mode)
- ✅ Tailwind CSS v4
- ✅ Supabase (Postgres + Auth + Storage)
- ✅ Paystack payment integration ready
- ✅ Row Level Security (RLS)
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Payments | Paystack |
| State | React Context + Zustand |
| Animations | Framer Motion |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Paystack account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/raveplus-ecommerce.git
   cd raveplus-ecommerce
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your Supabase and Paystack credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. Set up the database:
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the migration in `supabase/migrations/001_initial_schema.sql`

6. Start the development server:
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (shop)/             # Customer-facing pages
│   └── admin/              # Admin dashboard
├── components/
│   ├── home/               # Homepage sections
│   ├── layout/             # Header, footer
│   ├── products/           # Product-related components
│   └── ui/                 # Reusable UI components
├── config/                 # Site configuration
├── features/
│   └── cart/               # Cart state management
├── lib/
│   ├── supabase/           # Supabase clients
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript types
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (server-only) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key |
| `NEXT_PUBLIC_SITE_URL` | Site URL for callbacks |

## Database Schema

The database includes the following tables:

- `users` - User profiles (extends Supabase auth)
- `categories` - Product categories
- `products` - Product listings
- `product_images` - Product images
- `product_variants` - Size/color variants
- `cart_items` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews
- `addresses` - Shipping addresses

All tables have Row Level Security (RLS) policies enabled.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
pnpm build
pnpm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for Nigerian fashion
