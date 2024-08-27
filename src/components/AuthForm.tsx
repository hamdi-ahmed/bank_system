"use client";

// ** imports
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ** forms imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./shared/CustomInput";
import { loginFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// ** types
type props = {
  type: string;
};

const AuthForm: React.FC<props> = ({ type }) => {
  // ** states
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ** form
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          <p className="text-normal text-gray-600 text-16">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput
                name="email"
                control={form.control}
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                name="password"
                control={form.control}
                label="Password"
                placeholder="Enter your password"
              />

              <Button
                className="w-full form-btn text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    &nbsp; Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="font-normal text-14 text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <Link className="form-link" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "sign-up" : "sign-in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
