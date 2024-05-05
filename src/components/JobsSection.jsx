import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JOB_SEARCH_URL from "../constants/jobSearchURL";
import { updateAllJobs } from "../utils/jobSlice";
import styles from "../styles/JobsSection.module.css";
import { useState } from "react";
import JobCard from "./JobCard";

const JobsSection = () => {
  const [pageIndex, setPageIndex] = useState(0); // for infinte scroll
  const dispatch = useDispatch();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 12,
      offset: 0,
    });

    const fetchJobDetails = async () => {
      const response = await fetch(JOB_SEARCH_URL, {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      console.log("pageIndex", pageIndex);

      dispatch(
        updateAllJobs({
          fetchedJobs: data.jdList,
        })
      );
    };

    fetchJobDetails();
  }, [pageIndex]);

  const allJobs = useSelector((jobs) => {
    console.log("confirm", jobs);
    return jobs.job.allJobs;
  });

  return (
    <div className={styles["jobsSectionContainer"]}>
      {allJobs &&
        allJobs.map((jobDetail) => {
          return <JobCard jobDetail={jobDetail} />;
        })}
    </div>
  );
};

export default JobsSection;
