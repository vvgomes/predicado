import assert from "assert";
import Validation from "data.validation";
import validate from "../lib/validate";
import { has, where, test } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("validate()", () => {

  const validations = [
    { error: "Name must be provided.", predicate: has("name") },
    { error: "Password must be provided.", predicate: has("password") },
    { error: "Email must be in a valid format.", predicate: where({ email: test(/@/) })}
  ];

  it("results in success when all predicates are true", () => {
    const command = {
      type: "addUser",
      name: "John Doe",
      email: "jd@gmail.com",
      password: "cupcake"
    };

    assert.deepEqual(
      validate(command, validations),
      Success(command)
    );
  });

  it("results in failure when some predicates are false", () => {
    const command = {
      type: "addUser",
      name: "John Doe",
      email: "jdgmail.com"
    };

    assert.deepEqual(
      validate(command, validations),
      Failure([
        "Password must be provided.",
        "Email must be in a valid format."
      ])
    );
  });
});
