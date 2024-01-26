import {
    PaginatedEvents,
    PaginatedObjectsResponse,
    SuiClient,
    SuiEvent,
    SuiObjectResponse,
    // SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
// import { TransactionBlock } from '@mysten/sui.js/transactions';
// import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/suits';
import { Artwork, isArtwork } from './sui-client-sdk/polymedia-circles/artwork/structs';
import {
    Collection,
    // isCollection
} from './sui-client-sdk/polymedia-circles/collection/structs';
// import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

/* Constants */

export const PACKAGE_LOCALNET = '0x0';
export const COLLECTION_LOCALNET = '0x0';

export const PACKAGE_DEVNET = '0x2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092';
export const COLLECTION_DEVNET = '0xb3b8bd551facedf5df56deb379197c099232bc5df10e987fe8949657e883fb63';

export const PACKAGE_TESTNET = '0x123';
export const COLLECTION_TESTNET = '0x123';

export const PACKAGE_MAINNET = '0x123';
export const COLLECTION_MAINNET = '0x123';

/* Types */

export type ArtworkWithDisplay = Artwork & {
    display: Record<string, string>;
};

/**
 * Helper to interact with the `polymedia_circles` Sui package via the `sui-client-gen` SDK
 */
export class CirclesClient { // TODO: cache
    public readonly suiClient: SuiClient;
    public readonly packageId: string;
    public readonly collectionId: string;

    constructor({ network, suiClient }: {
        network: NetworkName,
        suiClient: SuiClient,
    }) {
        this.suiClient = suiClient;
        if (network === 'localnet') {
            this.packageId = PACKAGE_LOCALNET;
            this.collectionId = COLLECTION_LOCALNET;
        } else if (network === 'devnet') {
            this.packageId = PACKAGE_DEVNET;
            this.collectionId = COLLECTION_DEVNET;
        } else if (network === 'testnet') {
            this.packageId = PACKAGE_TESTNET;
            this.collectionId = COLLECTION_TESTNET;
        } else if (network === 'mainnet') {
            this.packageId = PACKAGE_MAINNET;
            this.collectionId = COLLECTION_MAINNET;
        } else {
            throw new Error('Network not recognized: ' + String(network));
        }
    }

    /*
    public async mintArtwork({ // TODO
        signTransactionBlock,
        recipient,
        price,
    }: {
        signTransactionBlock: WalletKitCore['signTransactionBlock'],
        recipient: string;
        price: number;
    }): Promise<SuiTransactionBlockResponse>
    {
        const txb = new TransactionBlock()
        const payCoin = txb.splitCoins(txb.gas, [price]);
        const [artwork, change] = mintArtwork(txb, {
            collection: this.collectionId,
            payCoin,
        });
        txb.transferObjects([artwork, change], txb.pure(recipient));
        const signedTx = await signTransactionBlock({
            transactionBlock: txb,
        });
        return this.suiClient.executeTransactionBlock({
            transactionBlock: signedTx.transactionBlockBytes,
            signature: signedTx.signature,
            options: {
                showEffects: true,
            },
        })
    }
    */

    public async fetchEvents(): Promise<SuiEvent[]|null> {
        return this.suiClient.queryEvents({
            query: {
                MoveModule: {
                    module: 'controller',
                    package: this.packageId,
                },
            }
        })
        .then((events: PaginatedEvents) => {
            return events.data;
        })
        .catch(error => {
            console.warn('[CirclesClient.fetchEvents] unexpected error:\n', error);
            return null;
        })
    }

    public async fetchCollection(): Promise<Collection|null> {
        return Collection.fetch(this.suiClient, this.collectionId)
        .then(collection => {
            return collection;
        })
        .catch(error => {
            console.warn('[CirclesClient.fetchCollection] unexpected error:\n', error);
            return null;
        })
    }

    public async fetchArtworkById(artId: string): Promise<ArtworkWithDisplay|null> {
        return this.suiClient.getObject({
            id: artId,
            options: {
                showContent: true,
                showDisplay: true,
            },
        })
        .then((suiObjRes: SuiObjectResponse) => {
            if (suiObjRes.error) {
                console.warn('[CirclesClient.fetchArtworkById] response error:', suiObjRes.error);
                return null;
            }
            if (suiObjRes.data?.content?.dataType !== 'moveObject') {
                console.warn('[CirclesClient.fetchArtworkById] content missing:', suiObjRes);
                return null;
            }
            if (!suiObjRes.data.display?.data) {
                console.warn('[CirclesClient.fetchArtworkById] display missing:', suiObjRes);
                return null;
            }
            if (!isArtwork(suiObjRes.data.content.type)) {
                console.warn('[CirclesClient.fetchArtworkById] not an artwork:', suiObjRes);
                return null;
            }
            const artwork = Artwork.fromFieldsWithTypes({
                fields: suiObjRes.data.content.fields,
                type: suiObjRes.data.content.type,
            });
            const artworkWithDisplay: ArtworkWithDisplay = Object.assign(
                artwork,
                { display: suiObjRes.data.display.data }
            );
            return artworkWithDisplay;
        })
        .catch(error => {
            console.warn('[CirclesClient.fetchArtworkById] unexpected error:\n', error);
            return null;
        });
    }

    public async fetchArtworksByOwner(ownerAddr: string): Promise<ArtworkWithDisplay[]|null> {
        return this.suiClient.getOwnedObjects({
            owner: ownerAddr,
            filter: {
                StructType: Artwork.$typeName,
            },
            options: {
                showContent: true,
                showDisplay: true,
            },
        })
        .then((events: PaginatedObjectsResponse) => {
            const artworks = new Array<ArtworkWithDisplay>();
            for (const suiObjRes of events.data) {
                if (suiObjRes.data?.content?.dataType !== 'moveObject') {
                    console.warn('[CirclesClient.fetchArtworksByOwner] content missing:', suiObjRes);
                    continue;
                }
                if (!suiObjRes.data.display?.data) {
                    console.warn('[CirclesClient.fetchArtworksByOwner] display missing:', suiObjRes);
                    continue;
                }
                const artwork = Artwork.fromFieldsWithTypes({
                    fields: suiObjRes.data.content.fields,
                    type: suiObjRes.data.content.type,
                });
                const artworkWithDisplay: ArtworkWithDisplay = Object.assign(
                    artwork,
                    { display: suiObjRes.data.display.data }
                );
                artworks.push(artworkWithDisplay);
            }
            return artworks;
        })
        .catch(error => {
            console.warn('[CirclesClient.fetchArtworksByOwner] unexpected error:\n', error);
            return null;
        })
    }
}
