import { useEffect, useRef } from 'react';
import { newArtworkSvg } from './lib/art/newArtworkSvg';
import '../css/Demo.less';

const CANVAS_SIZE = 1000;
const CIRCLE_MIN_RADIUS = 42;
const CIRCLE_MAX_RADIUS = 420;
const MIN_CIRCLES = 3;
const MAX_CIRCLES = 5;
const STROKE_WIDTH = 6;

export const Demo: React.FC = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const svg = newArtworkSvg({
            canvasWidth: CANVAS_SIZE,
            canvasHeight: CANVAS_SIZE,
            minCircles: MIN_CIRCLES,
            maxCircles: MAX_CIRCLES,
            minRadius: CIRCLE_MIN_RADIUS,
            maxRadius: CIRCLE_MAX_RADIUS,
            strokeWidth: STROKE_WIDTH,
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
