import { RefObject, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SuiClient } from '@mysten/sui.js/client';
import { ConnectModal, WalletKitProvider } from '@mysten/wallet-kit';
import { NetworkName, isLocalhost, loadNetwork, getRpcConfig } from '@polymedia/webutils';
import { Nav } from './Nav';
import { CirclesManager } from './lib/circles';
import '../css/App.less';

export type AppContext = {
    layoutRef: RefObject<HTMLDivElement>;
    network: NetworkName;
    circlesManager: CirclesManager;
    openConnectModal: () => void;
};

export const AppWrap: React.FC = () =>
    <WalletKitProvider><App /></WalletKitProvider>;

export const App: React.FC = () =>
{
    const layoutRef = useRef<HTMLDivElement>(null);
    const [network, setNetwork] = useState<NetworkName>();
    const [circlesManager, setCirclesManager] = useState<CirclesManager>();
    const [showConnectModal, setShowConnectModal] = useState(false);

    useEffect(() => {
        async function initialize() {
            const network = isLocalhost() ? loadNetwork() : 'mainnet';
            const rpcConfig = await getRpcConfig({network, fetch: false});
            const suiClient = new SuiClient({url: rpcConfig.fullnode});
            setNetwork(network);
            setCirclesManager( new CirclesManager({network, suiClient}) );
        };
        initialize();
    }, []);

    const openConnectModal = (): void => {
        setShowConnectModal(true);
    };

    if (!network || !circlesManager) {
        return <></>;
    }

    const appContext: AppContext = {
        layoutRef,
        network,
        circlesManager,
        openConnectModal,
    };

    return <>
    <ConnectModal
        open={showConnectModal}
        onClose={() => setShowConnectModal(false)}
    />
    <div ref={layoutRef} id='layout'>
        <Nav network={network} />
        <div id='page'>
            <Outlet context={appContext} />
        </div>
    </div>
    </>;
}
