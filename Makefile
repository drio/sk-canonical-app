SERVER_STATIC_DIR=/Users/drio/dev/github.com/drio/go-canonical-app/static

dev:
	npm run dev -- --port 4001

toserver: build
	cp -r build/* $(SERVER_STATIC_DIR)/

build:
	cp .env /tmp/_tmp_env && \
	cp .env.prod .env && \
	NODE_ENV=production npm run build && \
	cp /tmp/_tmp_env ./.env
