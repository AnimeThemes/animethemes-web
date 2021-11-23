export default function withBasePath(path) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
