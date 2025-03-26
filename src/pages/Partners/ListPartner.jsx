import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPartners,
  deletePartner,
  updatePartner,
} from "../../features/actions/partnerAction";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListPartner = () => {
  const dispatch = useDispatch();
  const { partnerInfo, isLoading, isError } = useSelector(
    (state) => state.partners
  );
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);

  console.log(partnerInfo, "my partners");

  const handleDelete = (partnerId) => {
    dispatch(deletePartner(partnerId)).then(() => {
      dispatch(getAllPartners());
      setSelectedPartner(null);
    });
  };

  const navigate = useNavigate();

  const handleEdit = (partner) => {
    setEditMode(true);
    setTitle(partner.title);
    setSelectedPartner(partner);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePartner({ id: selectedPartner._id, title, image })).then(
      () => {
        dispatch(getAllPartners());
        setEditMode(false);
        setSelectedPartner(null);
        setTitle("");
        setImage(null);
      }
    );
  };

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold text-blue-500">
        Loading...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-lg font-semibold text-red-500">
        Error loading partners
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Partners List</h2>
      {partnerInfo?.length === 0 ? (
        <p className="text-center text-gray-600">No partners added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partnerInfo?.map((partner, index) => (
              <tr key={partner._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={partner.image?.secure_url}
                    alt={partner.title}
                    className="w-16 h-16 object-cover border border-gray-300 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {partner.title}
                </td>
                <td className="border border-gray-300 px-1 py-2 space-x-1">
                  <button
                    onClick={() => setSelectedPartner(partner)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/partners/edit-partner/${partner?._id}`)
                    }
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => {
                setSelectedPartner(null);
                setEditMode(false);
              }}
              className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-center mb-4">
              Partner Details
            </h3>
            {editMode ? (
              <form onSubmit={handleUpdate} className="mt-4 space-y-2 w-full">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={selectedPartner.image?.secure_url}
                  alt={selectedPartner.title}
                  className="w-32 h-32 object-cover  border border-gray-300"
                />
                <p className="text-lg font-medium text-gray-700 mt-2">
                  {selectedPartner.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPartner;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPartners, deletePartner, updatePartner } from "../../features/actions/partnerAction";

// const ListPartner = () => {
//   const dispatch = useDispatch();
//   const { partnerInfo, isLoading, isError } = useSelector((state) => state.partners);
//   const [selectedPartner, setSelectedPartner] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     dispatch(getAllPartners());
//   }, [dispatch]);

//   console.log(partnerInfo, "my partners");

//   const handleDelete = (partnerId) => {
//     dispatch(deletePartner(partnerId)).then(() => {
//       dispatch(getAllPartners());
//       setSelectedPartner(null);
//     });
//   };

//   const handleEdit = (partner) => {
//     setEditMode(true);
//     setTitle(partner.title);
//     setSelectedPartner(partner);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     if (image) formData.append("image", image[0]);

//     console.log(title, image, "form data");
//     // return;
//     dispatch(updatePartner({ id: selectedPartner._id, data: formData })).then(
//       () => {
//         dispatch(getAllPartners());
//         setEditMode(false);
//         setSelectedPartner(null);
//         setTitle("");
//         setImage(null);
//       }
//     );
//   };

//   if (isLoading)
//     return <p className="text-center text-lg font-semibold text-blue-500">Loading...</p>;

//   if (isError)
//     return <p className="text-center text-lg font-semibold text-red-500">Error loading partners</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-4">Partners List</h2>
//       {partnerInfo?.length === 0 ? (
//         <p className="text-center text-gray-600">No partners added yet.</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-1 gap-4">
//           {partnerInfo?.map((partner) => (
//             <li key={partner._id} className="bg-gray-100 shadow-md rounded-lg p-2 flex items-center space-x-4">
//               <img src={partner.image?.secure_url} alt={partner.title} className="w-16 h-16 object-cover border border-gray-300" />
//               <p className="text-lg font-medium text-gray-700">{partner.title}</p>
//               <button onClick={() => setSelectedPartner(partner)} className="px-3 py-1 bg-blue-500 text-white rounded-md">View</button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedPartner && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//             <button onClick={() => { setSelectedPartner(null); setEditMode(false); }} className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
//             <h3 className="text-xl font-bold text-center mb-4">Partner Details</h3>
//             <div className="flex flex-col items-center">
//               <img src={selectedPartner.image?.secure_url} alt={selectedPartner.title} className="w-32 h-32 object-cover rounded-full border border-gray-300" />
//               <p className="text-lg font-medium text-gray-700 mt-2">{selectedPartner.title}</p>

//               {editMode ? (
//                 <form onSubmit={handleUpdate} className="mt-4 space-y-2 w-full">
//                   <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded-lg" />
//                   <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded-lg" />
//                   <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">Save Changes</button>
//                 </form>
//               ) : (
//                 <div className="mt-4 flex space-x-4">
//                   <button onClick={() => handleEdit(selectedPartner)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Edit</button>
//                   <button onClick={() => handleDelete(selectedPartner._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListPartner;
