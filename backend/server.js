import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

const app = express();
app.use(cors());
app.use(express.json());

// Reutilizamos UN solo router/db (evita crear router("db.json") múltiples veces)
const router = jsonServer.router("db.json");
const db = router.db;

// --- helpers ---
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const userIdFromReq = (req) => Number(req.user?.sub);

function libroBelongsToUser(libro, userId) {
  return libro && Number(libro.userId) === Number(userId);
}

// --- auth endpoints ---
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "email y password son obligatorios" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user?.passwordHash) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password || !name) {
    return res.status(400).json({ message: "name, email y password son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "Email ya registrado" });

  const passwordHash = await bcrypt.hash(password, 10);

  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    passwordHash
  };

  users.push(newUser).write();

  return res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
});

app.get("/auth/me", authRequired, (req, res) => {
  return res.json({
    id: req.user.sub,
    email: req.user.email,
    name: req.user.name
  });
});

/**
 * --- LIBROS: acceso solo a libros del usuario ---
 * En lugar de depender de filtros "mágicos" de json-server via req.query,
 * implementamos handlers Express limpios y dejamos json-server para el resto.
 */

app.get("/libros", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const libros = db.get("libros").filter({ userId }).value();
  return res.json(libros);
});

app.get("/libros/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const libro = db.get("libros").find({ id }).value();
  if (!libroBelongsToUser(libro, userId)) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  return res.json(libro);
});

app.post("/libros", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const { titulo, autor, portada, año, estado = "pendiente", resena, calificacion } = req.body ?? {};

  if (!titulo?.trim()) return res.status(400).json({ message: "titulo es obligatorio" });
  if (!autor?.trim()) return res.status(400).json({ message: "autor es obligatorio" });
  if (!año) return res.status(400).json({ message: "año es obligatorio" });

  const libros = db.get("libros");
  const nextId = (libros.maxBy("id").value()?.id ?? 0) + 1;

  const newLibro = {
    id: nextId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    portada: portada || "",
    año: Number(año),
    estado,
    userId
  };

  if (resena) newLibro.resena = resena;
  if (calificacion !== undefined && calificacion !== null) newLibro.calificacion = Number(calificacion);

  libros.push(newLibro).write();
  return res.status(201).json(newLibro);
});

app.put("/libros/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const libro = db.get("libros").find({ id }).value();
  if (!libroBelongsToUser(libro, userId)) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  const { titulo, autor, portada, año, estado, resena, calificacion } = req.body ?? {};
  if (!titulo?.trim()) return res.status(400).json({ message: "titulo es obligatorio" });
  if (!autor?.trim()) return res.status(400).json({ message: "autor es obligatorio" });
  if (!año) return res.status(400).json({ message: "año es obligatorio" });

  const updated = {
    ...libro,
    titulo: titulo.trim(),
    autor: autor.trim(),
    portada: portada || "",
    año: Number(año),
    estado: estado || "pendiente",
    userId
  };

  if (resena !== undefined) updated.resena = resena;
  if (calificacion !== undefined && calificacion !== null) updated.calificacion = Number(calificacion);

  db.get("libros").find({ id }).assign(updated).write();

  return res.json(updated);
});

app.patch("/libros/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const libro = db.get("libros").find({ id }).value();
  if (!libroBelongsToUser(libro, userId)) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  const patch = {};
  if (req.body?.titulo !== undefined) {
    const t = String(req.body.titulo).trim();
    if (!t) return res.status(400).json({ message: "titulo no puede estar vacío" });
    patch.titulo = t;
  }
  if (req.body?.autor !== undefined) {
    const a = String(req.body.autor).trim();
    if (!a) return res.status(400).json({ message: "autor no puede estar vacío" });
    patch.autor = a;
  }
  if (req.body?.portada !== undefined) patch.portada = req.body.portada;
  if (req.body?.año !== undefined) patch.año = Number(req.body.año);
  if (req.body?.estado !== undefined) patch.estado = req.body.estado;
  if (req.body?.resena !== undefined) patch.resena = req.body.resena;
  if (req.body?.calificacion !== undefined && req.body.calificacion !== null) {
    patch.calificacion = Number(req.body.calificacion);
  }

  // Bloqueo explícito: nunca permitir cambiar userId desde el cliente
  const updated = db.get("libros").find({ id }).assign(patch).write();
  return res.json(updated);
});

app.delete("/libros/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const libro = db.get("libros").find({ id }).value();
  if (!libroBelongsToUser(libro, userId)) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  db.get("libros").remove({ id }).write();
  return res.status(204).send();
});

// --- json-server CRUD (resto de recursos) ---
const middlewares = jsonServer.defaults();
app.use(middlewares);

// IMPORTANTE: montamos json-server DESPUÉS, para que /libros use nuestros handlers
app.use(router);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
