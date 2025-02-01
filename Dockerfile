#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["reactapp1.client/nuget.config", "reactapp1.client/"]
COPY ["ReactApp1.Server/ReactApp1.Server.csproj", "ReactApp1.Server/"]
COPY ["reactapp1.client/reactapp1.client.esproj", "reactapp1.client/"]
RUN dotnet restore "./ReactApp1.Server/ReactApp1.Server.csproj"
COPY . .
WORKDIR "/src/ReactApp1.Server"
RUN apt update
RUN apt install nodejs -y
RUN apt install npm -y
RUN dotnet build "./ReactApp1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ReactApp1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
USER root
RUN chown -R root /app
RUN chmod 755 /app
ENTRYPOINT ["dotnet", "ReactApp1.Server.dll"]