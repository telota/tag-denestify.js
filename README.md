# Description
Flatten nested tags onto one level.


**Example with nested Tags**

```
<t>Hello<a>World</a></t>

```

**Example with denested Tags**

```
<t>Hello</t><a>World</a>

```

# Installation
Require this package using npm. Run the following command in the terminal:
```
npm install tag-denestify

```

# Usage
To convert a string containing nested tags into a string with the 
tags flattend onto one level use the following code:

```javascript
var tagFormatter = require('tag-formatter.js');

var tagString = '<t>Hello<a>World</a></t>';

//expected Output: <t>Hello</t><a>World</a>
tagFormatter.formatTagString(tagString);
```
