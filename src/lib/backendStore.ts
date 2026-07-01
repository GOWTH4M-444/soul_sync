import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface AssessmentRecord {
  id: string;
  userId: string;
  summary: string;
  answers: Record<string, unknown>;
  createdAt: string;
}

export interface DashboardPayload {
  name: string;
  streak: number;
  score: number;
  pillars: Array<{ label: string; value: number; color: string; icon: string; trend: string }>;
  reminders: Array<{ time: string; task: string; done: boolean }>;
  insights: Array<{ icon: string; text: string; color: string }>;
  recentRemedies: Array<{ title: string; category: string; desc: string }>;
}

const dataDir = path.join(process.cwd(), "src", "data");
const usersPath = path.join(dataDir, "users.json");
const sessionsPath = path.join(dataDir, "sessions.json");
const assessmentsPath = path.join(dataDir, "assessments.json");

async function ensureFile(filePath: string, initialValue: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, initialValue, "utf8");
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureFile(filePath, JSON.stringify(fallback, null, 2));
  const contents = await fs.readFile(filePath, "utf8");
  if (!contents.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(contents) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await ensureFile(filePath, JSON.stringify(data, null, 2));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(candidate: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const candidateHash = crypto.pbkdf2Sync(candidate, salt, 100000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(candidateHash), Buffer.from(hash));
}

export async function findUserByEmail(email: string) {
  const users = await readJsonFile<UserRecord[]>(usersPath, []);
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(userId: string) {
  const users = await readJsonFile<UserRecord[]>(usersPath, []);
  return users.find((user) => user.id === userId) ?? null;
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const users = await readJsonFile<UserRecord[]>(usersPath, []);
  const user: UserRecord = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeJsonFile(usersPath, users);
  return user;
}

export async function createSession(userId: string) {
  const sessions = await readJsonFile<SessionRecord[]>(sessionsPath, []);
  const session: SessionRecord = {
    id: crypto.randomUUID(),
    userId,
    token: crypto.randomBytes(32).toString("hex"),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };

  sessions.push(session);
  await writeJsonFile(sessionsPath, sessions);
  return session;
}

export async function findSession(token: string) {
  const sessions = await readJsonFile<SessionRecord[]>(sessionsPath, []);
  return sessions.find((session) => session.token === token) ?? null;
}

export async function validatePassword(candidate: string, storedHash: string) {
  return verifyPassword(candidate, storedHash);
}

export async function createAssessment(userId: string, payload: { summary: string; answers: Record<string, unknown> }) {
  const assessments = await readJsonFile<AssessmentRecord[]>(assessmentsPath, []);
  const record: AssessmentRecord = {
    id: crypto.randomUUID(),
    userId,
    summary: payload.summary,
    answers: payload.answers,
    createdAt: new Date().toISOString(),
  };

  assessments.unshift(record);
  await writeJsonFile(assessmentsPath, assessments);
  return record;
}

export async function listAssessments(userId: string) {
  const assessments = await readJsonFile<AssessmentRecord[]>(assessmentsPath, []);
  return assessments.filter((assessment) => assessment.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDashboardData(userId: string): Promise<DashboardPayload> {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const assessments = await listAssessments(userId);
  const latest = assessments[0];
  const latestData = (latest?.answers ?? {}) as Record<string, unknown>;
  const painLevel = Number(latestData.painLevel ?? 5);
  const energyLevel = Number(latestData.energyLevel ?? 5);
  const stressLevel = Number(latestData.stressLevel ?? 5);
  const sleepQuality = Number(latestData.sleepQuality ?? 5);
  const score = Math.max(45, Math.min(95, 100 - painLevel * 3 - stressLevel * 2 + energyLevel * 2 + sleepQuality * 2));

  return {
    name: user.name.split(" ")[0] || user.name,
    streak: Math.max(1, assessments.length + 1),
    score: Math.round(score),
    pillars: [
      { label: "Soul", value: Math.max(50, Math.min(95, 70 + (latestData.spiritualState ? 5 : -2))), color: "#d68c67", icon: "✨", trend: "+5%" },
      { label: "Mind", value: Math.max(50, Math.min(95, 72 - stressLevel + 2)), color: "#c4a47c", icon: "🧠", trend: "+12%" },
      { label: "Body", value: Math.max(50, Math.min(95, 60 + energyLevel - painLevel)), color: "#b08d65", icon: "💪", trend: "+3%" },
    ],
    reminders: [
      { time: "08:00 AM", task: "Morning breathing exercise (5 min)", done: true },
      { time: "12:00 PM", task: "Mindful lunch — no screens", done: true },
      { time: "03:00 PM", task: "Drink 2 glasses of water", done: false },
      { time: "06:00 PM", task: "Evening walk (20 min)", done: false },
      { time: "09:00 PM", task: "Gratitude journaling", done: false },
      { time: "10:00 PM", task: "Sleep preparation — no phone 30 min before bed", done: false },
    ],
    insights: [
      { icon: "⚠️", text: "Your stress levels are high. A calming breath session would help today.", color: "#d68c67" },
      { icon: "✅", text: "Your latest check-in shows your energy is improving. Keep going.", color: "#c4a47c" },
      { icon: "💡", text: "Sleep quality matters greatly for your recovery. Protect your nights.", color: "#b08d65" },
    ],
    recentRemedies: [
      { title: "4-7-8 Breathing Technique", category: "Mental", desc: "For anxiety relief" },
      { title: "Warm Ginger & Turmeric Tea", category: "Physical", desc: "For inflammation & digestion" },
      { title: "Morning Sun Gazing (5 min)", category: "Spiritual", desc: "For grounding & energy alignment" },
    ],
  };
}
