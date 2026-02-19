# CRUD Items API

A robust REST API built with NestJS for managing items and users, featuring secure authentication, image validation, and comprehensive CRUD operations.

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Cloud Database**: Optimized for Serverless PostgreSQL via [Neon](https://neon.tech/)
- **Authentication**: bcryptjs for password hashing
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Linting**: ESLint with Prettier

## ✨ Features

- **User Management**: Create and manage user accounts with secure password hashing
- **Item Management**: Full CRUD operations for items with user association
- **Pagination**: Efficient data retrieval with pagination support
- **Image Validation**: Whitelist-based image URL validation (only `images.unsplash.com` allowed)
- **Security**: Rate limiting, input validation, and forbidden host blocking
- **API Documentation**: Auto-generated Swagger docs at `/api/docs`
- **Database Limits**: Maximum 36 items and 36 users to prevent abuse
- **Error Handling**: Comprehensive error responses with user-friendly messages

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech/) for cloud hosting)
- [Render](https://render.com/) account (for production deployment)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brunoF-Silva/nestjs-crud-items.git
   cd crud-items-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials.

   > **Note for Neon users**: You must include both the pooled and direct connection strings to allow Prisma to run schema migrations correctly.

   ```env
   # Used by the NestJS app (Pooled connection)
   DATABASE_URL="postgresql://username:password@ep-pooler-host.aws.neon.tech/neondb?sslmode=require"

   # Used by Prisma CLI for migrations (Direct connection)
   DIRECT_URL="postgresql://username:password@ep-direct-host.aws.neon.tech/neondb?sslmode=require"

   # Run backend on port 4000 to avoid conflicting with Next.js frontend on 3000
   PORT=4000

   # Image validation settings
   ALLOWED_IMAGE_HOSTS="images.unsplash.com"
   FORBIDDEN_IMAGE_HOSTS="plus.unsplash.com"
   ```

---

## 🗄️ Database Setup

1. **Push schema to the database**  
   (Creates the User and Item tables in your Neon database based on `schema.prisma`)

   ```bash
   npx prisma db push
   ```

2. **Generate Prisma client**  
   (Updates the generated TypeScript types in `node_modules`)

   ```bash
   npx prisma generate
   ```

3. **Verify database connection**

   ```bash
   npx prisma studio
   ```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
```

The API will be available at:  
`http://localhost:4000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

---

## 📚 API Documentation

Once the application is running, visit:

- **Swagger UI**: `http://localhost:4000/api/docs`
- **API Base URL**: `http://localhost:4000`

---

## 🔗 API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users (paginated)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Items

- `POST /items` - Create a new item
- `GET /items` - Get all items (paginated)
- `GET /items/:id` - Get item by ID (includes user details)
- `PATCH /items/:id` - Update item
- `DELETE /items/:id` - Delete item

---

## 🧾 Request Examples

### Create User

```http
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Create Item

```http
POST /items
Content-Type: application/json

{
  "name": "iPhone 15",
  "shortDescription": "Latest iPhone model",
  "longDescription": "The iPhone 15 features...",
  "image": "https://images.unsplash.com/photo-123456789",
  "price": 999.99,
  "promoPrice": 899.99,
  "userId": 1
}
```

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

---

## 📝 Validation Rules

### User Creation

- **Email**: Must be valid email format, unique
- **Password**: Minimum 6 characters

### Item Creation

- **Name**: Required, max 255 characters
- **Descriptions**: Required, max lengths apply
- **Image**: Must be from allowed hosts (`images.unsplash.com`)
- **Price**: Positive number, max 2 decimal places
- **Promo Price**: Optional, must be less than regular price
- **User ID**: Must exist

### Limits

- Maximum 36 users total
- Maximum 36 items total
- Pagination: 6 items/users per page

---

## 🔒 Security Features

- Password Hashing: bcryptjs with salt rounds
- Input Validation: Comprehensive DTO validation
- Image Host Whitelisting: Only approved image sources allowed
- Forbidden Hosts: Explicit blocking of premium services
- Rate Limiting: Built-in NestJS rate limiting
- SQL Injection Protection: Prisma ORM safeguards

---

## ☁️ Deployment (Render)

This application is configured for easy deployment on Render.com.

1. Create a new Web Service on Render and connect your GitHub repository.
2. Configure the following build settings:

   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run start:prod`

3. Add the following Environment Variables:

   - `DATABASE_URL`: Your Neon pooled connection string
   - `DIRECT_URL`: Your Neon direct connection string

> ⚠️ **Important**: Do NOT include quotation marks (`"`) around the URLs in the Render dashboard.

4. Click **Deploy**.

---

## ⚠️ Troubleshooting

- **P1012 / Invalid URL Error on Render**: Ensure environment variables do not have surrounding quotation marks.
- **P2021 / Table does not exist**: Run `npx prisma db push` to sync your schema.
- **PrismaConfigEnvError**: Delete any auto-generated `prisma.config.ts` files blocking `.env` loading.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "feat: add amazing feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a Pull Request

---

## 📄 License

This project is **UNLICENSED** — see the `package.json` file for details.

---

## 🆘 Support

If you encounter any issues:

- Check the API documentation at `/api/docs`
- Verify your environment variables
- Ensure database migrations are applied
- Check the console logs for detailed error messages

---

## 📊 Project Structure

```plaintext
src/
├── app.module.ts          # Main application module
├── main.ts                # Application entry point
├── database/
│   ├── prisma.module.ts   # Prisma database module
│   └── prisma.service.ts  # Prisma service
├── users/
│   ├── users.controller.ts # Users API endpoints
│   ├── users.service.ts    # Users business logic
│   ├── users.module.ts     # Users module
│   └── dto/                # User DTOs
└── items/
    ├── items.controller.ts # Items API endpoints
    ├── items.service.ts    # Items business logic
    ├── items.module.ts     # Items module
    └── dto/                # Item DTOs
```

---

Built with ❤️ using NestJS
