# node-api-server-tutorial
Simple introduction to creating a REST service and api with node and express


## Running the server

Clone the repository, then run these commands in the project folder:
```
npm install
npm start
```

Now you can access the the API server ([http://localhost:4000](http://localhost:4000)).

## Current API endpoints

- `GET /api/trainers` (Get all the trainers in the database)
- `GET /api/pokemon` (Get all the pokemon in the database)

You can test out these endpoints in your web browser by navigating to [http://localhost:4000/api/trainers](http://localhost:4000/api/trainers) and [http://localhost:4000/api/pokemon](http://localhost:4000/api/pokemon). You can also format the JSON data that is returned with a Chrome extension - see below.

## Completing the project

You need to implement the following endpoints:

- `GET /api/trainers:id` (get a specific trainer)
- `GET /api/trainers:id/pokemon` (get the pokemon for a specific trainer)
- `GET /api/pokemon/:id` (get a specific pokemon)
- `POST /api/trainers` (add a trainer)
- `POST /api/pokemon` (add a pokemon)

See `api-server.js` for more help on how to create these endpoints.
