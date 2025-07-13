import { parseAsBoolean, useQueryState } from "nuqs";

export const useOpenModal = (key: string) => {
  const [isOpen, setIsOpen] = useQueryState(
    key,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    setIsOpen,
  };
};
