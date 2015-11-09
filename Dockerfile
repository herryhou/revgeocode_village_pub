FROM node:0.10.40-slim

WORKDIR /app
COPY package.json /app/
RUN npm install --production
COPY ./http /app/http
COPY ./db/village /app/db/village
COPY ./data /app/data
COPY ./builddb /app/builddb

EXPOSE 3000

CMD ["npm", "start"]