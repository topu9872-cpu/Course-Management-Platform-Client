
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Ring */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-[6px] border-blue-100"></div>

          <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-blue-600 border-r-blue-500 animate-spin"></div>

          <div className="absolute inset-3 rounded-full bg-blue-600 animate-pulse"></div>
        </div>

        {/* Logo */}
        <h1 className="bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-3xl font-bold text-transparent">
          CourseHub
        </h1>

        {/* Text */}
        <p className="text-sm text-gray-500">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}