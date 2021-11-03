import { __interpolate, __plural } from "precompile-intl-runtime";
export default {
  nearby: "Find places near your location",
  kilometer: count => `${__interpolate(count)} ${__plural(count, {
    1: "kilometer",
    h: "kilometers"
  })}`,
  kilometerWithTrailingInterpolation: count => `${__plural(count, {
    1: "one kilometer",
    h: `${count} kilometers`
  })} to go`,
  twoDigits: numCats => `Your have ${__plural(numCats, {
    0: "no cats at all",
    1: "one single cat",
    2: "a couple cats",
    3: "a trio of cats",
    12: "a dozen cats",
    h: `exactly ${numCats} cats`
  })}`
};