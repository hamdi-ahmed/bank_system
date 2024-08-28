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
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";
import PlaidLink from "./PlaidLink";

// ** types
type props = {
  type: string;
};

const AuthForm: React.FC<props> = ({ type }) => {
  // ** router
  const router = useRouter();

  // ** states
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // ** form
  const formSchema = loginFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // ** sign up form & create plaid token

      if (type === "sign-up") {
        const userData = {
          firstName: values.firstName!,
          lastName: values.lastName!,
          address1: values.address1!,
          city: values.city!,
          state: values.state!,
          postalCode: values.postalCode!,
          birthDate: values.birthDate!,
          ssn: values.ssn!,
          email: values.email,
          password: values.password,
        };

        const newUser = await signUp(userData);

        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}</h1>

          <p className="text-normal text-gray-600 text-16">{user ? "Link your account to get started" : "Please enter your details"}</p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput name="firstName" control={form.control} label="First Name" placeholder="ex: Jon" />
                    <CustomInput name="lastName" control={form.control} label="Last Name" placeholder="ex: Doe" />
                  </div>

                  <CustomInput name="address1" control={form.control} label="Address" placeholder="Enter your specific address" />

                  <CustomInput name="city" control={form.control} label="City" placeholder="Enter your specific city" />

                  <div className="flex gap-4">
                    <CustomInput name="state" control={form.control} label="State" placeholder="ex: NY" />
                    <CustomInput name="postalCode" control={form.control} label="Postal Code" placeholder="ex: 11101" />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput name="birthDate" control={form.control} label="Birth Date" placeholder="yyyy-mm-dd" />

                    <CustomInput name="ssn" control={form.control} label="SSN" placeholder="ex: 1234" />
                  </div>
                </>
              )}

              <CustomInput name="email" control={form.control} label="Email" placeholder="Enter your email" />
              <CustomInput name="password" control={form.control} label="Password" placeholder="Enter your password" type="password" />

              <Button className="w-full form-btn text-white" type="submit" disabled={isLoading}>
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
            <p className="font-normal text-14 text-gray-600">{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
            <Link className="form-link" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "Sign up" : "Login"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
