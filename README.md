# Is Free Email

A utility function to check if an email address matches a free email provider.

## Usage

### JavaScript

```js
import isFreeEmail from '@withe/is-free-email';

const expectTrue = isFreeEmail('someone@gmail.com'); // Returns true
const expectFalse = isFreeEmail('someone@acme.com'); // Returns false
```

### Go

```go
package main

import email "github.com/withevideo/is-free-email"

var expectTrue, _ = email.IsFree("someone@gmail.com"); // Returns true
var expectFalse, _ = email.IsFree("someone@acme.com"); // Returns false

var _, err = email.IsFree("this_seems_bad"); // err === "invalid email address"
```

## Contributing

### Generating `freemail.json`

```console
$ npm run generate
```

### Testing

```console
$ npm run test
```

### Building

```console
$ npm run build
```
