import { useEffect, useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import '../css/Mint.less';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from './App';

export const Mint: React.FC = () =>
{
    const {
        currentAccount,
        signTransactionBlock,
    } = useWalletKit();

    const [errorMsg, _setErrorMsg] = useState<string|null>(null);

    const {
        circlesManager,
        openConnectModal,
    } = useOutletContext<AppContext>();

    useEffect(() => {
        document.title = 'Circles - Mint';
    }, []);

    const onClickMint = async () => {
        if (!currentAccount) {
            return;
        }
        try {
            const res = await circlesManager.mintArtwork({
                signTransactionBlock,
                recipient: currentAccount.address,
                payCoin: '0x0bd4ba13556bd80f1bf2a950ddc59329b6f3e3ee811cd985f4509f96e7de7918', // TODO
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

    const onClickConnect = async () => {
        openConnectModal();
    };

    return <>
    <div id='mint-page'>
        {
            currentAccount
            ? <button className='big-btn' onClick={onClickMint}>Mint</button>
            : <button className='big-btn' onClick={onClickConnect}>Connect</button>
        }
        <ErrorBox msg={errorMsg} />
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
