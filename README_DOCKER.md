# Running with Docker

This project has been dockerized with a multi-container setup containing:
1. **Frontend**: React + Vite (serving on `http://localhost:5173`)
2. **Backend**: Express (serving on `http://localhost:3000`)
3. **Database**: MariaDB (serving on `localhost:3306`)

The Docker integration supports database auto-initialization, state persistence, and hot-reloading for development.

---

## Prerequisites

- Make sure you have **Docker** and **Docker Compose** installed on your system.

---

## How to Run

To build and start all the services, run the following command in the project root directory:

```bash
docker compose up --build
```

This will:
- Spin up the MariaDB database service.
- Wait for the database container to become healthy.
- Run the SQL schema and data seed scripts automatically (`createDb.sql` and `insertData.sql`).
- Spin up the Express backend.
- Spin up the React/Vite development server.

Once running:
- **Frontend App**: Open [http://localhost:5173](http://localhost:5173) in your browser.
- **Backend API**: Accessible at [http://localhost:3000](http://localhost:3000).
- **MariaDB Database**: Accessible locally on port `3306` with username `root` and password `jiwoo@mysql0404`.

---

## Stopping the Containers

To stop the running application, press `Ctrl + C` in the terminal where it is running, or run:

```bash
docker compose down
```

To stop the containers and **remove the database volume** (e.g., if you want to reset the database and run the init scripts from scratch):

```bash
docker compose down -v
```

---

## How It Works

- **Database Initialization**: The database schema and dummy values are read from `src/server/sql_modules/createDb.sql` and `src/server/sql_modules/insertData.sql`. They are automatically loaded when the MariaDB container starts for the first time.
- **Volume Binding (Hot-Reloading)**: Code changes in both the backend and frontend are synchronized with the containers in real-time, allowing you to develop seamlessly without rebuilding the images.
- **Shared Uploads**: File uploads (stored in `src/server/assets`) are persisted and shared across the host and the container.
