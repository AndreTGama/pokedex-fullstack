FROM node:18

WORKDIR /srv/app

COPY package.json ./

COPY tsconfig.json ./

# RUN npm install -g npm@10.2.5

RUN npm cache clean -f

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3000

CMD ["npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "dev"]