-- Climate Platform Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    wallet_address VARCHAR(42),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'scientist', 'organization')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE,
    preferences JSONB
);

-- Projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('reforestation', 'ocean_cleanup', 'renewable_energy', 'conservation', 'research')),
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('active', 'completed', 'paused', 'planning')),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location JSONB NOT NULL, -- {latitude, longitude, address, country, region}
    target_funding DECIMAL(15, 2) DEFAULT 0,
    current_funding DECIMAL(15, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    impact_metrics JSONB, -- {carbon_offset, trees_planted, waste_removed, etc.}
    blockchain_tx_hash VARCHAR(66),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Climate Data table
CREATE TABLE climate_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    location JSONB NOT NULL, -- {latitude, longitude, address, country, region}
    temperature DECIMAL(5, 2) NOT NULL, -- Celsius
    humidity DECIMAL(5, 2) NOT NULL, -- percentage
    air_quality_index INTEGER,
    co2_level DECIMAL(8, 2), -- ppm
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(20) DEFAULT 'api' CHECK (source IN ('sensor', 'satellite', 'api', 'manual')),
    sensor_id VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    blockchain_tx_hash VARCHAR(66),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carbon Credits table
CREATE TABLE carbon_credits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 4) NOT NULL, -- carbon credits
    price_per_credit DECIMAL(10, 2), -- USD
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'retired', 'pending')),
    vintage_year INTEGER NOT NULL,
    verification_standard VARCHAR(50), -- e.g., "VCS", "CDM", "Gold Standard"
    blockchain_token_id VARCHAR(100),
    blockchain_tx_hash VARCHAR(66),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('carbon_credit_purchase', 'project_funding', 'nft_mint', 'data_verification')),
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id),
    project_id UUID REFERENCES projects(id),
    amount DECIMAL(15, 4) NOT NULL, -- USD
    currency VARCHAR(10) DEFAULT 'USD' CHECK (currency IN ('USD', 'ETH', 'MATIC')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    blockchain_tx_hash VARCHAR(66),
    gas_fee DECIMAL(15, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Environmental Alerts table
CREATE TABLE environmental_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deforestation', 'pollution', 'extreme_weather', 'biodiversity_loss')),
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    location JSONB NOT NULL, -- {latitude, longitude, address, country, region}
    description TEXT NOT NULL,
    data_source VARCHAR(100),
    confidence_score INTEGER DEFAULT 50 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    verified BOOLEAN DEFAULT FALSE,
    resolved BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Sensor Data table
CREATE TABLE sensor_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sensor_id VARCHAR(100) NOT NULL,
    sensor_type VARCHAR(50) NOT NULL CHECK (sensor_type IN ('temperature', 'humidity', 'air_quality', 'co2', 'noise', 'water_quality')),
    location JSONB NOT NULL, -- {latitude, longitude, address, country, region}
    value DECIMAL(15, 4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    quality_score INTEGER DEFAULT 100 CHECK (quality_score >= 0 AND quality_score <= 100),
    is_anomaly BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('project_impact', 'regional_analysis', 'global_trends', 'user_contribution')),
    project_id UUID REFERENCES projects(id),
    user_id UUID REFERENCES users(id),
    content JSONB NOT NULL, -- {summary, metrics, charts, recommendations, data_sources}
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'organization')),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    generated_by VARCHAR(20) DEFAULT 'system' CHECK (generated_by IN ('system', 'user')),
    format VARCHAR(10) DEFAULT 'json' CHECK (format IN ('json', 'pdf', 'csv')),
    file_url TEXT
);

-- User Activities table (for logging)
CREATE TABLE user_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) CHECK (resource_type IN ('project', 'carbon_credit', 'data', 'transaction')),
    resource_id UUID,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_climate_data_timestamp ON climate_data(timestamp);
CREATE INDEX idx_climate_data_location ON climate_data USING GIN(location);
CREATE INDEX idx_climate_data_created_by ON climate_data(created_by);
CREATE INDEX idx_carbon_credits_owner_id ON carbon_credits(owner_id);
CREATE INDEX idx_carbon_credits_project_id ON carbon_credits(project_id);
CREATE INDEX idx_carbon_credits_status ON carbon_credits(status);
CREATE INDEX idx_transactions_from_user_id ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user_id ON transactions(to_user_id);
CREATE INDEX idx_transactions_project_id ON transactions(project_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_environmental_alerts_type ON environmental_alerts(type);
CREATE INDEX idx_environmental_alerts_severity ON environmental_alerts(severity);
CREATE INDEX idx_environmental_alerts_resolved ON environmental_alerts(resolved);
CREATE INDEX idx_sensor_data_sensor_id ON sensor_data(sensor_id);
CREATE INDEX idx_sensor_data_timestamp ON sensor_data(timestamp);
CREATE INDEX idx_sensor_data_location ON sensor_data USING GIN(location);
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_action ON user_activities(action);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE climate_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can customize these based on your security requirements)

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Projects are viewable by everyone
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

-- Project owners can update their projects
CREATE POLICY "Project owners can update their projects" ON projects
    FOR UPDATE USING (auth.uid() = owner_id);

-- Climate data is viewable by everyone
CREATE POLICY "Climate data is viewable by everyone" ON climate_data
    FOR SELECT USING (true);

-- Users can insert climate data
CREATE POLICY "Users can insert climate data" ON climate_data
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Carbon credits are viewable by everyone
CREATE POLICY "Carbon credits are viewable by everyone" ON carbon_credits
    FOR SELECT USING (true);

-- Carbon credit owners can update their credits
CREATE POLICY "Carbon credit owners can update their credits" ON carbon_credits
    FOR UPDATE USING (auth.uid() = owner_id);

-- Transactions are viewable by involved parties
CREATE POLICY "Users can view their transactions" ON transactions
    FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Environmental alerts are viewable by everyone
CREATE POLICY "Environmental alerts are viewable by everyone" ON environmental_alerts
    FOR SELECT USING (true);

-- Sensor data is viewable by everyone
CREATE POLICY "Sensor data is viewable by everyone" ON sensor_data
    FOR SELECT USING (true);

-- Reports visibility based on their visibility setting
CREATE POLICY "Public reports are viewable by everyone" ON reports
    FOR SELECT USING (visibility = 'public');

CREATE POLICY "Private reports are viewable by owner" ON reports
    FOR SELECT USING (visibility = 'private' AND auth.uid() = user_id);

-- User activities are viewable by the user themselves
CREATE POLICY "Users can view their own activities" ON user_activities
    FOR SELECT USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carbon_credits_updated_at BEFORE UPDATE ON carbon_credits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - for testing)
INSERT INTO users (email, username, full_name, role, is_verified) VALUES
('admin@climate-platform.com', 'admin', 'Platform Administrator', 'admin', true),
('scientist@climate-platform.com', 'climatescientist', 'Dr. Jane Smith', 'scientist', true),
('user@climate-platform.com', 'ecowarrior', 'John Doe', 'user', true);

-- You can add more sample data as needed for testing
