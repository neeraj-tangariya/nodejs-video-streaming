import express from "express";
import { statSync, createReadStream } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/video", (req, res) => {
  const videoPath = `${__dirname}/public/sample1.mp4`;
  const videoStat = statSync(videoPath);
  const fileSize = videoStat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    console.log(`start ${start} and end ${end}`)
    if (start >= fileSize) {
      res
        .status(416)
        .send("Requested range not satisfiable\n" + start + " >= " + fileSize);
      return;
    }

    const chunksize = end - start + 1;
    const file = createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    createReadStream(videoPath).pipe(res);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
