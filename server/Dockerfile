FROM node:alpine
# Virtually created directory
WORKDIR /server/
COPY package*.json .
COPY yarn.lock .
RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
CMD ["npm","start"]
