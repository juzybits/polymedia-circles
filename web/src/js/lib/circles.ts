import { SuiClient } from '@mysten/sui.js/client';
import { NetworkName } from '@polymedia/webutils';

export const POLYMEDIA_CIRCLES_PACKAGE_ID_LOCALNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_DEVNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_TESTNET = '0x123';
export const POLYMEDIA_CIRCLES_PACKAGE_ID_MAINNET = '0x123';

/**
 * Helps you interact with the `polymedia_circles` Sui package
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
}
