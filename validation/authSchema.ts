// src/validation/authSchema.ts
import { z } from "zod";

// export const registerSchema = z.object({
//   fullName: z.string().min(3, "Full name must be at least 3 characters"),
//   email: z.string().email("Invalid email format"),
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(4, "Password must be at least 6 characters"),
// });



// Main registration schema
export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Please select your gender"),
  profileImage: z.string().optional(),
});

// Step-specific schemas derived from the main schema
export const step1Schema = registerSchema.pick({
  fullName: true,
  username: true,
  email: true,
});

export const step2Schema = registerSchema.pick({
  password: true,
});

export const step3Schema = registerSchema.pick({
  gender: true,
});

// Type inference for TypeScript
export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;