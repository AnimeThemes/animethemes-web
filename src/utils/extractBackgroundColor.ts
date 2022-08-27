import type { Property } from "csstype";

export default function extractBackgroundColor(image: HTMLImageElement): Property.Background | void {
    try {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1);
            const { data } = ctx.getImageData(0, 0, 1, 1);
            const [r, g, b] = data;
            return `rgb(${r}, ${g}, ${b})`;
        }
    } catch {
        return `url("${image.src}")`;
    }
}
