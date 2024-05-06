import { CardActions, CardContent, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import styles from "../styles/JobCard.module.css";

const JobCard = ({ jobDetail }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    jobDetail && (
      <div className={styles["jobCardContainer"]}>
        <Card className={styles["Card"]}>
          <CardContent>
            <Typography className={styles["Typography"]}>
              {jobDetail.companyName ? (
                <>
                  <span>Company Name: </span>
                  <span className={styles["lexend600light"]}>
                    {jobDetail.companyName}
                  </span>
                </>
              ) : (
                "Company name will be displayed soon"
              )}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.jobRole
                ? `Jobrole: ${jobDetail.jobRole}`
                : "Jobrole will be displayed soon"}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.location ? (
                <>
                  <span>Job location: </span>
                  <span className={styles["lexend500font"]}>
                    {jobDetail.location}
                  </span>
                </>
              ) : (
                "Job location will displayed soon"
              )}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.jobDetailsFromCompany ? (
                <>
                  <span className={styles["lexend600dark"]}>
                    Job Description:{" "}
                  </span>
                  <span>{jobDetail.jobDetailsFromCompany.slice(0, 200)}</span>
                </>
              ) : (
                "Job Description will be displayed soon"
              )}
              {jobDetail.jobDetailsFromCompany && !readMore && (
                <span
                  className={styles["readtoggle"]}
                  onClick={() => setReadMore(true)}
                >
                  Read more...
                </span>
              )}
              {readMore && (
                <span>{jobDetail.jobDetailsFromCompany.slice(201)}</span>
              )}
              {jobDetail.jobDetailsFromCompany && readMore && (
                <span
                  className={styles["readtoggle"]}
                  onClick={() => setReadMore(false)}
                >
                  Read less...
                </span>
              )}
            </Typography>

            {jobDetail.minExp && jobDetail.maxExp && (
              <Typography className={styles["Typography"]}>
                <>
                  <span className={styles["lexend600light"]}>
                    Experience required:{" "}
                  </span>
                  <span>{`${jobDetail.minExp} - ${jobDetail.maxExp} years`}</span>
                </>
              </Typography>
            )}

            {jobDetail.minExp && !jobDetail.maxExp && (
              <Typography className={styles["Typography"]}>
                <>
                  <span className={styles["lexend600light"]}>
                    Minimum Experience required:{" "}
                  </span>
                  <span>{`${jobDetail.minExp} ${
                    jobDetail.minExp <= 1 ? "year" : "years"
                  }`}</span>
                </>
              </Typography>
            )}

            {!jobDetail.minExp && jobDetail.maxExp && (
              <Typography className={styles["Typography"]}>
                <>
                  <span className={styles["lexend600light"]}>
                    Maximum Experience required:{" "}
                  </span>
                  <span>{`${jobDetail.maxExp} ${
                    jobDetail.maxExp <= 1 ? "year" : "years"
                  }`}</span>
                </>
              </Typography>
            )}

            {!jobDetail.minExp && !jobDetail.maxExp && (
              <Typography className={styles["Typography"]}>
                <>
                  <span className={styles["lexend600light"]}>
                    Experience required:{" "}
                  </span>
                  <span>Not Applicable</span>
                </>
              </Typography>
            )}
          </CardContent>

          {/* <p>{jobDetail.minJdSalary}</p> */}

          <CardActions>
            <Link
              href={jobDetail.jdLink}
              target="_blank"
              className={styles["Link"]}
            >
              ⚡ Easy Apply
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  );
};

export default JobCard;
