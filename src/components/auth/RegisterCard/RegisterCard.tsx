import { useEffect } from "react";
import { API_URL } from "@/app.constants";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { getLoginLinkText } from "../auth.helpers";
import { useRegisterForm } from "./RegisterCard.hooks";
import { useGetHealth } from "@/api/axios";

export const RegisterCard = () => {
  const { form, onSubmit } = useRegisterForm();
  const { control, handleSubmit } = form;
  useGetHealth();

  return (
    <Card className="w-1/2 h-full border-none shadow-none text-center p-4">
      <CardHeader className="flex items-center justify-center text-center p-5">
        <CardTitle className="text-2xl">Register Now!</CardTitle>
      </CardHeader>

      <CardContent className="w-full px-10 pb-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="name"
              label="Name"
              control={control}
              type="text"
              placeholder="Enter your name"
            />

            <FormInput
              name="username"
              label="Username"
              control={control}
              type="text"
              placeholder="Enter an unique username"
            />

            <FormInput
              name="email"
              label="Email"
              control={control}
              type="email"
              placeholder="Enter email address"
            />
            <FormInput
              name="password"
              label="Password"
              control={control}
              type="password"
              placeholder="Enter password"
            />
            <Button size="lg" type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
        <p className="pt-7">
          Already have an account?{" "}
          <u className="text-blue-600">{getLoginLinkText()}</u>
        </p>
      </CardContent>
    </Card>
  );
};
