import type { HTMLInputTypeAttribute } from "react";
import type { TFormComponentProps } from "@/components/common/form/FormComponent/FormComponent.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";

type TFormInputProps = TFormComponentProps & {
  type?: HTMLInputTypeAttribute;
  textarea?: boolean;
};

export const FormInput = ({
  label = "",
  name,
  placeholder = "",
  type = "text",
  control,
  required = false,
  textarea = false,
  disabled = false,
}: TFormInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="text-left space-y-0">
          <FormLabel className="font-bold py-3">{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
