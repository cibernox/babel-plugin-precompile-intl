const { declare } = require("@babel/helper-plugin-utils");
const { types: t } = require('@babel/core');
const { parse } = require("intl-messageformat-parser");
const HELPERS_MAP = {
  1: "__interpolate",
  2: "__number",
  3: "__date",
  4: "__time",
  5: "__select",
  6: "__plural",
};

module.exports = declare((api, options) => {
  let usedHelpers = new Set();
  let currentFunctionParams = new Set();
  let pluralsStack = [];

  function normalizeKey(key) {
    key = key.trim();
    let match = key.match(/^=(\d)/);
    if (match) return parseInt(match[1], 10);
    return key;
  }

  function buildCallExpression(entry) {
    let fnName = HELPERS_MAP[entry.type];
    usedHelpers.add(fnName);
    if (fnName === "__interpolate" || fnName === "__number" || fnName === "__date" || fnName === "__time") {
      let callArgs = [t.identifier(entry.value)];
      if (entry.style) callArgs.push(t.stringLiteral(entry.style));
      return t.callExpression(t.identifier(fnName), callArgs);
    }
    if (fnName === '__plural') {
      pluralsStack.push(entry)
    }
    let options = t.objectExpression(
      Object.keys(entry.options).map(key => {
        let objValueAST = entry.options[key].value;
        let objValue;
        if (objValueAST.length === 1 && objValueAST[0].type === 0) {
          objValue = t.stringLiteral(objValueAST[0].value);
        } else {
          objValue = objValueAST.length === 1 ? buildCallExpression(objValueAST[0]) : buildTemplateLiteral(objValueAST);
        }
        let normalizedKey = normalizeKey(key);
        return t.objectProperty(
          typeof normalizedKey === "number"
            ? t.numericLiteral(normalizedKey)
            : t.identifier(normalizedKey),
          objValue
        );
      })
    );
    if (fnName === "__plural") {
      pluralsStack.pop();
    }
    currentFunctionParams.add(entry.value);
    let callArguments = [t.identifier(entry.value)];
    if (fnName === "__plural" && entry.offset !== 0) {
      callArguments.push(t.numericLiteral(entry.offset));
    }
    callArguments.push(options)
    return t.callExpression(t.identifier(fnName), callArguments);
  }

  function buildTemplateLiteral(ast) {
    let quasis = [];
    let expressions = [];
    for (let i = 0; i < ast.length; i++) {
      let entry = ast[i];
      switch(entry.type) {
        case 0: // literal
          quasis.push(
            t.templateElement(
              { value: entry.value, raw: entry.value },
              i === ast.length - 1 // tail
            )
          );
          break;
        case 1: // intepolation
          expressions.push(buildCallExpression(entry));
          currentFunctionParams.add(entry.value);
          if (i === 0) quasis.push(t.templateElement({ value: '', raw: '' }, false));
          break;
        case 2: // Number format
          expressions.push(buildCallExpression(entry));
          currentFunctionParams.add(entry.value);
          break;
        case 3: // Date format
          expressions.push(buildCallExpression(entry));
          currentFunctionParams.add(entry.value);
          break;
        case 4: // Time format
          expressions.push(buildCallExpression(entry));
          currentFunctionParams.add(entry.value);
          break;
        case 5: // select
          expressions.push(buildCallExpression(entry));
          break;
        case 6: // plural
          expressions.push(buildCallExpression(entry));
          break;
        case 7: // # interpolation
          let lastPlural = pluralsStack[pluralsStack.length - 1];
          if (lastPlural.offset !== null && lastPlural.offset !== 0) {
            expressions.push(
              t.binaryExpression(
                "-",
                t.identifier(lastPlural.value),
                t.numericLiteral(lastPlural.offset)
              )
            );
          } else {
            expressions.push(t.identifier(lastPlural.value));
          }
          if (i === 0) quasis.push(t.templateElement({ value: '', raw: '' }, false));
          break;
        default:
          debugger;
      }
      if (i === ast.length - 1 && entry.type !== 0) {
        quasis.push(t.templateElement({ value: '', raw: '' }, true));
      }
    }
    return t.templateLiteral(quasis, expressions);
  }

  function buildFunction(ast) {
    currentFunctionParams = new Set();
    pluralsStack = [];
    let body = ast.length === 1 ? buildCallExpression(ast[0]) : buildTemplateLiteral(ast);
    return t.arrowFunctionExpression(
      Array.from(currentFunctionParams).sort().map(p => t.identifier(p)),
      body
    );
  }
  return {
    name: "transform-precompile-icu",

    visitor: {
      Program: {
        enter() {
          usedHelpers = new Set();
        },
        exit(path) {
          if (usedHelpers.size > 0) {
            let importDeclaration = t.importDeclaration(
              Array.from(usedHelpers).sort().map(name => t.importSpecifier(t.identifier(name), t.identifier(name)))
            , t.stringLiteral("precompile-intl-runtime"));
            path.unshiftContainer("body", importDeclaration);
          }
        }
      },
      ObjectProperty({ node }) {
        if (t.isStringLiteral(node.value)) {
          let icuAST = parse(node.value.value);
          if (icuAST.length === 1 && icuAST[0].type === 0) return;
          node.value = buildFunction(icuAST);
        }
      },
      VariableDeclarator({ node }) {
        if (t.isStringLiteral(node.init)) {
          let icuAST = parse(node.init.value);
          if (icuAST.length === 1 && icuAST[0].type === 0) return;
          node.init = buildFunction(icuAST);
        }
      }
    }
  };
});
