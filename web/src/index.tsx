import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppWrap } from './js/App';

import { Home } from './js/Home';
import { FAQ } from './js/FAQ';
import { Mint } from './js/Mint';
import { Demo } from './js/Demo';
import { NotFound } from './js/NotFound';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<AppWrap />} >
                <Route index element={<Home />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='mint' element={<Mint />} />
                <Route path='demo' element={<Demo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
