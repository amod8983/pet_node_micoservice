# Pet Node Microservice

A demo microservice project built with Node.js demonstrating microservices architecture.

## Project Structure

```
pet_node_micoservice/
├── services/         # Individual microservices
├── gateway/          # API Gateway
└── package.json      # Root package.json for workspace management
```

## Prerequisites

- Node.js (v16 or higher recommended)
- PNPM (v10.13.1)
- RabbitMQ

## Setup

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Project Layout

This project uses a monorepo structure managed with PNPM workspaces. The architecture consists of:

- **Gateway**: API Gateway service that handles routing and aggregation
- **Services**: Individual microservices that handle specific business domains

## Development

Each service can be developed independently. More specific instructions will be added as services are implemented.

## License

MIT License
