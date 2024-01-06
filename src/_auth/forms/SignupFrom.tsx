"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignupValidation } from "@/lib/Validation";
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
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
export function SignupFrom() {
  const { toast } = useToast();

  const { mutateAsync: CreateUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isPending: isSigninIn } =
    useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  console.log("this is id", appwriteConfig.url);
  console.log("this is id", appwriteConfig.projectId);
  console.log("this is id", appwriteConfig.databaseId);
  console.log("this is id to storage", appwriteConfig.storageId);
  console.log("this is id", appwriteConfig.userCollectionId);
  console.log("this is id", appwriteConfig.postCollectionId);
  console.log("this is id", appwriteConfig.savesCollectionId);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newUser = await CreateUserAccount(values);
    if (!newUser) {
      return toast({ title: "Sign up failed. please try again" });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center  flex-col">
        <img src="/assets/images/logo.svg " alt="logosignup" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Spangram enter your details
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" text-red">
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black font-bold"
                    placeholder="Enter you name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="text-red">
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-black font-bold"
                    placeholder="Enter your Username"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingAccount ? <div className="">Loading...</div> : "Sign up"}
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default SignupFrom;
