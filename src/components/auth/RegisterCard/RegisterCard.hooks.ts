import { z } from "zod";
import { useRegister } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import { useFormHooksWrapper } from "@/components/FormHooksWrapper";
import { TAuthResponse, TRegisterDto } from "@/api/auth/auth.types";
import { toast } from "sonner";
import { LOGIN_PATH } from "@/app.constants";

const registerFormSchema = z.object({
  name: z.string().min(2, "Required"),
  username: z.string().min(0, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Required"),
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
