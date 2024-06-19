<script>
    import Wallet from '../components/Wallet.svelte';
    import CreateProposal from '../components/CreateProposal.svelte';
    import Vote from '../components/Vote.svelte';
</script>

<main>
    <div class="p-10">
        <h1 class="h1 font-semibold">
            <span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">
                Svelte DAO on Arbitrum
            </span>
        </h1>
    </div>
    <Wallet />
    <CreateProposal />
    <Vote />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
    }
</style>
