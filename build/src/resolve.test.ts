

import { test, expect, describe } from "bun:test";
import { browserResolvePackage } from "./resolve";

describe("math", () => {
    test("standard", async() => {
        const res= await browserResolvePackage("solid-js","configuration")
        expect(res).toEqual("solid-js/dist/solid.js");
      });
  test("sub", async() => {
    const res= await browserResolvePackage("solid-js/web","configuration")
    expect(res).toEqual("solid-js/web/dist/web.js");
  });
});