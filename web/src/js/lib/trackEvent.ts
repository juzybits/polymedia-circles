// DIY analytics

import { isLocalhost } from "@polymedia/webutils";

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
    await fetch('https://n5yzgapgnehivgmjg327qwcdnm0uqsia.lambda-url.eu-central-1.on.aws/', {
        method: 'POST',
        body: JSON.stringify(body),
    })
    .catch(err => {
        console.warn('[trackEvent]', err);
    });
}
