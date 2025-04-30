import { env } from "@/env";
import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { z } from "zod";
import { r2 } from "./client";

const uploadLinkToStorageInput = z.object({
  folder: z.enum(["downloads"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadLinkToStorageInput = z.input<typeof uploadLinkToStorageInput>;

export async function uploadFileToStorage(input: UploadLinkToStorageInput) {
  const { folder, fileName, contentType, contentStream } =
    uploadLinkToStorageInput.parse(input);

  const fileNameWithoutExtension = basename(fileName);
  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(".csv");

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
