## Data Wow: Full-stack Developer Assignment (Next.js + NestJS)

## Getting Started

### Please install dependencies in the root, client, and server.

After installing the dependencies, to run the app in a local environment, run the following command from the root directory to start the client and server simultaneously.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Overview

This project is a concert management web application that supports the following features:

- Admins can view, create, and delete concerts as well as view all users' concert reservation histories.
- Users can view concerts, reserve seats, cancel reservations, and view their own reservation history.

### File Structure

The root directory contains a `client` and a `server` folder containing the frontend Next.js client and the backend NestJS server respectively.

### Frontend (`./client`)

- This application uses Next.js's App Router model (introduced in Next.js 13.4) for its simplicity and suitability for single-page applications.
- There are only 2 subpages, Home and History, the main content of which lie in `./app/page.tsx` and `./app/history/page.tsx` respectively.
- The components are contained in the `./app/_components` directory.
- The application uses React's Context API to provide a simplified way to make fetch calls to the server API at various parts of the application, the configurations are contained in `./app/_context`.
- The application's styling is provided in the `./app/global.css` file.

### Backend (`./server`)

- There are 3 main entities (concerts, reservations, reservationHistories) in this application, the server code for each are in their own directories (`./src/`_ENTITY_NAME_).
- Within each of these directories, you will find the following files:
  - `...model.ts`: Interface for the entity.
  - `...controller.ts`: Methods that handle incoming requests and returning responses to the client.
  - `...service.ts`: Methods that are injected into the controller as dependencies to perform data operations.
  - `...module.ts`: Encapsulates the entity's controller and service.
  - `...controller.spec.ts`: File containing tests for each endpoint.
  - `/dto/create-....dto.ts`: Interface for the data transfer object, contains validation rules.

## Dependencies

Other than the packages that come with Nest.js, the only other main dependency that was used in the frontend is `MaterialUI`. Some pre-made components were taken from their library to speed up the development process. As for the backend, NestJS's `class-validator` and `class-transformer` dependencies were used for data validation.

## Server-side Unit Tests

You can run the server unit tests from the terminal or using your IDE's user interface. `cd` into the server directory and run the following command `nest run test`.

## Bonus Task
- Express your opinion about how to optimize your website in case that this
website contains intensive data and when more people access, the lower speed
you get?
  - As the application gets bigger, there are a number of strategies that can be employed to increase efficiency. Data cacheing can be a useful technique to fetch and store information that is often accessed to prevent over-fetching of data, leading to performance gains. Pagination for lists can also be a good way to decrease the size of each request, for instance, the concert list can grow to hundreds of entries, with pagination we may only have to fetch the first ten to display.

- Express your opinion about how to handle when many users want to reserve the
ticket at the same time? We want to ensure that in the concerts there is no one
that needs to stand up during the show.
  - At a high level, there are a number of approaches that can be considered. First, some sort of locking mechanism can be implemented to prevent a user from modifying data when another user is already doing so. For example, a user can be given a certain amount of time to complete an action, and will be kicked off when they do not finish in time.
