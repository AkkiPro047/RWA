export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    r.headers.forEach((v, k) => res.setHeader(k, v));
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Range");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range");
    const buffer = Buffer.from(await r.arrayBuffer());
    res.status(r.status).send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
}
