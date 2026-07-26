import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import BlogPostForm from "@/components/admin/BlogPostForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <Topbar title="Edit Post" />
      <main className="flex-1 p-6">
        <BlogPostForm
          initial={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            published: post.published,
          }}
        />
      </main>
    </>
  );
}
