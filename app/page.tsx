"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, Image as ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AdGen
              </span>
            </div>
            <Link
              href="/create"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Ad Generator
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create stunning promotional images for Facebook & Instagram in seconds.
              Just describe your vision and upload your product.
            </p>
            <Link href="/create">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                Start Creating
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Product</h3>
            <p className="text-gray-600">
              Upload your product image and let AI work its magic.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Describe Your Vision</h3>
            <p className="text-gray-600">
              Tell us what kind of ad you want to create with a simple prompt.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Download & Share</h3>
            <p className="text-gray-600">
              Get your polished, ad-ready design in high resolution.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose Your Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            {["Modern", "Minimal", "Ecommerce", "Luxury"].map((style, i) => (
              <motion.div
                key={style}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-semibold text-lg">{style}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t mt-20 py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2024 AdGen. Create stunning ads with AI.</p>
        </div>
      </footer>
    </div>
  );
}
