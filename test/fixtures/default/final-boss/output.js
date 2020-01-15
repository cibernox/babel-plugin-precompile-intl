import { select, plural } from "helpers";
export default {
  nearby: "Find places near your location",
  kilometer: (count, gender) => `This year ${select(gender, {
    male: `he made ${plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`,
    female: `she made ${plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`,
    other: `they made ${plural(count, {
      0: "no kilometres",
      1: "one kilometre",
      other: `${count} kilometres`
    })}`
  })}`
};