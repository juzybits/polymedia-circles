import { useEffect } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import '../css/Mint.less';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from './App';

export const Mint: React.FC = () => // TODO
{
    const {
        currentAccount,
        // signTransactionBlock,
    } = useWalletKit();

    const {
        // circlesManager,
        openConnectModal,
    } = useOutletContext<AppContext>();

    useEffect(() => {
        document.title = 'Circles - Mint';
    }, []);

    const onClickMint = async () => {
        if (!currentAccount) {
            openConnectModal();
            return;
        }
    };

    return <>
    <div id='mint-page'>
        <button className='btn' onClick={onClickMint}>Mint</button>
    </div>
    </>;
}
