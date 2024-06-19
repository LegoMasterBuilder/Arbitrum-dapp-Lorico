export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/_page.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/2.0XxcAk_u.js",
  "_app/immutable/chunks/scheduler.CtbWrGNo.js",
  "_app/immutable/chunks/index.Cyd1-Rh9.js",
  "_app/immutable/chunks/index.BjqbIcNX.js",
];
export const stylesheets = ["_app/immutable/assets/2.BoNok3jQ.css"];
export const fonts = [];
