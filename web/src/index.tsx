import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './js/App';
import { Home } from './js/Home';
import { FAQ } from './js/FAQ';
import { Mint } from './js/Mint';
import { View } from './js/View';
import { Blend } from './js/Blend';
import { Recycle } from './js/Recycle';
import { Demo } from './js/Demo';
import { NotFound } from './js/NotFound';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} >
                <Route index element={<Home />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='mint' element={<Mint />} />
                <Route path='view/:artId' element={<View />} />
                <Route path='blend/:artId' element={<Blend />} />
                <Route path='recycle/:artId' element={<Recycle />} />
                <Route path='demo' element={<Demo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
