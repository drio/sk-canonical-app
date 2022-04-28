SERVER_STATIC_DIR=/Users/drio/dev/github.com/drio/go-canonical-app/static

dev:
	npm run dev

toserver: build
	cp -r build/* $(SERVER_STATIC_DIR)/

build:
	npm run build
