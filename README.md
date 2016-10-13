# babel-plugin-annotation-to-prop

make annotation of function in class to class static properties

```
class YourClass {
	/**
	 * constructor
	 * @prop1: strValue1
	 */
	constructor() {
		super();
	}
	
	/**
	 * actionView 
	 * @test1: false
	 * @test2: GET
	 * @test3: 123
	 */
	actionView() {
		//something
	}
}

export default YourClass;
```

to this

```
...

YourClass.prop1 = "strValue1"
YourClass.actionView.test1 = false;
YourClass.actionView.test2 = "GET";
YourClass.actionView.test3 = 123;
export["default"] = YourClass;
```

## Install

```
$ npm install babel-plugin-annotation-to-prop --save-dev
```

## Usage for your .babelrc

```js
{
	"env": {
		"dev": {
			"plugins": [
				"annotation-to-prop"
			]
		}
	}
}
```


