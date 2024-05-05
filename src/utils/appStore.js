import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";

// gives store of react app
const appStore = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export default appStore;
