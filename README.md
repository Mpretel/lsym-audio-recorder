# Record Server Example

This is a simple example of how to record audio and save audio to a Node server.
The Json middleware is set with a maximum of 50MB per audio, modify this with caution.


## Getting started in standalone mode

	npm install or yarn install.

	npm install


### Run the server.

	node server.js


## Using Docker

	docker build -t node-recorder:v1 .
	docker run -d -ti -p 3545:3545 --name=node-recorder node-recorder:v1


### Go to http://localhost:3545
