import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addPartner, getAllPartners } from "../../features/actions/partnerAction";

const AddPartner = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (!data.image?.[0]) {
      alert("Please select an image");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);

    dispatch(addPartner(formData))
      .then(() => {
        dispatch(getAllPartners());
        reset();
      })
      .catch((error) => {
        console.error("Error adding partner:", error);
        alert("Failed to add partner. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Partner</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: true })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPartner;
