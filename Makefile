install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint . --ext js,jsx

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack-dev-server

build:
	rm -rf dist
	npm run build
