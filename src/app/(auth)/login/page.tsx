"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // In production, this would call Supabase auth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Login successful!");
      window.location.href = redirectTo;
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <h1 className="font-display text-3xl font-semibold text-brand-dark">
              {siteConfig.name}
            </h1>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-2xl text-brand-dark mb-2">
              Welcome Back
            </h2>
            <p className="text-muted">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="your@email.com"
              leftIcon={<Mail className="h-5 w-5" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Enter your password"
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted hover:text-brand-dark transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-brand-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}
              className="text-brand-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

          {/* Continue as Guest */}
          <div className="mt-6 pt-6 border-t border-border">
            <Link href="/products">
              <Button variant="outline" fullWidth>
                Continue as Guest
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="h-full w-full bg-brand-dark/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-md">
            <h2 className="font-display text-3xl mb-4">
              Elegance Meets Style
            </h2>
            <p className="text-white/80">
              Discover our curated collection of premium Nigerian women&apos;s fashion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
