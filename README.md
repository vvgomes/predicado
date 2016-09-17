# Predicado ✅ 

[![build status](https://travis-ci.org/vvgomes/predicado.svg?branch=master)](https://travis-ci.org/vvgomes/predicado)
[![npm version](https://img.shields.io/npm/v/predicado.svg)](https://www.npmjs.com/package/predicado)

Predicado is a small library for convenient predicate driven validations. It is build on top of the [data.validation](https://github.com/folktale/data.validation) module from [Folktale](http://folktalejs.org/).

## Getting Started

```
$ npm install predicado --save
```

```javascript
import { validate } from "predicado";

const validations = [
  {
    error: "Must have email.",
    predicate: user => !!user.email
  },
  {
    error: "Must have password.",
    predicate: user => !!user.password
  }
];

const validUser = {
  email: "jd@gmail.com",
  password: "cupcake"
};

console.log(validate(validUser, validations));
// => Validation.Success({ email: "jd@gmail.com", password: "cupcake" })

const invalidUser = {
  email: "jd@gmail.com"
};

console.log(validate(invalidUser, validations));
// => Validation.Failure([ "Must have password." ])

```

## License

Feel free to use this code as you please.
