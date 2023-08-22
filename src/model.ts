import { createTestModel } from "@xstate/test";
import { createMachine } from "xstate";

export const testMachine = createMachine({
  predictableActionArguments: true,
  initial: "sliderDisabled",
  states: {
    sliderDisabled: {
      on: {
        TOGGLE_CHECKBOX: "sliderEnabled",
      },
    },
    sliderEnabled: {
      on: {
        TOGGLE_CHECKBOX: "sliderDisabled",
      },
      initial: "atPos1",
      states: {
        atPos1: {
          on: {
            SLIDE_TO_POS_6: "atPos6",
            SLIDE_TO_POS_9: "atPos9",
          },
        },
        atPos6: {
          on: {
            SLIDE_TO_POS_1: "atPos1",
            SLIDE_TO_POS_9: "atPos9",
          },
        },
        atPos9: {
          on: {
            SLIDE_TO_POS_1: "atPos1",
            SLIDE_TO_POS_6: "atPos6",
          },
        },
      },
    },
  },
});

export const testPaths = createTestModel(testMachine).getSimplePaths();

console.log("\nThe following test paths have been generated:")
testPaths.forEach((path) => {
  console.log(`- ${path.description}`);
});
console.log();
