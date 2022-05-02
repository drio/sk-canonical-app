SERVER_STATIC_DIR=/Users/drio/dev/github.com/drio/go-canonical-app/static

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## dev: start skit in dev mode
dev:
	npm run dev -- --port 4001

## toserver: build and copy bundle to server
.PHONY: toserver
toserver: build
	cp -r build/* $(SERVER_STATIC_DIR)/

## build: rebuild production bundle
.PHONY: build
build:
	cp .env /tmp/_tmp_env && \
	cp .env.prod .env && \
	NODE_ENV=production npm run build && \
	cp /tmp/_tmp_env ./.env
