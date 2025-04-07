import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  isOpened: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsOpened(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
  },
});

export const { setIsOpened } = appSlice.actions;
export default appSlice.reducer;
export const getIsOpened = (state: { app: { isOpened: boolean } }): boolean => state.app.isOpened;
