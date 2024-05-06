import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JOB_SEARCH_URL from "../constants/jobSearchURL";
import { updateAllJobs, updateNumberOfAvailableJobs } from "../utils/jobSlice";
import styles from "../styles/JobsSection.module.css";
import { useState } from "react";
import JobCard from "./JobCard";
import useFilter from "../utils/useFilter";
import { v4 as uuidv4 } from "uuid";

const JobsSection = () => {
  const [pageIndex, setPageIndex] = useState(0); // for infinte scroll
  const dispatch = useDispatch();
  const [noMoreJobsAvailable, setNoMoreJobsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

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

      dispatch(
        updateNumberOfAvailableJobs({
          nosOfJobs: data.totalCount,
        })
      );

      setTotalCount(data.totalCount);
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
    if (window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight) {
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
      allFiltersState.companyName ||
      allFiltersState.location ||
      allFiltersState.minBasePay.length > 0 ||
      allFiltersState.minExp.length > 0 ||
      allFiltersState.remote.length > 0 ||
      allFiltersState.role.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!isFilteredApplied()) {
      dispatch(
        updateNumberOfAvailableJobs({
          nosOfJobs: totalCount,
        })
      );
    } else {
      dispatch(
        updateNumberOfAvailableJobs({
          nosOfJobs: allFilteredJobs.length,
        })
      );
    }
  }, [allFilteredJobs.length, isFilteredApplied()]);

  console.log(
    "allFilteredJobsallFilteredJobs",
    isFilteredApplied(),
    allFilteredJobs
  );

  useFilter(allFiltersState, isFilteredApplied());

  return (
    <>
      <div className={styles["jobsSectionContainer"]}>
        {!isFilteredApplied() ? (
          allJobs &&
          allJobs.map((jobDetail) => {
            // some jobs jdUid key data are same so i used uuid to generate key
            return <JobCard jobDetail={jobDetail} key={uuidv4()} />;
          })
        ) : allFilteredJobs.length > 0 ? (
          allFilteredJobs.map((jobDetail) => {
            // some jobs jdUid key data are same so i used uuid to generate key
            return <JobCard jobDetail={jobDetail} key={uuidv4()} />;
          })
        ) : (
          <p className={styles["messageWarning"]}>
            No Jobs available for this category at the moment
          </p>
        )}
      </div>

      {loading && (
        <p className={styles["messageWarning"]}>Fetching more jobs for you.</p>
      )}

      {noMoreJobsAvailable && (
        <p className={styles["messageWarning"]}>
          Reached the end, no more jobs available
        </p>
      )}
    </>
  );
};

export default JobsSection;
