"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
// import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signUpEmailAction } from "@/actions/sign-up-email.action";

export const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evnt: React.FormEvent<HTMLFormElement>) {
    evnt.preventDefault();

    setIsPending(true); // for server action

    const formData = new FormData(evnt.target as HTMLFormElement);

    const { error } = await signUpEmailAction(formData);

    if (error) {
      toast.error(error);

      setIsPending(false); // for server action
    } else {
      toast.success("Registration complete. You are all set.");
      router.push("/auth/login");
      // router.push("/profile");
    }

    // const name = String(formData.get("name"));
    // if (!name) return toast.error("Please enter your name");

    // const email = String(formData.get("email"));
    // if (!email) return toast.error("Please enter your email");

    // const password = String(formData.get("password"));
    // if (!password) return toast.error("Please enter your password");

    // console.log({ name, email, password });
    // await signUp.email(
    //   {
    //     name,
    //     email,
    //     password,
    //   },
    //   {
    //     onRequest: () => {
    //       setIsPending(true);
    //     },
    //     onResponse: () => {
    //       setIsPending(false);
    //     },
    //     onError: (ctx) => {
    //       toast.error(ctx.error.message);
    //     },
    //     onSuccess: () => {
    //       toast.success("Registration complete. You are all set.");
    //       // router.push("/auth/login");
    //       router.push("/profile");
    //     },
    //   }
    // );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passeord">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        Register
      </Button>
    </form>
  );
};
