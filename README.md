# **🚀 Contest Tracker**

A MERN stack-based web application that helps users track upcoming and past programming contests from platforms like **Codeforces, CodeChef, and LeetCode**. The app includes filtering, bookmarking, and solution attachment features.

## **✨ Features**
- 🎯 **Contest Tracking**: Fetches upcoming and past contests from Codeforces, CodeChef, and LeetCode.
- 🔍 **Filtering**: Allows users to filter contests by platform.
- 📌 **Bookmarking**: Users can bookmark contests for quick access.
- 📺 **Solution Links**: Users can attach YouTube solution links to past contests.
- 🔑 **Admin Panel**: Admins can add solutions manually.
- 🎁 **Bonus Features**:
  - 🔄 Auto-fetching of solution links
  - 🌙 Responsive UI with dark mode
  - 📜 Well-documented code

## **🛠 Tech Stack**
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Axios (API calls), JWT (authentication), GitHub for version control

## **📥 Installation and Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/contest-tracker.git
cd contest-tracker
```

### **2. Backend Setup**
```bash
cd server
npm install
```
- Set up environment variables (`.env` file):  
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- Start the server:
  ```bash
  npm run dev
  ```

### **3. Frontend Setup**
```bash
cd client
npm install
npm run dev
```

## **🚀 Usage**
1. **View contests** on the homepage.
2. **Filter** contests by platform.
3. **Bookmark** contests for easy access.
4. **Attach YouTube solution links** to past contests.
5. **Admin access** to manually add solutions.

## **📡 API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/v1/users` | Register a new user |
| POST | `/api/v1/users/login` | User login |
| POST | `/api/v1/users/logout` | Logout user (JWT required) |
| GET | `/api/v1/users/:userId/bookmarks` | Get all bookmarks (JWT required) |
| GET | `/api/v1/users/current-user` | Get current user details (JWT required) |
| DELETE | `/api/v1/contests/:contestId/solutions/:solutionId` | Delete a solution (Admin & JWT required) |
| GET | `/api/v1/contests/:contestId/solutions` | Get all solutions |
| GET | `/api/v1/solutions/update-auto` | Auto-update solution link |
| GET | `/api/v1/contests/upcoming` | Get upcoming contests |
| GET | `/api/v1/contests/past` | Get past contests |
| POST | `/api/v1/contests/:contestId/bookmark` | Toggle contest bookmark (JWT required) |

## **🤝 Contributing**
Feel free to submit pull requests or open issues to improve the project.


