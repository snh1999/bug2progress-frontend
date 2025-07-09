import {ReactNode} from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  error?: unknown;
};

export const RequestWrapper = ({
  children,
  isLoading,
  error,
}: Props) => {
  console.log(isLoading, error);
  if (isLoading) <>Loading</>;
  if (error) <>Error</>;
  return <>{children}</>;
};
