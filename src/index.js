const { declare } = require("@babel/helper-plugin-utils");
const { types: t } = require('@babel/core');
const { parse } = require("intl-messageformat-parser");

module.exports = declare((api, options) => {
  let usedHelpers = new Set();
  let currentFunctionParams = new Set();

  function normalizeKey(key) {
    key = key.trim();
    if (key === 'zero') return 0;
    if (key === 'one') return 1;
    let match = key.match(/^=(\d)/);
    if (match) return parseInt(match[1], 10);
    return key;
  }

  function buildCallExpression(fnName, entry) {
    usedHelpers.add(fnName);
    if (fnName === "__number" || fnName === "__date" || fnName === "__time") {
      let callArgs = [t.identifier(entry.value)];
      if (entry.style) callArgs.push(t.stringLiteral(entry.style));
      return t.callExpression(t.identifier(fnName), callArgs);
    }
    let options = t.objectExpression(
      Object.keys(entry.options).map(key => {
        let objValueAST = entry.options[key].value;
        let objValue;
        if (objValueAST.length === 1) {
          objValue = t.stringLiteral(objValueAST[0].value);
        } else {
          objValue = buildTemplateLiteral(objValueAST);
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
    currentFunctionParams.add(entry.value);
    return t.callExpression(t.identifier(fnName), [
      t.identifier(entry.value),
      options
    ]);
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
          expressions.push(t.identifier(entry.value));
          currentFunctionParams.add(entry.value);
          if (i === 0) quasis.push(t.templateElement({ value: '', raw: '' }, false));
          break;
        case 2: // Number format
          expressions.push(buildCallExpression("__number", entry));
          currentFunctionParams.add(entry.value);
          break;
        case 3: // Date format
          expressions.push(buildCallExpression("__date", entry));
          currentFunctionParams.add(entry.value);
          break;
        case 4: // Time format
          expressions.push(buildCallExpression("__time", entry));
          currentFunctionParams.add(entry.value);
          break;
        case 5: // select
          expressions.push(buildCallExpression("__select", entry));
          break;
        case 6: // plural
          expressions.push(buildCallExpression("__plural", entry));
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
    let templateLiteral = buildTemplateLiteral(ast)
    return t.arrowFunctionExpression(
      Array.from(currentFunctionParams).map(p => t.identifier(p)),
      templateLiteral
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
              Array.from(usedHelpers).map(name => t.importSpecifier(t.identifier(name), t.identifier(name)))
            , t.stringLiteral("icu-helpers"));
            path.unshiftContainer("body", importDeclaration);
          }
        }
      },
      ObjectProperty({ node }) {
        if (t.isStringLiteral(node.value)) {
          let icuAST = parse(node.value.value);
          if (icuAST.length === 1) return;
          node.value = buildFunction(icuAST);
        }
      }
    }
  };
});
