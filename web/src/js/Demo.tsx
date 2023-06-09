import { useEffect, useRef } from 'react';
import { newArtworkSvg } from './lib/svg_builder';

export const Demo: React.FC = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const svg = newArtworkSvg();
        const page = pageRef.current;
        if (!page)
            return;

        // Remove the old SVG if it exists
        const oldSvg = page.querySelector('svg');
        if (oldSvg) {
            page.removeChild(oldSvg);
        }

        page.appendChild(svg);
    }, []);

    const style = {
        padding: '1em',
    };

    return <>
        <div ref={pageRef} id='demo-page' style={style}>
        </div>
    </>;
}
