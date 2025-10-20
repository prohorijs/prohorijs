# prohorijs

**Prohorijs** is an enterprise-grade Identity & Access Control library for modern Node.js applications. It supports Multi-Tenant setups, Role-Based Access Control (RBAC), optional Policy-Based Access Control (ABAC), audit logging, and secure authentication.

## ✨ Key Features

- 🔐 Secure Authentication (JWT + Refresh Token Rotation)
- 🏢 Multi-Tenant Support
- 🎭 Role & Permission based Access Control (RBAC)
- ⚖️ Policy Engine Ready (ABAC support)
- 🧩 Framework & Database Agnostic (adapter-based)
- 🛡️ Audit Logs & Session Management
- 🧷 Middleware for Express/Fastify
- 🚀 Extensible & Production-Ready

## 📦 Installation

```bash
npm install prohorijs
# or
yarn add prohorijs
```

## 🚀 Quick Start (Express Example)

```ts
import express from "express";
import { initProhori } from "prohorijs";
import prismaAdapter from "prohorijs/adapters/prisma";

const app = express();

const prohori = initProhori({
  adapter: prismaAdapter({ prisma }),
  token: {
    accessExpirySec: 900,
    refreshExpirySec: 60 * 60 * 24 * 30,
    jwtSecret: process.env.JWT_SECRET,
  },
  tenantResolver: (req) => req.headers["x-tenant-id"],
});

app.post(
  "/invoices",
  prohori.middleware.requireAuth(),
  prohori.middleware.checkPermission("invoice.create"),
  (req, res) => {
    res.json({ success: true });
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));
```

## 🔧 Configuration

| Option           | Description                               |
| ---------------- | ----------------------------------------- |
| `adapter`        | Database adapter (Prisma, Knex, Memory)   |
| `token`          | Access & Refresh token configuration      |
| `tenantResolver` | Function to determine tenant from request |
| `audit`          | Enable or disable audit logs              |
| `defaultRoles`   | Roles assigned to new users by default    |

## 🏗 Architecture Overview

```
prohorijs
├─ adapters/       → Database abstraction
├─ core/           → Auth, roles, permissions, policy engine
├─ middleware/     → Express / Fastify / Next.js guards
├─ utils/          → JWT, crypto, audit helpers
└─ events/         → login/logout/role event hooks
```

## 📜 Philosophy

- ✅ Secure by default
- ✅ Adapter-based & framework-agnostic
- ✅ Enterprise extensible (SSO, policies, auditing-ready)
- ✅ Developer-friendly API with powerful features

---

## 📍 Upcoming Sections

- ✨ Authentication API Documentation
- 🎭 Role & Permission API Guide
- ⚙️ Adapter Implementation Guide
- 🧪 Testing Strategy
- 📘 Best Practices

> This README is currently in development; more detailed documentation will be added soon.
