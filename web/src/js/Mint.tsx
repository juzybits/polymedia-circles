import { useEffect, useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import '../css/Mint.less';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from './App';

export const Mint: React.FC = () => // TODO
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
        circlesManager.mint({signTransactionBlock, collection: '0x123', payCoin: '0x123'})
    };

    const onClickConnect = async () => {
        openConnectModal();
    };

    return <>
    <div id='mint-page'>
        {
            !currentAccount
            ? <button className='btn' onClick={onClickMint}>Mint</button>
            : <button className='btn' onClick={onClickConnect}>Connect</button>
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