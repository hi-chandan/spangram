import * as z from "zod";


 export const SignupValidation  = z.object({
  name: z.string().min(2,{message: "Too Short"}),
   username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(40),
  email: z.string().email(),
  password: z.string().min(8,{message: "password must be at less 8 character"}),

});

 export const SigninValidation  = z.object({

  email: z.string().email(),
  password: z.string().min(8,{message: "password must be at less 8 character"}),

});