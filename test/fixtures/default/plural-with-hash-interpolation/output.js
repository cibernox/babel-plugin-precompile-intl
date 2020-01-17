import { __plural } from "icu-helpers";
export default {
  nearby: "Find places near your location",
  kilometer: count => __plural(count, {
    one: "just one kilometer",
    few: `just ${count} kilometres`,
    other: `${count} kilometers easily`
  })
};