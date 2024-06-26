import { createSlice } from "@reduxjs/toolkit";

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
      role: false,
      minBasePay: false,
    },
    totalAvailableJobs: 0,
  },
  reducers: {
    updateAllJobs: (state, action) => {
      // updating all jobs found array
      state.allJobs.push(...action.payload.fetchedJobs);
    },
    updateSearchFilter: (state, action) => {
      // updating search criteria
      state.filtersSet = action.payload;
    },
    updateFilteredJobs: (state, action) => {
      // updating filtered job array based on search criteria
      state.filteredJobs = action.payload.updateFilterArrayResult;
    },
    updateNumberOfAvailableJobs: (state, action) => {
      state.totalAvailableJobs = action.payload.nosOfJobs;
    },
  },
});

export const {
  updateAllJobs,
  updateSearchFilter,
  updateFilteredJobs,
  updateNumberOfAvailableJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
