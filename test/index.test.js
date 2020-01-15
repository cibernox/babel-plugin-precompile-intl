const babel = require("babel-core");
const plugin = require("../src");
const fs = require('fs');
const path = require('path');

it("works", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});