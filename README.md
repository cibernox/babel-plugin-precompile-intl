# babel-plugin-precompile-intl

This babel plugin compiles translations in the ICU message syntax into executable functions at build time,
analyzing the used features and importing the required runtime helpers from [precompile-intl-runtime](https://github.com/cibernox/precompile-intl-runtime)
to perform the operations that can't be performed at build time.

### Differences with other internationalization libraries

This approach is different than the taken by libraries like [intl-messageformat](https://www.npmjs.com/package/intl-messageformat) or [format-message](https://github.com/format-message/format-message), which do all the work in the browser. The approach taken by those libraries is more flexible as you can just load json files with translations in plain text and that's it, but it also means the library needs to ship a parser for the ICU message syntax, and it always has to have ship code for all the features that the ICU syntax supports, even features you might not use, making those libraries several times bigger.

The strategy used by this library assumes that your app will have some sort of built process that you can use to analyze and precompile
the messages in your app. This process spares the browser of the burden of doing the same process in the user's devices, resulting in
smaller and faster apps.

### Compile translations? WAT?

Ok, let's check it with an example.

Say you have a file with translations like this:
```js
{
  "plain": "Some text without interpolations",
  "interpolated": "A text where I interpolate {count} times",
  "time": "Now is {now, time}",
  "time-custom-format": "The hour is {now, time, hour}",
  "date": "Today is {today, date}",
  "date-custom-format": "Today is {today, date, abbr-full}",
  "number": "My favorite number is {n, number}",
  "percent": "My favorite number is {n, number, percent}",
  "pluralized": "I have {count, plural,=0 {no cats} =1 {one cat} other {{count} cats}}",
  "pluralized-with-hash": "I have {count, plural, zero {no cats} one {just # cat} other {# cats}}",
  "selected": "{gender, select, male {He is a good boy} female {She is a good girl} other {They are good fellas}}",
}
```

This babel plugin will precompile that file into something like this:
```js
import { __date, __interpolate, __number, __plural, __select, __time } from "precompile-intl-runtime";
export default {
  plain: "Some text without interpolations",
  interpolated: `A text where I interpolate ${__interpolate(count)} times`,
  time: now => `Now is ${__time(now)}`,
  "time-custom-format": now => `The hour is ${__time(now, "hour")}`,
  date: today => `Today is ${__date(today)}`,
  "date-custom-format": today => `Today is ${__date(today, "abbr-full")}`,
  number: n => `My favorite number is ${__number(n)}`,
  percent: n => `My favorite number is ${__number(n, "percent")}`,
  pluralized: count => `I have ${__plural(count, { 0: "no cats", 1: "one cat", h: `${__interpolate(count)} cats`})}`,
  "pluralized-with-hash": count => `I have ${__plural(count, { z: "no cats", o: `just ${count} cat`, h: `${count} cats`})}`,
  selected: gender => __select(gender, { male: "He is a good boy", female: "She is a good girl", other: "They are good fellas"})
}
```
As you see, translations with no logic remain unchanged, but translations that take arguments are transformed into functions that
take those arguments and use some runtime helpers from `precompile-intl-runtime`, the runtime counterpart of this library.

Although this output may seem very verbose, it is designed to minify extremely well.
Your minification step will transform keys like this:

```js
"pluralized-with-hash": "I have {count, plural, zero {no cats} one {just # cat} other {# cats}}",
--------------------------------------------------------------------------------------------------
"pluralized-with-hash":t=>`I have ${jt(t,{z:"no cats",o:`just ${t} cat`,h:`${t} cats`})}`
```

On average the minified output is between 5% and 10% smaller than the original input, and the runtime
library is much smaller than other alternatives and even smaller because it can be tree-shaken so only
the helpers your translations need are included, varying the weight of the library between 1k and just a few bytes.