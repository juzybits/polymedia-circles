import {
    PaginatedEvents,
    SuiClient,
    SuiEvent,
    SuiObjectResponse,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';
import { Collection, isCollection } from './sui-client-sdk/polymedia-circles/collection/structs';
import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

export const PACKAGE_LOCALNET = '0xfbe14b58a0d88b43908491f87f59b07375a2618df5a5fef855c84f01ff4739bd';
export const COLLECTION_LOCALNET = '0xc8277d014ac46e752fd92fa41a37f1b8177e3b9c29d16cca1db0e7bf889fefb5';

export const PACKAGE_DEVNET = '0x123';
export const COLLECTION_DEVNET = '0x123';

export const PACKAGE_TESTNET = '0x123';
export const COLLECTION_TESTNET = '0x123';

export const PACKAGE_MAINNET = '0x123';
export const COLLECTION_MAINNET = '0x123';

/**
 * Helper to interact with the `polymedia_circles` Sui package via the `sui-client-gen` SDK
 */
export class CirclesManager {
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
        payCoin,
    }: {
        signTransactionBlock: WalletKitCore['signTransactionBlock'],
        recipient: string;
        payCoin: string;
    }): Promise<SuiTransactionBlockResponse>
    {
        const txb = new TransactionBlock()
        const [artwork, change] = mintArtwork(txb, {
            collection: this.collectionId,
            payCoin,
        });
        txb.transferObjects([artwork], txb.pure(recipient));
        txb.transferObjects([change], txb.pure(recipient));
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
                console.warn('[CirclesManager.fetchCollection] response error:', resp.error);
                return null;
            }
            if (resp.data?.content?.dataType !== 'moveObject') {
                console.warn('[CirclesManager.fetchCollection] content missing:', resp);
                return null;
            }
            if (!isCollection(resp.data.content.type)) {
                console.warn('[CirclesManager.fetchCollection] not a collection:', resp);
                return null;
            }
            return Collection.fromFieldsWithTypes({
                fields: resp.data.content.fields,
                type: resp.data.content.type,
            });
        })
        .catch((error: any) => {
            console.warn('[CirclesManager.fetchCollection] unexpected error:\n', error);
            return null;
        });
    }

    public async fetchEvents(): Promise<SuiEvent[]> {
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
            console.warn('[CirclesManager.fetchEvents] unexpected error:\n', error);
            return [];
        })
    }
}
