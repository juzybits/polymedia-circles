import {
    SuiClient,
    SuiObjectResponse,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';
import { Collection, isCollection } from './sui-client-sdk/polymedia-circles/collection/structs';
import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

export const PACKAGE_LOCALNET = '0x293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1';
export const COLLECTION_LOCALNET = '0x323a4d193fc0e5bbba1d35ea4d017308d69b2eeb26463fac2dcc8d0a5e9a32df';

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
}
