# babel-plugin-replace-import-src-to-where

make your import or require path from this 

```
import aaa from "src/file/aaa/path";
var bbb = require("src/file/bbb/path");
var config = {
	ccc: "src/file/ccc/path"
}
```

to this

```
import aaa from "lib/file/aaa/path";
var bbb = require("lib/file/bbb/path");
var config = {
	ccc: "lib/file/ccc/path"
}
```

## Install

```
$ npm install babel-plugin-replace-import-src-to-where
```

## Usage for your .babelrc

```js
{
	"env": {
		"dev": {
			"plugins": [
				"replace-import-src-to-where"
			]
		}
	}
}
```


