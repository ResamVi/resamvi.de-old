FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/default.conf
COPY build/ /var/www/html

EXPOSE 80