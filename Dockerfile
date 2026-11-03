
FROM nginx:alpine

COPY --chmod=644 index.html /usr/share/nginx/html/index.html
COPY --chmod=644 styles.css /usr/share/nginx/html/styles.css
COPY --chmod=644 script.js /usr/share/nginx/html/script.js

EXPOSE 80
