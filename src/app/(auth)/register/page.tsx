"use client";

import { RegisterCard } from "@/components/auth/RegisterCard/RegisterCard";
import { RequestWrapper } from "@/components/common/RequestWrapper";

const RegisterPage = () => {
  return (
    <RequestWrapper>
      <RegisterCard />
    </RequestWrapper>
  );
};

export default RegisterPage;
