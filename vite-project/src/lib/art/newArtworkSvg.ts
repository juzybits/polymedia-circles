/**
 * Simulates polymedia_circles::artwork::create().
 * This function is manually kept in sync with the Sui code.
 *
 * Example output:
<svg class="svg-artwork" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="rgb(255,224,224)"></rect>
    <circle cx="500" cy="750" r="450" fill="rgb(255,224,162)" stroke="black" stroke-width="6"></circle>
    <circle cx="875" cy="625" r="250" fill="rgb(255,162,255)" stroke="black" stroke-width="6"></circle>
    <circle cx="375" cy="250" r="150" fill="rgb(162,193,255)" stroke="black" stroke-width="6"></circle>
    <text x="984" y="984" font-family="monospace" font-size="22" fill="white" text-anchor="end">Polymedia Circles #000</text>
</svg>
 */

const CANVAS_SIZE = 1000;
const MIN_CIRCLES = 2;
const MAX_CIRCLES = 7;
const CIRCLE_MIN_RADIUS = 50;
const CIRCLE_MAX_RADIUS = 450;
const STEPS = 8;
const STROKE_WIDTH = 6;

export function newArtworkSvg({
    canvasWidth = CANVAS_SIZE,
    canvasHeight = CANVAS_SIZE,
    minCircles = MIN_CIRCLES,
    maxCircles = MAX_CIRCLES,
    minRadius = CIRCLE_MIN_RADIUS,
    maxRadius = CIRCLE_MAX_RADIUS,
    strokeWidth = STROKE_WIDTH,
    withFooter,
}: {
    canvasWidth?: number,
    canvasHeight?: number,
    minCircles?: number,
    maxCircles?: number,
    minRadius?: number,
    maxRadius?: number,
    strokeWidth?: number,
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
        footer.setAttribute('x', String(canvasWidth - 16)); // Near the right edge
        footer.setAttribute('y', String(canvasHeight - 16)); // Near the bottom edge
        footer.setAttribute('font-family', 'monospace');
        footer.setAttribute('font-size', '22');
        footer.setAttribute('fill', 'white');
        footer.setAttribute('text-anchor', 'end');
        footer.textContent = 'Polymedia Circles #000';
        svg.appendChild(footer);
    }

    // <rect> black frame
    // if (withFrame) {
    //     const frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    //     frame.setAttribute('width', '100%');
    //     frame.setAttribute('height', '100%');
    //     frame.setAttribute('fill', 'none');
    //     frame.setAttribute('stroke', 'black');
    //     frame.setAttribute('stroke-width', String(strokeWidth * 2));
    //     svg.appendChild(frame);
    // }

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
    const color = getRandomColor();
    const radius = getRandomStep(minRadius, maxRadius, STEPS);
    const cx = getRandomStep(0, canvasWidth, STEPS); // x position
    const cy = getRandomStep(0, canvasHeight, STEPS); // y position

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
    return Math.trunc(Math.random() * (max - min) + min);
}

// Generate a random number
function getRandomStep(minVal: number, maxVal: number, steps: number): number {
    const stepPosition = getRandomNumber(0, steps+1);
    const stepSize = Math.trunc((maxVal - minVal) / steps);
    const value = minVal + stepPosition * stepSize;
    return value;
}

// Generate a random CSS color like 'rgb(162,193,224)'
function getRandomColor(): string {
    // possible values: 162, 193, 224, 255
    // unique colors = 4*4*4 = 64
    const red   = 7 + getRandomNumber(5, 9) * 31;
    const green = 7 + getRandomNumber(5, 9) * 31;
    const blue  = 7 + getRandomNumber(5, 9) * 31;
    return `rgb(${red},${green},${blue})`;
}

/*
const svgString = `
`;
const parser = new DOMParser();
const doc = parser.parseFromString(svgString, "image/svg+xml");
return doc.documentElement as unknown as SVGSVGElement;

// Open Graph image (src/img/open-graph.webp)
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="rgb(255,162,255)" />
    <!-- cyan --> <circle cx="82" cy="340" r="120" fill="rgb(100,224,255)" stroke="black" stroke-width="5" />
    <!-- yellow --> <circle cx="160" cy="110" r="75" fill="rgb(255,255,100)" stroke="black" stroke-width="5" />
    <!-- green --> <circle cx="690" cy="266" r="90" fill="rgb(100,255,100)" stroke="black" stroke-width="5" />
    <!-- red --> <circle cx="610" cy="315" r="50" fill="rgb(255,100,100)" stroke="black" stroke-width="5" />
    <!-- darkblue --> <circle cx="660" cy="90" r="35" fill="rgb(100,100,255)" stroke="black" stroke-width="5" />
</svg>
*/
