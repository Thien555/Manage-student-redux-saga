import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";
import { City, ListResponse, Student } from "../../models";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
  const responeList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, mark_lte: 5 }),
  ]);
  const statisticList = responeList.map((res) => res.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });
  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });
  yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking student per city
  const rankingListStudentPerCity = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "asc",
      city: city.code,
    })
  );
  const responeList: Array<ListResponse<Student>> = yield all(
    rankingListStudentPerCity
  );
  const rankingByCityList: Array<RankingByCity> = responeList.map(
    (city, index) => ({
      cityId: cityList[index].code,
      rankingList: city.data,
    })
  );

  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
