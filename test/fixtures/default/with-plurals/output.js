import { __plural } from "helpers";
export default {
  nearby: "Find places near your location",
  kilometer: count => `${count} ${__plural(count, {
    1: "kilometer",
    other: "kilometers"
  })}`
};