import { useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtworkWithDisplay, fetchArtworkById } from './lib/circlesClient';

export function Art()
{
    const suiClient = useSuiClient();
    const artId: string = useParams().id ?? '';
    const [ artwork, setArtwork ] = useState<ArtworkWithDisplay|null|undefined>(undefined);

    useEffect(() => {
        (async () => {
            const artwork = await fetchArtworkById(suiClient, artId);
            setArtwork(artwork);
        })();
    }, [artId, suiClient]);

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
