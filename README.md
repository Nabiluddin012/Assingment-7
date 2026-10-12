# BazarDor — Smart Market Price Tracker

BazarDor is a modern, responsive web application that helps users explore market products, check product prices, browse categories, and discover price changes through a simple and user-friendly interface.


## Features

- **Modern Homepage:** A clean hero section with navigation and a call-to-action button.
- **Price Updates:** A scrolling price ticker and sections highlighting rising and falling prices.
- **Product Listing:** Browse available products and view their prices.
- **Category Browsing:** Explore products by category and sort products as needed.
- **Product Details:** View individual product information.
- **Authentication:** Sign up and sign in using email and password, Google, or GitHub.
- **Protected Routes:** Restrict access to protected product details for unauthenticated users.
- **User Profile:** View account information and update the profile name.
- **Notifications:** Display toast messages for relevant actions and errors.
- **Loading and Empty States:** Provide feedback while content loads or when no products are available.
- **Responsive Design:** Support desktop, tablet, and mobile screen sizes.
- **Error Handling:** Include appropriate not-found and error states.

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- React Hot Toast
- External REST API
- Google OAuth
- GitHub OAuth

## API Integration

BazarDor uses the following external API to retrieve product and category data.

**Base URL:**
`https://api.api-store.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Retrieve products |
| `/products?category=chal` | Retrieve products by category |
| `/products/1` | Retrieve a product by ID |
| `/categories` | Retrieve available categories |
| `/categories/chal` | Retrieve category information |

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- A MongoDB database



### Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.



## Deployment

BazarDor can be deployed using Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel.
4. Deploy the application.
5. Update the Google and GitHub OAuth callback URLs to use the production domain.
6. Test authentication and the main application features after deployment.

## Project Purpose

This project was developed as part of **Programming Hero Assignment 7 — BazarDor** to practice building a full-stack web application using Next.js, authentication, database integration, external APIs, and responsive UI design.
