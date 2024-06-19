import { i as building } from "./internal.js";
import nano from "htmlnano";
function handle({ event, resolve }) {
  let page = "";
  return resolve(event, {
    async transformPageChunk({ html, done }) {
      page += html;
      if (!done) return;
      if (!building) return page;
      const { html: result } = await nano.process(
        page,
        { minifySvg: false, minifyCss: false },
        nano.presets.safe,
      );
      return result;
    },
  });
}
export { handle };
