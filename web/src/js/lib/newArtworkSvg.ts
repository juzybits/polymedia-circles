/**
 * Example output:
<svg class="svg-artwork" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
   <rect width="100%" height="100%" fill="rgb(100,224,100)" />
   <circle cx="232" cy="286" r="360" fill="rgb(131,193,224)" stroke="black" stroke-width="6" />
   <circle cx="624" cy="689" r="207" fill="rgb(131,162,131)" stroke="black" stroke-width="6" />
   <circle cx="898" cy="769" r="131" fill="rgb(162,100,162)" stroke="black" stroke-width="6" />
   <text x="989" y="987" font-family="monospace" font-size="20" fill="white" text-anchor="end">Polymedia Circles #000</text>
   <rect width="100%" height="100%" fill="none" stroke="black" stroke-width="12" />
</svg>
 */
export function newArtworkSvg({
    canvasWidth,
    canvasHeight,
    minCircles,
    maxCircles,
    minRadius,
    maxRadius,
    strokeWidth,
    withFrame,
    withFooter,
}: {
    canvasWidth: number,
    canvasHeight: number,
    minCircles: number,
    maxCircles: number,
    minRadius: number,
    maxRadius: number,
    strokeWidth: number,
    withFrame: boolean,
    withFooter: boolean,
}): SVGSVGElement
{
    // <svg>
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'svg-artwork');
    svg.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);

    // <rect>
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', getRandomColor());
    svg.appendChild(rect);

    // <circle>
    const numCircles = getRandomNumber(minCircles, maxCircles+1);
    const circles = new Array<SVGCircleElement>();
    for (let i = 0; i < numCircles; i++) {
        circles.push(newCircle({ canvasWidth, canvasHeight, minRadius, maxRadius, strokeWidth }));
    }
    // sort the circles by radius in descending order
    circles.sort((a, b) => Number(b.getAttribute('r')) - Number(a.getAttribute('r')));
    // append each circle to the SVG
    circles.forEach(function(circle) {
        svg.appendChild(circle);
    });

    // <text> footer
    if (withFooter) {
        const footer = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        footer.setAttribute('x', String(canvasWidth - strokeWidth - 5)); // Near the right edge
        footer.setAttribute('y', String(canvasHeight - strokeWidth - 7)); // Near the bottom edge
        footer.setAttribute('font-family', 'monospace');
        footer.setAttribute('font-size', '20');
        footer.setAttribute('fill', 'white');
        footer.setAttribute('text-anchor', 'end');
        footer.textContent = 'Polymedia Circles #000';
        svg.appendChild(footer);
    }

    // <rect> black frame
    if (withFrame) {
        const frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        frame.setAttribute('width', '100%');
        frame.setAttribute('height', '100%');
        frame.setAttribute('fill', 'none');
        frame.setAttribute('stroke', 'black');
        frame.setAttribute('stroke-width', String(strokeWidth * 2));
        svg.appendChild(frame);
    }

    return svg;
}

function newCircle({
    canvasWidth,
    canvasHeight,
    minRadius,
    maxRadius,
    strokeWidth,
}: {
    canvasWidth: number,
    canvasHeight: number,
    minRadius: number,
    maxRadius: number,
    strokeWidth: number,
}): SVGCircleElement
{
    const radius = getRandomNumber(minRadius, maxRadius+1);
    const color = getRandomColor();
    const cx = getRandomNumber(radius/2, canvasWidth - radius/2); // x position
    const cy = getRandomNumber(radius/2, canvasHeight - radius/2); // y position

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', String(cx));
    circle.setAttribute('cy', String(cy));
    circle.setAttribute('r', String(radius));
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', String(strokeWidth));

    return circle;
}

// Generate a random integer between `min` (inclusive) and `max` (exclusive)
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

// Generate a random CSS color like 'rgb(35,123,207)'
function getRandomColor(): string {
    const red   = 7 + getRandomNumber(3, 9) * 31;
    const green = 7 + getRandomNumber(3, 9) * 31;
    const blue  = 7 + getRandomNumber(3, 9) * 31;
    return `rgb(${red},${green},${blue})`;
}

/*
const svgString = `
`;
const parser = new DOMParser();
const doc = parser.parseFromString(svgString, "image/svg+xml");
return doc.documentElement as unknown as SVGSVGElement;

// Open Graph
<svg class="svg-artwork" width="800" height="400" xmlns="http://www.w3.org/2000/svg">
<rect width="100%" height="100%" fill="rgb(255,162,255)" />
<!-- cyan --> <circle cx="82" cy="340" r="120" fill="rgb(100,224,255)" stroke="black" stroke-width="5" />
<!-- yellow --> <circle cx="160" cy="110" r="75" fill="rgb(255,255,100)" stroke="black" stroke-width="5" />
<!-- green --> <circle cx="690" cy="266" r="90" fill="rgb(100,255,100)" stroke="black" stroke-width="5" />
<!-- red --> <circle cx="610" cy="315" r="50" fill="rgb(255,100,100)" stroke="black" stroke-width="5" />
<!-- darkblue --> <circle cx="660" cy="90" r="35" fill="rgb(100,100,255)" stroke="black" stroke-width="5" />
</svg>
*/