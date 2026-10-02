# Mahesh Swami — Portfolio

Static site for **Mahesh Swami**, Information Technology Engineering student (2023–2027) at M.G.M.'s College of Engineering, Nanded (DBATU).

Stack: HTML5, CSS3, JavaScript. `index.html` is in the project root so GitHub Pages can serve it.

## Project structure

```
index.html
style.css
script.js
README.md
assets/
  resume.pdf
  favicon.svg
  og-image.svg
```

Also keep `.gitignore` and `.nojekyll` (GitHub Pages helper). Do not put a `<base href="/">` tag; all assets use relative paths (`style.css`, `assets/resume.pdf`) so they work at:

`https://<github-username>.github.io/<repository-name>/`

## Fill in real profile data (required from you)

These are **not** invented in the code. Reply with:

1. GitHub username
2. Repository name (example: `mahesh-portfolio`)
3. LinkedIn profile URL
4. Email address
5. Phone (optional)
6. Real `assets/resume.pdf` when you have one

Then they go on the `<body>` tag in `index.html`:

```html
<body
  data-github="https://github.com/actual-username"
  data-linkedin="https://www.linkedin.com/in/actual-slug"
  data-email="actual@email.com"
  data-phone="+91XXXXXXXXXX">
```

Until those attributes are filled, GitHub / LinkedIn / Email buttons jump to on-page sections. Resume always downloads `assets/resume.pdf`.

## GitHub Pages (exact steps)

1. Create a **public** GitHub repository. Name it whatever you will use in the URL (often `mahesh-portfolio`).
2. Commit and push this folder to the `main` branch (commands below).
3. On GitHub: **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: **`main`**. Folder: **`/ (root)`**. Save.
6. Wait 1–2 minutes. The Pages settings page shows the live URL.

After you send **username** and **repository name**, the public URL is:

`https://` + username + `.github.io/` + repository name + `/`

Open Graph `og:url` / canonical will be set to that same address in a follow-up edit.

## Exact commands to commit and push

In PowerShell, from this folder:

```powershell
cd "c:\Users\swami\OneDrive\Desktop\swami portfilo"
git add .
git status
git commit -m "Add Mahesh Swami portfolio for GitHub Pages"
```

If `git` is not found, reopen the terminal or use:

```powershell
& "C:\Program Files\Git\cmd\git.exe" add .
& "C:\Program Files\Git\cmd\git.exe" commit -m "Add Mahesh Swami portfolio for GitHub Pages"
```

Create the empty repo on GitHub first, then (replace username and repo):

```powershell
git remote add origin https://github.com/<github-username>/<repository-name>.git
git branch -M main
git push -u origin main
```

If `origin` already exists:

```powershell
git remote set-url origin https://github.com/<github-username>/<repository-name>.git
git push -u origin main
```

## Local check

```powershell
python -m http.server 8765
```

Open `http://127.0.0.1:8765/` — you should see `index.html` at the root.

## Content policy

No fake certificates, jobs, contest ranks, or profile URLs.
