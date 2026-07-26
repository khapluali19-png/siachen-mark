import Topbar from "@/components/admin/Topbar";
import MediaUploader from "@/components/admin/MediaUploader";

export default function MediaUploadPage() {
  return (
    <>
      <Topbar title="Upload Media" />
      <main className="flex-1 p-6 max-w-2xl">
        <MediaUploader />
      </main>
    </>
  );
}
