import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteReview,
  getAllReviews,
} from "../../features/actions/reviewsAction";

const ListReview = () => {
  const dispatch = useDispatch();
  const { reviewsInfo } = useSelector((state) => state.reviews);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedReview) {
      dispatch(deleteReview(selectedReview._id));
      setShowModal(false);
      setSelectedReview(null);
    }
  };

  console.log(reviewsInfo, "reviewsInfo");

  return (
    <div className="px-6 max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Reviews List</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Review</th>
              <th className="p-3"> Rating</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reviewsInfo) &&
              reviewsInfo.map((item, index) => (
                <tr
                  key={item._id}
                  className="text-center bg-white dark:bg-gray-700 odd:bg-gray-100 dark:odd:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{item.comment}</td>
                  <td className="p-3">{item.rating}</td>

                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/reviews/view-review/${item._id}`, {
                          state: { review: item },
                        })
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/reviews/edit-review/${item._id}`)
                      }
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedReview(item);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to delete{" "}
              <span className="text-red-500">{selectedReview.name}</span>?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListReview;
