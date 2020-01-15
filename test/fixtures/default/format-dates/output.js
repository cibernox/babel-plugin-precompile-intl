import { date } from "helpers";
export default {
  nearby: "Find places near your location",
  default: start => `Sale begins ${date(start)}`,
  custom: start => `Sale begins ${date(start, "medium")}`
};