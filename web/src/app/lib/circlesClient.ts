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
import { NetworkName } from '@polymedia/suits';
import { Artwork, isArtwork } from './sui-client-sdk/polymedia-circles/artwork/structs';
import { Collection, isCollection } from './sui-client-sdk/polymedia-circles/collection/structs';
import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

/* Constants */

export const PACKAGE_LOCALNET = '0xacbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4';
export const COLLECTION_LOCALNET = '0xddce029cbaa2b2448962190923b48c01497d3d7c42f9d03b2d36084edaf4d04a';

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

    public async fetchCollection(): Promise<Collection|null> {
        return this.suiClient.getObject({
            id: this.collectionId,
            options: {
                showContent: true,
            },
        })
        .then((suiObjRes: SuiObjectResponse) => {
            if (suiObjRes.error) {
                console.warn('[CirclesClient.fetchCollection] response error:', suiObjRes.error);
                return null;
            }
            if (suiObjRes.data?.content?.dataType !== 'moveObject') {
                console.warn('[CirclesClient.fetchCollection] content missing:', suiObjRes);
                return null;
            }
            if (!isCollection(suiObjRes.data.content.type)) {
                console.warn('[CirclesClient.fetchCollection] not a collection:', suiObjRes);
                return null;
            }
            return Collection.fromFieldsWithTypes({
                fields: suiObjRes.data.content.fields,
                type: suiObjRes.data.content.type,
            });
        })
        .catch((error: any) => {
            console.warn('[CirclesClient.fetchCollection] unexpected error:\n', error);
            return null;
        });
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
            const artworkWithDisplay: ArtworkWithDisplay = {
                ...artwork,
                display: suiObjRes.data.display.data,
            };
            return artworkWithDisplay;
        })
        .catch((error: any) => {
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
