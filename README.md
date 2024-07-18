# Migralog BackEnd Springboot

## Descripción
**Migralog** es una aplicación web diseñada para registrar y analizar episodios de migraña, proporcionando información valiosa que ayuda tanto a pacientes como a médicos a identificar patrones y desarrollar estrategias de tratamiento efectivas.

## Tabla de Contenidos
1. [Justificación del Proyecto](#justificación-del-proyecto)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Contribuciones](#contribuciones)
8. [Licencia](#licencia)
9. [Contacto](#contacto)

## Justificación del Proyecto
La migraña es una afección neurológica que afecta a millones de personas en todo el mundo. El principal desafío en su tratamiento radica en su naturaleza variable, lo que dificulta la identificación de causas comunes y el desarrollo de tratamientos efectivos. **Migralog** busca abordar esta variabilidad mediante la recopilación y análisis detallado de datos personales relacionados con los episodios de migraña .

## Características
- Registro detallado de episodios de migraña
- Análisis de patrones y factores desencadenantes
- Informes precisos y detallados para la comunicación con médicos
- Interfaz amigable y fácil de usar
- Soporte para múltiples dispositivos y navegadores

## Tecnologías Utilizadas
- **Frontend:** Angular, HTML, CSS
- **Backend:** Java con Spring
- **Base de Datos:** MySQL
- **Herramientas Adicionales:** MySQL Workbench, DBeaver, Apache Tomcat, Xampp, Figma, Greenshot   

## Instalación
### Requisitos
- Java 8 o superior
- Node.js y npm
- MySQL

### Pasos para la Instalación
1. Clona el repositorio:
    ```bash
    git clone https://github.com/oPelayo/the_way/migralog2.git
    ```
2. Configura la base de datos MySQL y actualiza el archivo `application.properties` con tus credenciales.
3. Instala las dependencias del backend:
    ```bash
    cd migralog-backend
    mvn install
    ```
4. Instala las dependencias del frontend:
    ```bash
    cd migralog-frontend
    npm install
    ```
5. Inicia la aplicación:
    - Backend:
        ```bash
        mvn spring-boot:run
        ```
    - Frontend:
        ```bash
        ng serve
        ```

## Uso
1. Accede a la aplicación en tu navegador en `http://localhost:4200`.
2. Regístrate o inicia sesión.
3. Comienza a registrar tus episodios de migraña y analiza los datos recopilados.

## Estructura del Proyecto
- **Frontend:** `migralog-frontend/`
    - Componentes Angular, servicios, y estilos
- **Backend:** `migralog-backend/`
    - Controladores, servicios, y modelos de Spring
- **Base de Datos:** `migralog-db/`
    - Scripts SQL para la creación y gestión de la base de datos dentro de la carpeta raiz del proyecto Migralog2/Migralog_Database_Structure.sql

## Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz un push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Desarrollado por oPelayo. 


