export const index = 1;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/fallbacks/error.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/1.BfQ-zhoo.js",
  "_app/immutable/chunks/scheduler.CtbWrGNo.js",
  "_app/immutable/chunks/index.Cyd1-Rh9.js",
  "_app/immutable/chunks/entry.CupbeXnd.js",
  "_app/immutable/chunks/index.BjqbIcNX.js",
];
export const stylesheets = [];
export const fonts = [];
