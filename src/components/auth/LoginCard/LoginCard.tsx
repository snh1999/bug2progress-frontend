import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginForm } from "./LoginCard.hooks";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/FormComponent/FormInput";
import { getRegisterLinkText } from "../auth.helpers";

export const LoginCard = () => {
  const { form, onSubmit } = useLoginForm();
  const { control, handleSubmit } = form;

  return (
    <Card className="w-1/2 h-full border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-5">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>

        <CardContent className="w-2/3 p-7">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <Button size="lg" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <p className="pt-7">
            Do not have an account?{" "}
            <u className="text-blue-600">{getRegisterLinkText()}</u>
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
