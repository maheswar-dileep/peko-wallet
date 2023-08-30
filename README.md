# peko-task

## Features

- User-friendly UI design created using React
- Backend services implemented in Node.js
- MongoDB utilized for managing transactions
- 2FA (Email and Authenticator) for improved security
- Role-based access control for secure login

## Installation

1. Clone the repository: `git clone https://github.com/maheswar-dileep/peko-task`
2. Navigate to the project directory: `cd peko-task`
3. Install frontend dependencies: `cd client && npm install`
4. Install backend dependencies: `cd ../server && npm install`
5. Set up environment variables: Create a `.env` file in the `server` directory and add necessary variables (e.g., MongoDB URI, email service credentials, etc.).
6. Start the frontend and backend: In separate terminals, run `npm start` in the `client` and `server` directories.

### `.env format`

```
MONGODB_URL = "mongodb://127.0.0.1:27017/peko"
PORT = "8080"

ACCESSTOKEN_SECRET = "$2y$10$Xvufsb0T4xycyT1h3nN.Kesb.JmpreKWh/VQwlpTFaiHEoTDY/OD."
REFRESHTOKEN_SECRET = "$2y$10$3ePkCGFGGXq.SDjVod3T8ug169V7WZt29nRz0y5Iwpo9BTTKyjiyy"

SMTP_USER = ###
SMTP_PASS = ###

```
## Usage

1. Visit `http://localhost:5173` in your browser to access the front end.
2. Sign up or log in to your account.
3. Transfer funds, view transaction history, and request payments.
4. Enjoy the seamless wallet-based experience similar to Paytm.

## Future Enhancements

- Integration with real payment gateways for fund transfers.
- Enhanced user profile and settings management.
- Mobile app development for on-the-go transactions.

