import { createSlice, current } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    filteredJobs: [], // updating this array when filters are set
    filtersSet: {
      minExp: false,
      companyName: false,
      location: false,
      remote: false,
      techStack: false,
      role: false,
      minBasePay: false,
    },
  },
  reducers: {
    updateAllJobs: (state, action) => {
      // updating all jobs found array
      //state.allJobs.push([]); // emptying so that
      state.allJobs.push(...action.payload.fetchedJobs);
      console.log("action.payload", action.payload);
    },
  },
});

export const { updateAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
