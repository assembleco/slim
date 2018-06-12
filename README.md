# SLIM

A System for Laboratory Information Management.

Developed for use at Accupac, Inc.

## Backend

The application only works when it has access to Accupac's systems,
meaning that you must be on Accupac's internal Wi-Fi network to test out the site.
In the future, we'll create a "demo" mode that uses sample data,
and can be used outside of Accupac's network for demonstration purposes.

In order to populate the application with relevant data,
you need to start up the Rails backend:

```bash
$ cd server
$ gem install bundler
$ bundle install
$ rails s
```

Test that the server is working with the command:

```bash
$ curl -X POST http://localhost:3000/evaluate -H "Content-Type: application/json" -d '{ "code": "2 + 2" }'
```

## Frontend

Start up the frontend with:

```bash
$ cd frontend
$ yarn
$ yarn start
```
