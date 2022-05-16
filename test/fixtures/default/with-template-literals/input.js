export default {
  plain: `string`,
  multiline: `
    string
  `,
  with_interpolation: `city {city}`,
  with_plural: `{cats, plural, one {cat} other {# cats}}`,
  with_select: `{gender, select, male {he} female {she} other {they}}`,
  with_backticks: `add \`code\``,
  with_backticks_and_interpolation: `\`type\` is {type}`
};
