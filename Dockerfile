FROM node:20-alpine
WORKDIR /api-fechadura-inteligente
EXPOSE 3037
COPY . .
RUN npm install
ENTRYPOINT npm run dev