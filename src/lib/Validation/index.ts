import * as z from "zod";


 export const SignupValidation  = z.object({
  name: z.string().min(2,{message: "Too Short"}),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8,{message: "password must be at less 8 character"}),

});