import { Config } from "@jest/types";

const esModules = ["jest-snapshot"].join("|");

const config: Config.InitialOptions = {
	verbose: true,
	testRegex: "(/tests\\//.*|(\\.|/)(test|spec))\\.c?ts$",
	preset: "ts-jest/presets/default",
	extensionsToTreatAsEsm: [".ts", ".mts", ".cts"],
	transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
	collectCoverageFrom: ["src/**/*.ts"],
	collectCoverage: true,
	cache: true,
	coverageReporters: ["text"],
	globals: {
		"ts-jest": {
			useESM: true
		}
	},
	moduleNameMapper: {}
};

export default config;
