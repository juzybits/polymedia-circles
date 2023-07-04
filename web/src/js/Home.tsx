import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AppContext } from './App';
import { addArtworkToContainer, removeArtworkFromContainer } from './lib/addArtworkToContainer';
import '../css/Home.less';

export const Home: React.FC = () =>
{
    const { layoutRef } = useOutletContext<AppContext>();

    useEffect(() =>
    {
        // Callback to handle resizing of the #home-page div
        const observer = new ResizeObserver((entries) =>
        {
            if (!layoutRef.current) {
                return;
            }
            for (let entry of entries) {
                addArtworkToContainer({
                    container: layoutRef.current,
                    canvasWidth: entry.contentRect.width,
                    canvasHeight: entry.contentRect.height,
                    minCircles: 5,
                    maxCircles: 5,
                });
            }
        });

        // Start observing the div
        if (layoutRef.current)
            observer.observe(layoutRef.current);

        // Cleanup function
        return () => {
            if (layoutRef.current) {
                observer.unobserve(layoutRef.current);
                removeArtworkFromContainer(layoutRef.current);
            }
        };
    }, []);

    return <>
    <div id='home-page'>
        <div id='home-container'>
            <div id='home-title'>
                <h1>Circles.</h1>
                <h2>by <a id='by_polymedia' href='https://polymedia.app/' target='_blank' rel='noopener'>Polymedia</a></h2>
            </div>
            <div id='home-buttons'>
                <Link to='/faq' className='btn'>Read F.A.Q.</Link>
            </div>
        </div>
    </div>
    </>;
}
