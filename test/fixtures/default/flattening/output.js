import { __select } from "precompile-intl-runtime";
let tmp = 'other';
export default {
  nearby: "Find places near your location",
  "kilometer.a": gender => `This year ${__select(gender, {
    male: "he made many kilometers",
    female: "she made many kilometers",
    other: "they made many kilometers"
  })}`,
  "kilometer.b": tmp,
  "good.great.excellent": gender => __select(gender, {
    male: "He is a good boy",
    female: "She is a good girl",
    other: "They are good fellas"
  })
};