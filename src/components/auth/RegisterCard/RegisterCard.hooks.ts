import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/api/auth/auth";

const registerFormSchema = z.object({
  name: z.string().min(2, "Required"),
  username: z.string().min(0, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Required"),
});

export const useRegisterForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate } = useRegister();

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    mutate(values);
  };

  return { form, onSubmit };
};
