// Database Models and Types for Climate Platform

export interface User {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  wallet_address?: string;
  role: 'user' | 'admin' | 'scientist' | 'organization';
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_verified: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  data_sharing: boolean;
  newsletter: boolean;
  preferred_units: 'metric' | 'imperial';
  dashboard_layout?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  project_type: 'reforestation' | 'ocean_cleanup' | 'renewable_energy' | 'conservation' | 'research';
  status: 'active' | 'completed' | 'paused' | 'planning';
  owner_id: string;
  location: ProjectLocation;
  target_funding: number;
  current_funding: number;
  start_date: string;
  end_date?: string;
  impact_metrics: ProjectImpactMetrics;
  blockchain_tx_hash?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectLocation {
  latitude: number;
  longitude: number;
  address?: string;
  country: string;
  region?: string;
}

export interface ProjectImpactMetrics {
  carbon_offset: number; // tons of CO2
  trees_planted?: number;
  waste_removed?: number; // kg
  energy_generated?: number; // kWh
  water_saved?: number; // liters
  biodiversity_score?: number;
}

export interface ClimateData {
  id: string;
  location: ProjectLocation;
  temperature: number; // Celsius
  humidity: number; // percentage
  air_quality_index: number;
  co2_level: number; // ppm
  timestamp: string;
  source: 'sensor' | 'satellite' | 'api' | 'manual';
  sensor_id?: string;
  verified: boolean;
  blockchain_tx_hash?: string;
  created_by: string;
  created_at: string;
}

export interface CarbonCredit {
  id: string;
  project_id: string;
  owner_id: string;
  amount: number; // carbon credits
  price_per_credit: number; // USD
  status: 'available' | 'sold' | 'retired' | 'pending';
  vintage_year: number;
  verification_standard: string; // e.g., "VCS", "CDM", "Gold Standard"
  blockchain_token_id?: string;
  blockchain_tx_hash?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  type: 'carbon_credit_purchase' | 'project_funding' | 'nft_mint' | 'data_verification';
  from_user_id: string;
  to_user_id?: string;
  project_id?: string;
  amount: number; // USD
  currency: 'USD' | 'ETH' | 'MATIC';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  blockchain_tx_hash?: string;
  gas_fee?: number;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalAlert {
  id: string;
  type: 'deforestation' | 'pollution' | 'extreme_weather' | 'biodiversity_loss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: ProjectLocation;
  description: string;
  data_source: string;
  confidence_score: number; // 0-100
  verified: boolean;
  resolved: boolean;
  created_by?: string;
  created_at: string;
  resolved_at?: string;
}

export interface SensorData {
  id: string;
  sensor_id: string;
  sensor_type: 'temperature' | 'humidity' | 'air_quality' | 'co2' | 'noise' | 'water_quality';
  location: ProjectLocation;
  value: number;
  unit: string;
  timestamp: string;
  quality_score: number; // 0-100 data quality
  is_anomaly: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'project_impact' | 'regional_analysis' | 'global_trends' | 'user_contribution';
  project_id?: string;
  user_id?: string;
  content: ReportContent;
  visibility: 'public' | 'private' | 'organization';
  generated_at: string;
  generated_by: 'system' | 'user';
  format: 'json' | 'pdf' | 'csv';
  file_url?: string;
}

export interface ReportContent {
  summary: string;
  metrics: Record<string, number>;
  charts: ReportChart[];
  recommendations: string[];
  data_sources: string[];
}

export interface ReportChart {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap';
  title: string;
  data: Record<string, any>;
  config: Record<string, any>;
}

export interface UserActivity {
  id: string;
  user_id: string;
  action: string;
  resource_type: 'project' | 'carbon_credit' | 'data' | 'transaction';
  resource_id?: string;
  metadata: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Database Query Types
export interface DatabaseQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface DatabaseResponse<T> {
  data: T[];
  count: number;
  error: string | null;
}

// Supabase specific types
export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}
