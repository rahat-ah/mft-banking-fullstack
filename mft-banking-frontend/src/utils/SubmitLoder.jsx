import {useEffect} from "react";

function SubmitLoder({ isOpen}) {
    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred, darkened background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Loader Card */}
      <div
        className="relative bg-linear-to-br from-blue-400 via-orange-400 to-blue-500 
                      rounded-2xl p-8 flex flex-col items-center justify-center 
                      shadow-2xl animate-fadeIn w-64 h-64"
      >
        {/* Spinner */}
        <div className="w-20 h-20 border-8 border-t-blue-600 border-b-orange-400 border-l-blue-500 border-r-orange-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default SubmitLoder;
