install:
				npm install
lint:
				npx eslint .
test: 
				node --experimental-vm-modules node_modules/jest/bin/jest.js
