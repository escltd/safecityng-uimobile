# Install system dependencies
FROM node:18.18-alpine as userinterface
WORKDIR /userinterface

# Install nodejs dependencies
COPY package.json ./
RUN yarn install

# Copy and generate the static html
COPY . .
RUN yarn generate

# Install system dependencies
FROM nginx:alpine as frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=userinterface /userinterface/dist /usr/share/nginx/html/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]