# Migralog

# Table of Contents
1. [Project Overview](#project-overview)
2. [Main Features](#main-features)
3. [Technologies Used](#technologies-used)
4. [Project Goals](#project-goals)
   1. [General Goals](#general-goals)
   2. [Secondary Goals](#secondary-goals)
5. [Functional Requirements](#functional-requirements)
6. [Project Architecture](#project-architecture)
7. [Database and Security](#database-and-security)
8. [Prototyping and UI Design](#prototyping-and-ui-design)
9. [Repository Structure](#repository-structure)
10. [Installation and Usage](#installation-and-usage)
   1. [Clone the Repository](#clone-the-repository)
   2. [Frontend Setup](#frontend-setup)
   3. [Backend Setup](#backend-setup)
11. [Contributions](#contributions)

## Project Overview
Migraine is a neurological condition affecting millions of people worldwide, characterized by severe headaches, light sensitivity, nausea, and vomiting. The primary challenge in treating migraines lies in their highly variable nature, making it difficult to identify common causes and effective treatments.

Migralog was created to address this variability by collecting and analyzing detailed personal data related to migraine episodes. The goal is to identify patterns that can help patients and doctors better understand the underlying causes of migraines and develop more effective treatment strategies.

## Main Features
- **Personalized Logging**: Users can log their migraine episodes with detailed information such as symptoms, previous activities, and treatments used.
- **Pattern Analysis**: The app identifies patterns based on the logged data, helping to detect possible triggers.
- **Report Generation**: Users can generate detailed reports to share with their doctors, aiding in better decision-making.
- **Color Theme Selection**: The interface can be customized with different color palettes to make reading easier without worsening migraine symptoms.

## Tecnologies Used
- **Frontend**: Angular (Components, Services, Guards, Interceptors)
- **Backend**: Spring Boot (Controllers, Services, Security)
- **Database**: MySQL (Entities, Repositories)

## Project Goals

### General Goals
- Allow users to log detailed information about each migraine episode, including triggers, symptoms, and treatments used.
- Analyze collected data to identify risk factors and behaviors that contribute to migraine episodes.
- Provide personalized reports that highlight risk activities and the effectiveness of treatments.
- Offer doctors a complete and detailed study of their patients' migraine episodes, facilitating decision-making.
- Incorporate chromotherapy elements into the app to explore its impact on migraine pain management.

### Secondary Goals
- Develop a responsive web app that adapts to various devices.
- Allow users to customize the interface with color themes and font size adjustments.
- Ensure secure authentication techniques to protect user data.
- Reduce self-medication as a primary response to migraines.

## Functional Requirements
- User registration and management.
- Data privacy and security.
- Generation of personalized statistics and reports.
- The system must be available 24/7.

## Project Architecture
Migralog follows the MVC architecture to structure the project efficiently. The app is divided into three layers:

- **Model**: Manages the data and logic of the application, interacting with the database (MySQL).
- **View**: Responsible for rendering the UI and handling user interactions (Angular components).
- **Controller**: Handles the user requests, processes business logic, and sends responses to the frontend (Spring Boot controllers).

### Data Flow
1. **User Interaction**: Users interact with the Angular frontend by logging a migraine episode or viewing reports.
2. **Backend Communication**: The frontend sends HTTP requests to the Spring Boot backend. These requests include JWT tokens for authentication.
3. **Data Processing**: The backend processes the request, interacts with the database, and returns a response to the frontend.
4. **UI Update**: The Angular app updates the user interface with the latest data from the backend.

## Database and Security
- **Database**: Migralog uses a MySQL database to manage users, roles, and migraine logs. The Entity-Relationship Diagram (ERD) outlines the database structure.

![Entity-Relationship Diagram](link_to_image)

- **Security**: 
  - Passwords are encrypted using bcrypt before storing in the database.
  - JWT tokens are used for secure authentication, ensuring that only authorized users can access protected routes.
  - Angular **Guards** and **Interceptors** protect routes and ensure that requests include valid JWT tokens.

## Prototyping and UI Design
The initial design of Migralog was created using Figma, focusing on accessibility and user experience. Some key aspects:
- A clean, spacious design with green color tones.
- A responsive layout that adapts to different screen sizes.
- Simplified login and personal dashboard interfaces, which change dynamically after logging in.
- Considerations were made to avoid designs that could induce eye strain or migraines, such as avoiding complex backgrounds or distracting patterns.

![Prototyping Example - Index](link_to_image)

Feedback from individuals with migraines was collected to refine the user experience further.

## Repository Structure
The "Migralog" project is divided into two main parts:

Frontend: Developed in Angular, responsible for the user interface.
Backend: Developed with Spring Boot, handling server logic and database management.
Each section contains its own README.md file with detailed installation and configuration instructions.

## Installation and Usage
### Clone the Repository

```bash
git clone https://github.com/oPelayo/Migralog.git
```

## Frontend Setup
Follow the instructions in the /frontend folder to install and run the frontend.

## Backend Setup
Follow the instructions in the /backend folder to configure and run the backend.

## Contributions
Contributions are welcome. If you have suggestions or improvements, feel free to open an issue or submit a pull request.
