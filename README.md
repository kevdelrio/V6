# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and fill in your Firebase credentials (see below). You can also adjust the `VITE_BOOKING_SLOTS` variable to control available booking times.
3. Run the app:
   `npm run dev`

## Environment variables

The application uses the following variables in the `.env` file:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_FIREBASE_FUNCTION_URL` – URL of the Cloud Function used to send emails
- `VITE_BOOKING_SLOTS` – comma-separated list of available times (e.g. `10:00,12:00,14:00,16:00,18:00`)

Deploy a Firebase Cloud Function that receives the form data and sends emails (via Nodemailer, SendGrid, etc.).
