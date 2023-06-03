/*
  ___  ___  _ __   ____  __ ___ ___ ___   _
 | _ \/ _ \| |\ \ / /  \/  | __|   \_ _| /_\
 |  _/ (_) | |_\ V /| |\/| | _|| |) | | / _ \
 |_|__\___/|____|_| |_|  |_|___|___/___/_/ \_\
  / __|_ _| _ \/ __| |  | __/ __|
 | (__ | ||   / (__| |__| _|\__ \
  \___|___|_|_\\___|____|___|___/ by @juzybits

*/

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './js/App';
import { Home } from './js/Home';
import { NotFound } from './js/NotFound';

ReactDOM
    .createRoot( document.getElementById('app') as Element )
    .render(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} >
                <Route index element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
