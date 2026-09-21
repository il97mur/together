-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.globe_stats (
  id int primary key,
  record int not null default 0
);

insert into public.globe_stats (id, record)
values (1, 0)
on conflict (id) do nothing;

alter table public.globe_stats enable row level security;

create policy "anyone can read the record"
  on public.globe_stats for select
  using (true);

-- the app only ever writes a larger value (see the .lt() filter in web/index.html);
-- this policy just allows the write, the "only increase" guarantee is enforced there
create policy "anyone can update the record"
  on public.globe_stats for update
  using (true)
  with check (true);

-- push UPDATEs on this table to subscribed clients in realtime
alter publication supabase_realtime add table public.globe_stats;
