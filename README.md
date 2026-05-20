# Stocks Tracker

## Project Overview
Stocks Tracker is a Next.js-based web application designed to help users track their favorite stocks effortlessly. With real-time market news and personalized watchlists, it acts as a smart trading assistant tailored for both new and experienced investors. The app utilizes Finnhub API for financial data, better-auth for secure authentication, and Inngest for intelligent background workflows like personalized onboarding and daily AI-summarized market news.

## Live Demo
The app is deployed and live at: [https://my-stocks-tracker.vercel.app/](https://my-stocks-tracker.vercel.app/)

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Database**: MongoDB (Mongoose)
- **Authentication**: `better-auth`
- **Background Jobs**: Inngest
- **Financial Data API**: Finnhub API
- **AI Integration**: Google Gemini API (`gemini-2.5-flash-lite`)
- **Styling**: Tailwind CSS 4 & `tw-animate-css`
- **Email Service**: Nodemailer
- **UI Components**: shadcn/ui & Lucide React

## Features
- **Secure User Authentication**: Robust sign-up and login flow using `better-auth`.
- **Personalized Onboarding**: AI-generated welcome emails customized to user's investment goals, risk tolerance, and preferred industry.
- **Stock Search & Discovery**: Real-time stock search and popular stocks fetching via Finnhub API.
- **Custom Watchlists**: Users can add and manage their favorite stocks in their personal watchlist.
- **Daily AI News Summaries**: Scheduled background jobs (Inngest CRON) fetch relevant news for stocks in the user's watchlist, summarize them using Gemini AI, and send them directly to the user's email via Nodemailer.

## Watchlist Feature
The Watchlist is a core feature that allows users to personalize their market tracking experience. It connects seamlessly with the app's database and background jobs to provide a tailored stock monitoring system:

- **Adding & Managing Stocks**: Users can search for stocks via the Finnhub API and add or remove them from their personal watchlist. The UI immediately reflects these changes through interactive button states.
- **Robust Storage**: Watchlists are stored securely in **MongoDB** using Mongoose. The `WatchlistSchema` stores the user's ID, the stock symbol, company name, and the date added. A unique index on `[userId, symbol]` ensures no duplicate entries exist.
- **Integration with AI News Summaries**: The watchlist acts as the foundation for the daily news feature. Every day at 12:00 PM (via Inngest CRON), the app fetches the user's saved symbols (using `getWatchlistSymbolsByEmail`), retrieves the latest news specifically for those companies from Finnhub, and summarizes the top articles using Google's Gemini AI before sending them via Nodemailer. If a user's watchlist is empty, it intelligently falls back to general market news.

## Project Structure
```
stocks_app/
├── app/
│   ├── (auth)/        # Authentication routes (Sign-up, Sign-in)
│   ├── (root)/        # Main app layout and core pages
│   │   ├── stocks/    # Detailed stock view pages
│   │   └── page.tsx   # Dashboard/Home page
│   ├── api/           # Next.js API routes (Auth, Inngest, etc.)
│   ├── globals.css    # Global Tailwind styles
│   └── layout.tsx     # Root layout & Metadata
├── components/        # Reusable UI components (shadcn, forms, navigation)
├── database/
│   └── models/        # MongoDB schemas (e.g., Watchlist model)
├── lib/
│   ├── actions/       # Server actions (auth, user, watchlist, finnhub)
│   ├── inngest/       # Background job definitions and AI prompts
│   └── nodemailer/    # Email transport setup and HTML templates
└── public/            # Static assets (images, icons)
```

## Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas cluster (or local MongoDB)
- Finnhub API Key
- Google Gemini API Key
- SMTP credentials (e.g., Gmail with App Password) for Nodemailer

### Installation Steps

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository_url>
   cd stocks_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (see section below).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
Create a `.env` file in the root directory. Below is the list of required variables with their descriptions:

```env
# Application Environment
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL='http://localhost:3000'

# Database Configuration
MONGODB_URI='Your MongoDB connection string'

# Authentication (better-auth)
BETTER_AUTH_SECRET='A secure random string for signing tokens'
BETTER_AUTH_URL='http://localhost:3000'

# AI & Third-Party APIs
GEMINI_API_KEY='Your Google Gemini API Key for AI summaries'
NEXT_PUBLIC_FINNHUB_API_KEY='Your Finnhub API key for stock data'

# Email Service (Nodemailer)
NODEMAILER_EMAIL='Your sender email address'
NODEMAILER_PASSWORD='Your email app password'

# Inngest Development
INNGEST_DEV=1  # Enables local Inngest development server
```

## Inngest Setup
Inngest is used to handle background tasks like sending onboarding emails and scheduling daily market news summaries.

To test Inngest locally:
1. Ensure `INNGEST_DEV=1` is in your `.env`.
2. Start your Next.js app (`npm run dev`).
3. In a new terminal tab, start the Inngest Dev Server:
   ```bash
   npx inngest-cli@latest dev
   ```
4. Open the Inngest Dashboard (usually at `http://localhost:8288`). You'll see your registered functions (`sign-up-email`, `daily-news-summary`). You can manually trigger functions or simulate cron events from the dashboard.

## Database Setup
1. Create a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Under "Database Access", create a new database user.
3. Under "Network Access", allow your IP address or `0.0.0.0/0` for universal access.
4. Go to "Database" > "Connect" > "Connect your application" and copy the connection string.
5. Replace `<password>` in the connection string and set it as `MONGODB_URI` in your `.env` file.

## Deployment
The app is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Add all the Environment Variables listed above in the Vercel project settings.
   - *Note: Ensure `NEXT_PUBLIC_BASE_URL` and `BETTER_AUTH_URL` reflect your production domain.*
4. Deploy the project.

### Syncing Inngest
In production, you need to sync your Vercel deployment with Inngest Cloud.
1. Create an account on [Inngest Cloud](https://app.inngest.com).
2. Get your `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` and add them to your Vercel environment variables.
3. When you deploy, Vercel will expose the API route (`/api/inngest`), and Inngest will automatically sync your background functions and CRON jobs.
