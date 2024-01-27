import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtworkWithDisplay, fetchArtworksByOwner } from './lib/circlesClient';

export const Owner: React.FC = () =>
{
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const [artworks, setArtworks] = useState<ArtworkWithDisplay[]|null|undefined>(undefined);

    useEffect(() => {
        if (!currentAccount) {
            setArtworks(undefined);
            return;
        }
        (async () => {
            const artworks = await fetchArtworksByOwner(
                suiClient,
                currentAccount.address,
            );
            setArtworks(artworks);
        })();
    }, [currentAccount, suiClient]);

    return <>
    <div id='owner-page'>
        <h1 className='gta'>OWNER</h1>
        <div className='page-content'>
            <h2>Your collection:</h2>
            {
            !currentAccount ? <>Log in to see your collection</>
            : (() => {
                if (typeof artworks === 'undefined')
                    return 'Loading...';
                if (artworks === null)
                    return 'Error';
                return <>{
                    artworks.map(artwork =>
                        <div key={artwork.number}>
                            <Link to={`/art/${artwork.id}`}>
                                <img width='250' src={artwork.display.image_url} />
                            </Link>
                        </div>
                    )
                }</>;
            })()
            }
        </div>
    </div>
    </>;
}
