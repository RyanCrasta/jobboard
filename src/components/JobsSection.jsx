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
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 12,
      offset: pageIndex,
    });

    const fetchJobDetails = async () => {
      try {
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
          // update fetchedJobs array with jobs that we would showing
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
        setFetchFailed(false);
      } catch (err) {
        setFetchFailed(true);
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
    return allfilters.job.filtersSet;
  });

  const handleScroll = () => {
    // to know when scroll bar has reached bottom of page
    if (window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight) {
      setPageIndex((prevPageIndex) => {
        return prevPageIndex + 1;
      });

      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // when filters are applied, filtered job array is empty and scroll bar
    // is at bottom, scroll event wont trigger
    // so that's why using forcefully scrolling user to top
    if (allFilteredJobs.length === 0 && isFilterApplied()) {
      window.scrollTo(0, 0);
    } else if (
      !loading &&
      window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight
    ) {
      // when filters are applied, filtered job array is not empty and scroll bar
      // is at bottom, scroll event wont trigger
      // so that's why using forcefully scrolling user to top
      window.scrollTo(0, window.scrollY - 5);
    }
  });

  const isFilterApplied = () => {
    if (
      allFiltersState.companyName.length > 0 ||
      allFiltersState.location.length > 0 ||
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
    // updating number of jobs shown beside title
    if (!isFilterApplied()) {
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
  }, [allFilteredJobs.length, isFilterApplied()]);

  // custom hook for code reusability
  useFilter();

  return (
    <>
      <div className={styles["jobsSectionContainer"]}>
        {!isFilterApplied() ? (
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

      {loading && !fetchFailed && (
        <p className={styles["messageWarning"]}>Fetching more jobs for you.</p>
      )}

      {noMoreJobsAvailable && !fetchFailed && (
        <p className={styles["messageWarning"]}>
          Reached the end, no more jobs available
        </p>
      )}

      {fetchFailed && (
        <p className={styles["erroMsg"]}>
          Some error occured, please try again later.
        </p>
      )}
    </>
  );
};

export default JobsSection;
