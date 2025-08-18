# Database Implementation Guide

## Overview

This climate platform uses Supabase as the primary database solution with PostgreSQL. The database layer provides comprehensive data management for users, projects, climate data, carbon credits, blockchain transactions, and environmental monitoring.

## Database Schema

### Core Tables

1. **users** - User management and authentication
2. **projects** - Climate and environmental projects
3. **climate_data** - Environmental measurements and readings
4. **carbon_credits** - Carbon credit transactions and tracking
5. **blockchain_transactions** - Blockchain activity logging
6. **project_participants** - Project team management
7. **data_collection_sessions** - Data gathering sessions
8. **environmental_alerts** - Alert system for environmental events
9. **user_preferences** - User customization settings

### Features

- **Row Level Security (RLS)** - Comprehensive security policies
- **Real-time subscriptions** - Live data updates
- **Full-text search** - Advanced search capabilities
- **Automated timestamps** - Created/updated tracking
- **Data validation** - Type safety and constraints
- **Performance indexes** - Optimized query performance

## Setup Instructions

### 1. Supabase Project Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your project URL and API keys:
   - Project URL: `https://your-project.supabase.co`
   - Anon/Public Key: For client-side operations
   - Service Role Key: For server-side operations

### 2. Environment Configuration

Update your `.env` file with Supabase credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Database Schema Deployment

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `database/supabase-schema.sql`
4. Execute the script to create all tables, indexes, and policies

### 4. Install Dependencies

```bash
npm install @supabase/supabase-js prisma @prisma/client
```

## API Endpoints

### Users
- `GET /api/database/users` - Get all users
- `GET /api/database/users/:id` - Get user by ID
- `POST /api/database/users` - Create new user
- `PUT /api/database/users/:id` - Update user
- `DELETE /api/database/users/:id` - Delete user

### Projects
- `GET /api/database/projects` - Get all projects
- `GET /api/database/projects/:id` - Get project by ID
- `POST /api/database/projects` - Create new project
- `PUT /api/database/projects/:id` - Update project
- `DELETE /api/database/projects/:id` - Delete project

### Climate Data
- `GET /api/database/climate-data` - Get climate data
- `POST /api/database/climate-data` - Add climate data
- `GET /api/database/climate-data/location/:lat/:lng` - Get data by location

### Carbon Credits
- `GET /api/database/carbon-credits` - Get carbon credits
- `POST /api/database/carbon-credits` - Create carbon credit
- `GET /api/database/carbon-credits/user/:userId` - Get user's credits

### Blockchain Transactions
- `GET /api/database/blockchain-transactions` - Get transactions
- `POST /api/database/blockchain-transactions` - Log transaction

## Database Service Usage

### Import the Service

```typescript
import { DatabaseService } from '../services/database-service';
```

### User Operations

```typescript
// Create a new user
const user = await DatabaseService.createUser({
  email: 'user@example.com',
  name: 'John Doe',
  role: 'researcher'
});

// Get user by ID
const user = await DatabaseService.getUserById('user-id');

// Update user
const updatedUser = await DatabaseService.updateUser('user-id', {
  name: 'Jane Doe'
});
```

### Project Operations

```typescript
// Create a project
const project = await DatabaseService.createProject({
  name: 'Reforestation Initiative',
  description: 'Plant 1000 trees',
  location: 'Amazon Rainforest',
  status: 'active',
  created_by: 'user-id'
});

// Get projects by status
const activeProjects = await DatabaseService.getProjectsByStatus('active');
```

### Climate Data Operations

```typescript
// Add climate data
const data = await DatabaseService.addClimateData({
  location: 'Amazon Basin',
  latitude: -3.4653,
  longitude: -62.2159,
  temperature: 28.5,
  humidity: 85.2,
  co2_level: 415.3,
  data_source: 'IoT Sensor'
});

// Get data by location
const locationData = await DatabaseService.getClimateDataByLocation(-3.4653, -62.2159);
```

### Carbon Credits Operations

```typescript
// Create carbon credit
const credit = await DatabaseService.createCarbonCredit({
  project_id: 'project-id',
  amount: 100.5,
  price_per_credit: 25.00,
  status: 'available',
  certification_body: 'Verra'
});

// Get user's carbon credits
const userCredits = await DatabaseService.getCarbonCreditsByUser('user-id');
```

## Testing

### Run Database Tests

```bash
npm run test:database
```

This will test all database endpoints and operations.

### Manual Testing

You can test individual endpoints using curl or Postman:

```bash
# Test user creation
curl -X POST http://localhost:5000/api/database/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","role":"researcher"}'

# Test project creation
curl -X POST http://localhost:5000/api/database/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"Test Description","location":"Test Location","status":"active","created_by":"user-id"}'
```

## Real-time Features

The database supports real-time subscriptions for live updates:

```typescript
// Subscribe to new climate data
const subscription = supabase
  .from('climate_data')
  .on('INSERT', (payload) => {
    console.log('New climate data:', payload.new);
  })
  .subscribe();

// Subscribe to project updates
const projectSubscription = supabase
  .from('projects')
  .on('UPDATE', (payload) => {
    console.log('Project updated:', payload.new);
  })
  .subscribe();
```

## Security

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Users**: Can only view/edit their own data
- **Projects**: Public read, authenticated create/update
- **Climate Data**: Public read, authenticated write
- **Carbon Credits**: Owner-based access control

### Authentication

The database integrates with Supabase Auth for user management:

```typescript
// User registration
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// User login
const { user, error } = await supabase.auth.signIn({
  email: 'user@example.com',
  password: 'password'
});
```

## Performance Optimization

### Indexes

The schema includes performance indexes on:
- User emails and roles
- Project status and location
- Climate data coordinates and timestamps
- Carbon credit status and amounts

### Query Optimization

Use appropriate filtering and pagination:

```typescript
// Paginated results
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .range(0, 9); // Get first 10 records

// Filtered results
const { data, error } = await supabase
  .from('climate_data')
  .select('*')
  .gte('temperature', 20)
  .lte('temperature', 30);
```

## Troubleshooting

### Common Issues

1. **Connection Errors**: Check your Supabase URL and API keys
2. **RLS Violations**: Ensure proper authentication and permissions
3. **Schema Errors**: Verify the schema was deployed correctly

### Debug Mode

Enable debug logging in your environment:

```bash
NODE_ENV=development
SUPABASE_DEBUG=true
```

## Migration and Backup

### Data Migration

For migrating existing data:

```sql
-- Example migration script
INSERT INTO users (email, name, role)
SELECT email, name, 'user' as role
FROM legacy_users_table;
```

### Backup Strategy

Supabase provides automatic backups, but you can also:

1. Export data via SQL queries
2. Use pg_dump for full database backups
3. Implement incremental data exports

## Monitoring and Analytics

### Database Metrics

Monitor key metrics in Supabase dashboard:
- Query performance
- Storage usage
- API request counts
- Error rates

### Custom Analytics

Create views for analytics:

```sql
-- Project statistics view
CREATE VIEW project_stats AS
SELECT 
  status,
  COUNT(*) as project_count,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/86400) as avg_duration_days
FROM projects
GROUP BY status;
```

## Support and Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Climate Platform API Documentation](./api-documentation.md)

For issues and support, check the project's GitHub repository or contact the development team.
