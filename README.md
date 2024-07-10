# GeneWebappFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Basics and Requirements


```
Angular CLI: 16.0.0
Node: 18.10

```
## Setup

Set up proper node version. Tip: Use NVM to manage multiple versions of node in the same machine.

1. Install NVM using homebrew.
You can follow this tutorial to set up in MAC. [tutorial](https://sukiphan.medium.com/how-to-install-nvm-node-version-manager-on-macos-d9fe432cc7db) 

2. Run these commands after installation:

```
nvm install v18.10.0
nvm use 18.10
```

3. clone this repository and navigate inside

4. Run npm install (inside project folder.)


## Development server 

Run `ng serve` for a dev server. Once the Gene Backend is Running.
Navigate to `http://localhost:4200/home`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployment Information

(TODO) DOCKER INFO AND SETUP

1. CREATE Dockerfile (Above project root)

```

FROM node:16-alpine as builder
WORKDIR /gene-webapp-frontend

COPY /gene-webapp-frontend/package.json .
COPY /gene-webapp-frontend/package-lock.json .

RUN npm install
COPY /gene-webapp-frontend .

##Only for debug
#RUN apk update && apk add bash
#ENTRYPOINT ["/bin/bash"]

RUN npm run ng build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /gene-webapp-frontend/dist/gene-webapp-frontend .

## Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

## Replace with our own nginx.conf
COPY nginx.conf /etc/nginx/conf.d/

##Export port 80 that is the one that is used by nginx
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]

```

2. CREATE .dockerignore (Above project root)
```
gene-webapp-frontend/node_modules
node_modules
```

3. Create nginx.conf (Above project root)
```
server {
  listen 80;
  sendfile on;
  default_type application/octet-stream;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   256;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;

  root /usr/share/nginx/html;

  location / {
    try_files $uri $uri/ /index.html =404;
  }
}
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
