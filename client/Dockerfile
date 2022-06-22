FROM nginx:latest

RUN mkdir /dist
COPY ./dist /dist
COPY ./nginx.conf.template /

ENV BACKEND_URL=""
ENV BACKEND2_URL=""

CMD envsubst '$BACKEND_URL $BACKEND2_URL' < /nginx.conf.template > /etc/nginx/nginx.conf \
 && cat /etc/nginx/nginx.conf \
 && nginx -g 'daemon off;'