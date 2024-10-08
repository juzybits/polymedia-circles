/* AppWrapRouter */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Art } from './Art';
import { Demo } from './Demo';
import { FAQ } from './FAQ';
import { Home } from './Home';
import { Mint } from './Mint';
import { NotFound } from './NotFound';
import { Owner } from './Owner';

export const AppWrapRouter: React.FC = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AppWrapSui />} >
                <Route index element={<Home />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='art/:id' element={<Art />} />
                <Route path='mint' element={<Mint />} />
                <Route path='owner' element={<Owner />} />
                <Route path='demo' element={<Demo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

/* AppWrapSui */

import { SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { isLocalhost, loadNetwork } from '@polymedia/webutils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
            packageId: '0xe2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed',
            collectionId: '0xb1e2599cf949cea05022b2852f57b296758791b8a8e36528990d371fea280119',
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
        url: 'https://rpc-mainnet.suiscan.xyz',
        variables: {
            packageId: '0x123',
            collectionId: '0x123',
        },
    },
});

const queryClient = new QueryClient();
const AppWrapSui: React.FC = () => {
    const [network, setNetwork] = useState<NetworkName>(isLocalhost() ? loadNetwork() : 'mainnet');
    return (
    <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} network={network}>
            <WalletProvider>
                <App network={network} setNetwork={setNetwork} />
            </WalletProvider>
        </SuiClientProvider>
    </QueryClientProvider>
    );
}

/* App */

import { ConnectModal, useSuiClient } from '@mysten/dapp-kit';
import { NetworkName } from '@polymedia/suits';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.less';
import { Nav } from './Nav';
import { fetchCollection } from './lib/circlesClient';
import { Collection } from './lib/sui-client-sdk/polymedia-circles/collection/structs';

export type AppContext = {
    network: NetworkName;
    collection: Collection|null|undefined;
    useNetworkVariable: typeof useNetworkVariable;
    openConnectModal: () => void;
};

const App: React.FC<{
    network: NetworkName,
    setNetwork: React.Dispatch<React.SetStateAction<NetworkName>>,
}> = ({
    network,
    setNetwork,
}) =>
{
    const suiClient = useSuiClient();
    const collectionId = useNetworkVariable('collectionId');
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
        <div id='layout'>
            <Nav network={network} setNetwork={setNetwork} openConnectModal={openConnectModal} />
            <div id='page'>
                <Outlet context={appContext} />
            </div>
        </div>
    </>;
}
