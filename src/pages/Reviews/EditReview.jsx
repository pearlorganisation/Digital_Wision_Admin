import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleReview,
  updateReview,
} from "../../features/actions/reviewsAction";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleReview(id));
  }, [dispatch, id]);

  const { review } = useSelector((state) => state.reviews);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (review) {
      reset(review);
    }
  }, [review, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(updateReview({ id: review._id, updatedData: data }));
    setLoading(false);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Edit Review
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-700 font-medium">Comment</label>
            <textarea
              {...register("comment", { required: "Comment is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none h-24"
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium">Rating</label>
            <select
              {...register("rating", { required: "Rating is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {"⭐".repeat(num)}
                </option>
              ))}
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
