import {
  getPreviewDataHelper,
  REGEX_EMAIL,
  REGEX_IMAGE_CONTENT_TYPE,
  REGEX_IMAGE_TAG,
  REGEX_LINK,
  REGEX_META,
  REGEX_TITLE,
} from "../web.helper";

describe("getPreviewDataHelper", () => {
  test("get simple github data", async () => {
    const result = await getPreviewDataHelper("https://github.com");
    expect(result).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      link: "https://github.com",
      image: expect.stringMatching(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i),
    });
  });
});

describe("regexWebHelper", () => {
  test("REGEX_EMAIL should match valid email addresses", () => {
    const testString =
      "Contact us at test@example.com or support@company.co.uk";
    const matches = testString.match(REGEX_EMAIL);
    expect(matches).toEqual(["test@example.com", "support@company.co.uk"]);
  });

  test("REGEX_IMAGE_CONTENT_TYPE should match image content types", () => {
    expect("image/jpeg".match(REGEX_IMAGE_CONTENT_TYPE)).toBeTruthy();
    expect("image/png".match(REGEX_IMAGE_CONTENT_TYPE)).toBeTruthy();
    expect("text/plain".match(REGEX_IMAGE_CONTENT_TYPE)).toBeFalsy();
  });

  test("REGEX_IMAGE_TAG should extract image sources", () => {
    const html = `
      <img src="test1.jpg" alt="Test 1">
      <img
        src='test2.png'
        data-src="wrong.jpg"
      >
    `;
    const matches = [...html.matchAll(REGEX_IMAGE_TAG)].map((m) => m[1]);
    expect(matches).toEqual(["test1.jpg", "test2.png"]);
  });

  test("REGEX_LINK should match various URL formats", () => {
    expect("https://example.com".match(REGEX_LINK)).toBeTruthy();
    expect("http://sub.example.com/path".match(REGEX_LINK)).toBeTruthy();
    expect("example.com".match(REGEX_LINK)).toBeTruthy();
    expect("invalid url".match(REGEX_LINK)).toBeFalsy();
  });

  test("REGEX_META should extract meta tags content", () => {
    const html = `
      <meta property="og:title" content="Page Title">
      <meta name='description' content='Page Description'>
    `;
    const matches = [...html.matchAll(REGEX_META)].map((m) => ({
      type: m[1],
      name: m[2],
      content: m[3],
    }));
    expect(matches).toEqual([
      { type: "property", name: "og:title", content: "Page Title" },
      { type: "name", name: "description", content: "Page Description" },
    ]);
  });

  test("REGEX_TITLE should extract page title", () => {
    const html = "<title>Test Page Title</title>";
    REGEX_TITLE.lastIndex = 0; //reset lastIndex
    const matches = [...html.matchAll(REGEX_TITLE)].map((m) => m[1]);
    expect(matches).toEqual(["Test Page Title"]);
  });
});
