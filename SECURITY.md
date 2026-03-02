# Security Practices

## Secrets
- Never commit real API keys, tokens, private keys, or webhook secrets.
- Use environment variables in Vercel/Supabase dashboards.
- Keep only templates in repo (e.g., `.env.example` or docs), never live values.

## Data protection
- Use Supabase Row Level Security (RLS) on all tables.
- Restrict write operations to service role/admin paths.
- Store only required customer data.

## Payments
- Use third-party hosted checkout/widget (Ticket Tailor) for PCI scope reduction.
- Validate webhook signatures server-side.

## Operational hygiene
- Run dependency and secret scans before release.
- Enforce branch protection + required PR review for production branch.
- Rotate keys immediately if exposure is suspected.
