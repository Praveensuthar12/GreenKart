import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";

const Loader = () => {
  const { navigate } = useAppContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const next = searchParams.get("next");
    if (next) {
      setTimeout(() => {
        navigate(`/${next}`);
      }, 2000);
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-100 rounded-full" />
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute inset-0" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-base font-semibold text-gray-900">Processing your order</p>
        <p className="text-sm text-gray-400 mt-1">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default Loader;
