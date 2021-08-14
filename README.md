# Template project React, Typescript

> Đây là template tạo bởi create-react-app, redux, typescript, đã set up eslint, prettier cho format, husky, lint-taged cho git commit, path alias với react-app-rewired, những snippet cho typescript

## Table of Contents

- [How to set up](#how-to-set-up)
- [Install node module](#install-node-module)
- [Folder structure](#folder-structure)
- [Problem](#problem)

## How to set up

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
npm i -D react-app-rewired react-app-rewire-alias
```

## Install node module:

```
npm install
```

## Folder Structure:

```
.
├──public
├──src
|  ├──assets 			# thư mục chứa tài nguyên
|  |  ├──images	 		# thư mục chứa hình ảnh
|  |  └── icons 		# thư mục chứa icons
|  |
│  ├──components 		# thư mục chứa components
│  ├──constants 		# thư mục chứa constants
│  ├──pages 			# thư mục chứa pages
│  ├──services 			# thư mục chứa apis
│  ├──store 			# thư mục chứa store redux
│  |  ├──slices			# thư mục chứa slices redux
│  |  ├──hooks.ts 		# file custom useDispatch, useSelector
│  |  └──store.ts 		# file store redux
│  |
|  └──utils 			# thư mục chứa các helper
|
├──.husky  				# cài đặt git hook với husky và lint-staged
│
├──.vscode 				# cài đặt settings của vscode
|   ├── typescript.code-snippets
|   |					# cài đặt snippets của vscode
│   └── settings.json 	# cấu hình eslint cho vscode.
│
├──.eslintignore        # cấu hình các file không chạy eslint.
├──.eslintrc.json       # cấu hình eslint
├──.gitignore:          # cài đặt các folder/file bỏ qua khi commit.
├──.prettierrc:         # cài đặt cấu hình cho prettier
├──config-overrides.js: # cấu hình react-app-rewired
├──package-lock.json:   # file install chính xác version dependencies
├──package.json:        # file quản lý dependencies
├──README.md:           # file mô tả template
├──tsconfig.json:       # cấu hình typesript
└──tsconfig.paths.json: # cấu hình path alias.
```

## Problem:

- Cấu hình alias path tsconfig nên cấu hình ở một file khác và extends vào tsconfig.json.
- baseUrl nên là "." nếu là src hay ./src thì không biết sao nó lỗi
- Craco có vẻ không hoạt động tốt với typescipt( maybe) nên dùng một cái khác thay thế là react-app-rewired.
- Có vẻ như format on save , code action on save bị xung đột, vẫn chưa có dùng eslint extension format all file mà chỉ được một file.
