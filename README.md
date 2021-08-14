## Setup

```
npx create-react-app . --template redux-typescript
npm i -D eslint
npx eslint --init
```

- To check syntax, find problems, and enforce code style
- JavaSript modules (import/export)
- Reat
- Does your project ues TypeScipt: (Yes)
- Where does your code run? (Browser)
- Use a popular style guide
- Airbnb
- What format do you want your config file to be in? JSON
- Would you like to install them now with npm?: Yes

```
npm i -D eslint-import-resolver-typescript
npm i -D @typescript-eslint/eslint-plugin
npm i -D prettier
npm i -D lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

- Install node module:
  ### `npm install`
