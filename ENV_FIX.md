# Environment Variables Fix

## Issue
The error "supabaseUrl is required" appears because the dev server on port 3000 started before the `.env` file was created.

## Solution

**Use the correct URL:** http://localhost:3001

The server on port 3001 has the Supabase environment variables loaded correctly.

## Stop the Old Server (Optional)

If you want to stop the old server on port 3000 and use only port 3001:

1. **Find the process:**
   - Process ID: 18148

2. **Stop it:**
   ```powershell
   taskkill /F /PID 18148
   ```

3. **Use the correct URL:**
   - ✅ http://localhost:3001
   - ❌ http://localhost:3000 (old, no .env)

## Verify Environment Variables

Open http://localhost:3001 and check the browser console. You should NOT see any "supabaseUrl is required" errors.

## Admin Panel
- Homepage: http://localhost:3001
- Admin Login: http://localhost:3001/admin/login
- Admin Homepage Content: http://localhost:3001/admin/homepage-content
