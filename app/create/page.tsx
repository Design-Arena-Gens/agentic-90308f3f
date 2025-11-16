"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  Wand2,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AdSize = "1080x1080" | "1080x1350";
type AdStyle = "modern" | "minimal" | "ecommerce" | "luxury";

export default function CreateAd() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prompt, setPrompt] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>("");
  const [adSize, setAdSize] = useState<AdSize>("1080x1080");
  const [adStyle, setAdStyle] = useState<AdStyle>("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setError("");

    if (!prompt.trim()) {
      setError("Please enter a description for your ad");
      return;
    }

    if (!productImage) {
      setError("Please upload a product image");
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image", productImage);
      formData.append("size", adSize);
      formData.append("style", adStyle);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate ad");
      }

      const data = await response.json();

      // Navigate to preview page with generated image
      router.push(
        `/preview?image=${encodeURIComponent(data.imageUrl)}&prompt=${encodeURIComponent(prompt)}&size=${adSize}&style=${adStyle}`
      );
    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate ad");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AdGen
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Ad
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Design stunning promotional images in minutes
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Describe Your Ad
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A sleek smartphone floating in a futuristic cityscape with neon lights, professional product photography, studio lighting"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none h-32 text-gray-800"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 mt-2">
                Be specific about the style, mood, and setting you want
              </p>
            </div>

            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Upload Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isGenerating}
                />

                {productImagePreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={productImagePreview}
                        alt="Product preview"
                        className="max-h-64 rounded-lg shadow-md"
                      />
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      disabled={isGenerating}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium mb-1">
                        Click to upload product image
                      </p>
                      <p className="text-sm text-gray-500">PNG or JPG</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ad Size Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Ad Size
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAdSize("1080x1080")}
                  disabled={isGenerating}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    adSize === "1080x1080"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 border-2 border-gray-300 rounded mx-auto mb-2"></div>
                    <p className="font-semibold text-gray-800">Square</p>
                    <p className="text-sm text-gray-500">1080 × 1080</p>
                  </div>
                </button>

                <button
                  onClick={() => setAdSize("1080x1350")}
                  disabled={isGenerating}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    adSize === "1080x1350"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-16 border-2 border-gray-300 rounded mx-auto mb-2"></div>
                    <p className="font-semibold text-gray-800">Portrait</p>
                    <p className="text-sm text-gray-500">1080 × 1350</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Style Template
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(["modern", "minimal", "ecommerce", "luxury"] as AdStyle[]).map(
                  (style) => (
                    <button
                      key={style}
                      onClick={() => setAdStyle(style)}
                      disabled={isGenerating}
                      className={`p-4 border-2 rounded-xl transition-all capitalize ${
                        adStyle === style
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-semibold text-gray-800">{style}</p>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || !productImage}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Ad...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Ad
                </>
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
