import { __date } from "icu-helpers";
export default {
  nearby: "Find places near your location",
  default: start => `Sale begins ${__date(start)}`,
  custom: start => `Sale begins ${__date(start, "medium")}`
};