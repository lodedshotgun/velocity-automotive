FROM nginx:alpine

WORKDIR /app

COPY . .

RUN cp -r "student info/." /usr/share/nginx/html/

EXPOSE 80
