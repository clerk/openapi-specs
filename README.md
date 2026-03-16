# Clerk OpenAPI Specs

This repo contains Clerk's public [OpenAPI](https://www.openapis.org/) specs.

## Specs

### Frontend API (FAPI)

The [Frontend API](https://clerk.com/docs/references/api/overview) is meant to be accessed from a browser or native clients. It powers the client-side functionality used by Clerk's SDKs.

Versioned specs are in the [`fapi/`](./fapi) directory.

### Backend API (BAPI)

The [Backend API](https://clerk.com/docs/references/api/overview) is meant to be accessed by backend servers. Use it to manage resources and perform operations outside the context of a user session, such as coordinating with third parties or managing configuration.

Versioned specs are in the [`bapi/`](./bapi) directory.

### Webhooks

Webhook event payload schemas are in the [`webhooks/`](./webhooks) directory.

### Platform (Beta)

The Platform API spec is in the [`platform/`](./platform) directory. This spec is currently in beta.

## Versioning

Each API directory contains dated YAML files (e.g. `2025-11-10.yml`) representing the spec for that API version. Use the most recent file for the latest version.

## Contributing

This repo is not meant to be contributed to directly. The specs are synced from an internal repository either manually or via CI.

- **Clerk employees:** Bring up changes internally and you'll be pointed to the source repo.
- **External contributors:** Please [open an issue](https://github.com/clerk/openapi-specs/issues)!
