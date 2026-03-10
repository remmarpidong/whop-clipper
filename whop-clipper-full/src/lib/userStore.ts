import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  roles: ("admin" | "creator" | "clipper")[]; // Default: ["creator", "clipper"]
  isVerified: boolean;
  otpCode: string | null;
  otpExpires: number | null;
  createdAt: number;
  updatedAt: number;
}

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read all users
function readUsers(): User[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write users
function writeUsers(users: User[]): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Generate unique ID
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create a new user with default roles ["creator", "clipper"]
export function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
  const users = readUsers();
  const existingUser = users.find((u) => u.email === userData.email);
  
  if (existingUser) {
    // Update existing user
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      // Ensure roles are set
      roles: userData.roles || ["creator", "clipper"],
      updatedAt: Date.now(),
    };
    const index = users.findIndex((u) => u.email === userData.email);
    users[index] = updatedUser;
    writeUsers(users);
    return updatedUser;
  }
  
  const newUser: User = {
    id: generateId(),
    ...userData,
    // Default roles for new users: both creator and clipper
    roles: userData.roles && userData.roles.length > 0 ? userData.roles : ["creator", "clipper"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

// Get user by email
export function getUser(email: string): User | null {
  const users = readUsers();
  return users.find((u) => u.email === email) || null;
}

// Get user by ID
export function getUserById(id: string): User | null {
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

// Update user
export function updateUser(email: string, updates: Partial<User>): User | null {
  const users = readUsers();
  const index = users.findIndex((u) => u.email === email);
  
  if (index === -1) return null;
  
  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: Date.now(),
  };
  
  writeUsers(users);
  return users[index];
}

// Delete user
export function deleteUser(email: string): boolean {
  const users = readUsers();
  const index = users.findIndex((u) => u.email === email);
  
  if (index === -1) return false;
  
  users.splice(index, 1);
  writeUsers(users);
  return true;
}

// List all users
export function listUsers(): User[] {
  return readUsers();
}

// Update user roles
export function updateUserRoles(email: string, roles: ("admin" | "creator" | "clipper")[]): User | null {
  return updateUser(email, { roles });
}

// Check if user has a specific role
export function userHasRole(user: User | null, role: "admin" | "creator" | "clipper"): boolean {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

// Get user by ID with roles
export function getUserByIdWithRoles(id: string): User | null {
  return getUserById(id);
}
