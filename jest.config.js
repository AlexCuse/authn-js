module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
      "node-modules/(?!@bundled-es-modules)"
  ]
};
