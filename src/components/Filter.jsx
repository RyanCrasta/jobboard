import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilter, updateFilteredJobs } from "../utils/jobSlice";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";

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

  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
  const [selectedJobPlaces, setSelectedJobPlaces] = useState([]);
  const [selectedJobExp, setSelectedJobExp] = useState([]);
  const [selectedJobBaseMinSalary, setSelectedJobBaseMinSalary] = useState([]);

  const names = [
    {
      value: "frontend",
      name: "Frontend",
    },
    {
      value: "ios",
      name: "IOS",
    },
    {
      value: "backend",
      name: "Backend",
    },
    {
      value: "tech lead",
      name: "tech lead",
    },
    {
      value: "android",
      name: "Android",
    },
  ];

  const placeOfWork = [
    {
      value: "remote",
      name: "Remote",
    },
    {
      value: "inoffice",
      name: "In Office",
    },
  ];

  const exp = [
    {
      value: "1",
      name: "1",
    },
    {
      value: "2",
      name: "2",
    },
    {
      value: "3",
      name: "3",
    },
    {
      value: "4",
      name: "4",
    },

    {
      value: "5",
      name: "5",
    },
    {
      value: "6",
      name: "6",
    },
    {
      value: "7",
      name: "7",
    },
    {
      value: "8",
      name: "8",
    },
    {
      value: "9",
      name: "9",
    },
    {
      value: "10",
      name: "10",
    },
  ];

  const baseMinSalary = [
    {
      value: "0L",
      name: "0L",
    },
    {
      value: "10L",
      name: "10L",
    },
    {
      value: "20L",
      name: "20L",
    },
    {
      value: "30L",
      name: "30L",
    },
    {
      value: "40L",
      name: "40L",
    },
    {
      value: "50L",
      name: "50L",
    },
    {
      value: "60L",
      name: "60L",
    },
    {
      value: "70L",
      name: "70L",
    },
  ];

  const [stateName, setStateName] = useState(names);
  const [statePlaceOfWork, setPlaceOfWork] = useState(placeOfWork);
  const [stateExp, setStateExp] = useState(exp);
  const [stateBaseMinSalary, setStateBaseMinSalary] = useState(baseMinSalary);

  const dispatch = useDispatch();

  const allFiltersState = useSelector((allfilters) => {
    return allfilters.job.filtersSet;
  });

  useFilter(true, "filterComponent");

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

  const handleCompanyNameChange = (event) => {
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

  const handleMultipleJobRole = (event, valueArray) => {
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

  const handleMultipleJobPlace = (event, valueArray) => {
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

  const handleMultipleJobExp = (event, valueArray) => {
    console.log("handleMultipleJobExp", valueArray);
    if (valueArray && valueArray.value) {
      const newSelectedValues = [];

      newSelectedValues.push(valueArray.value);
      setSelectedJobExp([...newSelectedValues]);
    } else {
      setSelectedJobExp([]);
    }
  };

  const handleMultipleJobBaseMinSalary = (event, valueArray) => {
    console.log("handleMultipleJobExp", valueArray);
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

  return (
    <div>
      <Box className={styles["Box"]}>
        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            multiple
            options={statePlaceOfWork}
            getOptionLabel={(option) => option.name}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Remote/OnSite"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleJobPlace}
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
            options={stateExp}
            getOptionLabel={(option) => option.name}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Min Experience"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleJobExp}
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
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Min Base Salary"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleJobBaseMinSalary}
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
            label="Company Name"
            onChange={handleCompanyNameChange}
            value={companyNameFilter}
          />
        </FormControl>

        <FormControl className={styles["FormControl"]} fullWidth>
          <Autocomplete
            multiple
            options={stateName}
            getOptionLabel={(option) => option.name}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Job roles"
                sx={{
                  "& .MuiChip-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
            onChange={handleMultipleJobRole}
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
      </Box>
    </div>
  );
};

export default Filter;
