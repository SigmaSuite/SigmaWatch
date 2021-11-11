FROM node
WORKDIR /app
COPY . .
RUN npm run install
CMD ["npm", "start"]
