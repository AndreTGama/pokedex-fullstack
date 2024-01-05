FROM node:18.12.1

WORKDIR /srv/app

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it

RUN chmod +x /usr/local/bin/wait-for-it

COPY package.json ./

COPY tsconfig.json ./

# RUN npm install -g npm@10.2.5

RUN npm cache clean -f

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]