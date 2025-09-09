# Stage 1: Build Angular app
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY wbfrontend/package*.json ./
RUN npm install -g @angular/cli && npm install
COPY wbfrontend/ .
RUN ng build --configuration production && ls -la /frontend/dist

# Stage 2: Build .NET Web API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY WhiteboardAPI/WhiteboardAPI.csproj ./WhiteboardAPI/
WORKDIR /src/WhiteboardAPI
RUN dotnet restore
COPY WhiteboardAPI/ .
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Final Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/publish .
COPY --from=frontend-build /frontend/dist/wbfrontend ./wwwroot
ENV ASPNETCORE_URLS=http://+:${PORT}
EXPOSE 5000
ENTRYPOINT ["dotnet", "WhiteboardAPI.dll"]
