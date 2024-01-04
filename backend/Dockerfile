FROM node:18

WORKDIR /srv/app

COPY package.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "dev"]
