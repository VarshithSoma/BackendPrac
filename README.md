# HappyTrails

Built using **Node.js**, **Express.js**, **MongoDB**, **Pug**, and other modern web technologies, HappyTrails ensures a smooth and engaging experience.

## How I Built It

### Backend Development

- Implemented the server using **Node.js** and **Express.js** to handle API requests and serve dynamic content.
- Designed a **RESTful API** to manage users, travel locations, and authentication.
- Utilized **JWT (JSON Web Token)** for secure authentication and session management.
- Configured **MongoDB** as the database with **Mongoose ORM** for schema validation and data management.
- Implemented **error handling** and middleware for security and performance optimizations.

### Frontend Development

- Used **Pug** for server-side rendering (SSR) to deliver dynamic web pages efficiently.
- Designed a responsive UI with **CSS** and **Bootstrap** to ensure cross-device compatibility.
- Integrated **MapBox** to provide interactive maps for users to explore locations.
- Implemented client-side form validation and enhanced user experience with JavaScript.

### File Management & Image Processing

- Utilized **Multer** for handling user profile photo uploads.
- Processed and optimized images using **Sharp** to reduce file size and maintain quality.

### Deployment & Hosting

- Deployed the application on **Render** for seamless hosting.
- Configured environment variables for secure access to API keys and database connections.
- Managed dependencies and automated builds using **npm scripts**.

## Project Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/happytrails.git
   cd happytrails
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAPBOX_API_KEY=your_mapbox_api_key
   ```
4. **Run the Application**
   ```sh
   npm start
   ```

## Live Demo

🔗 [HappyTrails](https://happytrails.onrender.com)

## Notes

- **This is a hobby project** and is not intended to function as a real-time service, so please do not expect full logical accuracy.
- Since the website is hosted on a free-tier service, it may take about a minute for the initial load. Please be patient during this time.

## Contact

For any queries or suggestions, feel free to reach out via GitHub Issues.
