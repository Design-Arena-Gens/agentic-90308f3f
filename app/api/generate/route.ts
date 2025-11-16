import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const imageFile = formData.get("image") as File;
    const size = formData.get("size") as string;
    const style = formData.get("style") as string;

    if (!prompt || !imageFile) {
      return NextResponse.json(
        { error: "Missing prompt or image" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

    // Build enhanced prompt based on style
    const stylePrompts: Record<string, string> = {
      modern: "modern, sleek, vibrant colors, contemporary design, professional photography, high-end advertising",
      minimal: "minimalist, clean, white background, simple composition, elegant, scandinavian design aesthetic",
      ecommerce: "product photography, commercial, clean background, sharp focus, studio lighting, professional catalog",
      luxury: "luxury, premium, elegant, sophisticated, high-end, glamorous, gold accents, dramatic lighting",
    };

    const enhancedPrompt = `${prompt}, ${stylePrompts[style] || stylePrompts.modern}, advertising photography, professional quality, ${size === "1080x1080" ? "square format" : "portrait format"}, marketing material, commercial use, high resolution`;

    console.log("Generating image with prompt:", enhancedPrompt);

    // Use Replicate's SDXL with img2img for product integration
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: base64Image,
          prompt: enhancedPrompt,
          negative_prompt:
            "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, text, logo, signature, amateur",
          width: 1024,
          height: size === "1080x1350" ? 1280 : 1024,
          num_inference_steps: 40,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          refine: "expert_ensemble_refiner",
          scheduler: "KarrasDPM",
          high_noise_frac: 0.8,
        },
      }
    );

    // Output is an array of URLs
    const imageUrl = Array.isArray(output) ? output[0] : output;

    console.log("Generated image URL:", imageUrl);

    return NextResponse.json({
      imageUrl,
      prompt: enhancedPrompt,
      size,
      style,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate image. Please ensure REPLICATE_API_TOKEN is set.",
      },
      { status: 500 }
    );
  }
}
