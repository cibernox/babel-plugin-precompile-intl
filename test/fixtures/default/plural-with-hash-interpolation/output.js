import { __plural } from "precompile-intl-runtime";
export default {
  nearby: "Find places near your location",
  kilometer: count => __plural(count, {
    o: "just one kilometer",
    f: `just ${count} kilometres`,
    h: `${count} kilometers easily`
  })
};