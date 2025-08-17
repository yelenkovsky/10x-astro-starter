-- Migration: Create 10x-cards MVP Database Schema
-- Description: Initial setup for flashcard application with spaced repetition learning
-- Tables: users, flashcards, learning_progress, generation_statistics, learning_sessions
-- Author: AI Assistant
-- Date: 2024-12-20

-- Enable UUID extension for primary keys
create extension if not exists "uuid-ossp";

-- 1. Create users table (extends Supabase auth.users)
create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    email varchar(255) not null unique,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Create flashcards table
create table if not exists public.flashcards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    front varchar(500) not null,
    back varchar(500) not null,
    is_ai_generated boolean not null default false,
    is_accepted boolean not null default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 3. Create learning_progress table
create table if not exists public.learning_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    flashcard_id uuid not null references public.flashcards(id) on delete cascade,
    next_review_date timestamptz not null default now(),
    interval_days integer not null default 1,
    ease_factor decimal(4,3) not null default 2.5,
    review_count integer not null default 0,
    last_review_date timestamptz,
    difficulty_rating integer check (difficulty_rating >= 1 and difficulty_rating <= 5),
    algorithm_metadata jsonb default '{}',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 4. Create generation_statistics table
create table if not exists public.generation_statistics (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    total_generated integer not null default 0,
    total_accepted integer not null default 0,
    total_manual_created integer not null default 0,
    last_generation_date timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 5. Create learning_sessions table
create table if not exists public.learning_sessions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    started_at timestamptz not null default now(),
    completed_at timestamptz,
    total_cards integer not null default 0,
    completed_cards integer not null default 0,
    session_metadata jsonb default '{}'
);

-- Create performance indexes
create index if not exists idx_flashcards_user_created on public.flashcards(user_id, created_at desc);
create index if not exists idx_flashcards_user_ai_generated on public.flashcards(user_id, is_ai_generated);
create index if not exists idx_learning_progress_user_next_review on public.learning_progress(user_id, next_review_date);
create index if not exists idx_learning_progress_flashcard_user on public.learning_progress(flashcard_id, user_id);
create index if not exists idx_learning_sessions_user_started on public.learning_sessions(user_id, started_at desc);

-- Create unique constraints
create unique index if not exists uq_generation_statistics_user on public.generation_statistics(user_id);
create unique index if not exists uq_learning_progress_user_flashcard on public.learning_progress(user_id, flashcard_id);

-- Enable Row Level Security (RLS) on all tables
alter table public.users enable row level security;
alter table public.flashcards enable row level security;
alter table public.learning_progress enable row level security;
alter table public.generation_statistics enable row level security;
alter table public.learning_sessions enable row level security;

-- RLS Policies for users table
-- Users can view their own profile
create policy "Users can view own profile" on public.users
    for select using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile" on public.users
    for update using (auth.uid() = id);

-- RLS Policies for flashcards table
-- Users can view their own flashcards
create policy "Users can view own flashcards" on public.flashcards
    for select using (auth.uid() = user_id);

-- Users can insert their own flashcards
create policy "Users can insert own flashcards" on public.flashcards
    for insert with check (auth.uid() = user_id);

-- Users can update their own flashcards
create policy "Users can update own flashcards" on public.flashcards
    for update using (auth.uid() = user_id);

-- Users can delete their own flashcards
create policy "Users can delete own flashcards" on public.flashcards
    for delete using (auth.uid() = user_id);

-- RLS Policies for learning_progress table
-- Users can view their own learning progress
create policy "Users can view own learning progress" on public.learning_progress
    for select using (auth.uid() = user_id);

-- Users can insert their own learning progress
create policy "Users can insert own learning progress" on public.learning_progress
    for insert with check (auth.uid() = user_id);

-- Users can update their own learning progress
create policy "Users can update own learning progress" on public.learning_progress
    for update using (auth.uid() = user_id);

-- Users can delete their own learning progress
create policy "Users can delete own learning progress" on public.learning_progress
    for delete using (auth.uid() = user_id);

-- RLS Policies for generation_statistics table
-- Users can view their own statistics
create policy "Users can view own statistics" on public.generation_statistics
    for select using (auth.uid() = user_id);

-- Users can insert their own statistics
create policy "Users can insert own statistics" on public.generation_statistics
    for insert with check (auth.uid() = user_id);

-- Users can update their own statistics
create policy "Users can update own statistics" on public.generation_statistics
    for update using (auth.uid() = user_id);

-- Users can delete their own statistics
create policy "Users can delete own statistics" on public.generation_statistics
    for delete using (auth.uid() = user_id);

-- RLS Policies for learning_sessions table
-- Users can view their own learning sessions
create policy "Users can view own learning sessions" on public.learning_sessions
    for select using (auth.uid() = user_id);

-- Users can insert their own learning sessions
create policy "Users can insert own learning sessions" on public.learning_sessions
    for insert with check (auth.uid() = user_id);

-- Users can update their own learning sessions
create policy "Users can update own learning sessions" on public.learning_sessions
    for update using (auth.uid() = user_id);

-- Users can delete their own learning sessions
create policy "Users can delete own learning sessions" on public.learning_sessions
    for delete using (auth.uid() = user_id);

-- Create function for updating updated_at timestamps
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

-- Create triggers for updated_at functionality
create trigger update_flashcards_updated_at 
    before update on public.flashcards
    for each row execute function public.update_updated_at_column();

create trigger update_learning_progress_updated_at 
    before update on public.learning_progress
    for each row execute function public.update_updated_at_column();

create trigger update_generation_statistics_updated_at 
    before update on public.generation_statistics
    for each row execute function public.update_updated_at_column();

create trigger update_learning_sessions_updated_at 
    before update on public.learning_sessions
    for each row execute function public.update_updated_at_column();

-- Insert initial generation_statistics record for existing users (if any)
-- This ensures every user has a statistics record
insert into public.generation_statistics (user_id, total_generated, total_accepted, total_manual_created)
select id, 0, 0, 0
from public.users
where not exists (
    select 1 from public.generation_statistics gs where gs.user_id = users.id
);

-- Grant necessary permissions to authenticated users
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;
grant all on all functions in schema public to authenticated;

-- Grant permissions to anon users (if needed for public access)
grant usage on schema public to anon;
grant select on all tables in schema public to anon;
