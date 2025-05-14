//
// // conf proxy
// import * as https from "node:https";
// import { createProxyMiddleware} from 'http-proxy-middleware'
//
// const target = "https://mon-client.dev:4200";
// const proxyPort = 443;
// const sslOptions = {
//     key: fs.readFileSync("..."),
//     cert: fs.readFileSync("..."),
// };
//
// // create proxy
// const proxy = createProxyMiddleware({
//     target,
//     changeOrigin: true,
//     secure: true,
// })
//
// // Run function to load proxy
// const startProxy = () => {
//     const app = express();
//     app.use("/", proxy);
//     // create https server
//     const server = https.createServer(sslOptions, app);
//
//     server.listen(proxyPort, () => {
//         console.log(`is proxyfied on ${target}`)
//     })
// };
//
// startProxy();