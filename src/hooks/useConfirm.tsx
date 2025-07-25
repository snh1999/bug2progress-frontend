import { ReactNode, useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

type TUseConfirm = { title: string, message: string, variant?: ButtonProps["variant"], onConfirm?: () => void };

export const useConfirm = ({
    title,
    message,
    variant,
    onConfirm
  }: TUseConfirm
): [() => ReactNode, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({resolve});
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    if(onConfirm) onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
            <Button onClick={handleCancel} variant="outline" className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant={variant} className="w-full lg:w-auto">
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm];
};
