FROM node:20.15.0-alpine
WORKDIR /app
COPY . .
COPY reactapp1.client.pem /root/.aspnet/https/
COPY reactapp1.client.key /root/.aspnet/https/
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]