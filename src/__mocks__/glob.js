"use strict";

const glob = jest.createMockFromModule("glob");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `glob` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

// A custom version of `GlobSync` that reads from the special mocked out
// file list set via __setMockFiles
function globSync() {
  return mockFiles || [];
}

glob.__setMockFiles = __setMockFiles;
glob.globSync = globSync;

module.exports = glob;
