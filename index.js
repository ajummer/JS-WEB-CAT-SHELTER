const http = require("http");
const homeTemplate = require("./views/home/home.js")
const siteCss = require("./content/styles/site.js")
const addBreedTemplate = require("./views/addBreed.js")
const addCatTemplate = require("./views/addCat.js")
const catTemplate = require("./catTemplate.js")
const port = 5000

const cats = [
    {
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUVFRAQFRUVFRUXEBAQFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKystLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADYQAAIBAgQEAwYGAgIDAAAAAAABAgMRBBIhMRNBUWEFcYEGIpGhsdEyUsHh8PFCYhSCFSMz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQEBAAMBAAIBBQAAAAAAAAERAgMSITEEQSIUMkJRcf/aAAwDAQACEQMRAD8A7VNEqMLBA6qPJkek589zLiN8MvhjPCSgwsIDHDNKAGFGBtRN5S7AQUoApQGWDkhGWdMzwxhooWKlB4ZHAMSSF6npeMQ9FGLBaQrD09Ak0SBchyJIYmItYerQb2RWLwEqai5Kzlqlzt3K9Lfo9p+MYc7OBlqjjUDqYN6i5+VHceig9BPGrRjNF6AsStDt/Y5J8rxmMp+8wOQ6HiNJ5thXJ2OO8fXdOvgOQ0ohVEtRF6noaiXlCqJeUPQaA4mXEYcTOUXoNAylZA+QvIP0HsBkIHyEF6D2dJAqhtsEzWRjqGoxuVYPhauV6pNX1T/ToXOZpXoCxR6LGRw8bOSbb5J6+v3E6uBhUV6MtecJNX9H+hp14LPy6znml/fjkENSTTs1ZrS3NMuFJuy67Gfq09g2jDR1qfgtSSTWl0/jyEsVhJQeWS1Kvism2JnklKOJWUNw3ewxhMBOpJRS9eSXUmcWq98JqJfDb2R6KHs4+clz/Yaj4Na/fe3NGs/j3+2d8/Lx8qbRqlE79LwdznqrK+r6o69DwmlCNkrtrVsX+mtO/wAiR5WKHMLgZT12j1+3U6kfCIRd5O/SP3N4qtyXlZckPj+Nl/yT359/2h06kKWlOKvpeT1bOZ7Qxcql3skl+r09RylSbktrb97AcdhG7yfn2+Rt5Of8cjPx3OtriQilsvj9h7DyYF0wtI4LMdeu7hpaGqqAYOWgzNHTx+Obr9ee8SpaiOQ7eOpXEeATefrbnr4Syl5RzgFqgL1P2JqBfDHVQNKgHqPYjwy+EPqia4Ieo9nP4JfBOhwScIPUezn8Eg/wSxepexCbMJBJRNxgEJhRGMHSvNJ9QuFppvK9L7PozqUPDZR952sk3oa8cW/Ud9yfHCrzvNuco76Ldr7GoTjuklbnqn8TnL/6PzZ1KFC9ur18o/d/YqXR1MP4V060lxE1Jf5ae8u51afhdNO6XK32ONl/Lrbu8vpb6jOHxklo2ml0eqRvMc/W/wBOxxiq+GhVSzLbnz6idC77oepqxWswv/F0r3cLjKSWySKzApSD8H2ispTBZgEpWfmPQdbByuDhUCqQArV+vPoK8JPr89TpzjcGoCOUlh6Eld37K+q+4GvT9H8mjrpaAatC9/IXXOxXPX15qrS1KUB6rS1ASgcHfLslM4Jj6Rz8KdCmV40dlcTTF+CdGrEDkNMTKU4JfBGsheQMPSqpFqkM5S8oYNL8IvhB7F5QwaX4ROGMZSnEMGl8hA+UgsGuI4G4xC5AlGnrp90TOTtXh6V3bZ8rrRvodicpcNpqzSt2fkYwkXpt0tbT0fIcqS0tfQ6eOcjn662vB4HDOdZ3WiTcn67HYd5Nxjpf8T/LH8q/2fyHJ4eML20u3Jvm357ITqYpWag1bt7z9WjOTG1vsbjaKt6C06GZ+7ZPldfRrVCyUnsu15NfS49hovaVn6t/Jmkus7MPYSTjFKSs+2z7oM6onGcl39QvEK1nhhVSSrIXhL4GqkOYyFvczLUWhJxnlez2fWwxUfMAlCQZMScrSvyYxGd0OAwql9DVxehINdMZNmMzNwQVUhkRrU4vWzT7czm1qZ3Z4cE8Ffcx78fs148mOLQWp0KUWOUsCkOQopE8+DFdeXXNdFvkXDCM6qgi7I1njjL3rlvBMwsIzrlD9OR71ynhGBnSaO3cHUophfHBPJXFKHa2E6CsqTMeuLGs7lYuU2b4ZHAn1qtgZDViwwa5rRUQzgZUScVpvCz/ANn5N2G5yXQRoYa+7+eo5UjZaGs3GVzXnPGKE3NTg4xVssnNvLZO+i268g+HqRiks6bfw9DXiNHMmnzOf4bgpqOWS0TtFve3wMt+tvmOpGt0uGjN8tfqvQ1hsM0t/kMOh0NJKytgcX/OYRSXmDnBrUSxOPjD8T+f7Fbic10VNci+Mup4vHe2Cu40o53G1+UV0V+p5HxD21xcptQcIqLs7Wbv/wBnr6B7b+Fmfr6xjaycbr/HX4G6eIUonznwL2oqSnwa9k5J5JLRSa3i1yZ6ihiLJIzvlXONnx2MRV0XmMUahx6mIvFeaC4rHKnByfKyS/NJ7JFzorzh6tj4U9ZyUVyzNJfMvBeM0ql8lSMraPK07PvbY+I+2GMqSxCnUbbsnHV5Ia7Jclt1PY+zNdRrQyrKqicbX1skpRzdWrvXuX9n1nLK+pUqlxqlM5mGeg7CRcqbDiZaRiDN3GF2Jcq5AC7kuUXYAopmigJlF3Jcy2PQ3cxKkmQiYww8MgFWgOKRYsh7XJdHsQ6uREJ9IfvXm5IEwrBtHLXTBsNUW1hyo9BTDRSHZIvn8R1+knBPc1GmHcCkEg1cUaBykZjUK1OC5DneI4CNRWa+KuPOsClUH8L6+cYvweWHqTg/wzanTktnpZx7NWv6njcd4RV4+l8smm5dtLxfwPudanCayySae6dmv2OTX9mKMneMpx8mnbyzJk+uXYnrd18l9qanD4Kj+NSU9N4pafqfQ/BZcaip31sr+Y1S9icPByk05ye8qjzS/Y3hsJHDRcfzSb02sTePmNOOsjeCw8ufUz7T4GpLD/8AqV5xqQqW/Nbb6/UbweLTkkO4irzi0zTiQurXzrxPw+OJUXKjVU4PWOSeZPmnZaryPQey3gNRVVWqxyRjHLTg/wAets05Llskkevw7vH77h40ymUmNUg8KgGxaGbpQloaTAUZhWWkRMtMEmaUhGJclwdyAG7lNmLkbANMyyKRMwBRGS5ZRKuWpGWjLYAXMQFmIBOIVYymaSOF2D0ZJbDTegvh4B5K5rPxnf0vOZmU7BJ6C1SN9xU2ZVbmHMktAcmRaqRJ1jKnf+wc2jMJIz9vqsNQ8xmnLQT46S3BOu3pFevI1neIvOn51Ftz6Aa2BVSLva4lz96bb/1XyuN4ao7aQsrvVvXzKnWpvL517Q4jF4eslwZ5L6zp2lFx5XvZpr+M6fglWtKtThGUpRzOc27WjBK1n1u/oer8QqxcZJpSupJ32s1qcH2LwqoqbUnNzk3eW+W7yxXZa/Ef3ZdV/wAbM+vaVKSSuk35AqddrdP4EVe/VfobUW1q8y+aLZf+i8RGkJSqNaGqdVh7DHSgw0ZilKYxE0lRRLm0wVzUZDpC3IYuXcRrKbJcy2II2RSMsq4wJcq4PMaUxwm1IjRg1GQwzYhssCcBGkwKkbicEd1hqjIZ5C9CQw2bT8Y39LzA1JBpgpImnCziZlAYkgMkRYsrVgDjRfT05jVTTf4Ld/YBKs3dR0XN/uZ2RWosOr6u76ckEkls3f6CNWs0rLbm+bf85CdTFPnK36fuHtIeWuxfyS6Gq+Jio3b02S6nBhJvefkhqnG7XO2i6FTtN5L+KZ6qcYXV8yuvLkK+DeFzw70bknq1J/Q79KnZd73Lq11HTn9y518Ki0cR3t2G6eJW/o+hxZVRvDP57lTqpvJivW95rf5X9Q9J3217Pf0JGknv/RuNGxUl1FsHpMYpzAwX9hEaxnTV7mc1gN7GlIupHUjQFGlIk27kbMNlZgC3KxVyPUC9AApLmIyLbGBYs0mDgzckUTaLF+IywJxLGooy2XFN7HBjuM0Grjiegth8M92NNG/MuMerNLyQGchiogLRNOAyXX4A5PoFkjKRCi9SHx+grV6Lb6jlUQxUuRn18XCtZ/zoc2uktX6nTlEWqYPM9dUjL9Xrl/8AOd/chf00HaGKrP8AxSG4YRLQ6VHCKytqbc86jrpz5SqNau3ZGsJQfPsP06F3sNww1vM0nCL0RlR0uSFJx22Ok6OiRng2K9UezOFrHSjqjnOjbVB6NU05RTCdgisxWpK2qejNKpYuJMWaVt19DMWXGdyOHNfAYFUjVwEJBIyEBLmWUyxhUmVe5TZSEGLhoyBVFzLpsJ8oFtYLF3As3TZaWmiGyATgWGsPSfkSnS7jUElsc3PLp66EgvMkiKQOqy7USBVZgpsJJAKjMquMuRRIU2GjTJMtOIrLCZndnRa7FqjfcLxo9sIU8OlstSYunaLyq75X2udLg9BbFwSVivXIXtpTB04tLZ8m+50YYfsA8LoRirRXe/dnTSL55T1Syo6muHcNa5Ei8RpfLbRm+HoGaMJW0HgIV6TWq0a6LdeRVGon5nRkjn16OV3Qsw9aqRTRule381BL+1z9AtJrcZDwYeLBZb+ZcWUQkqfTf6g2wqkVJXAmYzNXBSVjaldAa6nUwmXGQPZiA+6BWsbRTYyEWqJHQqOhbKIZEBqRAJzozDU5X5ad+YvT05Bc1/5zOaOmmVIy5X2BU6b5/ALsUlmUSRw4SMTbkkLC0PJbYpRZHVBTqx5sPg+itg3J9PmBliqa5/IyvEaXJ/BC2f8AYwWVe26foBjVzStay721YWNVS/CvkSVIPoFi7FVK3IUi5xdn7y5X3+IPGJuzSaa+Y/b4MdCNU252EcLJ21G009GVLqa3OYJ1AuRcv7LVNMrCVe4nXqa7fYeUbCmNpPdf32Y6C0JpsYihOppaS2+qY3h5XRMOmY7GFN3NRZhx1KIWNU1m/nMFa91zFql16DI+3f8Am5haAaFe+/xDNjJUWXU1VzPM3YWHqU5FzjzBR0YzTkEFZpSNyjYjpdDcOhRB2KNukyDC4YCK8zSwi3RZDHF7WpUED/4vchAGrlRBywpCBg1l4RA5YWPNXIQWQbUWEh+ReupTw8fLyIQMg0Oo4wWnzu2ZpVFLW5CC36f9JiElZhGrohBkG6PNMI4vla/85kIVIQVOv731HFrqUQIKuaKqRurEIUlyqkdcvJ3t2ZMJUsQhH9rOyel0YjVuWQpLEpPf0COaas1uWQYJ01Z6B87KIAbbsHjPQhBkpwvsD4ko7ohAEMUcSmMKzIQILF+pCEGH/9k=",
        name: "Cat1",
        breed: "Persian",
        description: "Meow bruh"
    },
    {
        imageUrl: "https://thriveworks.com/wp-content/uploads/2019/08/blog-thriveworks-companion-pets.jpg",
        name: "Cat2",
        breed: "DefinetlyNotPersian",
        description: "Meow Meow"
    }
]

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/") {
        const imagePattern = /{{imageUrl}}/g;
        const namePattern = /{{name}}/g;
        const breedPattern = /{{breed}}/g;
        const descriptionPattern = /{{description}}/g;

       const catHtml = cats.map((cat) => catTemplate.replace(imagePattern,cat.imageUrl)
       .replace(namePattern,cat.name)
       .replace(breedPattern,cat.breed)
       .replace(descriptionPattern,cat.description))
    
       const homeHtml = homeTemplate.replace("{{cats}}", catHtml)

        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(homeHtml)
    } else if (url === "/content/styles/site.css") {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.write(siteCss)
    } else if (url === "/cats/add-breed") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(addBreedTemplate)
    } else if (url === "/cats/add-cat") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(addCatTemplate)
    }
    res.end()
});

server.listen(port, () => console.log(`Server is running at ${port}`));