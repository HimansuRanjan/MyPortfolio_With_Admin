import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    error: null,
    timelines: [],
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
        state.timelines = [];
        state.loading = true;
        state.error = null;
    },
    getAllTimelineSuccess(state, action) {
        state.timelines = action.payload;
        state.loading = false;
        state.error = null;
    },
    getAllTimelineFailed(state, action) {
        state.timelines = state.timelines;
        state.loading = false;
        state.error = action.payload;
    },
    deleteTimelineRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    deleteTimelineSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    deleteTimelineFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    addTimelineRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    addTimelineSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    addTimelineFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    resetTimelineSlice(state, action){
        state.error = null;
        state.timelines = state.timelines;
        state.message = null;
        state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.timelines = state.timelines;
    },
    
  },
});

export const getAllTimelines = () => async (dispatch) => {
    dispatch(timelineSlice.actions.getAllTimelineRequest());
    try {
        const { data } = await axios.get("https://myportfolio-with-admin.onrender.com/api/v1/timeline/getall",
        {
            withCredentials: true
        });

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));    
    }
};

export const deleteTimeline = (id) => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const { data } = await axios.delete(`https://myportfolio-with-admin.onrender.com/api/v1/timeline/delete/${id}`,
        {
            withCredentials: true
        });

    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));    
    }
};

export const addNewTimeline = (timelineDate) => async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {
        const { data } = await axios.post("https://myportfolio-with-admin.onrender.com/api/v1/timeline/add", timelineDate,
        {
            withCredentials: true,
            headers: {'Content-Type': "application/json"}
        });

    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));    
    }
};


export const resetTimelineSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice());
}

export const clearAllTimelineErrors = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
}

export default timelineSlice.reducer;
