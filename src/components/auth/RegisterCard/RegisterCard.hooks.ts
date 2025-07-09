import {z} from "zod";
import {useRegister} from "@/api/auth/auth";
import {useRouter} from "next/navigation";
import {useFormHooksWrapper} from "@/components/FormHooksWrapper";
import {TAuthResponse, TRegisterDto} from "@/api/auth/auth.types";

const registerFormSchema = z.object({
  name: z.string().min(2, "Required"),
  username: z.string().min(0, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Required"),
});

export const useRegisterForm = () => {


  const router = useRouter();
  const onSuccess= () => {
      router.push("/login");
      console.log("successfully registered, redirecting to login page");
    }
    const onError = (error: any) => console.log(error);

  return useFormHooksWrapper<TRegisterDto, TAuthResponse>({
    formSchema: registerFormSchema,
    useFormMutation: useRegister,
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSuccess,
    onError,
  });
};
