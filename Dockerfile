FROM node:20-alpine

WORKDIR /app

## change ownership for app directory
RUN chown -R node:node /app

## maintain node user rights for copied files
COPY --chown=node:node package*.json ./

## switch to node user
USER node

## launch npm as node
RUN npm ci --only=production

## switch back to root for any other system related needs
USER root
## Upgrade tar based on vulnerability for  7.5.7
RUN npm install tar@latest
## Upgrade minmatch based on vulnerability for 10.2.1
RUN npm install minimatch@latest

## switch back to node
USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
