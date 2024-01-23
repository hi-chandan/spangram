"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SigninValidation } from "@/lib/Validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserAccount } from "@/lib/appwrite/api";
import { appwriteConfig } from "@/lib/appwrite/config";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
export function SigninFrom() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  console.log("This si the isUserLoading", isUserLoading);
  const { mutateAsync: signInAccount } = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({ title: "Sign in failed. Please try again." });
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();

        navigate("/");
        toast({ title: "Login Success" });
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center  flex-col">
        <img src="/assets/images/logo.svg " alt="logosignup" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Login to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter you detail
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-red">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black font-bold"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-red">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black font-bold"
                    placeholder="Enter you password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-gray-950 w-full"
            variant="outline"
          >
            {isUserLoading ? <div className="">Loading...</div> : "Sign-in"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link to="/" className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SigninFrom;
