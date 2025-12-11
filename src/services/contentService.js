import { supabase } from './supabaseClient';

const TABLE_NAME = 'vat_website';

/**
 * Initialize the content table if it doesn't exist
 * This should be called on app startup
 */
export const initializeContentTable = async () => {
    console.log('🔄 Initializing Supabase content table...');
    try {
        // Check if we can access the table
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Supabase Table Access Error:');
            console.error('   Error Code:', error.code);
            console.error('   Error Message:', error.message);
            console.error('   Error Details:', error.details);
            console.error('   Error Hint:', error.hint);

            if (error.code === '42P01') {
                console.error('');
                console.error('⚠️  TABLE DOES NOT EXIST!');
                console.error('   Create it by running SUPABASE_SETUP.sql in Supabase dashboard');
            } else if (error.code === 'PGRST301') {
                console.error('');
                console.error('⚠️  RLS POLICY ISSUE!');
                console.error('   The table exists but Row Level Security is blocking access');
                console.error('   Run this SQL to fix: ALTER TABLE vat_website DISABLE ROW LEVEL SECURITY;');
            }

            return false;
        }

        console.log('✅ Supabase table accessible - found', data?.length || 0, 'rows');
        return true;
    } catch (err) {
        console.error('❌ Error initializing content table:', err);
        return false;
    }
};

/**
 * Get content by key from Supabase
 * @param {string} contentKey - The key to retrieve (e.g., 'homepage_content', 'footer_top_content')
 * @returns {Promise<string>} The content value or empty string
 */
export const getContent = async (contentKey) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('content_value')
            .eq('content_key', contentKey)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No row found - return empty string
                console.log(`No content found for key: ${contentKey}`);
                return '';
            }
            throw error;
        }

        return data?.content_value || '';
    } catch (err) {
        console.error(`Error getting content for ${contentKey}:`, err);
        throw err;
    }
};

/**
 * Get all content from Supabase
 * @returns {Promise<Object>} Object with all content key-value pairs
 */
export const getAllContent = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('content_key, content_value');

        if (error) throw error;

        // Transform array into object
        const contentObj = {};
        if (data) {
            data.forEach(item => {
                contentObj[item.content_key] = item.content_value;
            });
        }

        return contentObj;
    } catch (err) {
        console.error('Error getting all content:', err);
        throw err;
    }
};

/**
 * Save or update content in Supabase
 * @param {string} contentKey - The key to save
 * @param {string} contentValue - The content to save
 * @returns {Promise<boolean>} Success status
 */
export const saveContent = async (contentKey, contentValue) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .upsert(
                {
                    content_key: contentKey,
                    content_value: contentValue,
                    updated_at: new Date().toISOString(),
                },
                {
                    onConflict: 'content_key',
                }
            )
            .select();

        if (error) throw error;

        console.log(`Content saved successfully for key: ${contentKey}`);
        return true;
    } catch (err) {
        console.error(`Error saving content for ${contentKey}:`, err);
        throw err;
    }
};

/**
 * Subscribe to real-time changes for a specific content key
 * @param {string} contentKey - The key to subscribe to
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToContent = (contentKey, callback) => {
    const channel = supabase
        .channel(`content-${contentKey}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: TABLE_NAME,
                filter: `content_key=eq.${contentKey}`,
            },
            (payload) => {
                console.log('Content changed:', payload);
                if (payload.new) {
                    callback(payload.new.content_value);
                }
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

/**
 * Subscribe to all content changes
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAllContent = (callback) => {
    const channel = supabase
        .channel('all-content')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: TABLE_NAME,
            },
            async (payload) => {
                console.log('Content table changed:', payload);
                // Fetch all content and pass to callback
                const allContent = await getAllContent();
                callback(allContent);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};
