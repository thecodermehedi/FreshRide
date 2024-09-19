# FreshRide

FreshRide - A car wash booking system built with Express, MongoDB, TypeScript, JWT, and bcrypt for a secure, efficient, and user-friendly experience.

## Table of Contents

- [FreshRide](#freshride)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Testing](#api-testing)
  - [License](#license)

## Introduction

FreshRide – A seamless car wash booking platform, powered by modern technology for a sparkling clean experience anytime, anywhere.

## Features

- **User Role Management**: The system supports different user roles, including administrators and regular users, allowing for distinct permissions and functionalities.

- **Service Management**: Administrators can create, update, and delete various car wash services, each with specific details like price and duration.

- **Slot Booking System**: Users can book time slots for car wash services, with the system managing availability and preventing double bookings.

- **Vehicle Information Tracking**: The system allows users to enter detailed vehicle information, including type, brand, model, manufacturing year, and registration plate.

- **Secure Authentication**: The application includes secure user authentication and authorization mechanisms, ensuring that user data and booking information are protected.

## Tech Stack

- **Package Manager:** Bun
- **Backend Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Token), bcrypt
- **Validation:** Zod
- **Logging:** Morgan
- **Status Codes:** HTTP Status
- **Language:** TypeScript
- **Linting & Formatting:** ESLint, Prettier

## Prerequisites

Ensure these tools are installed and configured to run FreshRide smoothly.

- **Node.js** (version 18 or later)
- **Bun** (version 1.1.27 or later)
- **MongoDB** (local or remote instance)
- **Git** (for version control)
- **TypeScript** (installed globally or in project)
- **Environment Variables** (configured in a `.env.development` file)
- **Postman** (for testing endpoints)

## Installation

Follow these steps to set up the project locally for development

1. **Clone the Repository**

   ```bash
   git clone https://github.com/thecodermehedi/FreshRide.git
   cd FreshRide
   ```

2. **Install Dependencies**

   ```bash
   bun i
   ```

## Configuration

1. Create a `.env.development` file in the root directory.

2. Add the environment variables by following [.env.example](.env.example)

## Usage

You can use the application by following the script in [package.json](package.json)

This ensures that Bun executes the scripts as defined in your `package.json`.

- **Install Dependencies:** `bun run i`

- **Start Application:** `bun run start`

- **Start in Development Mode:** `bun run dev`

- **Lint Code:** `bun run lint`

- **Format Code:** `bun run format`

## API Testing

For Testing API Endpoints, use Postman.

- Import the [`freshride.postman_collection.json`](freshride.postman_collection.json) file to Postman.
- Import the [`freshride.postman_environment.json`](freshride.postman_environment.json) file to Postman.

## License

Copyright © 2023 Mehedi Hasan. All rights reserved.

This project is licensed under the MIT license.
