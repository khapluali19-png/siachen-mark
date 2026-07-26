import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 20 },
    pdf:   { maxFileSize: "16MB", maxFileCount: 5 },
    "application/octet-stream": { maxFileSize: "4MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      await db.mediaFile.create({
        data: {
          name: file.name,
          url:  file.ufsUrl,
          key:  file.key,
          size: file.size,
          type: file.type,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
