# CREATE SUPABASE TABLE - REQUIRED!

## ⚠️ IMPORTANT: You must create the Supabase table before the app can save content!

The error **"Supabase is not available"** means the `vat_website` table doesn't exist in your Supabase database yet.

---

## 🚀 Quick Setup (2 minutes)

### Step 1: Login to Supabase
Go to: **https://supabase.com/dashboard/project/deyzyxzqlsyszbmeqiqx**

### Step 2: Open SQL Editor
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button

### Step 3: Copy & Run SQL Script
1. Open file: **SUPABASE_SETUP.sql** (in your project root)
2. **Copy ALL the content** (Ctrl+A, Ctrl+C)
3. **Paste into Supabase SQL Editor** (Ctrl+V)
4. Click **"Run"** button (or press F5)
5. You should see: **"Success. 8 rows affected"** ✅

### Step 4: Verify Table Created
1. Click **"Table Editor"** in left sidebar
2. You should see **`vat_website`** table in the list
3. Click it to see 8 initial rows with content keys

### Step 5: Refresh Your App
1. Go back to http://localhost:3001
2. Press **F5** to refresh
3. Login to admin panel
4. Try saving content again - it should work now! ✅

---

## 📝 What the SQL Script Does

The script creates:
- ✅ A table named `vat_website` to store your content
- ✅ Proper security policies (RLS) for data access
- ✅ Index for fast lookups
- ✅ 8 initial rows for different content types:
  - homepage_content
  - footer_top_content
  - hero_heading
  - hero_description
  - website_title
  - website_logo
  - maintenance_mode
  - social_links

---

## 🔍 Verify It's Working

After creating the table, you should see in browser console:
```
✅ Supabase table accessible
```

Instead of:
```
❌ Table access error: relation "vat_website" does not exist
```

---

## 💡 Still Having Issues?

**Check:**
1. ✅ You're logged into the correct Supabase project
2. ✅ The SQL script ran without errors
3. ✅ Table appears in Supabase Table Editor
4. ✅ You refreshed the page after creating the table
5. ✅ Using http://localhost:3001 (not 3000)

**Still not working?** Check the browser console (F12) for specific error messages.
