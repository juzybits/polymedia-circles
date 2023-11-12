import { useWalletKit } from '@mysten/wallet-kit';
import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName, shortenAddress } from '@polymedia/webutils';
import { Link } from 'react-router-dom';
import '../css/Nav.less';
import { isDev } from './lib/isDev';

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
        <div id='nav-user' className='nav-section'>
        {
        !currentAccount ?
            <span id='nav-btn-connect' onClick={openConnectModal}>
                LOG IN
            </span>
        :
            <span onClick={disconnect}>
                Logged in as {shortenAddress(currentAccount.address)}
            </span>
        }
            {showNetworkSelector && <NetworkSelector currentNetwork={network} />}
        </div>

        <div id='nav-pages' className='nav-section'>
            <div className='nav-page-link'>
                <Link to='/'>HOME</Link>
            </div>
            <div className='nav-page-link'>
                <Link to='/mint'>MINT</Link>
            </div>
            <div className='nav-page-link'>
                <Link to='/owner'>OWNER</Link>
            </div>
            <div className='nav-page-link'>
                <Link to='/faq'>FAQ</Link>
            </div>
        </div>
    </header>
    );
}
