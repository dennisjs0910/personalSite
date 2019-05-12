import { combineReducers } from "redux";

const appReducer = combineReducers({
  // auth: AuthReducer,
  // calendar: CalendarReducer,
  // user: UserReducer,
  // report: ReportReducer,
  // createUser: CreateUserReducer,
  // patientStaffSearch: PatientStaffSearchReducer
});

export default (state, action) => {
  // if (action.type === AUTH_ACTION_TYPE.LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }

  return appReducer(state, action)
}