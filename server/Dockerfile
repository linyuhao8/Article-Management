FROM node:23.5.0
WORKDIR /app
COPY ./package.json ./package.json
RUN npm install 
COPY . .
RUN npm run swagger
EXPOSE 5007
CMD ["npm", "start"]