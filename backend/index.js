const express = require("express"); // เรียกใช้ express framework
const cors = require("cors"); // เรียกใช้ core module
const app = express(); // สร้าง instance ของ express
const apiRouter = require("./routes/api"); // เรียกใช้ router จากไฟล์ api
const https = require("https"); // เรียกใช้ https module
const { swaggerSpecs, swaggerUI } = require("./swagger"); // เรียกใช้ swagger สำหรับ API documentation
const cookieParser = require("cookie-parser"); // เรียกใช้ cookie-parser middleware
const fs = require("fs"); // เรียกใช้ file system module

app.use(express.json());// ใช้ middleware สำหรับแปลง request body เป็น JSON
app.use(cors()); 
app.use("/api/v1", apiRouter); // ใช้ router สำหรับเส้นทาง /api/v1
app.use(
  cors({
    origin: true,
    Credentials: true,
  })
); // ใช้ core middleware สำหรับจัดการ CORS
app.use(cookieParser()); // ใช้ cookie-parser middleware
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs)); // ใช้ swagger UI สำหรับ API documentation

const ssl_options = {
  key: fs.readFileSync("ssl/key.pem"), // อ่านไฟล์ SSL key
  cert: fs.readFileSync("ssl/cert.pem"), // อ่านไฟล์ SSL certificate
};

const port = 8800; // กำหนด port สำหรับ HTTP
const secure_port = 8443; // กำหนด port สำหรับ HTTPS

app.listen(port, () => {
  console.log("Server is running on port: " + port); // เริ่มต้น server บน port 8800
});

https.createServer(ssl_options, app).listen(secure_port, () => {
  console.log("HTTPS Server listening on port: " + secure_port); // เริ่มต้น HTTPS server บน port 8443
});



