# Stage 1: Build Angular App
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY wbfrontend/package*.json ./
RUN npm install -g @angular/cli && npm install
COPY wbfrontend/ .
RUN ng build --configuration production

# Stage 2: Build .NET Web API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY WhiteboardAPI/WhiteboardAPI.csproj ./WhiteboardAPI/
WORKDIR /src/WhiteboardAPI
RUN dotnet restore
COPY WhiteboardAPI/ .
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Final Container (Angular + .NET API)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy backend build
COPY --from=backend-build /app/publish .

# Copy Angular frontend build to wwwroot
COPY --from=frontend-build /frontend/dist/wbfrontend ./wwwroot

# Set environment variables for Render
ENV ASPNETCORE_URLS=http://+:5000

# Expose port
EXPOSE 5000

ENTRYPOINT ["dotnet", "WhiteboardAPI.dll"]
