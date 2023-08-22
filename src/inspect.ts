import { inspect } from "@xstate/inspect/lib/server";
import { WebSocketServer } from "ws";
import { interpret } from "xstate";
import { testMachine } from "./model";

const port = 8888;

inspect({
  server: new WebSocketServer({
    port,
  }),
});

export const actor = interpret(testMachine, {
  devTools: true,
}).start();

const webSocketUrl = `ws://localhost:${port}`;
const vizualizerUrl = `https://stately.ai/viz?inspect&server=${webSocketUrl}`;
console.log({ vizualizerUrl });
