import { RefObject, useRef } from 'react';
import { Outlet } from 'react-router-dom';
// import { Nav } from './Nav';
import '../css/App.less';

export type AppContext = {
    layoutRef: RefObject<HTMLDivElement>,
};

export const App: React.FC = () =>
{
    const layoutRef = useRef<HTMLDivElement>(null);

    const appContext: AppContext = {
        layoutRef,
    };

    return <>
    <div ref={layoutRef} id='layout'>
        {/* <Nav /> */}
        <div id='page'>
            <Outlet context={appContext} />
        </div>
    </div>
    </>;
}
