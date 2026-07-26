import Topbar from "@/components/admin/Topbar";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <>
      <Topbar title="New Post" />
      <main className="flex-1 p-6">
        <BlogPostForm />
      </main>
    </>
  );
}
