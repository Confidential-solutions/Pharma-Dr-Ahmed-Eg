# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

The security of patient health information, prescription data, and system integrity is our highest priority.

If you discover a security vulnerability in this project, **do not open a public GitHub issue**. Instead, please report it privately:

1. **Email**: Send details to `security@confidential-solutions.com`, `dr.ahmed.tarak73@gmail.com`, or `eng.jawadzahwe@gmail.com`.
2. **Urgent Clinical / Data Line**: [+20 102 304 3122](https://wa.me/201023043122)
3. **Details to Include**:
   - Description of the vulnerability and its potential impact.
   - Steps to reproduce or proof-of-concept code.
   - Any affected endpoints, components, or dependencies.

You will receive an acknowledgment within 48 hours, followed by regular status updates until a patch is verified and deployed.

---

## Patient & Prescription Data Protection

- Prescription uploads and personal contact details must be treated as sensitive healthcare data.
- Row Level Security (RLS) is strictly enforced on Supabase database tables.
- Authentication tokens (JWTs) are handled via secure HTTP headers and Supabase Auth.
- Never commit private API keys, service role keys, or database credentials to version control.

