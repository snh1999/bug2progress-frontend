import { DefaultValues, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

type TUseFormWrapperArgs<TDto, TData> = {
  formSchema: z.ZodType<TDto>;
  useFormMutation: () => UseMutationResult<TData, Error, TDto, unknown>;
  defaultValues: DefaultValues<TDto> | undefined,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
}

export const useFormHooksWrapper = <TDto extends FieldValues, TData>({
  formSchema,
  useFormMutation,
  defaultValues,
  onSuccess,
  onError
}: TUseFormWrapperArgs<TDto, TData>) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const {mutate, isPending, isError, error} = useFormMutation();

  const onSubmit: SubmitHandler<TDto> = (values) => {
    mutate(values, {
      onSuccess: onSuccess ? onSuccess : () => toast.success("Request performed successfully"),
      onError: onError ? onError : (error) => toast.error(error?.message ?? "Failed to perform request"),
    });
  };

  return {form, onSubmit, isPending, isError, error};
};
