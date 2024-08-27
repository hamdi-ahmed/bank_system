import React from "react";

// ** components
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { loginFormSchema } from "@/lib/utils";
import { z } from "zod";

//
const formSchema = loginFormSchema("sign-up");

// ** types
type props = {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
  type?: string;
};

const CustomInput: React.FC<props> = ({ control, label, name, placeholder, type }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>

          <div className="flex flex-col w-full">
            <FormControl>
              <Input className="input-class" placeholder={placeholder} type={type} {...field} />
            </FormControl>

            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
