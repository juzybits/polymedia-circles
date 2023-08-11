import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName, isLocalhost } from '@polymedia/webutils';
import '../css/Nav.less';

export const Nav: React.FC<{
    network: NetworkName,
    // openConnectModal: () => void,
}> = ({
    network,
    // openConnectModal,
}) =>
{
    const showNetworkSelector = isLocalhost();

    return <>
    <header id='nav'>
        {showNetworkSelector && <NetworkSelector currentNetwork={network} />}
    </header>
    </>;
}
