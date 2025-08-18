#!/usr/bin/env node

/**
 * Quick Database Connection Test
 * 
 * This script tests the database connection and basic operations
 * Run with: node quick-test-db.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

async function testDatabaseConnection() {
    log('\n🔍 Testing Database Connection...', colors.blue + colors.bold);
    
    // Check environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        log('❌ Missing Supabase environment variables!', colors.red);
        log('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file', colors.yellow);
        return false;
    }
    
    try {
        // Create Supabase client
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );
        
        log('✅ Supabase client created successfully', colors.green);
        
        // Test basic connection by trying to fetch from a system table
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);
        
        if (error) {
            if (error.message.includes('relation "users" does not exist')) {
                log('⚠️  Database connected but schema not deployed', colors.yellow);
                log('Please run the schema SQL file in your Supabase dashboard', colors.yellow);
                return false;
            }
            throw error;
        }
        
        log('✅ Database connection successful!', colors.green);
        log('✅ Schema appears to be deployed', colors.green);
        
        return true;
        
    } catch (error) {
        log(`❌ Database connection failed: ${error.message}`, colors.red);
        return false;
    }
}

async function testBasicOperations() {
    log('\n🧪 Testing Basic Database Operations...', colors.blue + colors.bold);
    
    try {
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for testing
        );
        
        // Test creating a user
        log('📝 Testing user creation...', colors.blue);
        const testUser = {
            email: `test-${Date.now()}@example.com`,
            full_name: 'Test User',
            role: 'user'
        };
        
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert([testUser])
            .select()
            .single();
        
        if (userError) throw userError;
        log('✅ User created successfully', colors.green);
        
        // Test creating a project
        log('📝 Testing project creation...', colors.blue);
        const testProject = {
            title: 'Test Project',
            description: 'A test climate project',
            project_type: 'research',
            location: { latitude: 40.7128, longitude: -74.0060, address: 'Test Location' },
            status: 'active',
            owner_id: user.id
        };
        
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .insert([testProject])
            .select()
            .single();
        
        if (projectError) throw projectError;
        log('✅ Project created successfully', colors.green);
        
        // Test adding climate data
        log('📝 Testing climate data insertion...', colors.blue);
        const testClimateData = {
            location: { latitude: 40.7128, longitude: -74.0060, address: 'Test Location' },
            temperature: 22.5,
            humidity: 65.0,
            co2_level: 410.0,
            timestamp: new Date().toISOString(),
            source: 'api'
        };
        
        const { data: climateData, error: climateError } = await supabase
            .from('climate_data')
            .insert([testClimateData])
            .select()
            .single();
        
        if (climateError) throw climateError;
        log('✅ Climate data added successfully', colors.green);
        
        // Clean up test data
        log('🧹 Cleaning up test data...', colors.blue);
        await supabase.from('climate_data').delete().eq('id', climateData.id);
        await supabase.from('projects').delete().eq('id', project.id);
        await supabase.from('users').delete().eq('id', user.id);
        log('✅ Test data cleaned up', colors.green);
        
        return true;
        
    } catch (error) {
        log(`❌ Database operations test failed: ${error.message}`, colors.red);
        return false;
    }
}

async function main() {
    log('🚀 Climate Platform Database Quick Test', colors.bold + colors.blue);
    log('=====================================', colors.blue);
    
    const connectionOk = await testDatabaseConnection();
    
    if (connectionOk) {
        const operationsOk = await testBasicOperations();
        
        if (operationsOk) {
            log('\n🎉 All database tests passed!', colors.green + colors.bold);
            log('Your database is ready for use.', colors.green);
        } else {
            log('\n❌ Database operations failed', colors.red + colors.bold);
            log('Check your database schema and permissions.', colors.yellow);
        }
    } else {
        log('\n❌ Database connection failed', colors.red + colors.bold);
        log('Please check your configuration and try again.', colors.yellow);
    }
    
    log('\nNext Steps:', colors.bold);
    log('1. Configure your .env file with Supabase credentials', colors.yellow);
    log('2. Deploy the schema using database/supabase-schema.sql', colors.yellow);
    log('3. Run the full test suite: npm run test:database', colors.yellow);
    log('4. Start the server: npm run dev', colors.yellow);
}

// Run the test
main().catch(console.error);
