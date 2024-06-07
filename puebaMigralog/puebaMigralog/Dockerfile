# Utiliza una imagen base de Node.js para construir la aplicación
FROM node:18 AS build

LABEL maintainer="opdevops@nexuscom.com"
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY . .

# Instala las dependencias y construye la aplicación
RUN npm install && npm run build --prod

# Utiliza una imagen base de NGINX para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio predeterminado de NGINX
COPY --from=build /app/dist/pueba-migralog /usr/share/nginx/html

# Copia el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando para iniciar NGINX
#CMD ["nginx", "-g", "daemon off;"]