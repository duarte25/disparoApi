FROM node:18.14.2
WORKDIR /api-fechadura-inteligente
ENV PORT=3032
ENV DB_URL=mongodb+srv://mateusmoraes123:123@primeiro-mongo.n1gqj7p.mongodb.net/fechadura-inteligente
EXPOSE 3032
COPY . .
RUN npm install
ENTRYPOINT npm run dev