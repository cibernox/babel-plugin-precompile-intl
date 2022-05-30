import buildPlugin from '../dist';
import fs from 'fs';
import path from 'path';
import babel from '@babel/core';
const plugin = buildPlugin();

it("does not import functions if all keys are regular keys", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plain-keys-only', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plain-keys-only', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transform interpolations", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-interpolations', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-interpolations', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms `plural`", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-plurals', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-plurals', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms plurals with # interpolations", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plural-with-hash-interpolation', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plural-with-hash-interpolation', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms plurals with offsets", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plural-with-offsets', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'plural-with-offsets', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms `select`", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-select', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-select', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can format numbers", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-numbers', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-numbers', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can format dates", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-dates', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-dates', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can format times", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-times', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'format-times', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("can transforms nested plurals and selects", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'final-boss', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'final-boss', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("flattens the object, joining keys with a dot", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'flattening', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'flattening', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});

it("works with template literals", () => {
  let input = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-template-literals', 'input.js'), 'UTF8');
  let output = fs.readFileSync(path.join('test', 'fixtures', 'default', 'with-template-literals', 'output.js'), 'UTF8');
  const { code } = babel.transform(input, { plugins: [plugin] });
  expect(code).toBe(output);
});
