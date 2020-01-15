import { __select, __plural } from "helpers";
export default {
  nearby: "Find places near your location",
  kilometer: (count, gender) => `This year ${__select(gender, {
    male: `he made ${__plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`,
    female: `she made ${__plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`,
    other: `they made ${__plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`
  })}`
};