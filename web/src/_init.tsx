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

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
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
    );
