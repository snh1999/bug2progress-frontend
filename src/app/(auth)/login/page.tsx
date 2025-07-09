"use client";

import { LoginCard } from "@/components/auth/LoginCard/LoginCard";
import { RequestWrapper } from "@/components/common/RequestWrapper";

const LoginPage = () => {
  return (
    <RequestWrapper>
      <LoginCard />
    </RequestWrapper>
  );
};

export default LoginPage;
