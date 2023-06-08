import { Link } from 'react-router-dom';
import '../css/Home.less';

export const Home: React.FC = () =>
{
    return <>
    <div id='home-page'>
        <div id='home-container'>
            <div id='home-title'>
                <h1>Circles.</h1>
                <h2>by <a id='by_polymedia' href='https://polymedia.app/' target='_blank'>Polymedia</a></h2>
            </div>
            <div id='home-buttons'>
                <Link to='/faq' className='btn'>Read F.A.Q.</Link>
            </div>
        </div>
    </div>
    </>;
}
