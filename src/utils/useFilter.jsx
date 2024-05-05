import { useDispatch, useSelector } from "react-redux";
import { updateFilteredJobs } from "./jobSlice";
import { useEffect } from "react";

const useFilter = (isFilterApplied, component) => {
  const dispatch = useDispatch();

  const allJobs = useSelector((jobs) => {
    return jobs.job.allJobs;
  });

  const allFiltersState = useSelector((allfilters) => {
    console.log(allfilters.job.filtersSet);
    return allfilters.job.filtersSet;
  });

  const commonCode = () => {
    let updateFilterArrayResult = allJobs;

    // role filter
    if (allFiltersState.role) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (jobItem.jobRole === allFiltersState.role) {
          return true;
        } else {
          return false;
        }
      });

      updateFilterArrayResult = res;
    }

    // remote filter
    if (allFiltersState.remote) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (jobItem.location === allFiltersState.remote) {
          return true;
        } else {
          return false;
        }
      });
      updateFilterArrayResult = res;
    }

    // min exp filter
    if (allFiltersState.minExp) {
      console.log("+allFiltersState.minExp", +allFiltersState.minExp);
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (jobItem.minExp && jobItem.minExp === +allFiltersState.minExp) {
          return true;
        } else {
          return false;
        }
      });
      updateFilterArrayResult = res;
    }

    dispatch(
      updateFilteredJobs({
        updateFilterArrayResult,
      })
    );

    console.log("CHURCH CHURCH", updateFilterArrayResult);
  };

  if (component === "filterComponent") {
    commonCode();
  }
  useEffect(() => {
    if (isFilterApplied) {
      commonCode();
    }
  }, [allJobs]);
};

export default useFilter;
