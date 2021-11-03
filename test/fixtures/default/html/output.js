import { __interpolate } from "precompile-intl-runtime";
export default {
  br: "Line with <br> line break",
  br2: val => `Line with <br> and interpolation ${__interpolate(val)}`
};