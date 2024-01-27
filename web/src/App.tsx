import { ConnectModal, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { NetworkName } from '@polymedia/suits';
import { getRpcConfig, isLocalhost, loadNetwork } from '@polymedia/webutils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.less';
import { Nav } from './Nav';
import { CirclesClient } from './lib/circlesClient';
import { Collection } from './lib/sui-client-sdk/polymedia-circles/collection/structs';

export type AppContext = {
    layoutRef: RefObject<HTMLDivElement>;
    network: NetworkName;
    circlesClient: CirclesClient;
    collection: Collection|null|undefined;
    openConnectModal: () => void;
};

const queryClient = new QueryClient();
const networks = {
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('devnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
};

export const App: React.FC = () =>
{
    const layoutRef = useRef<HTMLDivElement>(null);
    const [ network, setNetwork ] = useState<NetworkName>();
    const [ circlesClient, setCirclesClient ] = useState<CirclesClient>();
    const [ collection, setCollection ] = useState<Collection|null|undefined>(undefined);
    const [ showConnectModal, setShowConnectModal ] = useState(false);

    useEffect(() => {
        (async function initialize() {
            const network = isLocalhost() ? loadNetwork() : 'mainnet';
            setNetwork(network);

            const rpcConfig = await getRpcConfig({network, fetch: false});
            const suiClient = new SuiClient({url: rpcConfig.fullnode});
            const circlesClient = new CirclesClient({network, suiClient});
            setCirclesClient(circlesClient);

            const collection = await circlesClient.fetchCollection();
            setCollection(collection);
        })();
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
        circlesClient,
        collection,
        openConnectModal,
    };

    return <>
    <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networks} defaultNetwork='devnet'>
    <WalletProvider>
        <ConnectModal
            trigger={<></>}
            open={showConnectModal}
            onOpenChange={isOpen => { setShowConnectModal(isOpen); }}
        />
        <div ref={layoutRef} id='layout'>
            <Nav network={network} openConnectModal={openConnectModal} />
            <div id='page'>
                <Outlet context={appContext} />
            </div>
        </div>
    </WalletProvider>
    </SuiClientProvider>
    </QueryClientProvider>
    </>;
}
