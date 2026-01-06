export const siteConfig = {
  name: "RavePlus",
  description: "Premium Nigerian Women's Fashion - Elegant clothing for the modern woman",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://raveplus.ng",
  ogImage: "/og-image.jpg",
  
  // Contact Info
  contact: {
    email: "hello@raveplus.ng",
    phone: "+234 800 000 0000",
    address: "Victoria Island, Lagos, Nigeria",
    instagram: "https://instagram.com/raveplus",
    twitter: "https://twitter.com/raveplus",
    facebook: "https://facebook.com/raveplus",
  },
  
  // Currency
  currency: {
    code: "NGN",
    symbol: "₦",
    locale: "en-NG",
  },
  
  // Navigation
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/products", hasDropdown: true },
    { title: "New Arrivals", href: "/products?filter=new" },
    { title: "Collections", href: "/collections" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  
  // Categories
  categories: [
    { name: "Dresses", slug: "dresses", description: "Elegant dresses for every occasion" },
    { name: "Tops", slug: "tops", description: "Stylish tops and blouses" },
    { name: "Jackets & Coats", slug: "jackets-coats", description: "Outerwear for all seasons" },
    { name: "Skirts", slug: "skirts", description: "Beautiful skirts in various styles" },
    { name: "Pants", slug: "pants", description: "Comfortable and chic pants" },
    { name: "Accessories", slug: "accessories", description: "Complete your look" },
  ],
  
  // Size Options
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  
  // Shipping
  shipping: {
    freeShippingThreshold: 50000, // ₦50,000
    standardShippingCost: 3000, // ₦3,000
    expressShippingCost: 5000, // ₦5,000
    processingDays: "2-3",
    deliveryDays: {
      lagos: "1-2",
      other: "3-5",
    },
  },
  
  // Footer Links
  footerLinks: {
    quickLinks: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "FAQs", href: "/faqs" },
      { title: "Size Guide", href: "/size-guide" },
    ],
    customerService: [
      { title: "Shipping & Delivery", href: "/shipping" },
      { title: "Returns & Exchanges", href: "/returns" },
      { title: "Track Order", href: "/track-order" },
      { title: "Gift Cards", href: "/gift-cards" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Refund Policy", href: "/refund-policy" },
    ],
  },
  
  // Trust Badges
  trustBadges: [
    { icon: "Truck", title: "Free Delivery", description: "On orders over ₦50,000" },
    { icon: "RefreshCw", title: "Easy Returns", description: "14-day return policy" },
    { icon: "Shield", title: "Secure Payment", description: "100% secure checkout" },
    { icon: "Headphones", title: "24/7 Support", description: "Dedicated support team" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
