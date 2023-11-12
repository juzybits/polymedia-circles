import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import '../css/Home.less';
import { AppContext } from './App';
import { addArtworkToContainer, removeArtworkFromContainer } from './lib/addArtworkToContainer';
import { isDev } from './lib/isDev';
import { Collection } from './lib/sui-client-sdk/polymedia-circles/collection/structs';

const HomeNew: React.FC = () =>
{
    const { circlesManager } = useOutletContext<AppContext>();

    const [collection, setCollection] = useState<Collection|null|undefined>(undefined);

    useEffect(() => {
        (async function initialize() {
            const collection = await circlesManager.fetchCollection();
            setCollection(collection);
        })();
    }, []);

    return (
        <div id='home-page'>
            <h2>Collection:</h2>
            <div>{String(collection)}</div>
        </div>
    )
}

export const Home: React.FC = () =>
{
    if (isDev()) {
        return <HomeNew />;
    }

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
                <Link to='/faq' className='big-btn'>Read F.A.Q.</Link>
            </div>
        </div>
    </div>
    </>;
}
