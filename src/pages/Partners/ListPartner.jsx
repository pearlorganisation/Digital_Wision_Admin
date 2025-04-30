import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPartners,
  deletePartner,
} from "../../features/actions/partnerAction";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListPartner = () => {
  const dispatch = useDispatch();
  const { partnerInfo, isLoading, isError } = useSelector(
    (state) => state.partners
  );

  const [state, setState] = useState({
    selectedPartner: null,
    showDeleteConfirm: false,
    deletePartnerId: null,
    editMode: false,
    title: "",
    image: null,
  });

  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);

  const handleDeleteClick = (partnerId) => {
    setState((prevState) => ({
      ...prevState,
      showDeleteConfirm: true,
      deletePartnerId: partnerId,
    }));
  };

  const navigate = useNavigate();

  const confirmDelete = () => {
    dispatch(deletePartner(state.deletePartnerId)).then(() => {
      dispatch(getAllPartners());
      setState((prevState) => ({
        ...prevState,
        showDeleteConfirm: false,
        deletePartnerId: null,
      }));
    });
  };

  const handleView = (partner) => {
    setState((prevState) => ({ ...prevState, selectedPartner: partner }));
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
                    src={partner?.image?.secure_url}
                    alt={partner?.title}
                    className="w-16 h-16 object-cover border border-gray-300 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {partner?.title}
                </td>
                <td className="border border-gray-300 px-1 py-2 space-x-1">
                  <button
                    onClick={() => handleView(partner)}
                    className="px-3 py-1 text-blue-500 bg-gray-100 rounded-full"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/partners/edit-partner/${partner?._id}`)
                    }
                    className="px-3 py-1 bg-gray-100 text-green-700 rounded-full"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(partner?._id)}
                    className="px-3 py-1 bg-gray-100 text-red-500 rounded-full"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Partner Popup */}
      {state.selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  selectedPartner: null,
                }))
              }
              className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-center mb-4">
              Partner Details
            </h3>
            <img
              src={state.selectedPartner.image?.secure_url}
              alt={state.selectedPartner.title}
              className="w-32 h-32 object-cover border border-gray-300 mx-auto"
            />
            <p className="text-lg font-medium text-gray-700 mt-2 text-center">
              {state.selectedPartner.title}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {state.showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h3 className="text-xl font-bold text-center mb-4">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    showDeleteConfirm: false,
                  }))
                }
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPartner;
