import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

export const getAllPartners = createAsyncThunk(
  "get/partners",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/partners`, config);

      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSinglePartner = createAsyncThunk(
  "get-single/partner",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/partners/${id}`, config);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deletePartner = createAsyncThunk(
  "delete/partner",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(`/partners/${id}`, config);

      toast.success("Partner deleted Successfully", {
        position: "top-right",
      });
      return id;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addPartner = createAsyncThunk(
  "team/addPartner",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", userData.image[0]);

      for (const key in userData) {
        if (key !== "image") {
          if (typeof userData[key] === "object" && userData[key] !== null) {
            formData.append(key, JSON.stringify(userData[key]));
          } else {
            formData.append(key, userData[key]);
          }
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.post(`/partners`, formData, {
        config,
      });

      toast.success("Partner created Successfully", { position: "top-right" });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-right" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-right" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePartner = createAsyncThunk(
  "update/Partner",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", updatedData.image[0]);

      for (const key in updatedData) {
        if (key !== "image") {
          if (
            typeof updatedData[key] === "object" &&
            updatedData[key] !== null
          ) {
            formData.append(key, JSON.stringify(updatedData[key]));
          } else {
            formData.append(key, updatedData[key]);
          }
        }
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.patch(
        `/partners/${id}`,
        formData,
        config
      );

      toast.success("Partner updated Successfully", {
        position: "top-right",
      });
      return data; // Return the updated destination
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        return rejectWithValue(error.message);
      }
    }
  }
);
