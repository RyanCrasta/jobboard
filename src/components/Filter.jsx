import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilter, updateFilteredJobs } from "../utils/jobSlice";
import TextField from "@mui/material/TextField";

import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import useFilter from "../utils/useFilter";

import styles from "../styles/Filter.module.css";

const Filter = () => {
  const [counter, setCounter] = useState(0);
  const [jobRoleFilter, setJobRoleFilter] = useState("");
  const [jobRemoteFilter, setJobRemoteFilter] = useState("");
  const [jobMinExpFilter, setJobMinExpFilter] = useState("");
  const [jobLocationFilter, setJobLocationFilter] = useState("");
  const [companyNameFilter, setCompanyNameFilter] = useState("");

  const [jobMinBaseSalaryFilter, setJobMinBaseSalaryFilter] = useState("");

  const dispatch = useDispatch();

  const allFiltersState = useSelector((allfilters) => {
    console.log("allfilters.job.filtersSet", allfilters.job.filtersSet);
    return allfilters.job.filtersSet;
  });

  const allJobs = useSelector((jobs) => {
    return jobs.job.allJobs;
  });

  console.log("aaaaaaaaaaaaaa", allFiltersState);

  // useEffect(() => {
  // let updateFilterArrayResult = allJobs;
  // console.log("updateFilterArrayResult", updateFilterArrayResult);

  // // role filter
  // if (allFiltersState.role) {
  //   const res = updateFilterArrayResult.filter((jobItem) => {
  //     if (jobItem.jobRole === allFiltersState.role) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });

  //   console.log("FFFFFFFFFFFFFFFFFFF", res);
  //   updateFilterArrayResult = res;
  // }

  // // remote filter
  // if (allFiltersState.remote) {
  //   const res = updateFilterArrayResult.filter((jobItem) => {
  //     if (jobItem.location === allFiltersState.remote) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   console.log("SSSSSSSSSSSSSSS", res);
  //   updateFilterArrayResult = res;
  // }

  // // min exp filter
  // if (allFiltersState.minExp) {
  //   console.log("+allFiltersState.minExp", +allFiltersState.minExp);
  //   const res = updateFilterArrayResult.filter((jobItem) => {
  //     if (jobItem.minExp && jobItem.minExp === +allFiltersState.minExp) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   console.log("TTTTTTTTTTTTTTTT", res);
  //   updateFilterArrayResult = res;
  // }

  // dispatch(
  //   updateFilteredJobs({
  //     updateFilterArrayResult,
  //   })
  // );

  useFilter(true, "filterComponent");
  // }, [allFiltersState]);

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

  const handleJobLocationChange = (event) => {
    console.log("handleJobLocationChange", event.target.value);
    setJobLocationFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        location:
          event.target.value.trim().length > 0
            ? event.target.value.trim()
            : false,
      })
    );
  };

  const handleCompanyNameChange = () => {
    console.log("handleCompanyNameChange", event.target.value);
    setCompanyNameFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        companyName:
          event.target.value.trim().length > 0
            ? event.target.value.trim()
            : false,
      })
    );
  };

  const handleJobMinBaseSalaryChange = (event) => {
    console.log("handleJobMinBaseSalaryChange", event.target.value);
    setJobMinBaseSalaryFilter(event.target.value);
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        minBasePay: event.target.value
          ? event.target.value.split("L")[0]
          : false,
      })
    );
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

        <FormControl fullWidth>
          <InputLabel id="minbasesalary">Min Base salary</InputLabel>
          <Select
            labelId="minbasesalary"
            value={jobMinBaseSalaryFilter}
            onChange={handleJobMinBaseSalaryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="0L">0L</MenuItem>
            <MenuItem value="10L">10L</MenuItem>
            <MenuItem value="20L">20L</MenuItem>
            <MenuItem value="30L">30L</MenuItem>
            <MenuItem value="40L">40L</MenuItem>
            <MenuItem value="50L">50L</MenuItem>
            <MenuItem value="60L">60L</MenuItem>
            <MenuItem value="70L">70L</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Location"
            onChange={handleJobLocationChange}
            value={jobLocationFilter}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Company Name"
            onChange={handleCompanyNameChange}
            value={companyNameFilter}
          />
        </FormControl>
      </Box>
    </div>
  );
};

export default Filter;
