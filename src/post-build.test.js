const fs = require("fs");

jest.mock("fs");
jest.mock("glob");

const MOCK_FILE_INFO = {
  "./some/folder/index.html":
    "[post_build_start]THIS_NEEDS_REPLACEMENT[post_build_end]",
  "./some/other/folder/index.html":
    "[post_build_start]THIS_ALSO_NEEDS_REPLACEMENT[post_build_end]",
};

describe("post build script", () => {
  beforeEach(() => {
    require("glob").__setMockFiles(Object.keys(MOCK_FILE_INFO));
    require("fs").__setMockFiles(MOCK_FILE_INFO);
  });

  it("should replace found items", () => {
    const mockWriteFileSync = jest.spyOn(fs, "writeFileSync");
    const PostBuild = require("./post-build");

    PostBuild.main();

    expect(mockWriteFileSync).toHaveBeenNthCalledWith(
      1,
      "./some/folder/index.html",
      "THIS IS NEW VALUE",
      expect.anything()
    );
    expect(mockWriteFileSync).toHaveBeenNthCalledWith(
      2,
      "./some/other/folder/index.html",
      "THIS IS NEW VALUE",
      expect.anything()
    );
  });
});
