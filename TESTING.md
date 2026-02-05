# Job Portal API Testing with Curl

This document contains curl commands to test the various endpoints of the Job Portal application.

## Prerequisites

- Ensure the application is running on `http://localhost:3000`.
- Use a terminal that supports `curl`.

## 1. Authentication

### Register a new user
```bash
curl -X POST http://localhost:3000/register \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "password=password123" \
  -c cookies.txt
```

### Login
```bash
curl -X POST http://localhost:3000/login \
  -d "email=test@example.com" \
  -d "password=password123" \
  -c cookies.txt
```

## 2. Jobs

### Get all jobs
```bash
curl -X GET http://localhost:3000/jobs
```

### Get a specific job (ID: 1)
```bash
curl -X GET http://localhost:3000/jobs/1
```

### Post a new job (Requires Login)
```bash
curl -X POST http://localhost:3000/jobs/new \
  -b cookies.txt \
  -d "companyname=New Tech" \
  -d "jobdesignation=Full Stack Developer" \
  -d "location=Remote" \
  -d "salary=$100k" \
  -d "description=Great job opportunity" \
  -d "skills=Node.js, React" \
  -d "numberofopenings=5" \
  -d "applyby=2024-12-31"
```

### Update a job (ID: 1) (Requires Login)
```bash
curl -X POST http://localhost:3000/jobs/1/update \
  -b cookies.txt \
  -d "companyname=Tech Corp Updated" \
  -d "jobdesignation=Senior Frontend Developer" \
  -d "location=Hybrid" \
  -d "salary=$130k - $170k" \
  -d "description=Updated description" \
  -d "skills=React, TypeScript, Next.js" \
  -d "numberofopenings=2" \
  -d "applyby=2024-12-31"
```

### Apply to a job (ID: 1) (Requires Login & File Upload)
Create a dummy resume file first: `echo "Resume content" > resume.pdf`

```bash
curl -X POST http://localhost:3000/jobs/1/apply \
  -b cookies.txt \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "resume=@resume.pdf"
```

### View Applicants (ID: 1)
```bash
curl -X GET http://localhost:3000/jobs/1/applicants \
  -b cookies.txt
```
