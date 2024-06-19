<script>
// @ts-nocheck

    import { account, connectWallet } from '../stores';
    let userAccount;

    account.subscribe(value => {
        userAccount = value;
    });

    const connect = () => {
        connectWallet();
    };
</script>

<div class="flex items-center justify-center py-2">
    <div class="card p-4 w-3/5 flex flex-col gap-2">
        <button class="btn variant-filled" on:click={connect}>Connect Wallet</button>

        <p>Status: {userAccount ? `Connected: ${userAccount}` : 'Not connected'}</p>
    </div>
</div>