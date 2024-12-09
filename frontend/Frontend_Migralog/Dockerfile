# Utiliza una imagen base de NGINX para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio predeterminado de NGINX
COPY dist/migralog /usr/share/nginx/html

# Copia los archivos de configuración de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]