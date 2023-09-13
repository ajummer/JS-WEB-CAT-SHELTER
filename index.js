const http = require("http");
const homeTemplate = require("./views/home/home.js")
const siteCss = require("./content/styles/site.js")
const addBreedTemplate = require("./views/addBreed.js")
const addCatTemplate = require("./views/addCat.js")
const port = 5000

const server = http.createServer((req, res) => {
    const { url } = req;
    console.log(url)
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(homeTemplate)
    } else if (url === "/content/styles/site.css") {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.write(siteCss)
    } else if(url === "/cats/add-breed"){
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(addBreedTemplate)
    } else if(url === "/cats/add-cat"){
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(addCatTemplate)
    }
    res.end()
});

server.listen(port, () => console.log(`Server is running at ${port}`));