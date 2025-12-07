"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Save, Settings as SettingsIcon } from "lucide-react"
import { fetchSettings, updateSettings, type SiteSettings } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSettings()
        setSettings(data)
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || "Impossible de charger les paramètres",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateSettings(settings)
      toast({
        title: "Succès",
        description: "Paramètres mis à jour avec succès",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour les paramètres",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  if (loading) {
    return <LoadingSpinner message="Chargement des paramètres..." />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-primary mb-2">Paramètres du Site</h1>
        <p className="text-muted-foreground">Gérer les paramètres généraux du site</p>
      </motion.div>

      {/* Settings Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-primary/10 shadow-lg space-y-8"
      >
        {/* Site Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-primary">Informations du Site</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Nom du site</label>
              <input
                type="text"
                value={settings.site_name || ""}
                onChange={(e) => updateSetting("site_name", e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Email de contact</label>
              <input
                type="email"
                value={settings.contact_email || ""}
                onChange={(e) => updateSetting("contact_email", e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Description</label>
            <textarea
              value={settings.site_description || ""}
              onChange={(e) => updateSetting("site_description", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Téléphone</label>
            <input
              type="tel"
              value={settings.contact_phone || ""}
              onChange={(e) => updateSetting("contact_phone", e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-6 pt-6 border-t border-primary/10">
          <h2 className="text-2xl font-bold text-primary">Réseaux Sociaux</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Instagram</label>
              <input
                type="url"
                value={settings.instagram_url || ""}
                onChange={(e) => updateSetting("instagram_url", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Facebook</label>
              <input
                type="url"
                value={settings.facebook_url || ""}
                onChange={(e) => updateSetting("facebook_url", e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Twitter</label>
              <input
                type="url"
                value={settings.twitter_url || ""}
                onChange={(e) => updateSetting("twitter_url", e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-primary/10">
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg"
          >
            <Save size={20} />
            {saving ? "Enregistrement..." : "Enregistrer les paramètres"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}

