const fs = require("fs");
const path = require('path')
const express = require('express')
const app  = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mergePdfs = require('./merge')

app.use(express.static("./public"));

app.post(
  "/merge",
  upload.array("pdfs", 2),
  async (req, res)=> {

        console.log(req.files);
        let d = await mergePdfs(
          path.join(__dirname, req.files[0].path),
          path.join(__dirname, req.files[1].path)
        );

        fs.unlink(req.files[0].path, (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          } else {
            console.log("File deleted successfully.");
          }
        });
        fs.unlink(req.files[1].path, (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          } else {
            console.log("File deleted successfully.");
          } 
        });

      res.sendFile(path.join(__dirname,`mergedPdfs/${d}.pdf`))
      
      res.on("finish", () => {
        fs.unlink(path.join(__dirname, `mergedPdfs/${d}.pdf`), (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          } else {
            console.log("File deleted successfully.");
          }
        });
      });
  }
);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server started in port ${PORT}`)
})
