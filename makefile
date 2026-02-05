DOCKER_IMAGE = canvas-graph
DOCKER_TAG_DEV = dev
DOCKER_TAG_PROD = prod
CONTAINER_NAME_DEV = canvas-graph-dev
CONTAINER_NAME_PROD = canvas-graph-prod
PORT_DEV = 5173
PORT_PROD = 8080


build-dev: 
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG_DEV) --target development .

run-dev:
	docker run -d --name $(CONTAINER_NAME_DEV) \
	-p $(PORT_DEV):5173 \
	-v "$(CURDIR)/public:/app/public" \
	-v "$(CURDIR)/src:/app/src" \
	-v "$(CURDIR)/index.html:/app/index.html" \
	-v "$(CURDIR)/package.json:/app/package.json" \
	-e CHOKIDAR_USEPOLLING=true \
	$(DOCKER_IMAGE):$(DOCKER_TAG_DEV)

stop-dev:
	docker stop $(CONTAINER_NAME_DEV) 
	docker rm $(CONTAINER_NAME_DEV) 



build-prod: 
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG_PROD) --target production .


run-prod:
	docker run -d -p:8080:80 --name $(CONTAINER_NAME_PROD) $(DOCKER_IMAGE):$(DOCKER_TAG_PROD)

stop-prod:
	docker stop $(CONTAINER_NAME_PROD)
	docker rm $(CONTAINER_NAME_PROD)