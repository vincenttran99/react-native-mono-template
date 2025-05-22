import { formatNumberWithSuffixHelper } from "../number.helper";

describe("formatNumberWithSuffixHelper", () => {
  test("format simple number", () => {
    const result = formatNumberWithSuffixHelper(20000);

    expect(result).toEqual("20k");
  });

  test("format number with decimal", () => {
    const result = formatNumberWithSuffixHelper(20000.5);
    expect(result).toEqual("20.0k");
  });

  test("format number with suffix", () => {
    const result = formatNumberWithSuffixHelper(2000000000, 0, "Billion");
    expect(result).toEqual("2B");
  });
});
