import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(50).trim(),
});

export default LoginSchema;
