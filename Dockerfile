# ============================
# STAGE 1 — Build Angular App
# ============================
FROM node:20-alpine AS frontend-build
WORKDIR /frontend

# Copy and install dependencies
COPY wbfrontend/package*.json ./
RUN npm install -g @angular/cli && npm install

# Copy all Angular source code
COPY wbfrontend/ .

# Build Angular in production mode
RUN ng build --configuration production

# ============================
# STAGE 2 — Build .NET Backend
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# Copy .NET project file and restore
COPY WhiteboardAPI/WhiteboardAPI.csproj ./WhiteboardAPI/
WORKDIR /src/WhiteboardAPI
RUN dotnet restore

# Copy rest of backend code and publish
COPY WhiteboardAPI/ .
RUN dotnet publish -c Release -o /app/publish

# ============================
# STAGE 3 — Final Deployment Image
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published backend files
COPY --from=backend-build /app/publish .

# Copy Angular frontend into wwwroot
COPY --from=frontend-build /frontend/dist/demoadmin ./wwwroot

# Expose dynamic Render port
ENV ASPNETCORE_URLS=http://+:${PORT}

# Start the .NET API
ENTRYPOINT ["dotnet", "WhiteboardAPI.dll"]
