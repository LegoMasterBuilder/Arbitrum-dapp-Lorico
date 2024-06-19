<script>
    import { daoContract } from '../stores';
    import { ethers } from 'ethers';
    /**
   * @type {{ createProposal: (arg0: string, arg1: string) => any; } | null}
   */
    let contract;
    daoContract.subscribe(value => {
        contract = value;
    });

    let title = '';
    let description = '';

    const createProposal = async () => {
        if (contract) {
            try {
                const tx = await contract.createProposal(title, description);
                await tx.wait();
                alert('Proposal created successfully');
            } catch (error) {
                console.error("Error creating proposal:", error);
                alert('Error creating proposal');
            }
        }
    };
</script>

<div class="flex items-center justify-center py-2">
    <div class="card p-4 w-3/5 flex flex-col gap-2">
        <h4 class="h4">Create Proposal</h4>
        <label class="label">
            <span>Title</span>
            <input class="input" type="text" placeholder="Title" bind:value={title} />
        </label>
        <label class="label">
            <span>Description</span>
            <textarea class="textarea" rows="4" placeholder="Description" bind:value={description}></textarea>
        </label>
        <button type="button" class="btn variant-filled" on:click={createProposal}>
            Submit Proposal
        </button>
    </div>
</div>
