import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { City } from "../../../models";
import { cityActions } from "../../city/citySlice";
import AddEditPage from "../components/AddEditPage";
import ListPage from "../components/ListPage";

interface Props {}

export const Student = (props: Props) => {
  const match = useRouteMatch(); // url dc match de render len component nay
  const dispatch = useAppDispatch();
  const listCity = useAppSelector((state) => state.city.list);
  useEffect(() => {
    dispatch(cityActions.getCityListRequest());
  }, []);

  const listCityMap = listCity.reduce(
    (mapCity: { [key: string]: City }, city: City) => {
      mapCity[city.code] = city;
      return mapCity;
    },
    {}
  );
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage listCityMap={listCityMap} listCity={listCity} />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
};
