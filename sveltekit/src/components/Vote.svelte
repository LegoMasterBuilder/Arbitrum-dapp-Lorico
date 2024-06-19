<script>
// @ts-nocheck

    import { daoContract } from '../stores';
    let contract;
    daoContract.subscribe(value => {
        contract = value;
    });

    let proposalId;
    let vote; // true for yes, false for no

    const castVote = async () => {
        if (contract) {
            try {
                const tx = await contract.vote(proposalId, vote);
                await tx.wait();
                alert('Vote cast successfully');
            } catch (error) {
                console.error("Error casting vote:", error);
                alert('Error casting vote');
            }
        }
    };
</script>

<div class="flex items-center justify-center py-2">
    <div class="card p-4 w-3/5 flex flex-col gap-2">
        <h4 class="h4">Vote on Proposal</h4>
        <label class="label">
            <span>Title</span>
            <input class="input" type="number" placeholder="Proposal ID" bind:value={proposalId} />
        </label>
        <div class="space-y-2">
            <label class="flex items-center space-x-2">
                <input type="radio" name="vote" value="yes" on:click={() => vote = true} /> 
                <p>Yes</p>
            </label>
            <label class="flex items-center space-x-2">
                <input type="radio" name="vote" value="no" on:click={() => vote = false} /> 
                <p>No</p>
            </label>
        </div>
        <button class="btn variant-filled" on:click={castVote}>
            Cast Vote
        </button>
    </div>
</div>
