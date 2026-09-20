import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No screenshot file uploaded." }, { status: 400 });
    }

    // 1. File size check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // 2. MIME type check
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed." },
        { status: 400 }
      );
    }

    // 3. Extension check
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file extension. Only .jpg, .jpeg, .png, and .webp files are allowed." },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "screenshots");
    await fs.mkdir(uploadDir, { recursive: true });

    // Safe random filename
    const safeExt = ext || ".webp";
    const filename = `receipt_${Date.now()}_${crypto.randomBytes(8).toString("hex")}${safeExt}`;
    const filePath = path.join(uploadDir, filename);

    // Save to disk
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/screenshots/${filename}`;

    // Optionally save in MediaFile table
    await db.mediaFile.create({
      data: {
        name: file.name,
        url: publicUrl,
        key: filename,
        size: file.size,
        type: file.type,
        folder: "screenshots",
      },
    }).catch(console.error);

    return NextResponse.json({ ok: true, url: publicUrl });
  } catch (error: any) {
    console.error("Screenshot upload error:", error);
    return NextResponse.json({ error: error?.message || "Failed to upload screenshot." }, { status: 500 });
  }
}
