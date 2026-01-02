import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Import uuid

// --- 1. DEFINE UPLOAD LIMITS ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

// Initialize Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const originalFilename = searchParams.get("filename");
  const contentType = request.headers.get("content-type");
  const contentLength = request.headers.get("content-length");

  // --- 2. VALIDATE FILENAME AND BODY ---
  if (!originalFilename || !request.body) {
    return NextResponse.json(
      { message: "No filename or file body provided." },
      { status: 400 },
    );
  }

  // --- 3. VALIDATE MIME TYPE ---
  if (!contentType || !ALLOWED_MIME_TYPES.includes(contentType)) {
    return NextResponse.json(
      {
        message: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
      },
      { status: 400 },
    );
  }

  // --- 4. VALIDATE FILE SIZE ---
  if (!contentLength || parseInt(contentLength, 10) > MAX_FILE_SIZE) {
    return NextResponse.json(
      {
        message: `File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      },
      { status: 400 },
    );
  }

  // --- 5. CREATE A UNIQUE FILENAME ---
  // This prevents filename conflicts and adds security
  const fileExtension = originalFilename.split(".").pop();
  const newFilename = `${uuidv4()}.${fileExtension}`;

  try {
    // Upload the file to the 'article-images' bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(newFilename, request.body, {
        cacheControl: "3600",
        upsert: false, // Don't upsert, as we use unique names
        contentType: contentType, // Pass the validated content type
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("article-images")
      .getPublicUrl(uploadData.path);

    if (!publicUrlData) {
      throw new Error("Could not get public URL for uploaded file.");
    }

    // Return the public URL
    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: `Error uploading file: ${errorMessage}` },
      { status: 500 },
    );
  }
}
