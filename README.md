# Temporary Job Provider Platform  

**Author**: Prajwal Rode  
**Contact**: [prajwalrode31@gmail.com](mailto:prajwalrode31@gmail.com) | Mobile: 9130148301  

---

## 📝 Introduction  
Welcome to the **Temporary Job Provider Platform**!  
This project connects **Wishmakers** (job providers) with **Genies** (job seekers) for temporary job opportunities.

---

## 🛠 Tech Stack  
- **Backend**: Spring Boot, Spring Security, PostgreSQL  
- **Client**: Postman (can be extended to React/Angular in the future)  
- **Languages**: Java, JavaScript, TypeScript, HTML, CSS  
- **Protocols and Tools**: OAuth2, JWT tokens, Node.js, Express.js, MongoDB  

---

## 🚀 Features  
1. **Two Roles**:  
   - **Wishmaker**: Job providers who post wishes (job openings).  
   - **Genie**: Job seekers who apply for wishes.  
2. **Role-Based Access Control (RBAC)**:  
   - Secures endpoints using `hasRole()` and `@PreAuthorize`.  
3. **Stateless Authentication**:  
   - JWT tokens ensure secure communication and no server-side session storage.  
4. **OAuth2 Authorization Code Flow**:  
   - Used for authentication between client, auth server, and resource server.  
5. **Automatic Schema Creation**:  
   - All required tables are generated in PostgreSQL during startup.  

---

## 📜 Project Flow  

### 1️⃣ Registration  
- Users register as either **Wishmaker** or **Genie**.  
- These APIs are public and do not require authentication.  

### 2️⃣ Login  
- On login, the **Authorization Code Grant Flow** is triggered:  
  1. The Authorization Server verifies user credentials.  
  2. If valid, it generates a **JWT token** and sends it to the client (Postman).  

### 3️⃣ Role-Based API Access  
- The client includes the JWT token in the `Authorization` header for resource server requests.  
- The **Resource Server**:  
  1. Validates the JWT token (checks tampering, expiry, etc.).  
  2. Extracts user roles and checks permissions for the requested endpoint.  

---

## 📂 Installation Guide  

1. **Clone the Repository**:  
   Download both the **Auth Server** and **Resource Server** repositories from GitHub.  

2. **Setup Projects**:  
   - Extract the zip files.  
   - Open both folders as separate projects in **IntelliJ IDEA** (recommended) or **Eclipse**.  

3. **Database Configuration**:  
   - Go to the `application.properties` file under the `resources` folder in both projects.  
   - Update PostgreSQL database credentials (username, password, database name, etc.).  

4. **Run the Projects**:  
   - Start both servers.  
     - **Auth Server** runs on port `9000`.  
     - **Resource Server** runs on port `8080`.  
   - Verify if the database tables are created. A total of 5 tables should be generated.  

5. **Postman Setup**:  
   - Import the Postman collection (link provided below).  
   - The collection contains all required endpoints and pre-configured requests.  

---

## 🔑 Testing APIs  

### Public APIs  
1. **`/registerWishmaker`**  
   - Registers a new Wishmaker.  
   - Requires a JSON body with Wishmaker details.  
   - **Response**: A success message.  

2. **`/registerGenie`**  
   - Registers a new Genie.  
   - Requires a JSON body with Genie details.  
   - **Response**: A success message.  

### Secured APIs  
1. **Login to Access**:  
   - Go to the Authorization tab in Postman.  
   - Select **OAuth 2.0** and configure as shown in the provided image.  
   - Click **Get New Access Token**, log in with Genie or Wishmaker credentials, and use the token for subsequent requests.  

2. **Role-Based Endpoints**:  
   - **Wishmaker Role**:  
     - `/insertWish`: Register a wish (job opening).  
     - `/getAllWishesByWishmakerEmail`: Get all wishes posted by the logged-in Wishmaker.  

   - **Genie Role**:  
     - `/acceptWish`: Apply for a wish using the Wish ID.  
     - `/getAllWishByGenieEmail`: Get all wishes applied for by the logged-in Genie.  

3. **Error Handling**:  
   - If a user accesses an endpoint without proper roles or permissions, an error response is returned.  

---

## 🌐 API List and Permissions  

| **Endpoint**                     | **HTTP Method** | **Role Required** | **Description**                                                                 |
|----------------------------------|-----------------|-------------------|---------------------------------------------------------------------------------|
| `/registerWishmaker`             | POST            | None              | Register a Wishmaker.                                                          |
| `/registerGenie`                 | POST            | None              | Register a Genie.                                                              |
| `/getWishmaker`                  | GET             | Wishmaker         | Get Wishmaker details by email (self-access only).                             |
| `/getGenie`                      | GET             | Genie             | Get Genie details by email (self-access only).                                 |
| `/insertWish`                    | POST            | Wishmaker         | Create a wish (job opening).                                                   |
| `/acceptWish`                    | POST            | Genie             | Apply for a wish.                                                              |
| `/getAllWishesByWishmakerEmail`  | GET             | Wishmaker         | Get all wishes posted by the logged-in Wishmaker.                              |
| `/getAllWishByGenieEmail`        | GET             | Genie             | Get all wishes applied for by the logged-in Genie.                             |

---

## 📊 Flow Diagram  

### **Login Flow (Authorization Code Grant)**  
```text
Client (Postman) --> Auth Server --> Database (Verify Credentials)  
      ^                                  |  
      |                                  v  
Receive JWT Token <----------------- Auth Server  


Client (Postman) --> Resource Server (JWT Validation) --> Database (Fetch Data)  
      ^                                  |  
      |                                  v  
Authorized Response <--------------- Resource Server  
