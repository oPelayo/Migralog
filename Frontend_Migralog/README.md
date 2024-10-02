# Migralog FrontEnd - Angular
## Descripción
El frontend de Migralog es la interfaz de usuario de una aplicación web diseñada para registrar y analizar episodios de migraña. La plataforma permite a los usuarios interactuar de manera sencilla y eficiente, proporcionando gráficos y resúmenes útiles para ayudar a identificar patrones en los episodios y compartir información relevante con profesionales de la salud.

## Tabla de Contenidos
1. [Descripción](#descripcion)
2. [Justificación del proyecto](#justificación-del-proyecto)
3. [Características](#características)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Instalación](#instalación)
6. [Uso](#uso)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)
10. [Contacto](#contacto)

## Justificación del Proyecto
La migraña afecta a millones de personas en todo el mundo, y uno de los mayores retos en su tratamiento es la variabilidad de los síntomas. El frontend de Migralog permite a los usuarios registrar y analizar detalladamente sus episodios de migraña, facilitando la identificación de patrones y factores desencadenantes que pueden ayudar tanto a pacientes como a médicos a personalizar los tratamientos.

Características
- Interfaz amigable y responsiva para el registro de episodios de migraña.
- Gráficas y reportes dinámicos basados en los datos ingresados por el usuario.
- Integración con el backend para el análisis de patrones y factores desencadenantes.
- Soporte para múltiples dispositivos y navegadores.
- Accesibilidad y diseño centrado en el usuario.

## Tecnologías Utilizadas
- Framework: Angular
- Lenguajes: HTML, CSS, TypeScript
- Herramientas de Desarrollo: Node.js, npm, Angular CLI, Jasmine (pruebas unitarias)
- Estilos: Bootstrap, CSS
- Integración con Backend: API REST (desarrollada en Spring Boot)

## Instalación
### Requisitos
- Node.js (v14 o superior)
- npm (gestor de paquetes de Node.js)
- Angular CLI (para ejecutar comandos de Angular)

### Pasos para la Instalación
1. Clona el repositorio del frontend:
 ```bash
git clone https://github.com/<usuario>/<repositorio-frontend>.git
 ```

2. Entra en el directorio del proyecto:
 ```bash
cd migralog-frontend
 ```

3. Instala las dependencias del proyecto:
 ```bash
npm install
 ```
4. Configura el archivo environment.ts con la URL del backend si es necesario. El archivo se encuentra en src/environments/environment.ts.

5. Inicia la aplicación:

 ```bash
ng serve
 ```
6. Accede a la aplicación en tu navegador:


## Uso
La aplicación permite a los usuarios:
Registrarse o iniciar sesión.
Registrar episodios de migraña con detalles específicos.
Visualizar gráficos y reportes basados en los datos recopilados.
Compartir información con médicos de manera sencilla.
Estructura del Proyecto
src/app: Contiene los componentes, servicios y módulos del frontend.
src/assets: Archivos estáticos como imágenes y estilos globales.
src/environments: Configuraciones de entorno (desarrollo y producción).
Principales componentes
header.component: Barra de navegación.
episode-form.component: Formulario para registrar episodios de migraña.
dashboard.component: Visualización de los datos y gráficos.

## Contribuciones
Las contribuciones al frontend son bienvenidas. Sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama para tu funcionalidad:
 ```bash
git checkout -b feature/nueva-funcionalidad
 ```
Realiza tus cambios y haz un commit:
 ```bash
git commit -m "Añadir nueva funcionalidad"
 ```
Haz un push a tu rama:
 ```bash
git push origin feature/nueva-funcionalidad
 ```
Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.

Contacto
Desarrollado por oPelayo. Puedes contactarme a través de Discord: Jacin#6567.
