// server.cjs
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt"); 
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// قاعدة البيانات
const db = new sqlite3.Database(path.join(__dirname, "mydatabase.db"), (err) => {
  if (err) console.error("SQLite open error:", err.message);
  else console.log("SQLite connected.");
});

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;");
  db.run("PRAGMA journal_mode = WAL;");
  db.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    project_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

  db.run(`ALTER TABLE users ADD COLUMN name TEXT;`, (err) => {
    if (err && !String(err.message).toLowerCase().includes("duplicate")) {
      console.error("ALTER error:", err.message);
    }
  });
});

const normalizeEmail = (e) => String(e || "").trim().toLowerCase();
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).trim());
const bad = (res, m) => res.status(400).json({ error: m });

// صحة
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// تسجيل جديد: يحفظ name + email + password (مشفّر)
app.post("/api/register", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};
    if (!name || !email || !password) return bad(res, "name, email & password required");
    email = normalizeEmail(email);
    if (!validEmail(email)) return bad(res, "invalid email");
    if (String(password).length < 6) return bad(res, "password too short (min 6)");
    const hash = await bcrypt.hash(String(password), 10);

    db.run(
      `INSERT INTO users(name,email,password) VALUES(?,?,?)`,
      [String(name).trim(), email, hash],
      function (err) {
        if (err) {
          if (String(err.message).includes("UNIQUE")) {
            return res.status(409).json({ error: "email already registered" });
          }
          return res.status(500).json({ error: "db error: " + err.message });
        }
        res.json({ id: this.lastID, name: String(name).trim(), email });
      }
    );
  } catch {
    res.status(500).json({ error: "server error" });
  }
});

// دخول: يرجّع id + name + email
app.post("/api/login", (req, res) => {
  let { email, password } = req.body || {};
  if (!email || !password) return bad(res, "email & password required");
  email = normalizeEmail(email);

  db.get(
    `SELECT id,name,email,password FROM users WHERE email = ?`,
    [email],
    async (err, row) => {
      if (err) return res.status(500).json({ error: "db error: " + err.message });
      if (!row) return res.status(401).json({ error: "invalid credentials" });
      const ok = await bcrypt.compare(String(password), row.password);
      if (!ok) return res.status(401).json({ error: "invalid credentials" });
      res.json({ id: row.id, name: row.name, email: row.email });
    }
  );
});

app.listen(PORT, "0.0.0.0", () => console.log(`API on http://localhost:${PORT}`));
