import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// In-memory registered user store for dev server
interface UserRecord {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

const usersDb: UserRecord[] = [
  {
    id: 1,
    username: 'MCrganMan',
    email: 'mc.organman@gmail.com',
    passwordHash: 'MCrganMan',
    role: 'creator',
    createdAt: new Date().toISOString()
  }
];

function authApiDevPlugin(): Plugin {
  return {
    name: 'auth-api-dev-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];

        // Handle CORS preflight
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.statusCode = 204;
          res.end();
          return;
        }

        // Endpoint: /api/register
        if ((url === '/api/register' || url === '/api/register.php') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            try {
              const data = JSON.parse(body || '{}');
              const username = (data.username || '').trim();
              const email = (data.email || '').trim().toLowerCase();
              const password = (data.password || '').trim();

              if (!username || username.length < 3) {
                res.statusCode = 422;
                res.end(JSON.stringify({
                  status: 'validation_error',
                  message: 'Username must be at least 3 characters long.'
                }));
                return;
              }

              if (!password || password.length < 4) {
                res.statusCode = 422;
                res.end(JSON.stringify({
                  status: 'validation_error',
                  message: 'Password must be at least 4 characters long.'
                }));
                return;
              }

              // Check if username or email already exists
              const existingUser = usersDb.find(
                u => u.username.toLowerCase() === username.toLowerCase() || (email && u.email === email)
              );

              if (existingUser) {
                res.statusCode = 409;
                res.end(JSON.stringify({
                  status: 'conflict',
                  message: 'Username or email already registered. Please choose another or sign in.'
                }));
                return;
              }

              const newUser: UserRecord = {
                id: usersDb.length + 1,
                username,
                email: email || `${username.toLowerCase()}@user.local`,
                passwordHash: password,
                role: 'member',
                createdAt: new Date().toISOString()
              };

              usersDb.push(newUser);

              res.statusCode = 201;
              res.end(JSON.stringify({
                status: 'success',
                message: 'Account registered successfully. You are now logged in.',
                data: {
                  id: newUser.id,
                  username: newUser.username,
                  email: newUser.email,
                  role: newUser.role,
                  token: 'tok_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                  createdAt: newUser.createdAt
                }
              }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({
                status: 'error',
                message: 'Invalid JSON request format.'
              }));
            }
          });
          return;
        }

        // Endpoint: /api/login
        if ((url === '/api/login' || url === '/api/login.php') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            try {
              const data = JSON.parse(body || '{}');
              const usernameOrEmail = (data.username || data.email || '').trim();
              const password = (data.password || '').trim();

              if (!usernameOrEmail || !password) {
                res.statusCode = 422;
                res.end(JSON.stringify({
                  status: 'validation_error',
                  message: 'Username and password are required.'
                }));
                return;
              }

              // Find in usersDb
              const matchedUser = usersDb.find(
                u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
                     u.passwordHash === password
              );

              if (matchedUser) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                  status: 'success',
                  message: `Welcome back, ${matchedUser.username}.`,
                  data: {
                    id: matchedUser.id,
                    username: matchedUser.username,
                    email: matchedUser.email,
                    role: matchedUser.role,
                    token: 'tok_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    loginAt: new Date().toISOString()
                  }
                }));
              } else {
                res.statusCode = 401;
                res.end(JSON.stringify({
                  status: 'unauthorized',
                  message: 'Invalid credentials. Please verify username and password or register a new account.'
                }));
              }
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({
                status: 'error',
                message: 'Invalid JSON request format.'
              }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    authApiDevPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
});
