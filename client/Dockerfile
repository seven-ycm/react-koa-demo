FROM nginx:latest

RUN npm install && npm run build
RUN mkdir /dist
COPY ./dist /html
COPY ./nginx.conf.template /

ENV BACKEND_URL=""

CMD envsubst '$BACKEND_URL' < /nginx.conf.template > /etc/nginx/nginx.conf \
 && cat /etc/nginx/nginx.conf \
 && nginx -g 'daemon off;'