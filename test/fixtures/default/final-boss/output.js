import { __interpolate, __plural } from "precompile-intl-runtime";
export var foot = count => `${__interpolate(count)} ${__plural(count, {
  o: "foot",
  h: "feet"
})}`;
export default {
  nearby: "Find places near your location",
  foot
};