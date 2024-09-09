/**
 * Helper functions to interact with the `polymedia_circles` Sui package via the `sui-client-gen` SDK
 */

import {
    PaginatedEvents,
    PaginatedObjectsResponse,
    SuiClient,
    SuiEvent,
    SuiObjectResponse,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Artwork, isArtwork } from './sui-client-sdk/polymedia-circles/artwork/structs';
import { Collection } from './sui-client-sdk/polymedia-circles/collection/structs';
import { mintArtwork as mintArtworkSdk } from './sui-client-sdk/polymedia-circles/controller/functions';
import { useSignTransactionBlock } from '@mysten/dapp-kit';

export type ArtworkWithDisplay = Artwork & {
    display: Record<string, string>;
};

type UseSignTransactionBlockFunction = typeof useSignTransactionBlock;
type UseSignTransactionBlockReturnType = ReturnType<UseSignTransactionBlockFunction>;
type SignTransactionBlockType = UseSignTransactionBlockReturnType extends { mutateAsync: infer T } ? T : never;

export async function mintArtwork({
    suiClient,
    signTransactionBlock,
    collectionId,
    recipient,
    price,
}: {
    suiClient: SuiClient,
    signTransactionBlock: SignTransactionBlockType;
    collectionId: string;
    recipient: string;
    price: number;
}): Promise<SuiTransactionBlockResponse>
{
    const txb = new TransactionBlock();
    const payCoin = txb.splitCoins(txb.gas, [price]);
    const [artwork, change] = mintArtworkSdk(txb, {
        collection: collectionId,
        payCoin,
    });
    txb.transferObjects([artwork, change], txb.pure(recipient));
    const signedTx = await signTransactionBlock({
        transactionBlock: txb,
    });
    return suiClient.executeTransactionBlock({
        transactionBlock: signedTx.transactionBlockBytes,
        signature: signedTx.signature,
        options: {
            showEffects: true,
        },
    });
}

export async function fetchEvents(
    suiClient: SuiClient,
    packageId: string,
): Promise<SuiEvent[]|null> {
    return suiClient.queryEvents({
        query: {
            MoveModule: {
                module: 'controller',
                package: packageId,
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

export async function fetchCollection(
    suiClient: SuiClient,
    collectionId: string,
): Promise<Collection|null> {
    return Collection.fetch(suiClient, collectionId)
    .then(collection => {
        return collection;
    })
    .catch(error => {
        console.warn('[CirclesClient.fetchCollection] unexpected error:\n', error);
        return null;
    })
}

export async function fetchArtworkById(
    suiClient: SuiClient,
    artId: string,
): Promise<ArtworkWithDisplay|null> {
    return suiClient.getObject({
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

export async function fetchArtworksByOwner(
    suiClient: SuiClient,
    ownerAddr: string,
): Promise<ArtworkWithDisplay[]|null> {
    return suiClient.getOwnedObjects({
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
