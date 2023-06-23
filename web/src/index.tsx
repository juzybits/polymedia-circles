import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppWrap } from './js/App';
// Main pages
import { Home } from './js/Home';
import { FAQ } from './js/FAQ';
import { Activity } from './js/Activity';
import { MyCircles } from './js/MyCircles';
// Artwork actions
import { Mint } from './js/Mint';
import { View } from './js/View';
import { Freeze } from './js/Freeze';
import { Burn } from './js/Burn';
import { Recycle } from './js/Recycle';
import { Blend } from './js/Blend';
// Special pages
import { Demo } from './js/Demo';
import { NotFound } from './js/NotFound';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<AppWrap />} >
                {/* main pages */}
                <Route index element={<Home />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='activity' element={<Activity />} />
                <Route path='mycircles' element={<MyCircles />} />
                {/* artwork actions */}
                <Route path='mint' element={<Mint />} />
                <Route path='view/:artId' element={<View />} />
                <Route path='freeze/:artId' element={<Freeze />} />
                <Route path='burn/:artId' element={<Burn />} />
                <Route path='recycle/:artId' element={<Recycle />} />
                <Route path='blend/:artId' element={<Blend />} />
                {/* Special pages */}
                <Route path='demo' element={<Demo />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
