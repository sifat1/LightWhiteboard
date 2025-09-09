# Stage 1: Build Angular app
FROM node:20-alpine AS frontend-build
WORKDIR /frontend

# Copy package files first (better caching)
COPY wbfrontend/package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy rest of Angular source code
COPY wbfrontend/ .

# Build Angular SPA
RUN npx ng build --configuration production


# Stage 2: Build .NET Web API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY WhiteboardAPI/WhiteboardAPI.csproj ./WhiteboardAPI/
WORKDIR /src/WhiteboardAPI
RUN dotnet restore
COPY WhiteboardAPI/ .
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Final Image - Serve Angular + .NET from One Container
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy .NET backend build output
COPY --from=backend-build /app/publish .

# Copy Angular build into ASP.NET wwwroot
COPY --from=frontend-build /frontend/dist/wbfrontend ./wwwroot

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "WhiteboardAPI.dll"]
