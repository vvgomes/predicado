import assert from "assert";
import Validation from "data.validation";
import { validate } from "../lib/predicado";
import { has, where, test } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("validate()", () => {

  const validateUser = validate([
    { error: "Name must be provided.", predicate: has("name") },
    { error: "Password must be provided.", predicate: has("password") },
    { error: "Email must be in a valid format.", predicate: where({ email: test(/@/) }) }
  ]);

  it("results in success when all predicates are true", () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "cupcake"
    };

    assert.deepEqual(
      validateUser(user),
      Success(user)
    );
  });

  it("results in failure when some predicates are false", () => {
    const user = {
      name: "John Doe",
      email: "johndoe.com"
    };

    assert.deepEqual(
      validateUser(user),
      Failure([
        "Password must be provided.",
        "Email must be in a valid format."
      ])
    );
  });

  it("results in success when there are not validations", () => {
    const user = {
      name: "John Doe",
      email: "johndoe.com"
    };

    assert.deepEqual(
      validate([], user),
      Success(user)
    );
  });
});
