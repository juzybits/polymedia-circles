import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import '../css/App.less';

export const App: React.FC = () =>
{
    return <>
    <div id='layout'>
        <Nav />
        <div id='page'>
            <Outlet />
        </div>
    </div>
    </>;
}
