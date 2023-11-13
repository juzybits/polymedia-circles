import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../css/Owner.less';
import { AppContext } from './App';
import { ArtworkWithDisplay } from './lib/circles';

export const Owner: React.FC = () =>
{
    const { currentAccount } = useWalletKit();
    const { circlesManager } = useOutletContext<AppContext>();
    const [artworks, setArtworks] = useState<ArtworkWithDisplay[]|null|undefined>(undefined);

    useEffect(() => {
        if (!currentAccount) {
            setArtworks(undefined);
            return;
        }
        (async () => {
            const artworks = await circlesManager.fetchArtworksByOwner(currentAccount.address);
            setArtworks(artworks);
        })();
    }, [currentAccount]);

    return <>
    <div id='owner-page'>
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
                        <img width='250' src={artwork.display.image_url} />
                    </div>
                )
            }</>;
        })()
        }
    </div>
    </>;
}
