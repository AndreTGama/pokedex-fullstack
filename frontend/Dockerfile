FROM node:18

WORKDIR /srv/app

COPY package.json ./

COPY vite.config.ts ./

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev", "--host"]