import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Database Configuration
export const DATABASE_CONFIG = {
  SUPABASE: {
    URL: process.env.SUPABASE_URL || '',
    ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  
  // Connection settings
  CONNECTION: {
    POOL_SIZE: 20,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3
  }
};

// Supabase client for public operations (using anon key)
export const supabase: SupabaseClient = createClient(
  DATABASE_CONFIG.SUPABASE.URL,
  DATABASE_CONFIG.SUPABASE.ANON_KEY
);

// Supabase admin client for admin operations (using service role key)
export const supabaseAdmin: SupabaseClient = createClient(
  DATABASE_CONFIG.SUPABASE.URL,
  DATABASE_CONFIG.SUPABASE.SERVICE_ROLE_KEY
);

// Database connection test
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (acceptable for first run)
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Database initialization
export async function initializeDatabase(): Promise<void> {
  console.log('🔄 Initializing database connection...');
  
  if (!DATABASE_CONFIG.SUPABASE.URL || !DATABASE_CONFIG.SUPABASE.ANON_KEY) {
    console.warn('⚠️ Supabase credentials not configured. Database features will be limited.');
    return;
  }
  
  const isConnected = await testDatabaseConnection();
  
  if (isConnected) {
    console.log('🎉 Database initialized successfully');
  } else {
    console.error('❌ Database initialization failed');
    throw new Error('Database connection failed');
  }
}
