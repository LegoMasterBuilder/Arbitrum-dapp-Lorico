<script>
    import { ethers } from 'ethers';
    // @ts-ignore
    import { provider, signer, account } from '../stores';
    import { onMount } from 'svelte';

    let daoContractAddress = 'YOUR_DAO_CONTRACT_ADDRESS';
    // @ts-ignore
    let daoAbi = [
        // ABI of your DAO contract
    ];

    /**
   * @type {ethers.Contract}
   */
    let contract;
    /**
   * @type {any}
   */
    let userAccount;
    let userShares = 0;
    let userVotePower = 0;

    onMount(() => {
        account.subscribe(value => {
            userAccount = value;
        });

        signer.subscribe(value => {
            if (value) {
                // @ts-ignore
                contract = new ethers.Contract(daoContractAddress, daoAbi, value);
                getUserDetails();
            }
        });
    });

    async function getUserDetails() {
        if (contract && userAccount) {
            // @ts-ignore
            userShares = await contract.shares(userAccount);
            // @ts-ignore
            userVotePower = await contract.votePower(userAccount);
        }
    }

    async function contribute() {
        if (contract) {
            // @ts-ignore
            const tx = await contract.contribute({ value: ethers.utils.parseEther('1') });
            await tx.wait();
            getUserDetails();
        }
    }

    // @ts-ignore
    async function transferShares(to, amount) {
        if (contract) {
            // @ts-ignore
            const tx = await contract.transferShares(to, amount);
            await tx.wait();
            getUserDetails();
        }
    }
</script>

<p>Shares: {userShares}</p>
<p>Vote Power: {userVotePower}</p>

<button on:click={contribute}>Contribute 1 ETH</button>
