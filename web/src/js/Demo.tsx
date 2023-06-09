import { useEffect, useRef } from 'react';
import { newArtworkSvg } from './lib/svg_builder';

const CANVAS_SIZE = 1000;
const CIRCLE_MIN_RADIUS = 42;
const CIRCLE_MAX_RADIUS = 420

export const Demo: React.FC = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const svg = newArtworkSvg({
            canvasWidth: CANVAS_SIZE,
            canvasHeight: CANVAS_SIZE,
            minRadius: CIRCLE_MIN_RADIUS,
            maxRadius: CIRCLE_MAX_RADIUS,
            withFrame: true,
            withFooter: true,
        });
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
