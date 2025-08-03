import { useParams } from "next/navigation";

export const useTicketId = () => {
  const params = useParams();
  return params.ticketId as string;
};
