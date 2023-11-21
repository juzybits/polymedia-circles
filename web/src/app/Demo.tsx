import { useEffect, useRef, useState } from 'react';
import { newArtworkSvg } from './lib/art/newArtworkSvg';

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
                withFooter: true,
            }
        ));
    }
    return svgs;
}
