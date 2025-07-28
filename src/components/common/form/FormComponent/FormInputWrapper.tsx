import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../../../ui/form";
import { TFormComponentProps, TFormInputProps } from "@/components/common/form/FormComponent/FormComponent.types";
import { ReactNode } from "react";

type TFormWrapperProps = TFormComponentProps & {
  InputComponent: (props: TFormInputProps) => ReactNode
};

export const FormInputWrapper = ({
  label,
  name,
  placeholder,
  control,
  InputComponent,
  required = false,
  disabled = false
}: TFormWrapperProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className="text-left space-y-0">
          <FormLabel className="font-bold">{label ?? ""}</FormLabel>
          <FormControl>
            <InputComponent {...field} placeholder={placeholder} disabled={disabled} required={required}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};
