publish:
			npm publish --dry-run

install:
				npm install

ci:
				npm ci

lint:
				npx eslint .

test:
				npm test 

test-coverage:
				npm test --coverage --coverageProvider=v8

test-watch:
				npm test --watchAllmake