import { useEffect, useRef, useState } from 'react';
import { newArtworkSvg } from './lib/art/newArtworkSvg';

const CANVAS_SIZE = 1000;
const CIRCLE_MIN_RADIUS = 42;
const CIRCLE_MAX_RADIUS = 420;
const MIN_CIRCLES = 3;
const MAX_CIRCLES = 5;
const STROKE_WIDTH = 6;

export const Demo: React.FC = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [ svgs, setSvgs ] = useState<SVGSVGElement[]>([]);

    useEffect(() => {
        setSvgs(makeSvgs(9));
    }, []);

    const style = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '10px',
        padding: '1em',
    };

    return <>
        <div ref={pageRef} id='demo-page' style={style}>
            {svgs.map((svg, idx) =>
                <div key={idx} dangerouslySetInnerHTML={{ __html: svg.outerHTML }} />
            )}
        </div>
    </>;
}

function makeSvgs(amount: number): SVGSVGElement[]
{
    const svgs = Array<SVGSVGElement>();
    for (let i = 0; i < amount; i++) {
        svgs.push(
            newArtworkSvg({
                canvasWidth: CANVAS_SIZE,
                canvasHeight: CANVAS_SIZE,
                minCircles: MIN_CIRCLES,
                maxCircles: MAX_CIRCLES,
                minRadius: CIRCLE_MIN_RADIUS,
                maxRadius: CIRCLE_MAX_RADIUS,
                strokeWidth: STROKE_WIDTH,
                withFooter: true,
            }
        ));
    }
    return svgs;
}
