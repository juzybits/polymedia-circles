import { ConnectModal, SuiClientProvider, WalletProvider, createNetworkConfig, useSuiClient } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { NetworkName } from '@polymedia/suits';
import { isLocalhost, loadNetwork } from '@polymedia/webutils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.less';
import { Nav } from './Nav';
import { fetchCollection } from './lib/circlesClient';
import { Collection } from './lib/sui-client-sdk/polymedia-circles/collection/structs';

/* AppWrap - Sui configuration */

const { networkConfig, useNetworkVariable } = createNetworkConfig({
    localnet: {
        url: getFullnodeUrl('localnet'),
        variables: {
            packageId: '0x0',
            collectionId: '0x0',
        },
    },
    devnet: {
        url: getFullnodeUrl('devnet'),
        variables: {
            packageId: '0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092',
            collectionId: '0xb3b8bd551facedf5df56deb379197c099232bc5df10e987fe8949657e883fb63',
        },
    },
    testnet: {
        url: getFullnodeUrl('testnet'),
        variables: {
            packageId: '0x123',
            collectionId: '0x123',
        },
    },
    mainnet: {
        url: getFullnodeUrl('mainnet'), // TODO: await getRpcConfig({network, fetch: false})
        variables: {
            packageId: '0x123',
            collectionId: '0x123',
        },
    },
});

const queryClient = new QueryClient();
const network = isLocalhost() ? loadNetwork() : 'mainnet';

export const AppWrap: React.FC = () => {
    return <>
    <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} network={network}>
            <WalletProvider>
                <App />
            </WalletProvider>
        </SuiClientProvider>
    </QueryClientProvider>
    </>;
}

/* App - the actual app */

export type AppContext = {
    layoutRef: RefObject<HTMLDivElement>;
    network: NetworkName;
    collection: Collection|null|undefined;
    useNetworkVariable: typeof useNetworkVariable;
    openConnectModal: () => void;
};

export const App: React.FC = () =>
{
    const suiClient = useSuiClient();
    const collectionId = useNetworkVariable('collectionId');
    const layoutRef = useRef<HTMLDivElement>(null);
    const [ collection, setCollection ] = useState<Collection|null|undefined>(undefined);
    const [ showConnectModal, setShowConnectModal ] = useState(false);

    useEffect(() => {
        (async () => {
            const collection = await fetchCollection(suiClient, collectionId);
            setCollection(collection);
        })();
    }, [collectionId, suiClient]);

    const openConnectModal = (): void => {
        setShowConnectModal(true);
    };

    const appContext: AppContext = {
        layoutRef,
        network,
        collection,
        useNetworkVariable,
        openConnectModal,
    };

    return <>
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
    </>;
}
