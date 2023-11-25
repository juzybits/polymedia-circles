import { useWalletKit } from '@mysten/wallet-kit';
import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName, shortenAddress } from '@polymedia/webutils';
import { Link } from 'react-router-dom';
import { isDev } from './lib/utils';

export const Nav: React.FC<{
    network: NetworkName;
    openConnectModal: () => void;
}> = ({
    network,
    openConnectModal,
}) =>
{
    if (!isDev()) return null;

    const { currentAccount, disconnect } = useWalletKit();

    const showNetworkSelector = isDev();

    return (
    <header id='nav'>
        <Link to='/' className='nav-item'>HOME</Link>
        <Link to='/mint' className='nav-item'>MINT</Link>
        <Link to='/owner' className='nav-item'>OWNER</Link>
        <Link to='/faq' className='nav-item'>FAQ</Link>
        {
        !currentAccount ?
            <div className='nav-item' onClick={openConnectModal} style={{color: '#ffdcea'}}>
                LOG IN
            </div>
        :
            <div className='nav-item' onClick={disconnect} style={{color: '#bfffbf'}}>
                {shortenAddress(currentAccount.address)}
            </div>
        }
        {/* {showNetworkSelector && <NetworkSelector currentNetwork={network} />} */}
    </header>
    );
}
