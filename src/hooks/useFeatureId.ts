import { useParams } from "next/navigation";

export const useFeatureId = () => {
  const params = useParams();
  return params.featureId as string;
}