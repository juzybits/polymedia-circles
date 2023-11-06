import { NetworkSelector } from '@polymedia/react-components';
import { NetworkName } from '@polymedia/webutils';
import { isDev } from './lib/isDev';

import '../css/Nav.less';

export const Nav: React.FC<{
    network: NetworkName;
    // openConnectModal: () => void;
}> = ({
    network,
    // openConnectModal,
}) =>
{
    return !isDev() ? null : (
        <header id='nav'>
            <NetworkSelector currentNetwork={network} />
        </header>
    );
}
