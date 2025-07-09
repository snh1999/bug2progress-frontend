"use client";
import {z} from "zod";
import {useLogin} from "@/api/auth/auth";
import {useRouter} from "next/navigation";
import {useFormHooksWrapper} from "@/components/FormHooksWrapper";
import {TAuthResponse, TLoginDto} from "@/api/auth/auth.types";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const useLoginForm = () => {
  const router = useRouter();
  const onSuccess = () => {
    router.push("/")
    console.log("Logged in successfully")
  };
  const onError = (error: any) => console.log(error);

  return useFormHooksWrapper<TLoginDto, TAuthResponse>({
    formSchema: loginFormSchema,
    useFormMutation: useLogin,
    defaultValues: {
      email: "",
      password: "",
    },
    onSuccess,
    onError,
  });
};
