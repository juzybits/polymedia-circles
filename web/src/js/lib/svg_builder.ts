const CANVAS_SIZE = 1000;
const CIRCLE_MIN_RADIUS = 42;
const CIRCLE_MAX_RADIUS = 420
const MIN_CIRCLES = 2;
const MAX_CIRCLES = 5;

function newCircle(): SVGCircleElement
{
    const radius = getRandomNumber(CIRCLE_MIN_RADIUS, CIRCLE_MAX_RADIUS+1);
    const color = getRandomColor();
    const cx = getRandomNumber(radius/2, CANVAS_SIZE - radius/2); // x position
    const cy = getRandomNumber(radius/2, CANVAS_SIZE - radius/2); // y position

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', String(cx));
    circle.setAttribute('cy', String(cy));
    circle.setAttribute('r', String(radius));
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '8');

    return circle;
}

/**
 * Example output:
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
   <rect width="100%" height="100%" fill="rgb(162,224,193)" />
   <circle cx="624" cy="377" r="313" fill="rgb(100,255,255)" stroke="black" stroke-width="8" />
   <circle cx="523" cy="742" r="221" fill="rgb(255,255,224)" stroke="black" stroke-width="8" />
   <circle cx="369" cy="314" r="197" fill="rgb(255,224,100)" stroke="black" stroke-width="8" />
   <text x="987" y="985" font-family="monospace" font-size="20" fill="white" text-anchor="end">Polymedia Circles #855</text>
   <rect width="100%" height="100%" fill="none" stroke="black" stroke-width="16" />
</svg>
 */
export function newArtworkSvg(): SVGSVGElement
{
    const backgroundColor = getRandomColor();

    // <svg>
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', String(CANVAS_SIZE));
    svg.setAttribute('height', String(CANVAS_SIZE));

    // <rect>
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', backgroundColor);
    svg.appendChild(rect);

    // <circle>
    const numCircles = getRandomNumber(MIN_CIRCLES, MAX_CIRCLES+1);
    const circles = new Array<SVGCircleElement>();
    for (let i = 0; i < numCircles; i++) {
        circles.push( newCircle() );
    }
    // sort the circles by radius in descending order
    circles.sort((a, b) => Number(b.getAttribute('r')) - Number(a.getAttribute('r')));
    // append each circle to the SVG
    circles.forEach(function(circle) {
        svg.appendChild(circle);
    });

    // <text> footer
    const footer = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    footer.setAttribute('x', String(CANVAS_SIZE - 13)); // Near the right edge
    footer.setAttribute('y', String(CANVAS_SIZE - 15)); // Near the bottom edge
    footer.setAttribute('font-family', 'monospace');
    footer.setAttribute('font-size', '20');
    footer.setAttribute('fill', 'white');
    footer.setAttribute('text-anchor', 'end');
    footer.textContent = 'Polymedia Circles #' + getRandomNumber(0, 1000);
    svg.appendChild(footer);

    // <rect> black frame
    const frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    frame.setAttribute('width', '100%');
    frame.setAttribute('height', '100%');
    frame.setAttribute('fill', 'none');
    frame.setAttribute('stroke', 'black');
    frame.setAttribute('stroke-width', '16');
    svg.appendChild(frame);

    return svg;
}

// Generate a random integer between `min` (inclusive) and `max` (exclusive)
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

// Generate a random CSS color like 'rgb(35,123,207)'
function getRandomColor(): string {
    // const red = getRandomNumber(0, 256);
    // const red = getRandomNumber(0, 26) * 10;
    // const red = getRandomNumber(0, 11) * 25;
    // const red = getRandomNumber(4, 11) * 25;
    const red = 7 + getRandomNumber(3, 9) * 31;
    // const green = getRandomNumber(0, 256);
    // const green = getRandomNumber(0, 26) * 10;
    // const green = getRandomNumber(0, 11) * 25;
    // const green = getRandomNumber(4, 11) * 25;
    const green = 7 + getRandomNumber(3, 9) * 31;
    // const blue = getRandomNumber(0, 256);
    // const blue = getRandomNumber(0, 26) * 10;
    // const blue = getRandomNumber(0, 11) * 25;
    // const blue = getRandomNumber(4, 11) * 25;
    const blue = 7 + getRandomNumber(3, 9) * 31;
    return `rgb(${red},${green},${blue})`;
}