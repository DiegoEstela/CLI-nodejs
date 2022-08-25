# build environment
FROM node:14-alpine as react-build
WORKDIR /app
# Copy necessary files and folders
COPY package.json package.json
COPY src src
COPY yarn.lock yarn.lock
COPY babel.config.json babel.config.json
COPY tsconfig.json tsconfig.json
COPY webpack.config.js webpack.config.js
COPY .npmrc .npmrc
# Build and environment variables
ARG NPM_TOKEN

# Install dependencies
RUN yarn install --frozen-lockfile

# ARG ENV_VAR_NAME

# ENV REACT_APP_ENV_VAR_NAME=$ENV_VAR_NAME

# Build webapp
RUN yarn webpack --progress
RUN rm -rf .npmrc

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
