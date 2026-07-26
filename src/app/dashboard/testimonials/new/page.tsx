import Topbar from "@/components/admin/Topbar";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <>
      <Topbar title="New Testimonial" />
      <main className="flex-1 p-6">
        <TestimonialForm />
      </main>
    </>
  );
}
