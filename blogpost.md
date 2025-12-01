# How to Add a New Blog Post

Follow these steps to add a new article with thumbnail.

## 1) Duplicate Data Entry
- Open `data/blogPosts.ts`.
- Copy an existing object in the `blogPosts` array and paste below it.
- Fill these fields:
  - `slug`: URL-safe string, e.g. `zero-trust-essentials`.
  - `title`: Post title.
  - `date`: ISO-like string `YYYY-MM-DD`.
  - `author`: e.g. `Team byondSEC`.
  - `category`: e.g. `Cloud`, `Strategy`, `Red Team`.
  - `tags`: string array.
  - `excerpt`: short teaser.
  - `readTime`: e.g. `8 min`.
  - `featured` (optional): `true` to pin into popular.
  - `thumbnail`: `{ src: 'PATH_OR_URL', alt: 'Description' }`.

## 2) Add Sections
Each article renders its content from `sections`:
- Each section needs:
  - `id`: unique (no spaces), used for anchor links.
  - `title`: heading text.
  - `level`: `2` or `3` (renders as H2/H3).
  - `paragraphs`: string array.
  - Optional: `bullets` (string array), `quote` (string).

Example section:
```ts
{
  id: 'identity-basics',
  title: 'Identity Is the New Perimeter',
  level: 2,
  paragraphs: [
    'Phishing-resistant MFA is mandatory on all critical systems.',
    'Use conditional access based on device posture and risk signals.'
  ],
  bullets: [
    'Roll out FIDO2/WebAuthn',
    'Monitor service accounts',
  ],
  quote: 'Least privilege beats perimeter firewalls.'
}
```

## 3) Thumbnails
- For local images, place the file in `/public` or host via URL/CDN.
- Set `thumbnail.src` accordingly; `alt` should describe the image.
- Leave `thumbnail` undefined to use the fallback placeholder.

## 4) Ordering & Popular
- Posts are automatically sorted by date (newest first).
- `featured: true` pushes posts into the “Populäre Artikel” list.

## 5) Test Locally
- Run `npm run dev` and visit `http://127.0.0.1:5173/`.
- Blog overview: `/blog`
- Detail page: `/blog/<your-slug>`

## 6) Deploy
- Commit your changes; GitHub Actions workflow builds and deploys.
