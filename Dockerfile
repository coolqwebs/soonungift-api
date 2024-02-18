FROM node:20.11-alpine

ARG _DATABASE_URL=postgres://soonungift:n7mOAfJ1I621d1ELK2fxJos4vFexsc6y@dpg-cn0h3h0l5elc73ejns3g-a.singapore-postgres.render.com/soonungift_orem
ARG _PORT=1448
ARG _JWT_ACCESS_SECRET=INVOKER
ARG _JWT_REFRESH_SECRET=DOLBAEB
ARG _JWT_ACCESS_EXPIRE=86400
ARG _JWT_REFRESH_EXPIRE=259200

ENV DATABASE_URL=$_DATABASE_URL
ENV PORT=$_PORT
ENV JWT_ACCESS_SECRET=$_JWT_ACCESS_SECRET
ENV JWT_REFRESH_SECRET=$_JWT_REFRESH_SECRET
ENV JWT_ACCESS_EXPIRE=$_JWT_ACCESS_EXPIRE
ENV JWT_REFRESH_EXPIRE=$_JWT_REFRESH_EXPIRE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

COPY public ./public

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npx prisma db seed

COPY . .

RUN npm run build

EXPOSE 1448

CMD ["npm", "run", "start"]