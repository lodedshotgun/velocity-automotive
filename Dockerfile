
FROM nginx:alpine

COPY "student info/index.html" /usr/share/nginx/html/index.html
COPY "student info/styles.css" /usr/share/nginx/html/styles.css
COPY "student info/script.js" /usr/share/nginx/html/script.js

EXPOSE 80
