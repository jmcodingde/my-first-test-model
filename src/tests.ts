import { Selector } from "testcafe";
import { testPaths } from "./model";
import { actor } from "./inspect";

const checkbox = Selector("#tried-test-cafe");
const slider = Selector("#slider");
const sliderHandle = Selector(".ui-slider-handle");
const sliderTickmark = Selector(".slider-value");

fixture("Our example test page (SUT)").page(
  "https://devexpress.github.io/testcafe/example/"
);

testPaths.forEach(async (path) => {
  test(path.description, async (t) => {

    await t.wait(1000);
    actor.stop();
    actor.start(actor.initialState);

    await path.test({
      states: {
        sliderDisabled: async () => {
          await t.expect(slider.hasClass("ui-slider-disabled")).ok();
        },
        sliderEnabled: async () => {
          await t.expect(slider.hasClass("ui-slider-disabled")).notOk();
        },
        "sliderEnabled.atPos1": async () => {
          await t.expect(sliderHandle.offsetLeft).eql(-8);
        },
        "sliderEnabled.atPos6": async () => {
          const tickmarkOffsetLeft = await sliderTickmark.withText("6").offsetLeft;
          await t
            .expect(sliderHandle.offsetLeft)
            .eql(tickmarkOffsetLeft - 8);
        },
      },
      events: {
        TOGGLE_CHECKBOX: async () => {
          await t.click(checkbox);
          actor.send("TOGGLE_CHECKBOX");
        },
        SLIDE_TO_POS_1: async () => {
          await t.dragToElement(sliderHandle, sliderTickmark.withText("1"));
          actor.send("SLIDE_TO_POS_1");
        },
        SLIDE_TO_POS_6: async () => {
          await t.dragToElement(sliderHandle, sliderTickmark.withText("6"));
          actor.send("SLIDE_TO_POS_6");
        },
      },
    });
  });
});
