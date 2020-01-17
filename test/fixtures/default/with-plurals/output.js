import { __interpolate, __plural } from "icu-helpers";
export default {
  nearby: "Find places near your location",
  kilometer: count => `${__interpolate(count)} ${__plural(count, {
    1: "kilometer",
    other: "kilometers"
  })}`
};