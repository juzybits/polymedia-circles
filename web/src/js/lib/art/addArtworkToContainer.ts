import { newArtworkSvg } from "./newArtworkSvg";

export function addArtworkToContainer({
    container,
    canvasWidth,
    canvasHeight,
    minCircles,
    maxCircles,
} : {
    container: HTMLElement,
    canvasWidth: number,
    canvasHeight: number,
    minCircles: number,
    maxCircles: number,
}): void {
    // Generate a new artwork svg
    const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    const maxRadius = windowHeight / 6;
    const newArtwork = newArtworkSvg({
        canvasWidth,
        canvasHeight,
        minCircles,
        maxCircles,
        minRadius: maxRadius / 4,
        maxRadius,
        strokeWidth: 5,
        withFooter: false,
    });
    // Remove old svg if it exists
    removeArtworkFromContainer(container);
    // Append a new svg to the container
    container.appendChild(newArtwork);
}

export function removeArtworkFromContainer(container: HTMLElement): void {
    const oldSvg = container.querySelector('.svg-artwork');
    if (oldSvg) {
        container.removeChild(oldSvg);
    }
}
