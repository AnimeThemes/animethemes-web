/**
 * Slug format is:
 *
 * `<OP|ED>[v#][-[Tags]]`
 */
function createVideoSlug(theme, entry, video) {
    let slug = theme.slug;

    if (entry.version && entry.version !== 1) {
        slug += `v${entry.version}`;
    }

    if (video.tags) {
        slug += `-${video.tags}`;
    }

    return slug;
}

export default createVideoSlug;
