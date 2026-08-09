# GameZone License Dashboard

Replacement license system for a game you own. It is not a bypass for Hcore-SDK.

Deploy on Vercel with an Upstash Redis database.

Set environment variables:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ADMIN_TOKEN` (ADMIN_TOKEN=GzAdmin_9xK7mP2qR8vL5sN4)

Dashboard: `/`
License check API: `POST /api/check`

Example:
`{"key":"GZ-ABCD-EFGH-IJKL-MNOP","deviceId":"device-123"}`

Do not put `ADMIN_TOKEN` inside the Android/game client.
