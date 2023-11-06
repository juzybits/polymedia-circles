import { SuiClient } from '@mysten/sui.js/client';
// import { TransactionBlock } from '@mysten/sui.js/transactions';
// import { WalletKitCore } from '@mysten/wallet-kit-core';
import { NetworkName } from '@polymedia/webutils';
// import { Artwork } from './sui-client-sdk/polymedia-circles/artwork/structs';
// import { mintArtwork } from './sui-client-sdk/polymedia-circles/controller/functions';
// import { ObjectArg } from './sui-client-sdk/_framework/util';

export const POLYMEDIA_CIRCLES_PACKAGE_ID_LOCALNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_DEVNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_TESTNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_MAINNET = '0x123';

/*
export type Circle = {
    red: number,
    green: number,
    blue: number,
    radius: number,
    x_axis: number,
    y_axis: number,
};

export type Artwork = {
    id: SuiAddress;
    number: number,
    background_color: string,
    circles: Circle[],
    svg: string,
    frozen: boolean,
};
*/

/**
 * Helper to interact with the `polymedia_circles` Sui package
 */
export class CirclesManager {
    public readonly suiClient: SuiClient;
    public readonly packageId: string;

    constructor({ network, suiClient }: {
        network: NetworkName,
        suiClient: SuiClient,
    }) {
        this.suiClient = suiClient;
        if (network === 'localnet') {
            this.packageId = POLYMEDIA_CIRCLES_PACKAGE_ID_LOCALNET;
        } else if (network === 'devnet') {
            this.packageId = POLYMEDIA_CIRCLES_PACKAGE_ID_DEVNET;
        } else if (network === 'testnet') {
            this.packageId = POLYMEDIA_CIRCLES_PACKAGE_ID_TESTNET;
        } else if (network === 'mainnet') {
            this.packageId = POLYMEDIA_CIRCLES_PACKAGE_ID_MAINNET;
        } else {
            throw new Error('Network not recognized: ' + network);
        }
    }

    // @ts-ignore
    // public async mint({
    //     signTransactionBlock,
    //     collection,
    //     payCoin,
    // }: {
    //     signTransactionBlock: WalletKitCore['signTransactionBlock'],
    //     collection: ObjectArg;
    //     payCoin: ObjectArg;
    // }): Promise<Artwork|any>
    // {
    //     const txb = new TransactionBlock()
    //     mintArtwork(txb, {
    //         collection,
    //         payCoin,
    //     });

    //     const signedTx = await signTransactionBlock({
    //         transactionBlock: txb,
    //     });
    //     return this.suiClient.executeTransactionBlock({
    //         transactionBlock: signedTx.transactionBlockBytes,
    //         signature: signedTx.signature,
    //         options: {
    //             showEffects: true,
    //         },
    //     })
    // }
}
