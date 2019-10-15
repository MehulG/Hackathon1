FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
EXPOSE 80
EXPOSE 443
# Copy csproj and restore as distinct layers
WORKDIR /src
COPY *.sln ./
COPY api.csproj ./
#COPY api.Tests/api.Tests.csproj ./api.Tests/
RUN dotnet restore
# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app
# Build runtime image
WORKDIR /app
ENTRYPOINT ["dotnet", "api.dll"]
