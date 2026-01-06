"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
  Heart,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useCart } from "@/features/cart/cart-context";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-brand-cream rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                {siteConfig.name}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {siteConfig.mainNav.map((item) => (
                <NavItem key={item.href} item={item} pathname={pathname} />
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden md:flex p-2 hover:bg-brand-cream rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex p-2 hover:bg-brand-cream rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-brand-cream rounded-lg transition-colors"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[10px] font-medium text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

interface NavItemProps {
  item: (typeof siteConfig.mainNav)[0];
  pathname: string;
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  if (item.hasDropdown) {
    return (
      <div className="relative group">
        <button
          className={cn(
            "flex items-center gap-1 py-2 text-sm font-medium transition-colors",
            isActive ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"
          )}
        >
          {item.title}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>

        {/* Dropdown */}
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-white rounded-lg shadow-lg border border-border p-4 min-w-[200px]">
            <div className="space-y-1">
              {siteConfig.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="block px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-md transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link
                href="/products"
                className="block px-3 py-2 text-sm font-medium text-brand-primary"
              >
                View All →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "py-2 text-sm font-medium transition-colors",
        isActive ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"
      )}
    >
      {item.title}
    </Link>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-white shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-display text-xl font-semibold">{siteConfig.name}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {siteConfig.mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-brand-cream text-brand-primary"
                          : "text-brand-dark hover:bg-brand-cream"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Categories */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {siteConfig.categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products?category=${category.slug}`}
                        className="block px-4 py-2 text-sm text-brand-dark hover:bg-brand-cream rounded-lg transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-brand-cream rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  My Account
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-brand-cream rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg"
          >
            <div className="container py-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full h-12 pl-12 pr-4 text-lg border-0 focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
