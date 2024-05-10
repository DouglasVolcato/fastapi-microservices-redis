FROM node:18 as build
WORKDIR /app
COPY . ./
RUN npm i
COPY . ./
CMD ["npm", "run", "dev"]