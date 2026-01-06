"use client";

import * as React from "react";
import { Metadata } from "next";
import { Save, Store, CreditCard, Truck, Mail, Bell } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [settings, setSettings] = React.useState({
    storeName: siteConfig.name,
    storeEmail: siteConfig.contact.email,
    storePhone: siteConfig.contact.phone,
    storeAddress: siteConfig.contact.address,
    currency: "NGN",
    freeShippingThreshold: siteConfig.shipping.freeShippingThreshold,
    standardShippingCost: siteConfig.shipping.standardShippingCost,
    paymentProvider: "Paystack",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In production, save to database
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">Settings</h1>
          <p className="text-muted mt-1">Manage your store settings</p>
        </div>
        <Button onClick={handleSave} isLoading={isLoading} leftIcon={<Save className="h-4 w-4" />}>
          Save Changes
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Store Information */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-cream rounded-lg">
              <Store className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-brand-dark">Store Information</h2>
              <p className="text-sm text-muted">Basic information about your store</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Store Name"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            />
            <Input
              label="Store Email"
              type="email"
              value={settings.storeEmail}
              onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
            />
            <Input
              label="Phone Number"
              value={settings.storePhone}
              onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
            />
            <Input
              label="Address"
              value={settings.storeAddress}
              onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-cream rounded-lg">
              <CreditCard className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-brand-dark">Payment Settings</h2>
              <p className="text-sm text-muted">Configure payment processing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              >
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Payment Provider</label>
              <div className="h-11 px-4 border border-border rounded-lg bg-gray-50 flex items-center text-sm text-muted">
                Paystack (Integrated)
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand-cream rounded-lg">
            <p className="text-sm text-brand-dark">
              <strong>Note:</strong> To change payment provider credentials, update your environment variables
              and redeploy.
            </p>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-cream rounded-lg">
              <Truck className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-brand-dark">Shipping Settings</h2>
              <p className="text-sm text-muted">Configure shipping options and costs</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Free Shipping Threshold (₦)"
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) =>
                setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
              }
              hint="Orders above this amount get free shipping"
            />
            <Input
              label="Standard Shipping Cost (₦)"
              type="number"
              value={settings.standardShippingCost}
              onChange={(e) =>
                setSettings({ ...settings, standardShippingCost: Number(e.target.value) })
              }
              hint="Cost for orders below free shipping threshold"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-cream rounded-lg">
              <Bell className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-brand-dark">Notifications</h2>
              <p className="text-sm text-muted">Configure email notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: "new_order", label: "New order notifications", checked: true },
              { id: "low_stock", label: "Low stock alerts", checked: true },
              { id: "review", label: "New product reviews", checked: false },
              { id: "customer", label: "New customer sign-ups", checked: false },
            ].map((notification) => (
              <label key={notification.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked={notification.checked}
                  className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary/20"
                />
                <span className="text-sm text-brand-dark">{notification.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
