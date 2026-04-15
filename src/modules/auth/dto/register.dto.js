import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(50).trim(),
});

export default RegisterSchema;
