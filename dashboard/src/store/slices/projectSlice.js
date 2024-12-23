import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    error: null,
    projects: [],
    message: null,
  },
  reducers: {
    getAllProjectRequest(state, action) {
        state.projects = [];
        state.loading = true;
        state.error = null;
    },
    getAllProjectSuccess(state, action) {
        state.projects = action.payload;
        state.loading = false;
        state.error = null;
    },
    getAllProjectFailed(state, action) {
        state.projects = state.projects;
        state.loading = false;
        state.error = action.payload;
    },
    deleteProjectRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    deleteProjectSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    deleteProjectFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    updateProjectRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    updateProjectSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    updateProjectFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    addProjectRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    addProjectSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    addProjectFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    resetProjectSlice(state, action){
        state.error = null;
        state.projects = state.projects;
        state.message = null;
        state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.projects = state.projects;
    },
    
  },
});

export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectRequest());
    try {
        const { data } = await axios.get("https://myportfolio-with-admin.onrender.com/api/v1/project/getall",
        {
            withCredentials: true
        });

    dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));    
    }
};

export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const { data } = await axios.delete(`https://myportfolio-with-admin.onrender.com/api/v1/project/delete/${id}`,
        {
            withCredentials: true
        });

    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message));    
    }
};

export const updateProject = (id, updatedData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const { data } = await axios.put(`https://myportfolio-with-admin.onrender.com/api/v1/project/update/${id}`,updatedData,
        {
            withCredentials: true,
            headers: {'Content-Type': 'multipart/form-data'}
        });

    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));    
    }
};

export const addNewProject = (projectDate) => async (dispatch) => {
    dispatch(projectSlice.actions.addProjectRequest());
    try {
        const { data } = await axios.post("https://myportfolio-with-admin.onrender.com/api/v1/project/add", projectDate,
        {
            withCredentials: true,
            headers: {'Content-Type': "multipart/form-data"}
        });

    dispatch(projectSlice.actions.addProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(projectSlice.actions.addProjectFailed(error.response.data.message));    
    }
};


export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
}

export const clearAllProjectErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
}

export default projectSlice.reducer;
