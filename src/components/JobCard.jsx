import {
  CardActions,
  CardContent,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import styles from "../styles/JobCard.module.css";

const JobCard = ({ jobDetail }) => {
  const matches = useMediaQuery("(max-width:995px)");
  const [readMore, setReadMore] = useState(false);

  return (
    jobDetail && (
      <div className={styles["jobCardContainer"]}>
        <Card className={styles["Card"]}>
          <CardContent>
            <Typography className={styles["Typography"]}>
              {jobDetail.companyName
                ? `Company Name: ${jobDetail.companyName}`
                : "Company name will be displayed soon"}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.jobRole
                ? `Jobrole: ${jobDetail.jobRole}`
                : "Jobrole will be displayed soon"}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.location
                ? `Job location: ${jobDetail.location}`
                : "Job location will displayed soon"}
            </Typography>

            <Typography className={styles["Typography"]}>
              {jobDetail.jobDetailsFromCompany
                ? `Job Description: ${jobDetail.jobDetailsFromCompany.slice(
                    0,
                    200
                  )}`
                : "Job Description will be displayed soon"}
              {jobDetail.jobDetailsFromCompany && !readMore && (
                <span onClick={() => setReadMore(true)}>Read more...</span>
              )}
              {readMore && (
                <span>{jobDetail.jobDetailsFromCompany.slice(201)}</span>
              )}
              {jobDetail.jobDetailsFromCompany && readMore && (
                <span onClick={() => setReadMore(false)}>Read less...</span>
              )}
            </Typography>

            {jobDetail.minExp && jobDetail.maxExp && (
              <Typography
                className={styles["Typography"]}
              >{`Experience required: ${jobDetail.minExp} - ${jobDetail.maxExp}`}</Typography>
            )}

            {jobDetail.minExp && !jobDetail.maxExp && (
              <Typography
                className={styles["Typography"]}
              >{`Minimum Experience required: ${jobDetail.minExp}`}</Typography>
            )}

            {!jobDetail.minExp && jobDetail.maxExp && (
              <Typography
                className={styles["Typography"]}
              >{`Maximum Experience required: ${jobDetail.maxExp}`}</Typography>
            )}

            {!jobDetail.minExp && !jobDetail.maxExp && (
              <Typography className={styles["Typography"]}>
                Experience required: Not Applicable
              </Typography>
            )}
          </CardContent>

          <CardActions>
            <Link className={styles["Link"]}>Easy Apply</Link>
          </CardActions>
        </Card>
      </div>
    )
  );
};

export default JobCard;
