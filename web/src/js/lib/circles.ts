import { SuiClient, SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';
import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';

export const PACKAGE_LOCALNET = '0x19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8';
export const COLLECTION_LOCALNET = '0x2eacbc2c3eb0bc46d5ba6f79c0da8e79d488c52fb1cb85b48b5a98fcd001abb6';

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
}
