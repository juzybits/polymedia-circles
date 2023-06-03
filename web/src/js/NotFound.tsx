import { useEffect } from 'react';

export function NotFound()
{
    useEffect(() => {
        document.title = 'Polymedia Circles - Not found';
    }, []);

    return <>
        <h1>404</h1>
        <div>
            Not found.
        </div>
    </>;
}
