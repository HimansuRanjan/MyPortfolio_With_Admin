import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    error: null,
    skills: [],
    message: null,
  },
  reducers: {
    getAllSkillRequest(state, action) {
        state.skills = [];
        state.loading = true;
        state.error = null;
    },
    getAllSkillSuccess(state, action) {
        state.skills = action.payload;
        state.loading = false;
        state.error = null;
    },
    getAllSkillFailed(state, action) {
        state.skills = state.Skills;
        state.loading = false;
        state.error = action.payload;
    },
    deleteSkillRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    deleteSkillSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    deleteSkillFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    updateSkillRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    updateSkillSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    updateSkillFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    addSkillRequest(state, action) {
        state.message = null;
        state.loading = true;
        state.error = null;
    },
    addSkillSuccess(state, action) {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
    },
    addSkillFailed(state, action) {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
    },
    resetSkillSlice(state, action){
        state.error = null;
        state.skills = state.skills;
        state.message = null;
        state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.skills = state.skills;
    },
    
  },
});

export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSkillRequest());
    try {
        const { data } = await axios.get("https://myportfolio-with-admin.onrender.com/api/v1/skills/getall",
        {
            withCredentials: true
        });

    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));    
    }
};

export const deleteSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const { data } = await axios.delete(`https://myportfolio-with-admin.onrender.com/api/v1/skills/delete/${id}`,
        {
            withCredentials: true
        });

    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));    
    }
};

export const updateSkill = (id, proficiency) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillFailed());
    try {
        const { data } = await axios.put(`https://myportfolio-with-admin.onrender.com/api/v1/skills/update/${id}`, {proficiency},
        {
            withCredentials: true,
            headers: {"Content-Type": 'application/json'}
        });

    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));    
    }
};

export const addNewSkill = (skillDate) => async (dispatch) => {
    dispatch(skillSlice.actions.addSkillRequest());
    try {
        const { data } = await axios.post("https://myportfolio-with-admin.onrender.com/api/v1/skills/add", skillDate,
        {
            withCredentials: true,
            headers: {'Content-Type': "multipart/form-data"}
        });

    dispatch(skillSlice.actions.addSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());  
    } catch (error) {
    dispatch(skillSlice.actions.addSkillFailed(error.response.data.message));    
    }
};


export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
}

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
}

export default skillSlice.reducer;
