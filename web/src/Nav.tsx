import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName, shortenSuiAddress } from '@polymedia/suits';
import { Link, useLocation } from 'react-router-dom';
import { isDev } from './lib/utils';
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';

export const Nav: React.FC<{
    network: NetworkName;
    openConnectModal: () => void;
}> = ({
    network,
    openConnectModal,
}) =>
{
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();

    const showNetworkSelector = isDev();

    const path = (useLocation()).pathname;

    return (
    <header id='nav'>
        <Link to='/' className={'nav-item gta' + (path == '/' ? ' selected' : '')}>HOME</Link>
        <Link to='/mint' className={'nav-item gta' + (path == '/mint' ? ' selected' : '')}>MINT</Link>
        <Link to='/owner' className={'nav-item gta' + (path == '/owner' ? ' selected' : '')}>OWNER</Link>
        <Link to='/faq' className={'nav-item gta' + (path == '/faq' ? ' selected' : '')}>FAQ</Link>
        {
        !currentAccount ?
            <div className='nav-item gta' onClick={openConnectModal} style={{color: '#ffdcea'}}>
                LOG IN
            </div>
        :
            <div className='nav-item gta' onClick={() => {disconnect()}} style={{color: '#bfffbf'}}>
                {shortenSuiAddress(currentAccount.address)}
            </div>
        }
        {showNetworkSelector && <div className='nav-item gta'>
            <NetworkSelector currentNetwork={network} />
        </div>}
    </header>
    );
}
