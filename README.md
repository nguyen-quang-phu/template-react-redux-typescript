## Setup

```
npx create-react-app . --template redux-typescript
npm i -D eslint
npx eslint --init
```

- How would you like to use ESLint?
  - [x] To check syntax, find problems, and enforce code style
- What type of modules does your project use?
  - [x] JavaSript modules (import/export)
- Which framework does your project use?
  - [x] React
- Does your project ues TypeScipt?
  - [x] Yes
- Where does your code run?
  - [x] Browser
- How would you like to define a style for your project?
  - [x] Use a popular style guide
- Which style guide do you want to follow?
  - [x] Airbnb
- What format do you want your config file to be in?
  - [x] JSON
- Would you like to install them now with npm?:
  - [x] Yes

```
npm i -D eslint-import-resolver-typescript
npm i -D @typescript-eslint/eslint-plugin
npm i -D prettier
npm i -D lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

- Install node module:

```
npm install
```
