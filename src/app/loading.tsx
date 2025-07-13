import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoaderIcon className="mx-auto mt-10 animate-spin"/>
    </div>
  );
};

export default Loading;