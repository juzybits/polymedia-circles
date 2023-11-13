import { RefObject, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SuiClient } from '@mysten/sui.js/client';
import { ConnectModal, WalletKitProvider } from '@mysten/wallet-kit';
import { NetworkName, isLocalhost, loadNetwork, getRpcConfig } from '@polymedia/webutils';
import { Nav } from './Nav';
import { CirclesClient } from './lib/circlesClient';
import '../css/App.less';

export type AppContext = {
    layoutRef: RefObject<HTMLDivElement>;
    network: NetworkName;
    circlesClient: CirclesClient;
    openConnectModal: () => void;
};

export const AppWrap: React.FC = () =>
    <WalletKitProvider><App /></WalletKitProvider>;

export const App: React.FC = () =>
{
    const layoutRef = useRef<HTMLDivElement>(null);
    const [network, setNetwork] = useState<NetworkName>();
    const [circlesClient, setCirclesClient] = useState<CirclesClient>();
    const [showConnectModal, setShowConnectModal] = useState(false);

    useEffect(() => {
        async function initialize() {
            const network = isLocalhost() ? loadNetwork() : 'mainnet';
            const rpcConfig = await getRpcConfig({network, fetch: false});
            const suiClient = new SuiClient({url: rpcConfig.fullnode});
            setNetwork(network);
            setCirclesClient( new CirclesClient({network, suiClient}) );
        };
        initialize();
    }, []);

    const openConnectModal = (): void => {
        setShowConnectModal(true);
    };

    if (!network || !circlesClient) {
        return <></>;
    }

    const appContext: AppContext = {
        layoutRef,
        network,
        circlesClient: circlesClient,
        openConnectModal,
    };

    return <>
    <ConnectModal
        open={showConnectModal}
        onClose={() => setShowConnectModal(false)}
    />
    <div ref={layoutRef} id='layout'>
        <Nav network={network} openConnectModal={openConnectModal} />
        <div id='page'>
            <Outlet context={appContext} />
        </div>
    </div>
    </>;
}
