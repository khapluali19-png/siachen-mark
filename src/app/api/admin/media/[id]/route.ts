import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const utapi = new UTApi();

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const file = await db.mediaFile.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Remove from UploadThing storage first; if it fails, keep the DB row so we don't orphan.
  try {
    await utapi.deleteFiles(file.key);
  } catch (err) {
    console.error(`[media] Failed to delete ${file.key} from UploadThing:`, err);
    return NextResponse.json({ error: "Could not delete from storage." }, { status: 502 });
  }

  await db.mediaFile.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
