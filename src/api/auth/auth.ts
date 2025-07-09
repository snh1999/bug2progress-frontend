import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TAuthResponse, TLoginDto, TRegisterDto } from "./auth.types";
import { api } from "../axios";
import { setAuthCookie } from "@/components/auth/auth.actions";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  return useMutation<TAuthResponse, Error, TLoginDto>({
    mutationFn: async (credentials: TLoginDto) => {
      const response = await api.post("/login", credentials);
      const token = response.data.data.token;
      if (token) {
        await setAuthCookie(token);
      }
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation<TAuthResponse, Error, TRegisterDto>({
    mutationFn: async (registerDto: TLoginDto) => {
      const response = await api.post("/register", registerDto);
      return response.data;
    },
  });
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<unknown, Error>({
    mutationFn: async () => {
      await setAuthCookie("");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.refresh();
    },
  });
};
