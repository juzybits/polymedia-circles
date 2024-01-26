import { SuiEvent } from '@mysten/sui.js/client';
import { NetworkName, makeSuiExplorerUrl, shortenSuiAddress } from '@polymedia/suits';
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AppContext } from './App';
import { addArtworkToContainer, removeArtworkFromContainer } from './lib/art/addArtworkToContainer';
import { formatSui, isDev } from './lib/utils';

const HomeNew: React.FC = () =>
{
    const { circlesClient, collection, network } = useOutletContext<AppContext>();
    const [ events, setEvents ] = useState<SuiEvent[]|null|undefined>(undefined);

    useEffect(() => {
        (async () => {
            const events = await circlesClient.fetchEvents();
            setEvents(events);
        })();
    }, [circlesClient]);

    return (
        <div id='home-page'>
            <h1 className='gta'>HOME</h1>
            <div className='page-content'>
                <h2 className='gta'>COLLECTION INFO:</h2>
                <div>
                {(() => {
                    if (typeof collection === 'undefined')
                        return 'Loading...';
                    if (collection === null)
                        return 'Error';
                    return <>
                        <div>Object ID: <LinkToExplorer network={network} objectId={collection.id} /></div>
                        <div>Current supply: {String(collection.supply)}</div>
                        <div>Next price: {formatSui(collection.nextPrice)}</div>
                    </>;
                })()}
                </div>
                <h2 className='gta'>RECENT EVENTS:</h2>
                <div>
                {(() => {
                    if (typeof events === 'undefined')
                        return 'Loading...';
                    if (events === null)
                        return 'Error';
                    return <>{
                        events.map(event => {
                            const eventName = event.type.split('::')[2];
                            const eventFields = JSON.stringify(event.parsedJson);
                            return <div key={event.id.txDigest} style={{overflowWrap: 'anywhere'}}>{eventName}: {eventFields}</div>;
                        })
                    }</>;
                })()}
                </div>
            </div>
        </div>
    )
}

const LinkToExplorer: React.FC<{
    network: NetworkName,
    objectId: string;
}> = ({
    network,
    objectId,
}) => {
    return <a
        href={makeSuiExplorerUrl(network, 'object', objectId)}
        target='_blank'
        rel='noopener'
    >
        {shortenSuiAddress(objectId)}
    </a>
};

export const Home: React.FC = () =>
{
    if (isDev()) { return <HomeNew />; }

    const { layoutRef } = useOutletContext<AppContext>();

    useEffect(() =>
    {
        // Callback to handle resizing of the #home-page div
        const observer = new ResizeObserver((entries) =>
        {
            if (!layoutRef.current) {
                return;
            }
            for (const entry of entries) {
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
        const refValue = layoutRef.current;
        return () => {
            if (refValue) {
                observer.unobserve(refValue);
                removeArtworkFromContainer(refValue);
            }
        };
    }, [layoutRef]);

    return <>
    <div id='home-page-old'>
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
