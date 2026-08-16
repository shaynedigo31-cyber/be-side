create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  mood text,
  energy text,
  sleep_quality text,
  sleep_duration integer,
  thoughts text,
  current_need text,
  tags text[],
  note text
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  mood text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  song text,
  image_url text,
  tags text[]
);

create table if not exists public.comfort_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  category text,
  created_at timestamptz default now()
);

create table if not exists public.partner_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  partner_user_id uuid,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.shared_status (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  current_need text,
  mood text,
  custom_message text,
  selected_journal_entry_id uuid,
  is_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  daily_checkin_reminder boolean default false,
  reminder_time text default '20:00',
  journal_reminder boolean default false,
  theme text default 'soft',
  privacy_mode text default 'private',
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.check_ins enable row level security;
alter table public.journal_entries enable row level security;
alter table public.comfort_items enable row level security;
alter table public.partner_connections enable row level security;
alter table public.shared_status enable row level security;
alter table public.user_preferences enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view own check-ins" on public.check_ins for select using (auth.uid() = user_id);
create policy "Users can insert own check-ins" on public.check_ins for insert with check (auth.uid() = user_id);
create policy "Users can update own check-ins" on public.check_ins for update using (auth.uid() = user_id);
create policy "Users can delete own check-ins" on public.check_ins for delete using (auth.uid() = user_id);

create policy "Users can view own journal entries" on public.journal_entries for select using (auth.uid() = user_id);
create policy "Users can insert own journal entries" on public.journal_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own journal entries" on public.journal_entries for update using (auth.uid() = user_id);
create policy "Users can delete own journal entries" on public.journal_entries for delete using (auth.uid() = user_id);

create policy "Users can view own comfort items" on public.comfort_items for select using (auth.uid() = user_id);
create policy "Users can insert own comfort items" on public.comfort_items for insert with check (auth.uid() = user_id);
create policy "Users can update own comfort items" on public.comfort_items for update using (auth.uid() = user_id);
create policy "Users can delete own comfort items" on public.comfort_items for delete using (auth.uid() = user_id);

create policy "Users can view own partner connections" on public.partner_connections for select using (auth.uid() = user_id);
create policy "Users can insert own partner connections" on public.partner_connections for insert with check (auth.uid() = user_id);
create policy "Users can update own partner connections" on public.partner_connections for update using (auth.uid() = user_id);
create policy "Users can delete own partner connections" on public.partner_connections for delete using (auth.uid() = user_id);

create policy "Users can view own shared status" on public.shared_status for select using (auth.uid() = user_id);
create policy "Users can insert own shared status" on public.shared_status for insert with check (auth.uid() = user_id);
create policy "Users can update own shared status" on public.shared_status for update using (auth.uid() = user_id);
create policy "Users can delete own shared status" on public.shared_status for delete using (auth.uid() = user_id);

create policy "Users can view own preferences" on public.user_preferences for select using (auth.uid() = user_id);
create policy "Users can insert own preferences" on public.user_preferences for insert with check (auth.uid() = user_id);
create policy "Users can update own preferences" on public.user_preferences for update using (auth.uid() = user_id);
create policy "Users can delete own preferences" on public.user_preferences for delete using (auth.uid() = user_id);
