import { Control } from "react-hook-form";

export type TFormComponentProps = {
  name: string;
  label?: string;
  placeholder?: string;
  control?: Control<any>;
  required?: boolean;
  disabled?: boolean;
};


export type TFormInputProps = {
  value?: Date
  onChange: (date: Date) => void,
  placeholder?: string,
  className?: string,
  required?: boolean;
  disabled?: boolean;
}