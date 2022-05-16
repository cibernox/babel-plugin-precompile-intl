import { __interpolate, __plural, __select } from "precompile-intl-runtime";
export default {
  plain: `string`,
  multiline: `
    string
  `,
  with_interpolation: city => `city ${__interpolate(city)}`,
  with_plural: cats => __plural(cats, {
    o: "cat",
    h: `${cats} cats`
  }),
  with_select: gender => __select(gender, {
    male: "he",
    female: "she",
    other: "they"
  }),
  with_backticks: `add \`code\``,
  with_backticks_and_interpolation: type => `\`type\` is ${__interpolate(type)}`
};