import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const members = await db.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const member = await db.teamMember.create({
    data: {
      name: String(body.name || "").trim(),
      role: String(body.role || "").trim(),
      title: body.title ? String(body.title).trim() : null,
      bio: body.bio ? String(body.bio).trim() : null,
      image: body.image ? String(body.image).trim() : null,
      linkedin: body.linkedin ? String(body.linkedin).trim() : null,
      email: body.email ? String(body.email).trim() : null,
      skills: Array.isArray(body.skills)
        ? body.skills
        : (body.skills ? String(body.skills).split(",").map((s) => s.trim()) : []),
      location: body.location ? String(body.location).trim() : "Islamabad, Pakistan",
      department: body.department ? String(body.department).trim() : null,
      isFounder: Boolean(body.isFounder),
      isFeatured: Boolean(body.isFeatured),
      published: body.published !== undefined ? Boolean(body.published) : true,
      order: Number(body.order) || 0,
      stats: body.stats || undefined,
    },
  });

  try {
    revalidatePath("/about");
  } catch {}

  return NextResponse.json(member);
}
