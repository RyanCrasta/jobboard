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
      state.allJobs.push(...action.payload.fetchedJobs);
    },
    updateSearchFilter: (state, action) => {
      console.log(action.payload);
      state.filtersSet = action.payload;
    },
    updateFilteredJobs: (state, action) => {
      console.log("updateFilteredJobs", action.payload);
      state.filteredJobs = action.payload.updateFilterArrayResult;
    },
  },
});

export const { updateAllJobs, updateSearchFilter, updateFilteredJobs } =
  jobSlice.actions;
export default jobSlice.reducer;
