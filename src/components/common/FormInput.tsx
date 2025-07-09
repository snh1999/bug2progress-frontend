import {Control} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "../ui/form";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {HTMLInputTypeAttribute} from "react";

type TFormFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  control?: Control<any>;
  required?: boolean;
  textarea?: boolean
};

export const FormInput = ({
  label = "",
  name,
  placeholder = "",
  type = "text",
  control,
  required = false,
  textarea = false
}: TFormFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className="text-left space-y-0">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            {textarea ? <Textarea {...field} placeholder={placeholder} required={required}/> :
              <Input {...field} type={type} placeholder={placeholder} required={required}/>}
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};
