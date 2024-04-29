const finalConfig = {
  "extends": ["@xylabs", "@xylabs/react"],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', project: './tsconfig.json', sourceType: 'module', tsconfigRootDir: null },
  "root": true,
  "ignorePatterns": [
    "dist",
    "node_modules",
    "docs",
    "coverage",
    "docker",
    "nftData",
    "testData.json",
    "storybook-static",
    "*.stories.*",
    "swagger.json",
    ".yarn",
    ".*"
  ],
  "rules": {
    "import/no-default-export": ["off"],
    "unicorn/no-await-expression-member": ["off"],
    "@typescript-eslint/no-misused-promises": ["off"],
    "unicorn/prevent-abbreviations": ["off"],
    "unicorn/no-nested-ternary": ["off"],
    "unicorn/no-null": ["off"],
    "unicorn/catch-error-name": ["off"],
    "unicorn/filename-case": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["warn", { "accessibility": "no-public" }],
    "no-restricted-imports": [
      "warn",
      {
        "paths": [
          "@mui/system",
          "@xyo-network/archivist",
          "@xyo-network/bridge",
          "@xyo-network/core",
          "@xyo-network/diviner",
          "@xyo-network/module",
          "@xyo-network/modules",
          "@xyo-network/node",
          "@xyo-network/sdk",
          "@xyo-network/plugins",
          "@xyo-network/protocol",
          "@xyo-network/sentinel",
          "@xyo-network/witness",
          "@xyo-network/core-payload-plugins",
          "react-player",
          "filepond",
          "aos",
          "react-icons",
          ".",
          "..",
          "../..",
          "../../..",
          "../../../..",
          "../../../../..",
          "../../../../../..",
          "../../../../../../.."
        ]
      }
    ],
    "import/no-internal-modules": [
      "warn", {
        "allow": [
          "source-map-support/*",
          "lodash/*",
          "aws-sdk/**/*",
          "types/*"
        ]
      }
    ]
  }
}

module.exports = finalConfig
