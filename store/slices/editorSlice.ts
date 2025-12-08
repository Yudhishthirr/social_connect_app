import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTool: null, // "text", "emoji", "draw", "filter"
  elements: [],     // { id, type, value, x, y, scale, rotation }
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setActiveTool: (state, action) => {
      state.activeTool = action.payload;
    },

    addElement: (state, action) => {
      state.elements.push(action.payload);
    },

    updateElement: (state, action) => {
      const { id, data } = action.payload;
      const index = state.elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...data };
      }
    },

    resetEditor: () => initialState,
  },
});

export const {
  setActiveTool,
  addElement,
  updateElement,
  resetEditor
} = editorSlice.actions;

export default editorSlice.reducer;
