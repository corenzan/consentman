import { Police } from "./police";

describe("Police", () => {
  const police = new Police();

  test("registerModule()", () => {
    const module = {
      policy: "my-policy",
      install: jest.fn(),
      remove: jest.fn(),
      skip: jest.fn()
    };

    police.registerModule(module);

    expect(police.modules[0].policy).toBe("my-policy");

    police.modules[0].install();
    police.modules[0].remove();
    police.modules[0].skip();

    expect(module.install).toHaveBeenCalled();
    expect(module.remove).toHaveBeenCalled();
    expect(module.skip).toHaveBeenCalled();
  });
});
