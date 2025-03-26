// AddPartner.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPartner, getAllPartners } from "../../features/actions/partnerAction";

const AddPartner = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      alert("Please select an image");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    dispatch(addPartner({title, image})).then(() => {
      dispatch(getAllPartners()); 
      setTitle(""); 
      setImage(null); 
      setIsSubmitting(false);
    });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-28 mt-10 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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
