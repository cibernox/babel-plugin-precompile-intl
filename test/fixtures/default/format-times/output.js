import { time } from "helpers";
export default {
  nearby: "Find places near your location",
  default: expires => `Coupon expires at ${time(expires)}`,
  custom: expires => `Coupon expires at ${time(expires, "medium")}`
};