import { LoaderIcon } from "lucide-react";
import React from "react";

const LoadingComponent = () => <div className="flex justify-center items-center h-screen">
  <LoaderIcon className="animate-spin"/>
</div>;

export default LoadingComponent;