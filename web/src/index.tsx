import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppWrap } from './app/App';
import { Demo } from './app/Demo';
import { FAQ } from './app/FAQ';
import { Home } from './app/Home';
import { Mint } from './app/Mint';
import { NotFound } from './app/NotFound';
import { Owner } from './app/Owner';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<AppWrap />} >
                <Route index element={<Home />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='mint' element={<Mint />} />
                <Route path='owner' element={<Owner />} />
                <Route path='demo' element={<Demo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
