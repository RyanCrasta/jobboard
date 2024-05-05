import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilter } from "../utils/jobSlice";

import { Box } from "@mui/system";
import { useState, useEffect } from "react";

import styles from "../styles/Filter.module.css";

const Filter = () => {
  const [counter, setCounter] = useState(0);
  const [jobRoleFilter, setJobRoleFilter] = useState("");
  const [jobRemoteFilter, setJobRemoteFilter] = useState("");
  const [jobMinExpFilter, setJobMinExpFilter] = useState(0);
  const dispatch = useDispatch();

  const allFiltersState = useSelector((allfilters) => {
    // console.log(allfilters.job.filtersSet);
    return allfilters.job.filtersSet;
  });

  const allJobs = useSelector((jobs) => {
    return jobs.job.allJobs;
  });

  console.log("aaaaaaaaaaaaaa", allFiltersState);

  useEffect(() => {
    console.log("sexy sexy", allFiltersState);
    let updateFilterArrayResult = allJobs;
    console.log("updateFilterArrayResult", updateFilterArrayResult);

    // role filter
    if (allFiltersState.role) {
      const res = updateFilterArrayResult.filter((jobItem) => {
        if (jobItem.jobRole === allFiltersState.role) {
          return true;
        } else {
          return false;
        }
      });

      console.log("FFFFFFFFFFFFFFFFFFF", res);
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
      console.log("SSSSSSSSSSSSSSS", res);
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
      console.log("TTTTTTTTTTTTTTTT", res);
      updateFilterArrayResult = res;
    }
  }, [allFiltersState]);

  const handleFilter = () => {
    console.log("allJobs", allJobs);
  };

  const handleJobRoleChange = (event) => {
    console.log("handleJobRoleChange", event.target.value);
    setJobRoleFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        role: event.target.value ? event.target.value : false,
      })
    );

    handleFilter({
      role: event.target.value ? event.target.value : false,
    });
  };

  const handleJobRemoteChange = (event) => {
    console.log("handleJobRemoteChange", event.target.value);
    setJobRemoteFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        remote: event.target.value ? event.target.value : false,
      })
    );
    handleFilter({
      remote: event.target.value ? event.target.value : false,
    });
  };

  const handleJobMinExpChange = (event) => {
    console.log("handleJobRemoteChange", event.target.value);
    setJobMinExpFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        minExp: event.target.value ? event.target.value : false,
      })
    );
    handleFilter({
      minExp: event.target.value ? event.target.value : false,
    });
  };

  return (
    <div>
      <Box className={styles["Box"]}>
        <FormControl fullWidth>
          <InputLabel id="rolefilter">Roles</InputLabel>
          <Select
            labelId="rolefilter"
            value={jobRoleFilter}
            onChange={handleJobRoleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="ios">IOS</MenuItem>
            <MenuItem value="android">Android</MenuItem>
            <MenuItem value="tech lead">Tech lead</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="remotefilter">Remote/OnSite</InputLabel>
          <Select
            labelId="remotefilter"
            value={jobRemoteFilter}
            onChange={handleJobRemoteChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="inoffice">In Office</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="minexpfilter">Min experience</InputLabel>
          <Select
            labelId="minexpfilter"
            value={jobMinExpFilter}
            onChange={handleJobMinExpChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <button onClick={() => setCounter(counter + 1)}>click me</button>
    </div>
  );
};

export default Filter;
