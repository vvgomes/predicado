import Validation from "data.validation";
import { isEmpty, curry, curryN, reduce, length, always } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

const validate = curry((validations, thing) => {
  if (isEmpty(validations)) return Success(thing);

  const initial =
    Success(curryN(length(validations), always(thing)));

  const run = (acc, v) =>
    acc.ap(v.predicate(thing) ? Success(thing) : Failure([v.error]));

  return reduce(run, initial, validations);
});

export { validate };
