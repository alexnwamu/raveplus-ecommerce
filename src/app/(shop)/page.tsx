import { Metadata } from "next";
import {
  HeroSection,
  CategoryGrid,
  NewArrivals,
  TrustBadges,
  FeaturedCollection,
} from "@/components/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Nigerian Women's Fashion`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Collection */}
      <FeaturedCollection />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Trust Badges */}
      <TrustBadges />
    </>
  );
}
