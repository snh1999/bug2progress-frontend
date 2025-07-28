"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { TFormComponentProps } from "@/components/common/form/FormComponent/FormComponent.types";

type TOptions = {
  value: string;
  label: string;
}
type TFormSelectProps = TFormComponentProps & {
  options: TOptions[];
};

export function FormSelect({
  label = "",
  name,
  placeholder = "",
  control,
  options,
  required = false,
  disabled = false
}: TFormSelectProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="text-left space-y-0">
          <FormLabel className="font-bold">{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            required={required}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({label, value}) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
