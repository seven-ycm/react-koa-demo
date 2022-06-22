FROM nginx:latest

RUN mkdir /html
COPY ./dist /html
COPY ./nginx.conf.template /

ENV BACKEND_URL=""

CMD envsubst '$BACKEND_URL' < /nginx.conf.template > /etc/nginx/nginx.conf \
 && cat /etc/nginx/nginx.conf \
 && nginx -g 'daemon off;'