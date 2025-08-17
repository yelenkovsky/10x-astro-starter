# Database Schema - 10x-cards MVP

## Overview
This document defines the PostgreSQL database schema for the 10x-cards MVP application, designed to support up to 10 users with flashcard creation, AI generation, and spaced repetition learning functionality.

## Tables

### 1. users (Managed by Supabase Auth)
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid() (Supabase auth.users.id)
- `email` VARCHAR(255) NOT NULL UNIQUE
- `created_at` TIMESTAMPTZ DEFAULT NOW()
- `updated_at` TIMESTAMPTZ DEFAULT NOW()

### 2. flashcards
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `front` VARCHAR(500) NOT NULL
- `back` VARCHAR(500) NOT NULL
- `is_ai_generated` BOOLEAN NOT NULL DEFAULT FALSE
- `is_accepted` BOOLEAN NOT NULL DEFAULT TRUE
- `created_at` TIMESTAMPTZ DEFAULT NOW()
- `updated_at` TIMESTAMPTZ DEFAULT NOW()

### 3. learning_progress
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `flashcard_id` UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE
- `next_review_date` TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `interval_days` INTEGER NOT NULL DEFAULT 1
- `ease_factor` DECIMAL(4,3) NOT NULL DEFAULT 2.5
- `review_count` INTEGER NOT NULL DEFAULT 0
- `last_review_date` TIMESTAMPTZ
- `difficulty_rating` INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5)
- `algorithm_metadata` JSONB DEFAULT '{}'
- `created_at` TIMESTAMPTZ DEFAULT NOW()
- `updated_at` TIMESTAMPTZ DEFAULT NOW()

### 4. generation_statistics
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `total_generated` INTEGER NOT NULL DEFAULT 0
- `total_accepted` INTEGER NOT NULL DEFAULT 0
- `total_manual_created` INTEGER NOT NULL DEFAULT 0
- `last_generation_date` TIMESTAMPTZ
- `created_at` TIMESTAMPTZ DEFAULT NOW()
- `updated_at` TIMESTAMPTZ DEFAULT NOW()

### 5. learning_sessions
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `started_at` TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `completed_at` TIMESTAMPTZ
- `total_cards` INTEGER NOT NULL DEFAULT 0
- `completed_cards` INTEGER NOT NULL DEFAULT 0
- `session_metadata` JSONB DEFAULT '{}'

## Relationships

### One-to-Many Relationships
- **users** → **flashcards**: One user can have many flashcards
- **users** → **learning_progress**: One user can have many learning progress records
- **users** → **generation_statistics**: One user has one statistics record
- **users** → **learning_sessions**: One user can have many learning sessions
- **flashcards** → **learning_progress**: One flashcard can have one learning progress record per user

### Constraints
- `flashcards.user_id` → `users.id` (CASCADE DELETE)
- `learning_progress.user_id` → `users.id` (CASCADE DELETE)
- `learning_progress.flashcard_id` → `flashcards.id` (CASCADE DELETE)
- `generation_statistics.user_id` → `users.id` (CASCADE DELETE)
- `learning_sessions.user_id` → `users.id` (CASCADE DELETE)

## Indexes

### Performance Indexes
- `idx_flashcards_user_created` ON flashcards(user_id, created_at DESC)
- `idx_flashcards_user_ai_generated` ON flashcards(user_id, is_ai_generated)
- `idx_learning_progress_user_next_review` ON learning_progress(user_id, next_review_date)
- `idx_learning_progress_flashcard_user` ON learning_progress(flashcard_id, user_id)
- `idx_learning_sessions_user_started` ON learning_sessions(user_id, started_at DESC)

### Unique Constraints
- `uq_generation_statistics_user` ON generation_statistics(user_id)
- `uq_learning_progress_user_flashcard` ON learning_progress(user_id, flashcard_id)

## Row Level Security (RLS) Policies

### users table
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### flashcards table
```sql
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own flashcards" ON flashcards
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcards" ON flashcards
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcards" ON flashcards
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcards" ON flashcards
    FOR DELETE USING (auth.uid() = user_id);
```

### learning_progress table
```sql
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning progress" ON learning_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning progress" ON learning_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning progress" ON learning_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning progress" ON learning_progress
    FOR DELETE USING (auth.uid() = user_id);
```

### generation_statistics table
```sql
ALTER TABLE generation_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own statistics" ON generation_statistics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own statistics" ON generation_statistics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own statistics" ON generation_statistics
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own statistics" ON generation_statistics
    FOR DELETE USING (auth.uid() = user_id);
```

### learning_sessions table
```sql
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning sessions" ON learning_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning sessions" ON learning_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning sessions" ON learning_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning sessions" ON learning_sessions
    FOR DELETE USING (auth.uid() = user_id);
```

## Triggers

### Updated At Triggers
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at BEFORE UPDATE ON learning_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generation_statistics_updated_at BEFORE UPDATE ON generation_statistics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_sessions_updated_at BEFORE UPDATE ON learning_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Design Decisions

### Security
- **UUID Primary Keys**: Used throughout to prevent sequential ID enumeration attacks
- **Comprehensive RLS**: All tables have RLS enabled with explicit policies
- **CASCADE DELETE**: Ensures GDPR compliance when users delete accounts

### Performance
- **Composite Indexes**: Optimized for user-specific queries (user_id + created_at)
- **JSONB Storage**: Flexible storage for spaced repetition algorithm metadata
- **Simple Schema**: Avoids over-engineering for the 10-user MVP

### Scalability
- **Connection Pooling**: Leverages Supabase's managed infrastructure
- **Efficient Indexing**: Focused on MVP use cases without premature optimization
- **JSONB Flexibility**: Allows for future algorithm enhancements without schema changes

### Data Integrity
- **Foreign Key Constraints**: Ensures referential integrity
- **Check Constraints**: Validates difficulty ratings and other business rules
- **Timestamps**: Consistent timezone handling with TIMESTAMPTZ

## Implementation Notes

1. **Supabase Integration**: Schema designed to work seamlessly with Supabase's built-in authentication
2. **Spaced Repetition**: JSONB columns store algorithm-specific metadata for the "spaced-repetition" npm package
3. **Statistics Tracking**: Simple counters support MVP success metrics (75% acceptance rate, 75% AI usage)
4. **Learning Sessions**: Tracks individual study sessions for progress monitoring
5. **Hard Deletes**: No soft delete functionality as per MVP requirements

## Migration Strategy

1. Create tables in dependency order (users → flashcards → learning_progress → statistics → sessions)
2. Enable RLS and create policies for each table
3. Create indexes after table creation
4. Add triggers for updated_at functionality
5. Insert initial generation_statistics records for existing users
