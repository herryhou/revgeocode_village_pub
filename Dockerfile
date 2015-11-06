FROM node:0.10.40-slim

WORKDIR /app
ADD ./http /app/http
ADD ./db /app/db
ADD package.json /app/
RUN npm install --production

EXPOSE 3000

CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]