-- migration: 20250817193200_create_initial_schema.sql
-- description: Creates the initial database schema for the 10x-cards application.
-- This migration sets up the following:
-- 1. `profiles` table for user data.
-- 2. `flashcards` table for flashcard content.
-- 3. `user_flashcard_repetition` table for spaced repetition data.
-- 4. Indexes for performance optimization.
-- 5. Row-Level Security (RLS) policies to protect user data.
-- 6. A trigger to automatically update `updated_at` timestamps.

--
-- create a trigger function to update the `updated_at` column on every update.
--
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;


--
-- profiles table
--
-- stores public user information and links to supabase's `auth.users` table.
--
create table public.profiles (
    id uuid not null default auth.uid() primary key,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    avatar_url text
);

comment on table public.profiles is 'Stores public user information and links to Supabase''s `auth.users` table.';
comment on column public.profiles.id is 'References `auth.users.id`.';

--
-- trigger to update `updated_at` on profile changes.
--
create trigger on_profile_updated
before update on public.profiles
for each row
execute procedure public.handle_updated_at();

--
-- flashcards table
--
-- stores the flashcards created by users.
--
create table public.flashcards (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid not null references public.profiles(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    front text not null,
    back text not null,
    origin text not null default 'manual',
    source_text text
);

comment on table public.flashcards is 'Stores the flashcards created by users.';
comment on column public.flashcards.origin is 'How the flashcard was created (`manual`, `ai-generated`, `ai-edited`).';

--
-- trigger to update `updated_at` on flashcard changes.
--
create trigger on_flashcard_updated
before update on public.flashcards
for each row
execute procedure public.handle_updated_at();

--
-- user_flashcard_repetition table
--
-- manages the spaced repetition schedule for each flashcard and user.
--
create table public.user_flashcard_repetition (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid not null references public.profiles(id) on delete cascade,
    flashcard_id uuid not null references public.flashcards(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    interval integer not null default 0,
    ease_factor real not null default 2.5,
    next_review_date timestamptz not null default now()
);

comment on table public.user_flashcard_repetition is 'Manages the spaced repetition schedule for each flashcard and user.';
comment on column public.user_flashcard_repetition.interval is 'The number of days until the next review.';
comment on column public.user_flashcard_repetition.ease_factor is 'A factor representing how easy the card is for the user.';

--
-- trigger to update `updated_at` on repetition changes.
--
create trigger on_repetition_updated
before update on public.user_flashcard_repetition
for each row
execute procedure public.handle_updated_at();

--
-- indexes for performance
--
create index idx_flashcards_user_id on public.flashcards(user_id);
create index idx_user_flashcard_repetition_user_id on public.user_flashcard_repetition(user_id);
create index idx_user_flashcard_repetition_flashcard_id on public.user_flashcard_repetition(flashcard_id);
create index idx_user_flashcard_repetition_next_review_date on public.user_flashcard_repetition(next_review_date);

--
-- row level security (rls)
--

--
-- enable rls on all tables
--
alter table public.profiles enable row level security;
alter table public.flashcards enable row level security;
alter table public.user_flashcard_repetition enable row level security;

--
-- policies for `profiles` table
--
-- authenticated users can view their own profile.
create policy "allow authenticated users to view their own profile" on public.profiles
for select using (auth.uid() = id);

-- authenticated users can update their own profile.
create policy "allow authenticated users to update their own profile" on public.profiles
for update using (auth.uid() = id);

--
-- policies for `flashcards` table
--
-- authenticated users can view their own flashcards.
create policy "allow authenticated users to view their own flashcards" on public.flashcards
for select using (auth.uid() = user_id);

-- authenticated users can create their own flashcards.
create policy "allow authenticated users to create their own flashcards" on public.flashcards
for insert with check (auth.uid() = user_id);

-- authenticated users can update their own flashcards.
create policy "allow authenticated users to update their own flashcards" on public.flashcards
for update using (auth.uid() = user_id);

-- authenticated users can delete their own flashcards.
create policy "allow authenticated users to delete their own flashcards" on public.flashcards
for delete using (auth.uid() = user_id);

--
-- policies for `user_flashcard_repetition` table
--
-- authenticated users can view their own repetition data.
create policy "allow authenticated users to view their own repetition data" on public.user_flashcard_repetition
for select using (auth.uid() = user_id);

-- authenticated users can create their own repetition data.
create policy "allow authenticated users to create their own repetition data" on public.user_flashcard_repetition
for insert with check (auth.uid() = user_id);

-- authenticated users can update their own repetition data.
create policy "allow authenticated users to update their own repetition data" on public.user_flashcard_repetition
for update using (auth.uid() = user_id);

-- authenticated users can delete their own repetition data.
create policy "allow authenticated users to delete their own repetition data" on public.user_flashcard_repetition
for delete using (auth.uid() = user_id);
