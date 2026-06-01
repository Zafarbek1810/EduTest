# EduTest Pro — Deploy (Neon + Render + Netlify)

## 1. Neon (PostgreSQL baza)

1. [neon.tech](https://neon.tech) da loyiha yarating.
2. **Connection string** ni nusxalang (`postgresql://...?sslmode=require` bo‘lishi kerak).
3. Bir marta mahalliy yoki Render Shell orqali jadval va demo ma’lumot:

```bash
cd backend
# .env da DATABASE_URL = Neon connection string
npm install
npm run db:push
npm run db:seed
```

---

## 2. Render (Backend API)

1. [render.com](https://render.com) → **New** → **Web Service**.
2. GitHub: [EduTest-Backend](https://github.com/Zafarbek1810/EduTest-Backend) repozitoriyasini ulang.
3. Sozlamalar:

| Maydon | Qiymat |
|--------|--------|
| **Root Directory** | *(bo‘sh — repo ildizi backend)* |
| **Build Command** | `npm install && npx prisma db push && npm run build` |
| **Start Command** | `npm start` |
| **Health Check Path** | `/api/health` |

4. **Environment Variables** (barchasi **majburiy**, bo‘sh qoldirmang):

| Kalit | Qiymat |
|-------|--------|
| `DATABASE_URL` | Neon connection string |
| `JWT_SECRET` | Kamida **16 belgi** (masalan PowerShell: `[Convert]::ToBase64String((1..32|%{Get-Random -Max 256})`) |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | Netlify sayt manzili, masalan `https://your-app.netlify.app` |

`PORT` ni Render o‘zi beradi — qo‘shish shart emas.

> **Sizdagi xato:** `JWT_SECRET` Renderda yo‘q bo‘lsa logda `path: ["JWT_SECRET"], message: "Required"` chiqadi. Dashboard → **Environment** → **Add** → saqlang → **Manual Deploy**.

5. Deploy tugagach API manzilini yozing, masalan:  
   `https://edutest-backend.onrender.com`

6. Tekshirish: brauzerda `https://SIZNING-RENDER-URL/api/health` → `{"success":true,...}`

**Birinchi marta seed** (ixtiyoriy, demo hisoblar uchun): Render → servis → **Shell**:

```bash
npm run db:seed
```

---

## 3. Netlify (Frontend)

1. [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**.
2. GitHub: [EduTest](https://github.com/Zafarbek1810/EduTest) repozitoriyasi.
3. Build sozlamalari (`netlify.toml` avtomatik o‘qiladi):

| Maydon | Qiymat |
|--------|--------|
| **Build command** | `npm ci && npm run build` |
| **Publish directory** | `dist` |

4. **Environment variables** (Site settings → Environment variables):

| Kalit | Qiymat |
|-------|--------|
| `VITE_API_URL` | `https://SIZNING-RENDER-URL.onrender.com/api` |

   ⚠️ Oxirida `/api` bo‘lishi shart.

5. **Deploy site** → Netlify manzilini oling (`https://....netlify.app`).

6. Render dagi `CORS_ORIGIN` ga shu Netlify manzilini qo‘ying va backendni **Manual Deploy** qiling.

---

## 4. Ulanish sxemasi

```
Foydalanuvchi → Netlify (React)
                    ↓ VITE_API_URL
              Render (Express API)
                    ↓ DATABASE_URL
              Neon (PostgreSQL)
```

---

## Demo hisoblar (seed dan keyin)

| Rol | Login | Parol |
|-----|-------|-------|
| O‘qituvchi | `teacher` | `teacher123` |
| Talaba | `dilnoza.k` | `pass123` |

---

## Muammolar

- **CORS xatosi** — Render → **Environment** → `CORS_ORIGIN` = `https://edu-tests.netlify.app` (oxirida `/` yo‘q, `http` emas). Bir nechta domen: `http://localhost:5173,https://edu-tests.netlify.app`. O‘zgartirgach **Manual Deploy**. Logda `CORS allowed origins:` qatorini tekshiring.
- **401 / login ishlamaydi** — `JWT_SECRET` Renderda o‘rnatilganmi; seed bajarilganmi.
- **Render uzoq javob bermaydi** — Free rejimda 15 daqiqadan keyin uxlaydi; birinchi so‘rov sekin bo‘lishi mumkin.
- **API ulanmaydi** — `VITE_API_URL` ni o‘zgartirgach Netlifyda **Clear cache and deploy** qiling.
