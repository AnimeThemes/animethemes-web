/**
 * Slug format is:
 *
 * `<OP|ED>[v#][-[NC][BD|DVD|...][Lyrics][Subbed][Uncen][Trans|Over|...][1080|480|...]]`
 */
function createVideoSlug(theme, entry, video) {
    let slug = theme.slug;

    if (entry.version && entry.version !== 1) {
        slug += `v${entry.version}`;
    }

    const tags = [];

    if (video.nc) {
        tags.push("NC");
    }

    if (video.source) {
        tags.push(video.source);
    }

    if (video.lyrics) {
        tags.push("Lyrics");
    }

    if (video.subbed) {
        tags.push("Subbed");
    }

    if (video.uncen) {
        tags.push("Uncen");
    }

    if (video.overlap !== "None") {
        tags.push(video.overlap);
    }

    if (video.resolution !== 720) {
        tags.push(`${video.resolution}`);
    }

    if (tags.length) {
        slug += `-${tags.join("")}`;
    }

    return slug;
}

export default createVideoSlug;
