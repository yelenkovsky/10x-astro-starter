-- Migration: Disable RLS for Production
-- Description: Disables Row Level Security on all tables for production deployment
-- WARNING: This removes user data isolation - users can access all data
-- Author: AI Assistant
-- Date: 2024-12-20

-- DISABLE RLS ON ALL TABLES
-- ⚠️  WARNING: This removes data isolation between users
-- ⚠️  All authenticated users will be able to see all data

-- Disable RLS on users table
alter table public.users disable row level security;

-- Disable RLS on flashcards table
alter table public.flashcards disable row level security;

-- Disable RLS on learning_progress table
alter table public.learning_progress disable row level security;

-- Disable RLS on generation_statistics table
alter table public.generation_statistics disable row level security;

-- Disable RLS on learning_sessions table
alter table public.learning_sessions disable row level security;

-- Drop all RLS policies since they're no longer needed
drop policy if exists "Users can view own profile" on public.users;
drop policy if exists "Users can update own profile" on public.users;

drop policy if exists "Users can view own flashcards" on public.flashcards;
drop policy if exists "Users can insert own flashcards" on public.flashcards;
drop policy if exists "Users can update own flashcards" on public.flashcards;
drop policy if exists "Users can delete own flashcards" on public.flashcards;

drop policy if exists "Users can view own learning progress" on public.learning_progress;
drop policy if exists "Users can insert own learning progress" on public.learning_progress;
drop policy if exists "Users can update own learning progress" on public.learning_progress;
drop policy if exists "Users can delete own learning progress" on public.learning_progress;

drop policy if exists "Users can view own statistics" on public.generation_statistics;
drop policy if exists "Users can insert own statistics" on public.generation_statistics;
drop policy if exists "Users can update own statistics" on public.generation_statistics;
drop policy if exists "Users can delete own statistics" on public.generation_statistics;

drop policy if exists "Users can view own learning sessions" on public.learning_sessions;
drop policy if exists "Users can insert own learning sessions" on public.learning_sessions;
drop policy if exists "Users can update own learning sessions" on public.learning_sessions;
drop policy if exists "Users can delete own learning sessions" on public.learning_sessions;

-- Grant full access to authenticated users
grant all privileges on all tables in schema public to authenticated;
grant all privileges on all sequences in schema public to authenticated;
grant all privileges on all functions in schema public to authenticated;

-- Grant read access to anon users (if needed)
grant select on all tables in schema public to anon;

-- ALTERNATIVE APPROACH (COMMENTED OUT):
-- If you want to maintain security but make it more permissive, uncomment this section:

/*
-- Instead of disabling RLS completely, you could create more permissive policies:

-- Allow users to view all flashcards (but still maintain ownership for modifications)
create policy "Users can view all flashcards" on public.flashcards
    for select using (true);

create policy "Users can modify own flashcards" on public.flashcards
    for all using (auth.uid() = user_id);

-- Allow users to view all learning progress (but maintain ownership for modifications)
create policy "Users can view all learning progress" on public.learning_progress
    for select using (true);

create policy "Users can modify own learning progress" on public.learning_progress
    for all using (auth.uid() = user_id);

-- Allow users to view all statistics (but maintain ownership for modifications)
create policy "Users can view all statistics" on public.generation_statistics
    for select using (true);

create policy "Users can modify own statistics" on public.generation_statistics
    for all using (auth.uid() = user_id);

-- Allow users to view all learning sessions (but maintain ownership for modifications)
create policy "Users can view all learning sessions" on public.learning_sessions
    for select using (true);

create policy "Users can modify own learning sessions" on public.learning_sessions
    for all using (auth.uid() = user_id);
*/
