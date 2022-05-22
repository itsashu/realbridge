# Realbridge

Realbridge fullstack assignment

## About the project

### Frontend `React` App using `TypeScript`

### Backend `ASPNET WebAPIs` using `C# .Net Framework` and `Entity Framework` with Database 1st Approach.

### Database `SQL Server`

## Requirements

1. NodeJs 14 or greater.
2. C# .Net Framework.
3. Sql Server.
4. Sql server management studio.
5. Visual Studio
6. Visual Studio Code.

## Setup Steps

### Databse

1. Open SQL Server Management studio with SQL server running on the system.
2. Run the `InitialDatabaseSetupScript.sql` from "database" directory.
   **Note: this is a one time initial operation. Once done successfully Database will be setup with required tables and objects.**
3. Once verify that the database setup is done succesfully.

### Backend / APIs

4. Clone the `RealBridgeWebAPI` containing the `RealBridgeWebAPI.sln` inside "back-end" Directory.
5. Open the solution in Visual Studio.
6. Restore Nuget Packages for the solutions.
7. Make sure it has required packages installed.
   **Microsoft `EntityFramework` version="6.2.0" targetFramework="net472" for Entity Framework DataBase 1st Approach.**
   **`Microsoft.AspNet.Cors` for allowing CORS (Cross Origin Resource Sharing).**
   **`Ninject` and `Ninject.Web.Common` for Dependency Injection in the Controller itself. (Required to inject services in WebAPI controller).**
8. Verify `<connectionStrings>` with `name="RealBridgeDBEntities"` has the correct `connectionString` value in `RealBridgeDataAccess` and `RealBridgeWebAPI` projects' `app.Config` and `Web.config`.
9. Make sure `RealBridgeWebAPI` is the startup project.
10. Build and run the Project and copy the `localHost Url` similar to "https://localhost:44349/api".

### Frontend / App

11. Clone the `real-bridge-app` containing the WebApp inside "front-end" Directory.
12. Open the same app in Visual Studio code.
13. Open terminal and type and run `yarn install`.
14. Navigate to src > config > Open `app.config.ts` and update `WEBAPI_DOMAIN_ADDRESS` value with the `localHost Url` from step 10.
15. Type and run `yarn start` in the terminal.
16. Verify the APIs are running successfully.

The app should start in WebBrowser. Now we can upload and view the images and then update and delete the images or its details.
