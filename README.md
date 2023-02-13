
# wot-project-FrontEnd-LuceriPalma

Project Road Condition Monitoring System based on Nordic Thingy:52


The complete project is composed by:
- FrontEnd (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-FrontEnd-LuceriPalma)
- BackEnd (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-BackEnd-LuceriPalma)
- presentation (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-presentation-LuceriPalma)



## Authors

- [@mluceri ](https://www.github.com/mluceri)
- [@cpalma-usal](https://www.github.com/cpalma-usal)




## Installation and instruction

In the development environment, a local machine was utilized, with the following needed services:
- A web server (http-server, live-server, ‘express’ in node app, or apache web server) working on localhost. An an express web server is included in the node application serverApp.js.
- A database (JSON Server, MongoDB, PostgreSQL), working on localhost. This project mainly uses json-server, a little development database (DB) server, with live reload capability to create a quick REST API for a DB stored on file in .json format (db.json file). The json-server is included in the node application serverApp.js
- A node application serverApp.js with extra functionalities such as web socket, routing control, access control, launch the trained model and more. ServerApp.js works on port 3002 on localhost.

In the production environment more configuration and settings are required:
- a private certificate for secure (https) connection, 
- a domain (or a dynamic domain with duckdns.org or similar services)

This repository contains the frontend : html, css, js files in order to run the web application.


### Setting and launch of the web-server

Assuming that the backend is installed it will be enough to copy the folder frontend as public subfolder of the node folder of the backend.

Assuming the backend part is installed :

```bash
  cd backend
  cd node
  ln -s public /path/to/frontend
```

The node serverApp will be listening on :
  http://localhost:3002

In details, the web server (public folder) will be available on :
  http://localhost:3002/iot/


## Acknowledgements
 - [Nordic Thingy js library](https://github.com/NordicPlayground/Nordic-Thingy52-Thingyjs)
 - [Leaflet interactive map](https://leafletjs.com/)
 - [json-server](https://github.com/typicode/json-server/)
