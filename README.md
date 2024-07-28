# Key-Value Store Service

This is a simple Node.js service that uses Redis to store and query key-value pairs. The service listens on port 9000 and provides two endpoints: `POST /input` and `GET /query`.

## Prerequisites

- Node.js and npm installed
- Redis Docker container running

## Installation

1. Clone the repository or download the source code to your local machine.

2. Navigate to the project directory:

    ```sh
    cd path/to/your/project
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Running Redis with Docker

1. Run the Redis container:

    ```sh
    docker-compose up -d
    ```

## Running the Application

1. Start the Node.js application:

    ```sh
    node server.js
    ```

2. The application should now be running on port 9000.

## Testing with `curl`

### Submit a Key

To submit a key, use the `POST /input` endpoint:

```sh
curl -X POST -d "exampleKey" http://localhost:9000/input
```

To query the count of a key, use the `GET /query` endpoint with the key query parameter:

```sh
curl "http://localhost:9000/query?key=exampleKey"
```