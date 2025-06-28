"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/api/auth/auth";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const useLoginForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate } = useLogin();

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    mutate(values, {
      onSuccess: () => router.push("/"),
      onError: (error) => console.log(error),
    });
  };

  return { form, onSubmit };
};
