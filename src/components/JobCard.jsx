import {
  CardActions,
  CardContent,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import styles from "../styles/JobCard.module.css";

const JobCard = ({ jobDetail }) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    jobDetail && (
      <div className={styles["jobCardContainer"]}>
        <Card
          sx={
            !matches
              ? {
                  backgroundColor: "lightblue",
                  margin: "5rem",
                  border: "1px solid #000",
                }
              : {
                  margin: "1rem",
                  backgroundColor: "red",
                }
          }
        >
          <CardContent>
            <Typography>
              {jobDetail.companyName
                ? jobDetail.companyName
                : "Company name will be displayed soon"}
            </Typography>

            <Typography>
              {jobDetail.jobRole
                ? jobDetail.jobRole
                : "Jobrole will be displayed soon"}
            </Typography>

            <Typography>
              {jobDetail.location
                ? jobDetail.location
                : "Job location will displayed soon"}
            </Typography>

            <Typography>Job Description</Typography>
            <Typography>
              {jobDetail.jobDetailsFromCompany
                ? jobDetail.jobDetailsFromCompany
                : "Job Description will be displayed soon"}
            </Typography>

            {jobDetail.minExp && jobDetail.maxExp && (
              <>
                <Typography>Experience required</Typography>
                <Typography>{`${jobDetail.minExp} - ${jobDetail.maxExp}`}</Typography>
              </>
            )}

            {jobDetail.minExp && !jobDetail.maxExp && (
              <>
                <Typography>Minimum Experience required</Typography>
                <Typography>{`${jobDetail.minExp}`}</Typography>
              </>
            )}

            {!jobDetail.minExp && jobDetail.maxExp && (
              <>
                <Typography>Maximum Experience required</Typography>
                <Typography>{`${jobDetail.maxExp}`}</Typography>
              </>
            )}

            {!jobDetail.minExp && !jobDetail.maxExp && (
              <>
                <Typography>Experience required</Typography>
                <Typography>Not Applicable</Typography>
              </>
            )}
          </CardContent>

          <CardActions>
            <Link>Easy Apply</Link>
          </CardActions>
        </Card>
      </div>
    )
  );
};

export default JobCard;
