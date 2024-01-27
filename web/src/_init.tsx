import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Art } from './Art';
import { Demo } from './Demo';
import { FAQ } from './FAQ';
import { Home } from './Home';
import { Mint } from './Mint';
import { NotFound } from './NotFound';
import { Owner } from './Owner';

const queryClient = new QueryClient();
const networks = {
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('devnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
};

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networks} defaultNetwork='devnet'>
        <WalletProvider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} >
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
    </WalletProvider>
    </SuiClientProvider>
    </QueryClientProvider>
    );
