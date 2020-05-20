# Lyrixor

## How to develop

Frontend can be developed with CRA's built-in dev-server port 3000 using

### Backend

A mongodb plugin must be added to the heroku project.

Create '.env' file in the root with following contents:

```
MONGODB_URI=
LYRICS_COLLECTION=lyrics
PORT=4000
```

MONGODB_URI can be found from heroku cli: 'heroku login' and 'heroku config:get MONGODB_URI'.

Run 'npm i' on root to install server dependencies. Run 'npm start' to start the server.

### Frontend

Run 'cd frontend'. Run 'npm i' to install frontend dependencies. Run 'npm start' to start development server.

Frontend can be accessed either as built version from the port in which the API is running or from a dev -server. API port is used for the api when on development environment.
