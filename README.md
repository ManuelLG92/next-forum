# Frontend for CQRS Forum Application

This project represents the frontend component of a forum application integrated with a backend service that implements CQRS (Command Query Responsibility Segregation) principles. The backend service offers essential functionalities for managing users and posts, implemented with Kotlin, Gradle, and Spring Boot.

## Overview

The frontend interacts with the backend service to provide a user-friendly interface for forum-related operations. It utilizes Next.js, TypeScript, and Tailwind CSS to deliver an efficient and responsive user experience.

The frontend functionalities correspond to the following backend features:

- **User Operations:**
    - User profile management: creation, update, and deletion.
    - Displaying user details and associated posts.
  
- **Post Operations:**
    - Creating, updating, and deleting posts.
    - Displaying post details and linked user information.

## Integration with Backend

This frontend project communicates with the backend service, leveraging its RESTful API endpoints, to perform the user mentioned above and post operations. It relies on the backend's CQRS architecture for handling data updates and projections.

### Technologies Used

- Next.js
- TypeScript
- Tailwind CSS

### Backend Repository

For details on the backend service integrating with this frontend, please take a look at the [Backend Repository in kotlin](https://github.com/ManuelLG92/forum-kotlin) to understand the implemented functionalities and architectural details.

## Installation and Setup

To run the frontend locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev``.
4. Access the application on `http://localhost:3000`.

## Usage

Upon running the front end locally, explore the user interface to perform forum-related actions like managing users, creating and interacting with posts, and leveraging the backend service's functionalities.

## Contributing

Contributions to enhance the front end are welcome! Fork the repository, make your changes, and open a pull request.

## License

This frontend project is licensed under the MIT License. 
