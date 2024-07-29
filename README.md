# Key-Value Store Service

This is a simple Node.js service that uses Redis to store and query key-value pairs. The service listens on port 9000 and provides two endpoints: `POST /input` and `GET /query`.

# Overview

The purpose of the service is keep the counts of the submitted keys count and expose counts from a query endpoint.

Redis persistence is used to store key values to disc at every write and as a cache for the reads.

## Prerequisites

- Node.js and npm installed
- Docker installed

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
4. Run the Redis container:

    ```sh
    cd docker-compose
    docker-compose up -d
    ```

## Running the Application

1. Start the Node.js application:

    ```sh
    cd path/to/your/project
    node server.js
    ```

2. The application should now be running on port 9000.

## Testing with `curl`

### Submit a Key

To submit a key, use the `POST /input` endpoint:

```sh
curl --location 'http://localhost:9000/input' \
--header 'Content-Type: text/plain' \
--data 'exampleKey1'
```

To query the count of a key, use the `GET /query` endpoint with the key query parameter:

```sh
curl --location --request GET 'http://localhost:9000/query?key=exampleKey1' \
--header 'Content-Type: text/plain' \
--data 'exampleKey1'
```