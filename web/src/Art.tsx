import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { AppContext } from './App';
import { ArtworkWithDisplay } from './lib/circlesClient';

export function Art()
{
    const artId: string = useParams().id || '';
    const { circlesClient } = useOutletContext<AppContext>();
    const [ artwork, setArtwork ] = useState<ArtworkWithDisplay|null|undefined>(undefined);

    useEffect(() => {
        (async () => {
            const artwork = await circlesClient.fetchArtworkById(artId);
            setArtwork(artwork);
        })();
    }, []);

    if (typeof artwork === 'undefined')
        return <h1>Loading...</h1>;

    if (artwork === null)
        return <h1>Error</h1>;

    return <>
        <h1>Polymedia Circles #{String(artwork.number)}</h1>
        <img width='250' src={artwork.display.image_url} />
        <div>
            <div>id: {artwork.id}</div>
            <div>circles: {artwork.circles.length}</div>
        </div>
    </>;
}
