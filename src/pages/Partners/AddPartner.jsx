import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPartner, getAllPartners } from "../../features/actions/partnerAction";

const AddPartner = () => {
  const dispatch = useDispatch();
  const [partnerData, setPartnerData] = useState({
    title: "",
    image: null 
});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {

    console.log("12123123",e.target.files[0]);
    setPartnerData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!partnerData.image) {
      alert("Please select an image");
      return;
    }

    setIsSubmitting(true);

    dispatch(addPartner(partnerData)).then(() => {
      dispatch(getAllPartners());
      setPartnerData({ title: "", image: null });
      setIsSubmitting(false);
    });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-28 mt-10 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={partnerData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Partner"}
        </button>
      </form>
    </div>
  );
};

export default AddPartner;

