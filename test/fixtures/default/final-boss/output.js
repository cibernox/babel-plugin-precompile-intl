import { __plural, __select } from "icu-helpers";
export var foot = count => `${count} ${__plural(count, {
  1: "foot",
  other: "feet"
})}`;
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
  })}`,
  foot
};