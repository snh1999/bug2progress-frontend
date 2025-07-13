"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { TFormComponentProps } from "@/components/common/form/FormComponent/FormComponent.types.ts.tsx";

type TFormSelectProps = TFormComponentProps & {
  options: string[];
};

export function FormSelect({
  label = "",
  name,
  placeholder = "",
  control,
  required = false,
  options,
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
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
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
