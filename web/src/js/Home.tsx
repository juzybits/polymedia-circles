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

        const repaintCircles = (canvasWidth: number, canvasHeight: number) => {
            // Generate a new artwork svg
            const maxRadius = Math.min(canvasWidth, canvasHeight) / 4;
            const newArtwork = newArtworkSvg({
                canvasWidth,
                canvasHeight,
                minCircles: 3,
                maxCircles: 5,
                minRadius: maxRadius / 8,
                maxRadius,
                strokeWidth: 5,
                withFrame: false,
                withFooter: false,
            });
            // Remove old svg if it exists
            const oldSvg = page.querySelector('.svg-artwork');
            if (oldSvg) {
                page.removeChild(oldSvg);
            }
            // Append a new svg to the page
            page.appendChild(newArtwork);
        };

        // Callback to handle resizing of the #home-page div
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                repaintCircles(entry.contentRect.width, entry.contentRect.height);
            }
        });
        // Start observing the div
        observer.observe(page);
        // Cleanup function
        return () => {
            observer.unobserve(page);
        };
    }, []);

    return <>
    <div ref={pageRef} id='home-page'>
        <div id='home-container'>
            <div id='home-title'>
                <h1>Circles.</h1>
                <h2>by <a id='by_polymedia' href='https://polymedia.app/' target='_blank' rel="noopener">Polymedia</a></h2>
            </div>
            <div id='home-buttons'>
                <Link to='/faq' className='btn'>Read F.A.Q.</Link>
            </div>
        </div>
    </div>
    </>;
}
