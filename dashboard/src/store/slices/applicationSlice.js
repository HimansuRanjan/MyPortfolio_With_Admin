import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    error: null,
    applications: [],
    message: null,
  },
  reducers: {
    getAllApplicationRequest(state, action) {
        state.applications = [];
        state.loading = true;
        state.error = null;
    },
    getAllApplicationSuccess(state, action) {
        state.applications = action.payload;
        state.loading = false;
        state.error = null;
    },
    getAllApplicationFailed(state, action) {
        state.applications = state.applications;
        state.loading = false;
        state.error = action.payload;
    },
    deleteApplicationRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    deleteApplicationSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    deleteApplicationFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    addApplicationRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    addApplicationSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    addApplicationFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    resetApplicationSlice(state, action){
        state.error = null;
        state.applications = state.applications;
        state.message = null;
        state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications;
    },
    
  },
});

export const getAllApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationRequest());
    try {
        const { data } = await axios.get("https://myportfolio-with-admin.onrender.com/api/v1/softwareapps/getall",
        {
            withCredentials: true
        });

    dispatch(applicationSlice.actions.getAllApplicationSuccess(data.softwareApps));
    dispatch(applicationSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(applicationSlice.actions.getAllApplicationFailed(error.response.data.message));    
    }
};

export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationRequest());
    try {
        const { data } = await axios.delete(`https://myportfolio-with-admin.onrender.com/api/v1/softwareapps/delete/${id}`,
        {
            withCredentials: true
        });

    dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(applicationSlice.actions.deleteApplicationFailed(error.response.data.message));    
    }
};

export const addNewApplication = (applicationDate) => async (dispatch) => {
    dispatch(applicationSlice.actions.addApplicationRequest());
    try {
        const { data } = await axios.post("https://myportfolio-with-admin.onrender.com/api/v1/softwareapps/add", applicationDate,
        {
            withCredentials: true,
            headers: {'Content-Type': "multipart/form-data"}
        });

    dispatch(applicationSlice.actions.addApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(applicationSlice.actions.addApplicationFailed(error.response.data.message));    
    }
};


export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
}

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
}

export default applicationSlice.reducer;
