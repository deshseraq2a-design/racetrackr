# cPanel deployment

## Requirements

- cPanel with **Setup Node.js App** / Passenger support
- Node.js 20 or newer
- SSH or cPanel Terminal access
- HTTPS enabled for the domain

## 1. Upload

Upload the project into an application directory such as `~/raceatlas`. Do not upload `node_modules` or `.next` from the local machine.

Keep `.env` outside public web folders and create it from `.env.example` with real production values.

## 2. Create the Node application

In cPanel, open **Setup Node.js App** and create an application with:

- Node version: 20 or newer
- Application mode: Production
- Application root: `raceatlas`
- Application URL: the desired domain or subdomain
- Startup file: `server.js`

Add the variables from `.env` in the cPanel environment variable section.

## 3. Install, migrate, seed, and build

Run in cPanel Terminal:

```bash
cd ~/raceatlas
npm install --omit=optional
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run build
cp -r public .next/standalone/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/
```

The two copy commands are required by Next.js standalone output. If the application is installed outside the home directory, adjust the `cd` path.

## 4. Restart

Restart the application from **Setup Node.js App**. The startup file runs `.next/standalone/server.js` through the repository `server.js` file.

## 5. Verify

Open these URLs:

- `/`
- `/events`
- `/admin/login`
- `/api/events`
- `/sitemap.xml`

## Production database

SQLite is suitable for a small cPanel installation, but managed PostgreSQL is recommended for production. When using PostgreSQL, replace `DATABASE_URL`, change the Prisma datasource provider to `postgresql`, then run `npx prisma db push` again.

Never use the example password or session secret in production. Rotate both values before launch.
