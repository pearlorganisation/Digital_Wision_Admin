import { createSlice } from "@reduxjs/toolkit";

import {
  addReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../actions/reviewsAction";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  reviewsInfo: [],
  review: {},
  pagination: {},
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting all reviews
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.reviewsInfo = action.payload;
      })

      // get single review

      .addCase(getSingleReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getSingleReview.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.review = action.payload.data;
      })

      // add review

      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addReview.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })

      // delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.reviewsInfo = state.reviewsInfo.filter(
          (review) => review._id !== action.meta.arg
        );
      })

      // update review

      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.review = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
