<!DOCTYPE html>![](https://assets-v2.circle.so/81hops7bxtyjegg2j02ykeuxu3bp)
## Wprowadzenie

W tej lekcji rozpoczniemy praktykę ze standardowym workflow pracy z AI, które pozwala osiągać jakościowe efekty w każdej warstwie aplikacji: bazie danych, API oraz UI. Co ważne, będą to efekty zgodne z wymaganiami biznesowymi (zamiast realizacji opartych o przypadek i szczęście jak przy Vibe Codingu). Proces wygląda następująco:

Sesja planistyczna (db/api/ui) z podsumowaniem

Definiowanie wysokopoziomowego planu (db/api/ui)

Generowanie szczegółowego planu implementacji endpointa/widoku (api/ui)

Wdrożenie planu (db/api/ui)

W ten sposób gromadzimy jakościowy kontekst, który sprawia że sama implementacja przechodzi dużo szybciej i sprawniej.

Co ważne, efekty pracy kumulują się na przestrzeni warstw - dobrze wykonana praca na poziomie bazy danych procentuje przy API i UI. Przejdziemy przez cały proces end-to-end, gdzie zobaczysz zarówno silne jak i słabe strony obecnie dostępnych LLMów.

Mamy silne przekonanie, że sam proces przetrwa próbę czasu, a wraz ze wzrostem możliwości modeli będzie tylko prostszy i możliwy do przeprowadzenia na co raz bardziej złożonych projektach.

Na filmach zobaczysz pracę na przykładowym projekcie przeprogramowani/10x-cards.

## Wprowadzenie do Supabase
![](https://assets-v2.circle.so/vey458cv8u19sz3mwi65aegbs85b)
Supabase to open-source’owa platforma BaaS (Backend as a Service) oparta na bazie danych Postgres. Umożliwia szybkie tworzenie, zarządzanie i skalowanie backendu aplikacji bez konieczności budowania całej infrastruktury od podstaw. Dzięki swojej architekturze open-source, Supabase oferuje elastyczność, bezpieczeństwo i możliwość modyfikacji, co czyni ją idealnym rozwiązaniem zarówno dla małych projektów, jak i rozbudowanych systemów produkcyjnych.
![](https://assets-v2.circle.so/k3p1vvuwvgmpdvfjnpe31tp5mn4b)
Integracja z technologiami

Jednym z kluczowych atutów Supabase jest jego wszechstronna integracja z wieloma technologiami. Oto kilka przykładów:

Frameworki frontendowe: Supabase doskonale współpracuje z popularnymi frameworkami, takimi jak Next.js, Astro i wiele innych (Poradniki integracji są dostępne w dokumentacji)

Narzędzia do zarządzania bazami danych: Platforma umożliwia korzystanie z narzędzi takich jak pgAdmin, co ułatwia monitorowanie i administrację bazą danych. Samo Supabase dostarcza świetne “Supabase Studio”, które daje nam pełen wgląd w bazę danych i możliwość jej modyfikacji.

Narzędzia DevOps: Supabase integruje się z rozwiązaniami CI/CD takimi jak Github Actions, co pozwala na automatyzację procesów wdrażania aplikacji oraz zarządzania infrastrukturą.

Ile trzeba zapłacić za to cudo?

Supabase oferuje elastyczny i atrakcyjny model cenowy, który sprawia, że jest to idealne rozwiązanie zarówno na potrzeby projektów edukacyjnych, jak i aplikacji produkcyjnych. Możemy pracować z Supabase w dwóch trybach:

Lokalnie: Możesz uruchomić Supabase za darmo na własnym komputerze, co pozwala na pełną kontrolę nad środowiskiem oraz szybki i bezpieczny development projektów z AI.

Supabase Cloud: Dla zastosowań produkcyjnych Supabase oferuje własną infrastrukturę w chmurze. Dostępny jest atrakcyjny darmowy plan, który umożliwia korzystanie z większości funkcjonalności platformy, idealny na początek projektu. Szczegóły znajdziesz tutaj.

Jak zacząć z Supabase?

Rozpoczęcie pracy z Supabase jest proste i wymaga jedynie kilku podstawowych kroków:

Instalacja Docker Desktop: Pierwszym krokiem jest instalacja Docker Desktop, który pozwoli na  uruchomienie środowiska lokalnego, niezbędnego do pracy z Supabase.

Instalacja Supabase CLI: Kroki dla Twojego systemu i środowiska znajdziesz w dokumentacji.

W repozytorium projektu uruchom następnie komendy:

supabase init

supabase start

W ten sposób utworzysz lokalną instancję Supabase i jesteś gotowy do pracy nad bazą danych i API!
![](https://assets-v2.circle.so/4pix7bte8iiu7mci2c4bffh60jzx)
## Sesja planowania bazy danych

Podczas sesji planistycznej wykorzystałem następujący prompt (db-planning-buddy). Należy go wykorzystać z modelem reasoningowym (o3-mini, o1, Claude 3.7 Sonnet Thinking lub Gemini 2.5 Pro):

```
Jesteś asystentem AI, którego zadaniem jest pomoc w zaplanowaniu schematu bazy danych w PostgreSQL dla MVP (Minimum Viable Product) na podstawie dostarczonych informacji. Twoim celem jest wygenerowanie listy pytań i zaleceń, które zostaną wykorzystane w kolejnym promptowaniu do utworzenia schematu bazy danych, relacji i zasad bezpieczeństwa na poziomie wierszy (RLS).

Prosimy o uważne zapoznanie się z poniższymi informacjami:

&lt;product_requirements&gt;
{{prd}} &lt;- zamień na referencję do @prd.md
&lt;/product_requirements&gt;

&lt;tech_stack&gt;
{{tech-stack}} &lt;- zamień na referencję do @tech-stack.md
&lt;/tech_stack&gt;

Przeanalizuj dostarczone informacje, koncentrując się na aspektach istotnych dla projektowania bazy danych. Rozważ następujące kwestie:

1. Zidentyfikuj kluczowe encje i ich atrybuty na podstawie wymagań produktu.
2. Określ potencjalne relacje między jednostkami.
3. Rozważ typów danych i ograniczeń, które mogą być konieczne.
4. Pomyśl o skalowalności i wpływie na wydajność.
5. Oceń wymagania bezpieczeństwa i ich wpływ na projekt bazy danych.
6. Rozważ wszelkie konkretne funkcje PostgreSQL, które mogą być korzystne dla projektu.

Na podstawie analizy wygeneruj listę pytań i zaleceń. Powinny one dotyczyć wszelkich niejasności, potencjalnych problemów lub obszarów, w których potrzeba więcej informacji, aby stworzyć skuteczny schemat bazy danych. Rozważ pytania dotyczące:

1. Relacje i kardynalność jednostek
2. Typy danych i ograniczenia
3. Strategie indeksowania
4. Partycjonowanie (jeśli dotyczy)
5. Wymagania bezpieczeństwa na poziomie wierszy
6. Rozważania dotyczące wydajności
7. Kwestie skalowalności
8. Integralność i spójność danych

Dane wyjściowe powinny mieć następującą strukturę:

&lt;database_planning_output&gt;
&lt;pytania&gt;
[Wymień tutaj swoje pytania, ponumerowane]
&lt;/pytania&gt;

&lt;rekomendacje&gt;
[Wymień tutaj swoje zalecenia, ponumerowane]
&lt;/rekomendacje&gt;
&lt;/database_planning_output&gt;

Pamiętaj, że Twoim celem jest dostarczenie kompleksowej listy pytań i zaleceń, które pomogą w stworzeniu solidnego schematu bazy danych PostgreSQL dla MVP. Skoncentruj się na jasności, trafności i dokładności swoich wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.

Kontynuuj ten proces, generując nowe pytania i rekomendacje w oparciu o przekazany kontekst i odpowiedzi użytkownika, dopóki użytkownik wyraźnie nie poprosi o podsumowanie.

Pamiętaj, aby skupić się na jasności, trafności i dokładności wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.
```

Do podsumowania sesji, wykorzystałem następujący prompt:

```
{{latest-round-answers}} &lt;- lista odpowiedzi na drugą rundę pytań

---

Jesteś asystentem AI, którego zadaniem jest podsumowanie rozmowy na temat planowania bazy danych dla MVP i przygotowanie zwięzłego podsumowania dla następnego etapu rozwoju. W historii konwersacji znajdziesz następujące informacje:
1. Dokument wymagań produktu (PRD)
2. Informacje o stacku technologicznym
3. Historia rozmów zawierająca pytania i odpowiedzi
4. Zalecenia dotyczące modelu

Twoim zadaniem jest:
1. Podsumować historii konwersacji, koncentrując się na wszystkich decyzjach związanych z planowaniem bazy danych.
2. Dopasowanie zaleceń modelu do odpowiedzi udzielonych w historii konwersacji. Zidentyfikuj, które zalecenia są istotne w oparciu o dyskusję.
3. Przygotuj szczegółowe podsumowanie rozmowy, które obejmuje:
   a. Główne wymagania dotyczące schematu bazy danych
   b. Kluczowe encje i ich relacje
   c. Ważne kwestie dotyczące bezpieczeństwa i skalowalności
   d. Wszelkie nierozwiązane kwestie lub obszary wymagające dalszego wyjaśnienia
4. Sformatuj wyniki w następujący sposób:

&lt;conversation_summary&gt;
&lt;decisions&gt;
[Wymień decyzje podjęte przez użytkownika, ponumerowane].
&lt;/decisions&gt;

&lt;matched_recommendations&gt;
[Lista najistotniejszych zaleceń dopasowanych do rozmowy, ponumerowanych]
&lt;/matched_recommendations&gt;

&lt;database_planning_summary&gt; [Podsumowanie planowania bazy danych]
[Podaj szczegółowe podsumowanie rozmowy, w tym elementy wymienione w kroku 3].
&lt;/database_planning_summary&gt;

&lt;unresolved_issues&gt;
[Wymień wszelkie nierozwiązane kwestie lub obszary wymagające dalszych wyjaśnień, jeśli takie istnieją]
&lt;/unresolved_issues&gt;
&lt;/conversation_summary&gt;

Końcowy wynik powinien zawierać tylko treść w formacie markdown. Upewnij się, że Twoje podsumowanie jest jasne, zwięzłe i zapewnia cenne informacje dla następnego etapu planowania bazy danych.
```

Podsumowanie sesji planistycznej następnie kopiujemy do nowego wątku, w którym utworzymy dokument opisujący schemat bazy danych: db-plan.md.

## Definiowanie schematu bazy danych db-plan.md

Do zdefiniowania db-plan.md wykorzystałem następujący prompt przystosowany do modeli reasoningowych:

```
Jesteś architektem baz danych, którego zadaniem jest stworzenie schematu bazy danych PostgreSQL na podstawie informacji dostarczonych z sesji planowania, dokumentu wymagań produktu (PRD) i stacku technologicznym. Twoim celem jest zaprojektowanie wydajnej i skalowalnej struktury bazy danych, która spełnia wymagania projektu.

1. &lt;prd&gt;
{{prd}} &lt;- zamień na referencję do @prd.md
&lt;/prd&gt;

Jest to dokument wymagań produktu, który określa cechy, funkcjonalności i wymagania projektu.

2. &lt;session_notes&gt;
{{session-notes}} &lt;- wklej podsumowanie sesji planistycznej
&lt;/session_notes&gt;

Są to notatki z sesji planowania schematu bazy danych. Mogą one zawierać ważne decyzje, rozważania i konkretne wymagania omówione podczas spotkania.

3. &lt;tech_stack&gt;
{{tech-stack}} &lt;- zamień na referencje do tech-stack.md 
&lt;/tech_stack&gt;

Opisuje stack technologiczny, który zostanie wykorzystany w projekcie, co może wpłynąć na decyzje dotyczące projektu bazy danych.

Wykonaj następujące kroki, aby utworzyć schemat bazy danych:

1. Dokładnie przeanalizuj notatki z sesji, identyfikując kluczowe jednostki, atrybuty i relacje omawiane podczas sesji planowania.
2. Przejrzyj PRD, aby upewnić się, że wszystkie wymagane funkcje i funkcjonalności są obsługiwane przez schemat bazy danych.
3. Przeanalizuj stack technologiczny i upewnij się, że projekt bazy danych jest zoptymalizowany pod kątem wybranych technologii.

4. Stworzenie kompleksowego schematu bazy danych, który obejmuje
   a. Tabele z odpowiednimi nazwami kolumn i typami danych
   b. Klucze podstawowe i klucze obce
   c. Indeksy poprawiające wydajność zapytań
   d. Wszelkie niezbędne ograniczenia (np. unikalność, not null)

5. Zdefiniuj relacje między tabelami, określając kardynalność (jeden-do-jednego, jeden-do-wielu, wiele-do-wielu) i wszelkie tabele łączące wymagane dla relacji wiele-do-wielu.

6. Opracowanie zasad PostgreSQL dla zabezpieczeń na poziomie wiersza (RLS), jeśli dotyczy, w oparciu o wymagania określone w notatkach z sesji lub PRD.

7. Upewnij się, że schemat jest zgodny z najlepszymi praktykami projektowania baz danych, w tym normalizacji do odpowiedniego poziomu (zwykle 3NF, chyba że denormalizacja jest uzasadniona ze względu na wydajność).

Ostateczny wynik powinien mieć następującą strukturę:
```markdown
1. Lista tabel z ich kolumnami, typami danych i ograniczeniami
2. Relacje między tabelami
3. Indeksy
4. Zasady PostgreSQL (jeśli dotyczy)
5. Wszelkie dodatkowe uwagi lub wyjaśnienia dotyczące decyzji projektowych
```

W odpowiedzi należy podać tylko ostateczny schemat bazy danych w formacie markdown, który zapiszesz w pliku .ai/db-plan.md bez uwzględniania procesu myślowego lub kroków pośrednich. Upewnij się, że schemat jest kompleksowy, dobrze zorganizowany i gotowy do wykorzystania jako podstawa do tworzenia migracji baz danych.
```

Ważne: Jeżeli korzystasz z Supabase, w db-plan.md należy wprost napisać że tabela “users” będzie obsługiwana przez Supabase Auth, jak na poniższym screenie. W innym przypadku migracja utworzy osobną tabelę public.users, która nie wniesie wszystkich dobrodziejstw dostępnych w Supabase Auth.
![](https://assets-v2.circle.so/2e4eg7ha4pmueul9oj8wvhwrh68a)
## Wdrażanie bazy danych poprzez migracje

Do wdrożenia migracji wykorzystałem referencję do utworzonego przed chwilą @db-plan.md wraz z helperem z Supabase (AI Prompts) do migracji:

```
# Database: Create migration

You are a Postgres Expert who loves creating secure database schemas.

This project uses the migrations provided by the Supabase CLI.

## Creating a migration file

Given the context of the user&#39;s message, create a database migration file inside the folder `supabase/migrations/`.

The file MUST following this naming convention:

The file MUST be named in the format `YYYYMMDDHHmmss_short_description.sql` with proper casing for months, minutes, and seconds in UTC time:

1. `YYYY` - Four digits for the year (e.g., `2024`).
2. `MM` - Two digits for the month (01 to 12).
3. `DD` - Two digits for the day of the month (01 to 31).
4. `HH` - Two digits for the hour in 24-hour format (00 to 23).
5. `mm` - Two digits for the minute (00 to 59).
6. `ss` - Two digits for the second (00 to 59).
7. Add an appropriate description for the migration.

For example:

```
20240906123045_create_profiles.sql
```

## SQL Guidelines

Write Postgres-compatible SQL code for Supabase migration files that:

- Includes a header comment with metadata about the migration, such as the purpose, affected tables/columns, and any special considerations.
- Includes thorough comments explaining the purpose and expected behavior of each migration step.
- Write all SQL in lowercase.
- Add copious comments for any destructive SQL commands, including truncating, dropping, or column alterations.
- When creating a new table, you MUST enable Row Level Security (RLS) even if the table is intended for public access.
- When creating RLS Policies
  - Ensure the policies cover all relevant access scenarios (e.g. select, insert, update, delete) based on the table&#39;s purpose and data sensitivity.
  - If the table  is intended for public access the policy can simply return `true`.
  - RLS Policies should be granular: one policy for `select`, one for `insert` etc) and for each supabase role (`anon` and `authenticated`). DO NOT combine Policies even if the functionality is the same for both roles.
  - Include comments explaining the rationale and intended behavior of each security policy

The generated SQL code should be production-ready, well-documented, and aligned with Supabase&#39;s best practices.
```

### Widok schematu bazy w Supabase Studio Schema Visualizer

Efektem końcowym pracy jest bazy danych o następującym schemacie:
![](https://assets-v2.circle.so/pix1eojgb859vuy95buzshgouawq)
Tabelę auth.users konfiguruje dla nas automatycznie Supabase, i bardzo dobrze.

O to podgląd całego schematu auth, który jest dostępny w Database &gt; Schema Visualizer:
![](https://assets-v2.circle.so/wdq8ibte4ykmiepwpkqymj3xp0bt)
Aby dodać nowego użytkownika wystarczy przejść do widoku Authentication &gt; Users i skorzystać z przycisku “Add user”. Jego ID wykorzystamy w kolejnej lekcji, a pełną obsługę Autha dodamy w drugim module.
![](https://assets-v2.circle.so/f6ljxf3mk0qe4e6m3e46pjw27scl)
Więcej informacji o Supabase Auth znajdziesz w dedykowanym rozdziale dokumentacji.

## 🏁 Podsumowanie

W tej lekcji poznaliśmy standardowy workflow pracy z AI:

Proces czterostopniowy - efektywny przepływ pracy z AI obejmuje sesję planistyczną, definiowanie wysokopoziomowego planu, generowanie szczegółowego planu implementacji oraz wdrożenie, co zapewnia jakościowe efekty zgodne z wymaganiami biznesowymi.

Sesja planistyczna - wykorzystanie dedykowanych promptów z modelami reasoningowymi do zgromadzenia pytań, rekomendacji i podsumowania kluczowych decyzji projektowych dla bazy danych.

Definiowanie schematu - transformacja wyników sesji planistycznej w konkretny plan bazy danych (db-plan.md) zawierający tabele, relacje, indeksy i zasady bezpieczeństwa na poziomie wierszy (RLS).

Wdrożenie poprzez migracje - implementacja schematu bazy danych za pomocą migracji w Supabase, z wykorzystaniem specjalistycznych promptów generujących odpowiednie pliki SQL.

Supabase jako platforma - wykorzystanie open-source&#39;owej platformy BaaS opartej na PostgreSQL, która integruje się z popularnymi frameworkami, oferuje elastyczny plan darmowy i może być uruchamiana zarówno lokalnie jak i w chmurze.

Pamiętaj, że efekty pracy kumulują się na przestrzeni warstw - dobrze wykonana praca na poziomie bazy danych procentuje przy API i UI. Kluczowe jest gromadzenie jakościowego kontekstu, który sprawia że sama implementacja przechodzi szybciej i sprawniej.

## 👨‍💻 Ćwiczenia praktyczne

Zadanie 1: Przeprowadzenie sesji planistycznej bazy danychCel: Wygenerowanie kompleksowej listy pytań, rekomendacji i podsumowania dla schematu bazy danych.Instrukcje:

Wykorzystaj prompt z sekcji &quot;Sesja planowania bazy danych&quot; dopasowując go do swojego projektu

Przeprowadź minimum dwie rundy pytań z modelem reasoningowym (Claude 3.7 Sonnet Thinking, o3-mini, o1 lub Gemini 2.5 Pro)

Zapisz podsumowanie do wykorzystania w kolejnym zadaniu

Ważne: Upewnij się, że sesja planistyczna obejmuje wszystkie aspekty wymagane przez Twój projekt, w tym encje, relacje, bezpieczeństwo i skalowalność.

Zadanie 2: Definiowanie schematu bazy danychCel: Stworzenie kompleksowego planu schematu bazy danych na podstawie wyników sesji planistycznej.Instrukcje:

Wykorzystaj prompt z sekcji &quot;Definiowanie schematu bazy danych db-plan.md&quot;

Przekaż modelowi PRD, notatki z sesji planistycznej oraz informacje o stacku technologicznym

Wygeneruj schemat bazy danych i poddaj go rewizji

Zapisz wygenerowany schemat jako .ai/db-plan.md

Ważne: Przeanalizuj otrzymany plan pod kątem zgodności z wymaganiami projektu i najlepszymi praktykami projektowania baz danych.

Zadanie 3: Wdrożenie bazy danych poprzez migracjeCel: Praktyczna implementacja zaprojektowanego schematu bazy danych.Instrukcje:

Jeśli korzystasz z Supabase:

Wykorzystaj prompt z sekcji &quot;Wdrażanie bazy danych poprzez migracje&quot;

Wygeneruj pliki migracji zgodne z konwencją nazewnictwa YYYYMMDDHHmmss_short_description.sql

Umieść pliki w katalogu supabase/migrations/

Jeśli korzystasz z innego systemu:

Dostosuj format migracji do wykorzystywanego narzędzia

Upewnij się, że migracje zawierają odpowiednie komentarze i mechanizmy bezpieczeństwa

Uruchom migracje w środowisku deweloperskim

Zweryfikuj poprawność schematu w narzędziu do wizualizacji (np. Supabase Studio Schema Visualizer)
![](https://assets-v2.circle.so/xldwm47ax45zdgpk0oh5iam9h29h)