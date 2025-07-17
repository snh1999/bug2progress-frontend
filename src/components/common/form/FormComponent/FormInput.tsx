import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { TFormComponentProps } from "@/components/common/form/FormComponent/FormComponent.types";
import { HTMLInputTypeAttribute } from "react";

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
}: TFormInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="text-left space-y-0">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                required={required}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                required={required}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
