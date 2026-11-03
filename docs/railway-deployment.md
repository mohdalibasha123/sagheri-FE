# Railway deployment (sagheri-FE)

Service `sagheri-FE` builds from `Dockerfile` (see `railway.toml`) and serves the Angular production build with Nginx on Railway's `PORT`.

## Required service variables
Railway passes service variables to Docker builds as build args.

| Variable | Value |
|---|---|
| `API_BASE_URL` | `https://${{sagheri-BE.RAILWAY_PUBLIC_DOMAIN}}/api/v1` |
| `PAYMENT_RETURN_BASE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |

These are public values compiled into the bundle by `scripts/generate-prod-env.mjs`. The build fails if they are missing, not https, or point at localhost/internal hosts. **Changing them requires a rebuild/redeploy.** Never use Railway internal DNS here; the browser calls the BE directly.

## First deployment
1. Generate public domains for `sagheri-BE` and `sagheri-FE` (or attach custom domains).
2. Set the variables above on FE, and `FRONTEND_ORIGIN` on BE (see the BE guide).
3. Deploy BE first, then FE. Health check: `GET /health`.

## Domain change
Update the custom domain, then redeploy both services: FE (rebuild with new URLs) and BE (`FRONTEND_ORIGIN` must equal the new FE origin, no trailing slash).

## Redeploy / rollback
Push to the connected branch, or redeploy from the Railway dashboard. FE is stateless; no volumes needed.
