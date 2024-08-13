# Use an official Nginx image to serve the React app
FROM nginx:alpine

# Copy the built app from the local 'dist' folder into the Nginx container’s HTML directory
COPY dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
