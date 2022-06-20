FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=pod
COPY . .

CMD ["npm", "start"]