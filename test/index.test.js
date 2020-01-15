import babel from "babel-core";
import plugin from "../";

var example = `
var foo = 1;
if (foo) console.log(foo);
`;

it("works", () => {
  const { code } = babel.transform(example, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});