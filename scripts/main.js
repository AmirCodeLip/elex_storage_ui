import { readdir } from "fs"
import sharp from "sharp"

const imgsRootPath = './public/imgs/products';


readdir(imgsRootPath, (err, files) => {
    files.filter(x => x.includes(".")).forEach(imgName => {
        console.log(imgName);
        let img = imgsRootPath + "/" + imgName;
        let outputFile = imgsRootPath + "/200/" + imgName;
        img = sharp(img).resize(200, 200).png({});
        img.toFile(outputFile);
    });
});