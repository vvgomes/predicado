# Predicado ✅ 

[![build status](https://travis-ci.org/vvgomes/predicado.svg?branch=master)](https://travis-ci.org/vvgomes/predicado)
[![npm version](https://img.shields.io/npm/v/predicado.svg)](https://www.npmjs.com/package/predicado)

Predicado is a small library for convenient predicate driven validations. It was built on top of the [data.validation](https://github.com/folktale/data.validation) module from [Folktale](http://folktalejs.org/).

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
  email: "johndoe@gmail.com",
  password: "cupcake"
};

console.log(validate(validations, validUser));
// => Validation.Success({ email: "johndoe@gmail.com", password: "cupcake" })

const invalidUser = {
  email: "johndoe@gmail.com"
};

console.log(validate(validations, invalidUser));
// => Validation.Failure([ "Must have password." ])

```

## Background

In summary, the `validate` function can be described as:

```
validate :: (validations, target) -> Validation
```

Its first argument `validations` is an array of validation objects, each containing an `error` property and a `predicate` property. An error could be any arbitrary object that will populate the validation results in case of failure. The predicate is a function to be called agains the `target` data structure. In the example above, there are two validations, one to check the presence of an email property and another one to check the presence of a password property in the target object.

The result returned by `validate` is a [`Validation`](https://github.com/folktale/data.validation) container. The `Validation` concrete instances are of two possible subtypes: `Success` or `Failure`. When all of the predicates are `true` for a given target then `validate` returns a `Success` instance wrapping the target object. Otherwise it returns a `Failure` instance holding a list of all the corresponding errors.

From there you can manipulate the validation result by following the [`Validation`](https://github.com/folktale/data.validation) API. Here is an example:

```javascript
const onSuccess = user => "This user is totally valid!";
const onFailure = errors => "A valid user:\n" + errors.map(e => "* " + e).join("\n");

const message = validate(validations, invalidUser).fold(onFailure, onSuccess);

console.log(message);
// => A valid user:
// => * Must have an email.
// => * Must have a password.
```

## Autocurry

The `validate` interface [favors curry](http://fr.umio.us/favoring-curry/), so that you can define your custom validation functions in a [point-free](https://wiki.haskell.org/Pointfree) way:

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

const validateUser = validate(validations);

const validUser = {
  email: "johndoe@gmail.com",
  password: "cupcake"
};

console.log(validateUser(validUser));
// => Validation.Success({ email: "johndoe@gmail.com", password: "cupcake" })

const invalidUser = {
  email: "johndoe@gmail.com"
};

console.log(validateUser(invalidUser));
// => Validation.Failure([ "Must have password." ])

```

## License

Feel free to use this code as you please.
