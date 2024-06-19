import {
  c as create_ssr_component,
  e as escape,
  b as add_attribute,
  v as validate_component,
} from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
const account = writable(null);
const daoContract = writable(null);
const Wallet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userAccount;
  account.subscribe((value) => {
    userAccount = value;
  });
  return `<div class="flex items-center justify-center py-2"><div class="card p-4 w-3/5 flex flex-col gap-2"><button class="btn variant-filled" data-svelte-h="svelte-bcxwpo">Connect Wallet</button> <p>Status: ${escape(userAccount ? `Connected: ${userAccount}` : "Not connected")}</p></div></div>`;
});
const CreateProposal = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    daoContract.subscribe((value) => {});
    let title = "";
    return `<div class="flex items-center justify-center py-2"><div class="card p-4 w-3/5 flex flex-col gap-2"><h4 class="h4" data-svelte-h="svelte-1e6b4c3">Create Proposal</h4> <label class="label"><span data-svelte-h="svelte-7ccxmo">Title</span> <input class="input" type="text" placeholder="Title"${add_attribute("value", title, 0)}></label> <label class="label"><span data-svelte-h="svelte-rmspr8">Description</span> <textarea class="textarea" rows="4" placeholder="Description">${escape("")}</textarea></label> <button class="btn variant-filled" data-svelte-h="svelte-1i1iwgr">Submit Proposal</button></div></div>`;
  },
);
const Vote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  daoContract.subscribe((value) => {});
  let proposalId;
  return `<div class="flex items-center justify-center py-2"><div class="card p-4 w-3/5 flex flex-col gap-2"><h4 class="h4" data-svelte-h="svelte-19ybxxq">Vote on Proposal</h4> <label class="label"><span data-svelte-h="svelte-7ccxmo">Title</span> <input class="input" type="number" placeholder="Proposal ID"${add_attribute("value", proposalId, 0)}></label> <div class="space-y-2"><label class="flex items-center space-x-2"><input type="radio" name="vote" value="yes"> <p data-svelte-h="svelte-1wwlnrb">Yes</p></label> <label class="flex items-center space-x-2"><input type="radio" name="vote" value="no"> <p data-svelte-h="svelte-8xe5xx">No</p></label></div> <button class="btn variant-filled" data-svelte-h="svelte-8mvr79">Cast Vote</button></div></div>`;
});
const css = {
  code: "main.svelte-18d4fpq{text-align:center;padding:1em}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import Wallet from '../components/Wallet.svelte';\\n    import CreateProposal from '../components/CreateProposal.svelte';\\n    import Vote from '../components/Vote.svelte';\\n<\/script>\\n\\n<main>\\n    <div class=\\"p-10\\">\\n        <h1 class=\\"h1 font-semibold\\">\\n            <span class=\\"bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone\\">\\n                Svelte DAO on Arbitrum\\n            </span>\\n        </h1>\\n    </div>\\n    <Wallet />\\n    <CreateProposal />\\n    <Vote />\\n</main>\\n\\n<style>\\n    main {\\n        text-align: center;\\n        padding: 1em;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAoBI,mBAAK,CACD,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GACb"}`,
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-18d4fpq"><div class="p-10" data-svelte-h="svelte-1u9japi"><h1 class="h1 font-semibold"><span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">Svelte DAO on Arbitrum</span></h1></div> ${validate_component(Wallet, "Wallet").$$render($$result, {}, {}, {})} ${validate_component(CreateProposal, "CreateProposal").$$render($$result, {}, {}, {})} ${validate_component(Vote, "Vote").$$render($$result, {}, {}, {})} </main>`;
});
export { Page as default };
