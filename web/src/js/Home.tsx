import { useEffect } from 'react';

export const Home: React.FC = () =>
{
    useEffect(() => {
        document.title = 'Polymedia Circles - Home';
    }, []);

    return <>
        <h1>
            Circles.
        </h1>
    </>;
}
