import { useLocation } from "react-router-dom";

const ViewReview = () => {
  const location = useLocation();
  const { review } = location.state || {};

  if (!review) {
    return (
      <div className="text-center text-red-500 font-semibold text-lg mt-10">
        Review item not found!
      </div>
    );
  }

  console.log(review, "mera review");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-black">{review.name}</h2>
          <p className="text-lg text-gray-700 text-center mt-3 italic">
            "{review.comment}"
          </p>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-xl font-semibold text-gray-700 uppercase tracking-wide">
            Rating
          </h1>
          <div className="text-2xl font-bold text-yellow-400 mt-2 space-x-1">
            {Array.from({ length: review.rating }, (_, i) => (
              <span key={i} className="animate-pulse">
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
