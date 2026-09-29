const app = require("./app");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});






//NGINIX SERVER CONFIGURATION - REVERSE PROXY

// server {
//     listen 80;
//     server_name your-domain.com www.your-domain.com;

//     location / {
//         root /var/www/csv-tool/frontend/dist;
//         try_files $uri $uri/ /index.html;
//     }

//     location /api/ {
//         proxy_pass http://127.0.0.1:5000;

//         proxy_http_version 1.1;

//         proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header X-Forwarded-Proto $scheme;

//         proxy_read_timeout 120s;
//         proxy_send_timeout 120s;
//     }
// }