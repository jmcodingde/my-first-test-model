# Example model-based e2e testing project

This project shows how model-based testing can be used to auto-generate e2e web UI tests.

It might serve as a reference and as a starting point for real-world projects.

## Built with

- [@xstate/test](https://stately.ai/docs/xstate/packages/xstate-test)
- [TestCafé](https://testcafe.io)

## What you can do

- Run the model (outputs the generated test paths): `npx tsx src/model.ts`
- Run the inspector server (outputs the visualizer URL): `npx tsx src/inspect.ts`
- Run the tests: `testcafe chrome src/tests.ts --speed 1 --stop-on-first-fail`
