import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSinglePartner,
  updatePartner,
} from "../../features/actions/partnerAction";

const EditPartner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { partner } = useSelector((state) => state.partners);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getSinglePartner(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (partner) {
      reset({
        title: partner.title || "",
      });
      if (partner.image) {
        setImagePreview(partner?.image.secure_url);
      }
    }
  }, [partner, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(updatePartner({ id: partner._id, updatedData: data }));
    setLoading(false);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-8">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Edit Partner
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium text-gray-700">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-md mt-2"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Edit Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPartner;
