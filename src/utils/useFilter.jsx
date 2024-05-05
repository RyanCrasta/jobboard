import { useDispatch, useSelector } from "react-redux";
import { updateFilteredJobs } from "./jobSlice";
import { useEffect } from "react";

const useFilter = (isFilterApplied, component) => {
  const dispatch = useDispatch();

  const allJobs = useSelector((jobs) => {
    return jobs.job.allJobs;
  });

  const allFiltersState = useSelector((allfilters) => {
    return allfilters.job.filtersSet;
  });

  const commonCode = () => {
    let updateFilterArrayResult = allJobs;
    // role filter
    if (allFiltersState.role.length > 0) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        return allFiltersState.role.some((ele) => {
          if (jobItem.jobRole === ele) {
            return true;
          } else {
            return false;
          }
        });
      });

      updateFilterArrayResult = res;
    }

    // remote filter
    if (allFiltersState.remote.length > 0) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        return allFiltersState.remote.some((ele) => {
          if (jobItem.location === ele) {
            return true;
          } else if (
            ele === "inoffice" &&
            jobItem.location &&
            jobItem.location !== "remote"
          ) {
            return true;
          } else {
            return false;
          }
        });
      });
      updateFilterArrayResult = res;
    }

    // min exp filter
    if (allFiltersState.minExp.length > 0) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        return allFiltersState.minExp.some((exp) => {
          if (
            jobItem.minExp &&
            jobItem.minExp <= +exp &&
            jobItem.maxExp &&
            jobItem.maxExp >= +exp
          ) {
            // eg if from dropdown min exp = 3 then I would also show job posting that has exp
            // requirement from 1-5, since candidate would be eligible for that job opening
            return true;
          } else {
            return false;
          }
        });
      });
      updateFilterArrayResult = res;
    }

    // location filter
    if (allFiltersState.location) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (
          jobItem.location
            .toLowerCase()
            .includes(allFiltersState.location.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      updateFilterArrayResult = res;
    }

    // company name filter
    if (allFiltersState.companyName) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (
          jobItem.companyName
            .toLowerCase()
            .includes(allFiltersState.companyName.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      updateFilterArrayResult = res;
    }

    // minimum base pay filter
    if (allFiltersState.minBasePay.length > 0) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        return allFiltersState.minBasePay.some((minBaseSalary) => {
          if (
            jobItem.minJdSalary &&
            jobItem.minJdSalary >= +minBaseSalary.split("L")[0]
          ) {
            return true;
          } else {
            return false;
          }
        });
      });
      updateFilterArrayResult = res;
    }

    dispatch(
      updateFilteredJobs({
        updateFilterArrayResult,
      })
    );
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
