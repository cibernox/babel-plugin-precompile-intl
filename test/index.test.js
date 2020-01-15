const babel = require("babel-core");
const plugin = require("../src");
const fs = require('fs');
const path = require('path');

it("does not import functions if all keys are regular keys", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plain-keys-only', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plain-keys-only', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms `plural`", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-plurals', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-plurals', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms `select`", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-select', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-select', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms nested plurals and selects", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'final-boss', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'final-boss', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});