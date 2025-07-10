"use client";
import { z } from "zod";
import { useLogin } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import { useFormHooksWrapper } from "@/components/FormHooksWrapper";
import { TAuthResponse, TLoginDto } from "@/api/auth/auth.types";
import { toast } from "sonner";

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
    onError: (error: any) => toast.error(error.message ?? "Failed to login"),
  });
};
