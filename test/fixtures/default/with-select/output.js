import { select } from "helpers";
export default {
  nearby: "Find places near your location",
  kilometer: gender => `This year ${select(gender, {
    male: "he made many kilometers",
    female: "she made many kilometers",
    other: "they made many kilometers"
  })}`
};