publish:
			npm publish --dry-run

install:
				npm install

ci:
				npm ci

publish:
				npm publish --dry-run

lint:
				npx eslint .

test:
				npm test 

test-coverage:
				npx jest --coverage --coverageProvider=v8

test-watch:
				npx jest --watch