import { supabase, supabaseAdmin } from '../config/database-config';
import { 
  User, 
  Project, 
  ClimateData, 
  CarbonCredit, 
  Transaction,
  EnvironmentalAlert,
  SensorData,
  Report,
  UserActivity,
  DatabaseQueryOptions,
  DatabaseResponse
} from '../types/database';

export class DatabaseService {
  
  // User Operations
  static async createUser(userData: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating user:', error);
        return null;
      }
      
      return data as User;
    } catch (error) {
      console.error('Database error creating user:', error);
      return null;
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }
      
      return data as User;
    } catch (error) {
      console.error('Database error fetching user:', error);
      return null;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error('Error fetching user by email:', error);
        return null;
      }
      
      return data as User;
    } catch (error) {
      console.error('Database error fetching user by email:', error);
      return null;
    }
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating user:', error);
        return null;
      }
      
      return data as User;
    } catch (error) {
      console.error('Database error updating user:', error);
      return null;
    }
  }

  // Project Operations
  static async createProject(projectData: Partial<Project>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating project:', error);
        return null;
      }
      
      return data as Project;
    } catch (error) {
      console.error('Database error creating project:', error);
      return null;
    }
  }

  static async getProjects(options?: DatabaseQueryOptions): Promise<DatabaseResponse<Project>> {
    try {
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' });
      
      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.orderDirection === 'asc' 
        });
      }
      
      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }
      
      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching projects:', error);
        return { data: [], count: 0, error: error.message };
      }
      
      return { 
        data: data as Project[], 
        count: count || 0, 
        error: null 
      };
    } catch (error) {
      console.error('Database error fetching projects:', error);
      return { 
        data: [], 
        count: 0, 
        error: (error as Error)?.message || 'Unknown error' 
      };
    }
  }

  static async getProjectById(projectId: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) {
        console.error('Error fetching project:', error);
        return null;
      }
      
      return data as Project;
    } catch (error) {
      console.error('Database error fetching project:', error);
      return null;
    }
  }

  static async updateProject(projectId: string, updates: Partial<Project>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating project:', error);
        return null;
      }
      
      return data as Project;
    } catch (error) {
      console.error('Database error updating project:', error);
      return null;
    }
  }

  // Climate Data Operations
  static async storeClimateData(climateData: Partial<ClimateData>): Promise<ClimateData | null> {
    try {
      const { data, error } = await supabase
        .from('climate_data')
        .insert([climateData])
        .select()
        .single();
      
      if (error) {
        console.error('Error storing climate data:', error);
        return null;
      }
      
      return data as ClimateData;
    } catch (error) {
      console.error('Database error storing climate data:', error);
      return null;
    }
  }

  static async getClimateData(options?: DatabaseQueryOptions): Promise<DatabaseResponse<ClimateData>> {
    try {
      let query = supabase
        .from('climate_data')
        .select('*', { count: 'exact' });
      
      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      // Apply ordering (default by timestamp desc)
      query = query.order(options?.orderBy || 'timestamp', { 
        ascending: options?.orderDirection === 'asc' ? true : false
      });
      
      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }
      
      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching climate data:', error);
        return { data: [], count: 0, error: error.message };
      }
      
      return { 
        data: data as ClimateData[], 
        count: count || 0, 
        error: null 
      };
    } catch (error) {
      console.error('Database error fetching climate data:', error);
      return { 
        data: [], 
        count: 0, 
        error: (error as Error)?.message || 'Unknown error' 
      };
    }
  }

  // Carbon Credit Operations
  static async createCarbonCredit(creditData: Partial<CarbonCredit>): Promise<CarbonCredit | null> {
    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .insert([creditData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating carbon credit:', error);
        return null;
      }
      
      return data as CarbonCredit;
    } catch (error) {
      console.error('Database error creating carbon credit:', error);
      return null;
    }
  }

  static async getCarbonCreditsByUser(userId: string): Promise<CarbonCredit[]> {
    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .select('*')
        .eq('owner_id', userId);
      
      if (error) {
        console.error('Error fetching carbon credits:', error);
        return [];
      }
      
      return data as CarbonCredit[];
    } catch (error) {
      console.error('Database error fetching carbon credits:', error);
      return [];
    }
  }

  // Transaction Operations
  static async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction | null> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating transaction:', error);
        return null;
      }
      
      return data as Transaction;
    } catch (error) {
      console.error('Database error creating transaction:', error);
      return null;
    }
  }

  static async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching transactions:', error);
        return [];
      }
      
      return data as Transaction[];
    } catch (error) {
      console.error('Database error fetching transactions:', error);
      return [];
    }
  }

  // Environmental Alert Operations
  static async createAlert(alertData: Partial<EnvironmentalAlert>): Promise<EnvironmentalAlert | null> {
    try {
      const { data, error } = await supabase
        .from('environmental_alerts')
        .insert([alertData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating alert:', error);
        return null;
      }
      
      return data as EnvironmentalAlert;
    } catch (error) {
      console.error('Database error creating alert:', error);
      return null;
    }
  }

  static async getActiveAlerts(): Promise<EnvironmentalAlert[]> {
    try {
      const { data, error } = await supabase
        .from('environmental_alerts')
        .select('*')
        .eq('resolved', false)
        .order('severity', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching active alerts:', error);
        return [];
      }
      
      return data as EnvironmentalAlert[];
    } catch (error) {
      console.error('Database error fetching active alerts:', error);
      return [];
    }
  }

  // Analytics and Reports
  static async getUserStats(userId: string): Promise<Record<string, number>> {
    try {
      const [projects, carbonCredits, transactions] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }).eq('owner_id', userId),
        supabase.from('carbon_credits').select('amount', { count: 'exact' }).eq('owner_id', userId),
        supabase.from('transactions').select('amount', { count: 'exact' }).eq('from_user_id', userId)
      ]);

      const totalCarbonCredits = carbonCredits.data?.reduce((sum, credit) => sum + (credit.amount || 0), 0) || 0;
      const totalTransactionValue = transactions.data?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;

      return {
        projectsOwned: projects.count || 0,
        carbonCreditsOwned: totalCarbonCredits,
        totalTransactionValue,
        transactionCount: transactions.count || 0
      };
    } catch (error) {
      console.error('Database error fetching user stats:', error);
      return {};
    }
  }

  // Logging user activity
  static async logUserActivity(activityData: Partial<UserActivity>): Promise<void> {
    try {
      await supabase
        .from('user_activities')
        .insert([activityData]);
    } catch (error) {
      console.error('Database error logging user activity:', error);
    }
  }

  // Health check for database
  static async healthCheck(): Promise<{ status: string; latency: number }> {
    const startTime = Date.now();
    
    try {
      await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      const latency = Date.now() - startTime;
      
      return {
        status: 'healthy',
        latency
      };
    } catch (error) {
      console.error('Database health check failed:', error);
      return {
        status: 'unhealthy',
        latency: Date.now() - startTime
      };
    }
  }
}
