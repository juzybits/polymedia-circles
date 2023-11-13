import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppWrap } from './js/App';
import { Demo } from './js/Demo';
import { FAQ } from './js/FAQ';
import { Home } from './js/Home';
import { Mint } from './js/Mint';
import { NotFound } from './js/NotFound';
import { Owner } from './js/Owner';

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
