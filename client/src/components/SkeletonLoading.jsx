const SkeletonLoader = () => (
  <div className="p-6 w-full">
    <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      Contest Tracker
    </h1>

    {/* Filter & Logout Skeleton */}
    <div className="flex justify-between mb-4">
      <div className="w-32 h-10 bg-gray-700 rounded animate-pulse"></div>
      <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
    </div>

    {/* Upcoming Contests Skeleton */}
    <h2 className="text-xl sm:text-2xl font-semibold text-white border-b border-gray-600 pb-2">
      Upcoming Contests
    </h2>
    <div className="text-sm sm:text-[16px] overflow-x-auto mt-4 bg-gray-800 shadow-lg rounded-lg p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-700 rounded mb-2 animate-pulse"
        ></div>
      ))}
    </div>

    {/* Past Contests Skeleton */}
    <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2 mt-8">
      Past Contests
    </h2>
    <div className="overflow-x-auto mt-4 bg-gray-800 shadow-lg rounded-lg p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-700 rounded mb-2 animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
