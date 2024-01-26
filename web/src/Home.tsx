import { SuiEvent } from '@mysten/sui.js/client';
import { NetworkName, makeSuiExplorerUrl, shortenSuiAddress } from '@polymedia/suits';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from './App';
import { formatSui } from './lib/utils';

export const Home: React.FC = () =>
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
        rel='noopener noreferrer'
    >
        {shortenSuiAddress(objectId)}
    </a>
};
