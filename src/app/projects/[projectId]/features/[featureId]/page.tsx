"use client";
import { useFeatureId } from "@/hooks/useFeatureId";

const FeaturePage = () => {
  const featureId = useFeatureId();
  return <div>{featureId}</div>;
};

export default FeaturePage;