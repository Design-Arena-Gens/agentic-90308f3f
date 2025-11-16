"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  RefreshCw,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const imageUrl = searchParams.get("image") || "";
  const prompt = searchParams.get("prompt") || "";
  const size = searchParams.get("size") || "1080x1080";
  const style = searchParams.get("style") || "modern";

  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `adgen-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    router.push("/create");
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No image to preview</p>
          <Link
            href="/create"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Create New Ad
          </Link>
        </div>
      </div>
    );
  }

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
              href="/create"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Create
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Ad is Ready!
            </h1>
            <p className="text-lg text-gray-600">
              Download your high-quality promotional image
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Image Preview */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Generated ad"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Image
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="flex-1 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isRegenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5" />
                        Create Another
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  Ad Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Size
                    </p>
                    <p className="text-gray-800 capitalize">{size.replace("x", " × ")}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Style
                    </p>
                    <p className="text-gray-800 capitalize">{style}</p>
                  </div>

                  {prompt && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Prompt
                      </p>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {prompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Use high-resolution product images for best quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Be specific with your prompt descriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Try different styles to match your brand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Download images in PNG for transparency support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
