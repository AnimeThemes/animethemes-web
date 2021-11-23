export default async function preview(req, res) {
    res.setPreviewData({}, {
        maxAge: 10 * 60
    });
    res.redirect("/");
}
