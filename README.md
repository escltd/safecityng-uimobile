<h1 align='center'>
  SafeCityNG UI Mobile
</h1>

## 📜 Table of Contents
- [🧐 Business context](#-business-context)
- [🔨 Technology stack](#-technology-stack)
- [💻 Project setup](#-project-setup)
- [Clone this repo](#clone-this-repo)
- [Setup .env file](#setup-env-file)
- [Run locally](#run-locally)
- [Compile app](#compile-app)
- [Run app](#run-app)

---

# 🧐 Business context

### Project Goal
Create a Mobile Frontend UI to serve SafeCityNG 

---

# 🔨 Technology stack

- Typescript _statically typed, compiled high-level programming language_
- Nuxt3 _javascript meta-framework built on top of vue_
- Vue3 _javascript framework for building user interfaces_
- UnoCss _flexible and extensible atomic CSS engine_

- Commits follow Conventions as per https://github.com/conventional-changelog/commitlint
---


# 💻 Project setup


### Clone this repo

To install this project, first clone repo to your machine (use SSH) and change to directory

```
cd safecityng-uimobile
```

### Install dependencies

Execute this commands in your terminal:

```
# npm
npm install

# yarn 
yarn install
```

### Setup .env file

Create `.env` file based on `.env.sample` and fill in variables from a suitable source.

### Run locally

```
# npm
npm run dev

# yarn 
yarn dev
```

### Compile app
To compile the app run 

```
# npm
npm run generate

# yarn 
yarn generate
```


### Run app
To run the app run 

```sh
# docker
docker build -t safecityng-uimobile .

# docker run
docker run --name=webapp -p 8080:80  -d safecityng-uimobile
```
