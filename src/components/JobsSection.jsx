import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JOB_SEARCH_URL from "../constants/jobSearchURL";
import { updateAllJobs, updateFilteredJobs } from "../utils/jobSlice";
import styles from "../styles/JobsSection.module.css";
import { useState } from "react";
import JobCard from "./JobCard";
import useFilter from "../utils/useFilter";

const JobsSection = () => {
  const [pageIndex, setPageIndex] = useState(0); // for infinte scroll
  const dispatch = useDispatch();
  const [noMoreJobsAvailable, setNoMoreJobsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 12,
      offset: pageIndex,
    });

    const fetchJobDetails = async () => {
      const response = await fetch(JOB_SEARCH_URL, {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      if (data.totalCount <= pageIndex) {
        setNoMoreJobsAvailable(true);
        setLoading(false);
      } else {
        dispatch(
          updateAllJobs({
            fetchedJobs: data.jdList,
          })
        );
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [pageIndex]);

  const allJobs = useSelector((jobs) => {
    return jobs.job.allJobs;
  });

  const allFilteredJobs = useSelector((filteredJob) => {
    return filteredJob.job.filteredJobs;
  });

  const allFiltersState = useSelector((allfilters) => {
    console.log(allfilters.job.filtersSet);
    return allfilters.job.filtersSet;
  });

  const handleScroll = () => {
    console.log("handleScrollhandleScroll");
    // to know when scroll has reached bottom of page
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      setLoading(true);

      setPageIndex((prevPageIndex) => {
        return prevPageIndex + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const isFilteredApplied = () => {
    if (
      !allFiltersState.companyName &&
      !allFiltersState.location &&
      !allFiltersState.minBasePay.length > 0 &&
      !allFiltersState.minExp.length > 0 &&
      !allFiltersState.remote.length > 0 &&
      !allFiltersState.role.length > 0 &&
      !allFiltersState.techStack
    ) {
      return true;
    } else {
      return false;
    }
  };

  console.log("allFilteredJobsallFilteredJobs", allFilteredJobs);

  //   useEffect(() => {
  //     if (!isFilteredApplied()) {
  //       let updateFilterArrayResult = allJobs;
  //       console.log("PPPPPPPPPPPPPPPPPPP", updateFilterArrayResult);

  //       // role filter
  //       if (allFiltersState.role) {
  //         const res = updateFilterArrayResult.filter((jobItem) => {
  //           if (jobItem.jobRole === allFiltersState.role) {
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         });

  //         console.log("FFFFFFFFFFFFFFFFFFF", res);
  //         updateFilterArrayResult = res;
  //       }

  //       // remote filter
  //       if (allFiltersState.remote) {
  //         const res = updateFilterArrayResult.filter((jobItem) => {
  //           if (jobItem.location === allFiltersState.remote) {
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         });
  //         console.log("SSSSSSSSSSSSSSS", res);
  //         updateFilterArrayResult = res;
  //       }

  //       // min exp filter
  //       if (allFiltersState.minExp) {
  //         console.log("+allFiltersState.minExp", +allFiltersState.minExp);
  //         const res = updateFilterArrayResult.filter((jobItem) => {
  //           if (jobItem.minExp && jobItem.minExp === +allFiltersState.minExp) {
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         });
  //         console.log("TTTTTTTTTTTTTTTT", res);
  //         updateFilterArrayResult = res;
  //       }

  //       dispatch(
  //         updateFilteredJobs({
  //           updateFilterArrayResult,
  //         })
  //       );
  //     }
  //   }, [allJobs]);

  useFilter(isFilteredApplied(), "jobsSectionComponent");

  return (
    <div className={styles["jobsSectionContainer"]}>
      {isFilteredApplied() ? (
        allJobs &&
        allJobs.map((jobDetail) => {
          return <JobCard jobDetail={jobDetail} />;
        })
      ) : allFilteredJobs.length > 0 ? (
        allFilteredJobs.map((jobDetail) => {
          return <JobCard jobDetail={jobDetail} />;
        })
      ) : (
        <p>No jobs found</p>
      )}
      {loading && <p>Fetching more jobs for you.</p>}

      {noMoreJobsAvailable && <p>Reached the end, no more jobs available</p>}
    </div>
  );
};

export default JobsSection;
