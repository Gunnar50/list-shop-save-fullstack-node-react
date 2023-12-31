# List Shop Save - Supermarket Price Comparator

## 🌐 Project

This full-stack Node & JavaScript application is an educational tool developed as part of The Jump full-time development course. It enables users to save money by comparing prices across UK supermarkets. The application serves as a practical resource for making cost-effective shopping decisions. More information about the course is available at [thejump.tech](https://www.thejump.tech)

### 🏠 [Demo Link](https://listshopsave.uk/)

<!-- ![alt text](client/Logos/) -->

## ✨ Features

- **Product Information Display:**

  - Search by product.
  - Spell check and correction.
  - Filter by location using Geo location API.

- **Data Integration from Multiple Sources:**

  - Capability to fetch data from various APIs.
  - Data normalization and standardization.

- **Shopping List Creation and Management:**

  - Create, edit, delete, and update multiple shopping lists (CRUD).

- **Map Displays for Price Comparison:**

  - Visualize prices and locations across different supermarkets.
  - Integrate shopping lists with map visualizations.

- **Bar Code Scanning for Product Search:**

  - Camera input for scanning barcodes.
  - Integration of scan results with product search.
  - Scan barcodes in-store to find the best prices.

- **User Account and Login System:**

  - Account creation and login.
  - Personal information and account details access.

- **Recipe Suggestions from Leftover Ingredients:**

  - Utilize APIs for recipe generation.
  - Suggest potential recipes from ingredients.

- **Breakdown of Shopping Lists by Supermarket:**

  - Detailed lists categorized by supermarket.

## 🔍 How It Works

The app operates by scraping data from the most common supermarkets in the UK using Puppeteer. It then stores some of this data in a database for quick access during user searches or product scans. Here's a breakdown of the process:

- **Data Scraping and Storage:**

  - Utilizes Puppeteer to scrape supermarket data.
  - Stores essential product information in a database for efficiency.

- **Product Matching and Comparison:**

  - Conducts string comparisons between products across supermarkets to find the best matches.
  - Ensures accurate price comparison for similar products.

- **Shopping List Integration:**
  - Allows users to save products to a shopping list.
  - The app advises the most cost-effective supermarket for the entire list.

## 🔧 Installation and Setup

This application is not structured as a traditional monorepo. Originally built in two separate repositories for frontend and backend, it has been merged into a single repository for demonstration and ease of accessibility.

Clone the repository

```
git clone https://github.com/Gunnar50/list-shop-save-react-node.git
```

Navigate to the project directory

```
cd list-shop-save-react-node
```

Before running the project locally, make sure you have a MySQL database setup.
Create a ".env" file inside of the ./server directory, and add the following environment variables:

```
DB_HOST="YOUR_DB_HOSTNAME"
DB_USER="YOUR_DB_USERNAME"
DB_DATABASE="YOUR_DB_NAME"
DB_PASSWORD="YOUR_DB_PASSWORD"
PASSWORD_SALT="SALT_CAN_BE_ANYTHING"
```

Navigate to each of the folders inside the main repo, install the dependencies and start each of the development servers.

Open three different terminals. One for the frontend, one for the backend and one for the scrapers.

Frontend (Terminal 1):

```
cd client
npm install
npm run dev
```

Backend (Terminal 2):

```
cd server
npm install
npm run dev
```

Scrapers (Terminal 3):

```
cd server
npm run start-scraper
```

**Obs:** To run only the frontend locally, simply navigate to the ./client/src/config.js file. In this file, switch the return value to the one currently commented out (api.listshopsave.uk).

## 🧠 Reflection

Developing this application was a journey into web scraping, data handling, user experience design, API integration, and interface design. The challenge in ensuring accuracy in product matching and providing meaningful insights to users, which required a deep dive into various technologies and techniques. This project not only focused on the practical aspects of application development but also on enhancing user engagement and utility in everyday shopping.

## 🛠️ Technology Stack

- **Frontend**

  - React
  - Redux
  - JavaScript
  - GreenSock (GSAP)
  - SASS
  - Local Storage

- **Backend**
  - Node
  - Express
  - MySQL
  - Joi Validation
  - Puppeteer
  - Firebase
  - NodeMailer

## 👥 Contributors

- [Aqib](www.github.com/aqibshabir)
- [Russell](https://www.github.com/russell-gh)
- [Gustavo](https://www.github.com/Gunnar50)
- [Amy](https://www.github.com/amy-monroe)
- [James](https://www.github.com/jamescode22)
- [Adnan](https://www.github.com/AdnanH155)
- [Jonathan](https://www.github.com/JonathanBanerjee)
- [Jeff](https://www.github.com/maverickjay1)

## ⭐️ Show your support

Give a start if you liked and this project helped you!

## 📝 License

This project is available under the MIT License.

Copyright (c) 2023 The Jump FT4

All rights reserved.
