type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: unknown;
};

export const ComponentRequestWrapper = ({
  children,
  isLoading,
  error,
}: Props) => {
  if (isLoading) <>Loading</>;
  if (error) <>Error</>;
  return <>{children}</>;
};
