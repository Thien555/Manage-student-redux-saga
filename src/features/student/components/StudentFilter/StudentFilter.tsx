import { Box, Button, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import { Search } from "@material-ui/icons";
import { ChangeEvent } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useRef } from "react";
import { City, listParams } from "../../../../models";

interface Props {
  filter: listParams;
  onChange?: (newFilter: listParams) => void;
  onSearchChange?: (newFilter: listParams) => void;
  cityList: City[];
}

const StudentFilter = ({
  filter,
  onChange,
  onSearchChange,
  cityList,
}: Props) => {
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split(".");
    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: _order || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter = {
      _page: 1,
      _limit: 15,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="SearchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              onChange={handleSearchChange}
              endAdornment={<Search />}
              label="Search By Name"
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="FilterByCity">Filter By City</InputLabel>
            <Select
              value={filter.city || ""}
              onChange={handleCityChange}
              label="Filter By City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="SortBy">Sort</InputLabel>
            <Select
              value={filter._sort ? `${filter._sort}${filter._order}` : ""}
              onChange={handleSortChange}
              label="Filter By City"
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
