import { number } from "helpers";
export default {
  nearby: "Find places near your location",
  regular: count => `I have ${number(count)} cats`,
  percentage: blackCount => `Almost ${number(blackCount, "percent")} of them are black.`
};