// src/validation/postSchema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  hashtags: z
    .string()
    .min(1, "At least one hashtag is required")
    .regex(
      /^[a-zA-Z0-9,#\s]+$/,
      "Hashtags can include letters, numbers, commas, and #"
    ),

  // Image cannot be validated by Zod directly since it's a file,
  // so just validate that the user selects an image URL path.
  postImage: z
    .string()
    .min(1, "Post image is required"),
});

export type PostSchemaType = z.infer<typeof postSchema>;
