import { useCurrentAccount, useSignTransactionBlock, useSuiClient } from '@mysten/dapp-kit';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from './App';
import { mintArtwork } from './lib/circlesClient';
import { formatSui } from './lib/utils';

export const Mint: React.FC = () =>
{
    const { collection, openConnectModal } = useOutletContext<AppContext>();
    const suiClient = useSuiClient();
    const { mutateAsync: signTransactionBlock } = useSignTransactionBlock();
    const currentAccount = useCurrentAccount();
    const [ errorMsg ] = useState<string|null>(null);

    const onClickMint = async () => {
        if (!currentAccount || !collection) {
            return;
        }
        try {
            const res = await mintArtwork({
                suiClient,
                signTransactionBlock,
                collectionId: collection.id,
                recipient: currentAccount.address,
                price: Number(collection.nextPrice), // MAYBE: send a little extra SUI to prevent race conditions
            });
            if (res.effects?.status.status === 'success') {
                console.debug('[onClickMint] transaction success:', res);
            } else {
                console.warn('[onClickMint] transaction failure:', res);
            }
        } catch(error) {
            console.warn('[onClickMint] unexpected error:', error);
        }
    };

    const onClickConnect = () => {
        openConnectModal();
    };

    return <>
    <div id='mint-page'>
        <h1 className='gta'>MINT</h1>
        <div className='page-content'>
            {(() => {
                if (!currentAccount) {
                    return <button className='big-btn' onClick={onClickConnect}>LOG IN</button>;
                }
                if (typeof collection === 'undefined')
                    return 'Loading...';
                if (collection === null)
                    return 'Error';
                return <button className='big-btn' onClick={() => {onClickMint()}}>Mint for {formatSui(collection.nextPrice)}</button>
            })()}
            <ErrorBox msg={errorMsg} />
        </div>
    </div>
    </>;
}

export const ErrorBox: React.FC<{
    msg: string|null,
}> = ({
    msg,
}) =>
{
    if (!msg) {
        return <></>;
    }
    return <div className='error-box'>
        <span className='error-msg'>{msg}</span>
    </div>;
}
