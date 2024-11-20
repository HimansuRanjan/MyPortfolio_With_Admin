import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    messages: [],
    message: null,
  },
  reducers: {
    getAllMessageRequest(state, action) {
        state.messages = [];
        state.loading = true;
        state.error = null;
    },
    getAllMessageSuccess(state, action) {
        state.messages = action.payload;
        state.loading = false;
        state.error = null;
    },
    getAllMessageFailed(state, action) {
        state.messages = state.messages;
        state.loading = false;
        state.error = action.payload;
    },
    deleteMessageRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    deleteMessageSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    deleteMessageFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    resetMessageSlice(state, action){
        state.error = null;
        state.messages = state.messages;
        state.message = null;
        state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
    
  },
});

export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessageRequest());
    try {
        const { data } = await axios.get("https://myportfolio-with-admin.onrender.com/api/v1/message/getall",
        {
            withCredentials: true
        });

    dispatch(messageSlice.actions.getAllMessageSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(messageSlice.actions.getAllMessageFailed(error.response.data.message));    
    }
};

export const deleteMessage = (id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest());
    try {
        const { data } = await axios.delete(`https://myportfolio-with-admin.onrender.com/api/v1/message/delete/${id}`,
        {
            withCredentials: true
        });

    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message));    
    }
};

export const resetMessageSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice());
}

export const clearAllMessageErrors = () => (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors());
}

export default messageSlice.reducer;
