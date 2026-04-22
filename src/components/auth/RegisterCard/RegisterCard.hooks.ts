import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useRegister } from "@/api/auth/auth";
import type { TAuthResponse, TRegisterDto } from "@/api/auth/auth.types";
import { LOGIN_PATH } from "@/app.constants";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";

const registerFormSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  username: z.string().min(2, "Username must contain at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const useRegisterForm = () => {
  const router = useRouter();

  return useFormHooksWrapper<TRegisterDto, TAuthResponse>({
    formSchema: registerFormSchema,
    useFormMutation: useRegister,
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSuccess: () => {
      router.push(LOGIN_PATH);
      toast.success("Registered successfully, redirecting to login page");
    },
    onError: (error: any) => toast.error(error),
  });
};
