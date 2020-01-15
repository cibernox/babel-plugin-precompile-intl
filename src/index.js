import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
// import { parse } from "intl-messageformat-parser";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "transform-precompile-icu",

    visitor: {
      ObjectProperty({ node }) {
        if (t.isStringLiteral(node.value)) {
          let tE = t.templateElement({value: node.value.value, raw: node.value.value});
          node.value = t.arrowFunctionExpression(
            [],
            t.templateLiteral([tE],[])
          );
        }
      }
    }
  };
});
