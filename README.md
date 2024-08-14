# Employee Management and Attendance System
This project is an Employee Management and Attendance System built with Spring Boot (backend) and Angular (frontend). It enables managing employee details and tracking attendance by scanning QR codes on employee badges.

## Features
- Employee Management: Create, update, view, and delete employee records.
- Attendance Tracking: Scan QR codes on employee badges to record and monitor attendance.
- Role-Based Access Control: Secure the application with Spring Security, ensuring only authorized users can access specific features.
- DTO <=> Entity Mapping: Efficiently map between Data Transfer Objects (DTOs) and entities using mappers.
- Repositories: Leverage Spring Data JPA repositories for database operations.
- Real-time Updates: Display real-time employee status and attendance logs.
- RESTful API: Backend provides RESTful services for managing employees and attendance data.
- Responsive Design: Frontend is responsive and user-friendly, ensuring seamless access across devices.

## Technologies Used
### Backend
- Spring Boot: Framework for creating Java-based enterprise applications.
- Spring Data JPA: Manages database interactions with minimal boilerplate code.
- Hibernate: ORM framework used for mapping Java objects to database tables.
- Spring Security: Secures the application by managing user authentication and authorization.
- DTO <=> Entity Mappers: Maps DTOs to entities and vice versa for efficient data transfer.
- Repositories: Interfaces for CRUD operations, provided by Spring Data JPA.
- JDBC: Direct database access for complex queries and operations.
- H2 Database: In-memory database for development and testing.
- Lombok: Reduces boilerplate code.
- Maven: Dependency management and build tool.

### Frontend
- Angular: Framework for building client-side applications.
- TypeScript: Superset of JavaScript used for Angular.
- Bootstrap: CSS framework for responsive design.
- Angular Material: UI component library for Angular.
- ZXing Scanner: Integration with ZXing (Zebra Crossing) library for QR code scanning.
- QR Code Scanner: Integration for scanning QR codes.
