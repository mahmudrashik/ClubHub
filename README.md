# ClubHub

ClubHub is a Spring Boot social platform for university clubs, built during Industrial Training at DSi (Dynamic Solution Innovators). It gives students, club admins, and university admins one connected space to discover clubs, publish updates, manage memberships, and keep campus communities active.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Required-blue.svg)](https://www.postgresql.org/)
[![Flyway](https://img.shields.io/badge/Flyway-Migrations-red.svg)](https://flywaydb.org/)

## What It Does

- Connects university clubs and students through a shared social platform.
- Lets students explore clubs, follow clubs, apply for membership, create posts, like, comment, and receive notifications.
- Gives club admins tools to publish club updates, manage members, and review applications.
- Gives university admins a management panel to create clubs and manage club admin accounts.
- Uses role-based access control for students, club admins, and university admins.
- Seeds a rich demo dataset with countries, universities, clubs, users, posts, likes, comments, and applications.

## Tech Stack

- Java 21
- Spring Boot 3.5.4
- Spring Security
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway database migrations
- Thymeleaf
- Maven Wrapper
- React + Vite prototype assets

## Project Structure

```text
src/main/java/com/example/clubhub4
  config/        Spring MVC and Security configuration
  controller/    Web and API controllers
  dto/           Form and view models
  entity/        JPA entities
  repository/    Spring Data repositories
  security/      Authentication principal and user details service
  service/       Business logic

src/main/resources
  db/migration/  Flyway migrations and demo data
  static/        CSS, JavaScript, and served assets
  templates/     Thymeleaf pages
```

## Prerequisites

Install these before running the project:

- Java 21
- PostgreSQL 14 or newer
- Git

Maven does not need to be installed globally because the project includes `mvnw.cmd`.

## Quick Start On Windows

1. Create a PostgreSQL database named `clubhub4`.

   ```sql
   CREATE DATABASE clubhub4;
   ```

2. Set your database password in the terminal.

   ```bat
   set DB_PASSWORD=your-postgres-password
   ```

3. Start the project.

   ```bat
   run.bat
   ```

4. Open the app at:

   ```text
   http://localhost:8080
   ```

Flyway runs automatically on startup and creates the required tables and demo data.

## Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://localhost:5432/clubhub4` | PostgreSQL JDBC URL |
| `DB_USERNAME` | `postgres` | Database username |
| `DB_PASSWORD` | empty | Database password |
| `APP_LOG_LEVEL` | `INFO` | Application logging level |
| `SECURITY_LOG_LEVEL` | `WARN` | Spring Security logging level |
| `WEB_LOG_LEVEL` | `INFO` | Spring Web logging level |
| `THYMELEAF_LOG_LEVEL` | `WARN` | Thymeleaf logging level |

You can copy `.env.example` as a reference when configuring your local environment.

## Demo Login

The seed data creates many demo users. All seeded demo accounts use:

```text
password123
```

Example accounts:

| Role | Email |
| --- | --- |
| University Admin | `admin.1@u0001.edu` |
| Club Admin | `ca1_1@u0001.edu` |
| Student | `jordan.williams1@student.u0001.edu` |

## Useful Commands

```bat
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
npm install
npm run build
npm run lint
```

## Security Notes

- New passwords are stored using BCrypt instead of plaintext.
- Database credentials are read from environment variables instead of being hardcoded.
- CSRF protection is used on state-changing Thymeleaf forms.
- Local uploads, logs, build output, IDE settings, and environment files are ignored by Git.

## Author

**Rashik Mahmud Majumder**  
Industrial Training Project at **DSi (Dynamic Solution Innovators)**
