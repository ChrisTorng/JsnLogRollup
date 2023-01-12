# Rollup/TypeScript/JsnLog/Module problem

## Run

* `npm install`
* `npm run rollup`
* `npm run run`
* Open [http://localhost:3000/](http://localhost:3000/)

## Problem

This problem was asked in Stack Overflow [Rollup Error: Unexpected token on JsnLog's ts: import JSNLogAppender = JL.JSNLogAppender](https://stackoverflow.com/questions/75091247/rollup-error-unexpected-token-on-jsnlogs-ts-import-jsnlogappender-jl-jsnlog).

I would like to use [JsnLog](https://jsnlog.com/) with [ES6](https://jsnlog.com/Documentation/HowTo/LoadingJsFile/ES6) way, take [jsnlog.ES6Demo main.js](https://github.com/mperdeck/jsnlog.ES6Demo/blob/master/es6Demo/es6/main.js) as `index.ts`.

I can't make Rollup/TypeScript/JsnLog work together. `npm run rollup` shows:
```
[!] RollupError: Unexpected token (Note that you need plugins to import files that are not JavaScript)
node_modules/jsnlog/jsnlog.ts (3:22)
1: /// <reference path="Definitions/jsnlog_interfaces.d.ts"/>
2:
3: import JSNLogAppender = JL.JSNLogAppender
                         ^
4: import JSNLogAppenderOptions = JL.JSNLogAppenderOptions
5: import JSNLogAjaxAppender = JL.JSNLogAjaxAppender
    at error (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:210:30)
    at Module.error (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:13478:16)
    at Module.tryParse (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:13872:25)
    at Module.setSource (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:13763:39)
    at ModuleLoader.addModuleSource (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:23404:20)
```

Save `index.ts` unchanged again, rollup produce different error:
```
[!] RollupError: "JL" is not exported by "node_modules/jsnlog/jsnlog.ts", imported by "index.ts".
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
index.ts (1:9)
1: import { JL } from 'jsnlog';
            ^
2: var message = "jsnlog message";
3: // comment this can make rollup work
    at error (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:210:30)
    at Module.error (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:13478:16)
    at Module.traceVariable (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:13861:29)
    at ModuleScope.findVariable (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:12342:39)
    at Identifier.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:8298:40)
    at CallExpression.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:6095:23)
    at CallExpression.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:9815:15)
    at MemberExpression.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:6095:23)
    at MemberExpression.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:9499:19)
    at CallExpression.bind (\JsnLogRollup\node_modules\rollup\dist\shared\rollup.js:6095:23)
```

Comment `index.ts`'s line `JL().info(message);` fixed the problem, but I need `JL()`.

Use `external/globals` in `rollup.config.mjs` makes rollup happy. But `index.html` failed with:
```
Uncaught TypeError: Failed to resolve module specifier "jsnlog". Relative references must start with either "/", "./", or "../".
```

`<script src="node_modules/jsnlog/jsnlog.js">` or `import './node_modules/jsnlog/jsnlog.js'` in `index.html` can't help.

Comments in `rollup.config.mjs` and `index.html` shows these efforts, all failed.

I hope to use ES module. But if it's not possible, UMD is acceptable to me. I must be missing some basic knowledge of these things. Thanks for any help.