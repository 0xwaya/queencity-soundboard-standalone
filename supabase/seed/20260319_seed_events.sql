-- Seed events for May/June 2026 Latin Acoustic Series
-- Safe to re-run: deletes matching titles before insert.

begin;

-- Ensure Madison Theater exists
insert into public.venues (name, address, city, state, capacity)
values ('Madison Theater', '730 Madison Ave', 'Covington', 'KY', 1200)
on conflict do nothing;

-- Clear prior seed rows if they exist
delete from public.events
where title in (
  'Caracas Unplugged: After Dark Sessions',
  '90''s Hiphop Merengue: Proyecto Uno Live',
  'Noche Acústica: Leyendas y Velas',
  'Bolero Nights: After Dark Sessions',
  'Alma Acústica: Intimate Sessions',
  'Merenhouse Unplugged: After Dark Energy Session'
);

-- Insert seed events (published)
insert into public.events (title, description, artist_name, hero_image_url, event_date, venue_id, status, ticket_url)
select
  seed_events.title,
  seed_events.description,
  seed_events.artist_name,
  seed_events.hero_image_url,
  seed_events.event_date,
  v.id,
  seed_events.status,
  seed_events.ticket_url
from (
  values
    (
      '90''s Hiphop Merengue: Proyecto Uno Live',
      'Proyecto Uno confirmed interest in performing in Cincinnati. Date TBD for a 90''s merengue hiphop night.',
      'Proyecto Uno',
      '/proyecto-uno-live.jpg',
      '2026-12-31 20:00:00-05'::timestamptz,
      'published',
      null
    ),
    (
      'Noche Acústica: Leyendas y Velas',
      'Legendary songs, warm strings, and a velvet-lit night of classics.',
      'José Feliciano',
      null,
      '2026-05-23 20:00:00-04'::timestamptz,
      'published',
      null
    ),
    (
      'Bolero Nights: After Dark Sessions',
      'Romantic boleros, slow-burn grooves, and a close-up theater experience.',
      'Rudy La Escala',
      null,
      '2026-05-30 20:00:00-04'::timestamptz,
      'published',
      null
    ),
    (
      'Alma Acústica: Intimate Sessions',
      'Soulful, stripped-down sets with candlelight and premium sound.',
      'Elena Rose',
      null,
      '2026-06-06 20:00:00-04'::timestamptz,
      'published',
      null
    )
) as seed_events(title, description, artist_name, hero_image_url, event_date, status, ticket_url)
join public.venues v on v.name = 'Madison Theater';

commit;
