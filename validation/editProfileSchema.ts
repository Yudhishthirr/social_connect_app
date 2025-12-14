import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  bio: z
    .string()
    .max(150, "Bio must be less than 150 characters")
    .optional(),

  avatar: z
    .string()
    .url("Invalid image URL")
    .optional(),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
