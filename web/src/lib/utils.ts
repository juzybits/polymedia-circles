/* Various helpers */

export function formatSui(num: bigint): string {
    return (Number(num)/1_000_000_000).toFixed(2) + ' SUI';
}

export function isDev(): boolean {
    const isDev = localStorage.getItem('polymedia.isDev');
    return isDev === 'yes';
}

/*
import { isLocalhost } from '@polymedia/webutils';

// DIY analytics
export async function trackEvent(
    name: string,
    args?: { [key: string]: any },
): Promise<void>
{
    // localStorage.setItem('circles.track', 'false')
    if ( localStorage.getItem('circles.track') === 'false' ) {
        return;
    }
    if ( isLocalhost() ) {
        return;
    }

    const body = { name, ...args };
    await fetch('', {
        method: 'POST',
        body: JSON.stringify(body),
    })
    .catch(err => {
        console.warn('[trackEvent]', err);
    });
}
*/
