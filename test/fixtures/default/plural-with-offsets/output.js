import { __plural } from "icu-helpers";
export default {
  gym: trainers => __plural(trainers, 1, {
    0: "The gym is empty",
    1: "You are alone here",
    one: `You and ${trainers - 1} trainer`,
    other: `You and ${trainers - 1} other trainers`
  })
};