import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newArtworkSvg } from './lib/svg_builder';
import '../css/Home.less';

export const Home: React.FC = () =>
{
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const page = pageRef.current;
        if (!page) return;

        // Remove old svg if it exists
        const oldSvg = page.querySelector('.svg-artwork');
        if (oldSvg) {
            page.removeChild(oldSvg);
        }

        // Get window dimensions
        const windowWitdth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        const windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        // Append a new svg to the page
        const maxRadius = Math.min(windowWitdth, windowHeight) / 4;
        page.appendChild(newArtworkSvg({
            canvasWidth: windowWitdth,
            canvasHeight: windowHeight,
            minRadius: maxRadius/10,
            maxRadius,
            withFrame: false,
            withFooter: false,
        }));
    }, []);

    return <>
    <div ref={pageRef} id='home-page'>
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
