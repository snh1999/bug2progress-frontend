"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useLogin } from "@/api/auth/auth";
import type { TAuthResponse, TLoginDto } from "@/api/auth/auth.types";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const useLoginForm = () => {
  const router = useRouter();

  return useFormHooksWrapper<TLoginDto, TAuthResponse>({
    formSchema: loginFormSchema,
    useFormMutation: useLogin,
    defaultValues: {
      email: "",
      password: "",
    },
    onSuccess: () => {
      router.push("/");
      toast.success("Logged in successfully");
    },
  });
};
