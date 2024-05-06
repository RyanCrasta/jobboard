import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilter } from "../utils/jobSlice";
import TextField from "@mui/material/TextField";
import { Autocomplete, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import useFilter from "../utils/useFilter";
import styles from "../styles/Filter.module.css";

import jobRolesJson from "../../dummydata/jobRoles.json";
import placeOfWorkJson from "../../dummydata/placeOfWork.json";
import experiencesJson from "../../dummydata/experiences.json";
import baseMinimumSalaryJson from "../../dummydata/baseMinSalary.json";

const Filter = () => {
  const [jobLocationFilter, setJobLocationFilter] = useState("");
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
  const [selectedJobPlaces, setSelectedJobPlaces] = useState([]);
  const [selectedJobExp, setSelectedJobExp] = useState([]);
  const [selectedJobBaseMinSalary, setSelectedJobBaseMinSalary] = useState([]);

  const [stateJobRoles, setStateJobRoles] = useState(jobRolesJson);
  const [statePlaceOfWork, setPlaceOfWork] = useState(placeOfWorkJson);
  const [stateExp, setStateExp] = useState(experiencesJson);
  const [stateBaseMinSalary, setStateBaseMinSalary] = useState(
    baseMinimumSalaryJson
  );

  const dispatch = useDispatch();

  const allFiltersState = useSelector((allfilters) => {
    return allfilters.job.filtersSet;
  });

  const nosOfJobsAvailable = useSelector((jobs) => {
    return jobs.job.totalAvailableJobs;
  });

  const handleJobLocationChange = (event) => {
    // update search filter with job location provided
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

  const handleCompanyNameChange = (event) => {
    // update search filter with company name provided
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

  const handleMultipleRolesFilter = (event, valueArray) => {
    // update search filter with job roles provided
    if (valueArray.length > 0) {
      const newSelectedValues = [];

      valueArray.map((item) => {
        newSelectedValues.push(item.value);
      });
      setSelectedJobRoles([...newSelectedValues]);
    } else {
      setSelectedJobRoles([]);
    }
  };

  const handleMultiplePlaceFilter = (event, valueArray) => {
    // update search filter with job place provided
    if (valueArray.length > 0) {
      const newSelectedValues = [];

      valueArray.map((item) => {
        newSelectedValues.push(item.value);
      });
      setSelectedJobPlaces([...newSelectedValues]);
    } else {
      setSelectedJobPlaces([]);
    }
  };

  const handleMultipleExperienceFilter = (event, valueArray) => {
    // update search filter with job experience provided
    if (valueArray && valueArray.value) {
      const newSelectedValues = [];

      newSelectedValues.push(valueArray.value);
      setSelectedJobExp([...newSelectedValues]);
    } else {
      setSelectedJobExp([]);
    }
  };

  const handleMultipleMinBaseSalaryFilter = (event, valueArray) => {
    // update search filter with base min salary provided
    if (valueArray && valueArray.value) {
      const newSelectedValues = [];

      newSelectedValues.push(valueArray.value);
      setSelectedJobBaseMinSalary([...newSelectedValues]);
    } else {
      setSelectedJobBaseMinSalary([]);
    }
  };

  useEffect(() => {
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        role: selectedJobRoles,
      })
    );
  }, [selectedJobRoles]);

  useEffect(() => {
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        remote: selectedJobPlaces,
      })
    );
  }, [selectedJobPlaces]);

  useEffect(() => {
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        minExp: selectedJobExp,
      })
    );
  }, [selectedJobExp]);

  useEffect(() => {
    dispatch(
      updateSearchFilter({
        ...allFiltersState,
        minBasePay: selectedJobBaseMinSalary,
      })
    );
  }, [selectedJobBaseMinSalary]);

  // custom hook for code reusability
  useFilter();

  return (
    <div>
      <h1 className={styles["pageTitle"]}>
        Search jobs{" "}
        <span className={styles["nosOfJobs"]}>{nosOfJobsAvailable}</span>
      </h1>

      <Box className={styles["Box"]}>
        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            multiple
            options={statePlaceOfWork}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Remote/OnSite"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultiplePlaceFilter}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.name}>
                  {option.name}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.name}
                  label={option.name}
                />
              ));
            }}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            options={stateExp}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Min Experience"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleExperienceFilter}
            renderOption={(props, option, { selected }) => (
              <MenuItem
                {...props}
                key={option.name}
                value={option.value}
                sx={{ justifyContent: "space-between" }}
              >
                {option.name}
              </MenuItem>
            )}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            options={stateBaseMinSalary}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Min Base Pay"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleMinBaseSalaryFilter}
            renderOption={(props, option, { selected }) => (
              <MenuItem
                {...props}
                key={option.name}
                value={option.value}
                sx={{ justifyContent: "space-between" }}
              >
                {option.name}
              </MenuItem>
            )}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <TextField
            label="Location"
            onChange={handleJobLocationChange}
            value={jobLocationFilter}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <TextField
            label="Search Company Name"
            onChange={handleCompanyNameChange}
            value={companyNameFilter}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            multiple
            options={stateJobRoles}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Job roles"
                  sx={{
                    "& .MuiChip-root": {
                      borderRadius: 0,
                    },
                  }}
                />
              );
            }}
            onChange={handleMultipleRolesFilter}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.name}>
                  {option.name}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.name}
                  label={option.name}
                />
              ));
            }}
          />
        </FormControl>
      </Box>
    </div>
  );
};

export default Filter;
