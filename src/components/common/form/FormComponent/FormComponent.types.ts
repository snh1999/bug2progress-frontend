import { Control } from "react-hook-form";

export type TFormComponentProps = {
  name: string;
  label?: string;
  placeholder?: string;
  control?: Control<any>;
  required?: boolean;
  disabled?: boolean;
};
