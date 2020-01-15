import { __number } from "icu-helpers";
export default {
  nearby: "Find places near your location",
  regular: count => `I have ${__number(count)} cats`,
  percentage: blackCount => `Almost ${__number(blackCount, "percent")} of them are black.`
};