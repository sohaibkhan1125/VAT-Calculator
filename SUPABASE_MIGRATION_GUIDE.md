# Quick Setup Guide - Supabase Migration

## ✅ What's Already Done

All code changes are complete! Your application is ready to use Supabase:

- ✅ Supabase client installed
- ✅ Environment variables configured
- ✅ Service layer created
- ✅ Context updated to use Supabase
- ✅ Admin components updated
- ✅ Application running on http://localhost:3001

## 🔧 What You Need to Do (2 minutes)

### Step 1: Create the Supabase Table

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/deyzyxzqlsyszbmeqiqx
   - Login if needed

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the SQL Script**
   - Open the file: `SUPABASE_SETUP.sql` (in your project root)
   - Copy all the content
   - Paste into Supabase SQL Editor
   - Click "Run" (or press F5)
   - You should see: "Success. 8 rows affected"

4. **Verify Table Created**
   - Click "Table Editor" in left sidebar
   - You should see the `vat_website` table listed
   - Click it to see the 8 initial content rows

### Step 2: Test Content Saving

1. **Login to Admin Panel**
   - Go to: http://localhost:3001/admin/login
   - Login with your credentials

2. **Test Homepage Content**
   - Click "Homepage Content" in the sidebar
   - Look for green indicator: "Connected to Supabase ✅"
   - Add some test content in the editor
   - Click "Save Content"
   - Success message should say: "Homepage content saved successfully to Supabase!"

3. **Verify in Supabase**
   - Go back to Supabase → Table Editor → vat_website
   - Find row where `content_key` = 'homepage_content'
   - Your content should be in the `content_value` column

4. **Verify on Homepage**
   - Go to: http://localhost:3001
   - Scroll down below the calculator
   - Your saved content should display!

## 🎯 That's It!

Your website now uses Supabase for all content storage. No more localStorage or Firebase!

## 📝 Key Files

- **SQL Script**: `SUPABASE_SETUP.sql` - Run this in Supabase
- **Environment**: `.env` - Contains your Supabase credentials
- **Service Layer**: `src/services/contentService.js` - Handles all Supabase operations
- **Context**: `src/contexts/WebsiteSettingsContext.js` - Updated to use Supabase
- **Detailed Guide**: See `walkthrough.md` artifact for complete documentation

## ❓ Troubleshooting

**"Supabase unavailable" in admin panel?**
- Make sure you ran the SQL script to create the table
- Check RLS policy allows access
- Restart dev server if you just created `.env` file

**Content not saving?**
- Check browser console for errors
- Verify table exists in Supabase
- Check Supabase logs for permission issues

**Content not displaying?**
- Verify content exists in Supabase table
- Check that `content_key` matches exactly
- Refresh the page

## 🎉 Success Checklist

- [ ] SQL script executed in Supabase ✓
- [ ] Table `vat_website` visible in Table Editor ✓
- [ ] Admin panel shows "Connected to Supabase" ✓
- [ ] Can save content from admin panel ✓
- [ ] Content displays on homepage ✓
- [ ] Content persists after page refresh ✓
