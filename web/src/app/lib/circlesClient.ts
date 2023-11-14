import {
    PaginatedEvents,
    PaginatedObjectsResponse,
    SuiClient,
    SuiEvent,
    SuiObjectResponse,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';
import { Artwork } from './sui-client-sdk/polymedia-circles/artwork/structs';
import { Collection, isCollection } from './sui-client-sdk/polymedia-circles/collection/structs';
import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

/* Constants */

export const PACKAGE_LOCALNET = '0x80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b';
export const COLLECTION_LOCALNET = '0x1daacfbf46094331d983f6144e5fe0a4e581535b4efd2b184e5e2d63800b25aa';

export const PACKAGE_DEVNET = '0x123';
export const COLLECTION_DEVNET = '0x123';

export const PACKAGE_TESTNET = '0x123';
export const COLLECTION_TESTNET = '0x123';

export const PACKAGE_MAINNET = '0x123';
export const COLLECTION_MAINNET = '0x123';

/* Types */

export type ArtworkWithDisplay = Artwork & {
    display: {
        [key: string]: string;
    };
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
            throw new Error('Network not recognized: ' + network);
        }
    }

    public async mintArtwork({
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

    public async fetchCollection(): Promise<Collection|null> {
        return this.suiClient.getObject({
            id: this.collectionId,
            options: {
                showContent: true,
            },
        })
        .then((resp: SuiObjectResponse) => {
            if (resp.error) {
                console.warn('[CirclesClient.fetchCollection] response error:', resp.error);
                return null;
            }
            if (resp.data?.content?.dataType !== 'moveObject') {
                console.warn('[CirclesClient.fetchCollection] content missing:', resp);
                return null;
            }
            if (!isCollection(resp.data.content.type)) {
                console.warn('[CirclesClient.fetchCollection] not a collection:', resp);
                return null;
            }
            return Collection.fromFieldsWithTypes({
                fields: resp.data.content.fields,
                type: resp.data.content.type,
            });
        })
        .catch((error: any) => {
            console.warn('[CirclesClient.fetchCollection] unexpected error:\n', error);
            return null;
        });
    }

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
        .catch((error: any) => {
            console.warn('[CirclesClient.fetchEvents] unexpected error:\n', error);
            return null;
        })
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
                const artworkWithDisplay: ArtworkWithDisplay = {
                    ...artwork,
                    display: suiObjRes.data.display.data,
                };
                artworks.push(artworkWithDisplay);
            }
            return artworks;
        })
        .catch((error: any) => {
            console.warn('[CirclesClient.fetchArtworksByOwner] unexpected error:\n', error);
            return null;
        })
    }
}
