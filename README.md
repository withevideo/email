# Is Free Email

A utility function to check if an email address matches a free email provider.

## Usage

```js
import isFreeEmail from '@withe/is-free-email';

const expectTrue = isFreeEmail('someone@gmail.com'); // Returns true
const expectFalse = isFreeEmail('someone@acme.com'); // Returns false
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
