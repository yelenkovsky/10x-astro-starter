<!DOCTYPE html>![](https://assets-v2.circle.so/6zx2ddzb48h22ta5x7znowvpdy68)
W tej lekcji zajmiemy się warstwą REST API zgodnie z procesem, który poznałeś w poprzedniej lekcji. Dodatkowo poznasz workflow 3x3, który zapewnia świetny balans pomiędzy sprawczością agenta a kontrolą i code review programisty.

## Inicjalizacja Supabase w warstwie API

Aby wygenerować typy database.types.ts na podstawie schematu bazy danych, wykorzystałem komendę Supabase CLI:

supabase gen types typescript --local &gt; src/db/database.types.tsDo inicjalizacji Supabase w projekcie opartym o Astro wykorzystałem następujący przepis dla agenta:

```
# Supabase Astro Initialization

This document provides a reproducible guide to create the necessary file structure for integrating Supabase with your Astro project.

## Prerequisites

- Your project should use Astro 5, TypeScript 5, React 19, and Tailwind 4.
- Install the `@supabase/supabase-js` package.
- Ensure that `/supabase/config.toml` exists
- Ensure that a file `/src/db/database.types.ts` exists and contains the correct type definitions for your database.

IMPORTANT: Check prerequisites before perfoming actions below. If they&#39;re not met, stop and ask a user for the fix.

## File Structure and Setup

### 1. Supabase Client Initialization

Create the file `/src/db/supabase.client.ts` with the following content:

```ts
import { createClient } from &#39;@supabase/supabase-js&#39;;

import type { Database } from &#39;../db/database.types.ts&#39;;

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient&lt;Database&gt;(supabaseUrl, supabaseAnonKey);
```

This file initializes the Supabase client using the environment variables `SUPABASE_URL` and `SUPABASE_KEY`.

### 2. Middleware Setup

Create the file `/src/middleware/index.ts` with the following content:

```ts
import { defineMiddleware } from &#39;astro:middleware&#39;;

import { supabaseClient } from &#39;../db/supabase.client.ts&#39;;

export const onRequest = defineMiddleware((context, next) =&gt; {
  context.locals.supabase = supabaseClient;
  return next();
});
```

This middleware adds the Supabase client to the Astro context locals, making it available throughout your application.

### 3. TypeScript Environment Definitions

Create the file `src/env.d.ts` with the following content:

```ts
/// &lt;reference types=&quot;astro/client&quot; /&gt;

import type { SupabaseClient } from &#39;@supabase/supabase-js&#39;;
import type { Database } from &#39;./db/database.types.ts&#39;;

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient&lt;Database&gt;;
    }
  }
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

This file augments the global types to include the Supabase client on the Astro `App.Locals` object, ensuring proper typing throughout your application.
```

Oprócz TypeScript, Supabase pozwala na generowanie typów w językach Go oraz Swift (dokumentacja supabase gen types). Poradniki inicjalizacji Supabase w innych technologiach webowych znajdziesz w dokumentacji Supabase Framework Quickstarts.

Aby dokończyć konfigurację, należy umieścić url i anon key do bazy w pliku .env. Tutaj przykładowe wartości konfiguracyjne, które możesz podejrzeć za pomocą komendy supabase start w repo projektu:
![](https://assets-v2.circle.so/akei5n04cnhykm0jveo83e1lgd2y)
Na tej podstawie poprawna konfiguracja .env dla mojej lokalnej konfiguracji wygląda następująco:

```
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

## Definiowanie specyfikacji API

Do wygenerowania api-plan.md wykorzystałem następujący prompt przeznaczony dla modeli reasoningowych:

```
&lt;db-plan&gt;
{{db-plan}} &lt;- zamień na referencję do @db-plan.md 
&lt;db-plan&gt;

&lt;prd&gt;
{{prd}} &lt;- zamień na referencję do @prd.md
&lt;/prd&gt;

&lt;tech-stack&gt;
{{tech-stack}} &lt;- zamień na referencję do @tech-stack.md
&lt;/tech-stack&gt;

Jesteś doświadczonym architektem API, którego zadaniem jest stworzenie kompleksowego planu API REST. Twój plan będzie oparty na podanym schemacie bazy danych, dokumencie wymagań produktu (PRD) i stacku technologicznym podanym powyżej. Uważnie przejrzyj dane wejściowe i wykonaj następujące kroki:

1. Przeanalizuj schemat bazy danych:
   - Zidentyfikuj główne encje (tabele)
   - Zanotuj relacje między jednostkami
   - Rozważ wszelkie indeksy, które mogą mieć wpływ na projekt API
   - Zwróć uwagę na warunki walidacji określone w schemacie.

2. Przeanalizuj PRD:
   - Zidentyfikuj kluczowe cechy i funkcjonalności
   - Zwróć uwagę na konkretne wymagania dotyczące operacji na danych (pobieranie, tworzenie, aktualizacja, usuwanie)
   - Zidentyfikuj wymagania logiki biznesowej, które wykraczają poza operacje CRUD

3. Rozważ stack technologiczny:
   - Upewnij się, że plan API jest zgodny z określonymi technologiami.
   - Rozważ, w jaki sposób te technologie mogą wpłynąć na projekt API

4. Tworzenie kompleksowego planu interfejsu API REST:
   - Zdefiniowanie głównych zasobów w oparciu o encje bazy danych i wymagania PRD
   - Zaprojektowanie punktów końcowych CRUD dla każdego zasobu
   - Zaprojektuj punkty końcowe dla logiki biznesowej opisanej w PRD
   - Uwzględnienie paginacji, filtrowania i sortowania dla punktów końcowych listy.
   - Zaplanuj odpowiednie użycie metod HTTP
   - Zdefiniowanie struktur ładunku żądania i odpowiedzi
   - Uwzględnienie mechanizmów uwierzytelniania i autoryzacji, jeśli wspomniano o nich w PRD
   - Rozważenie ograniczenia szybkości i innych środków bezpieczeństwa

Przed dostarczeniem ostatecznego planu, pracuj wewnątrz tagów &lt;api_analysis&gt; w swoim bloku myślenia, aby rozbić swój proces myślowy i upewnić się, że uwzględniłeś wszystkie niezbędne aspekty. W tej sekcji:

1. Wymień główne encje ze schematu bazy danych. Ponumeruj każdą encję i zacytuj odpowiednią część schematu.
2. Wymień kluczowe funkcje logiki biznesowej z PRD. Ponumeruj każdą funkcję i zacytuj odpowiednią część PRD.
3. Zmapuj funkcje z PRD do potencjalnych punktów końcowych API. Dla każdej funkcji rozważ co najmniej dwa możliwe projekty punktów końcowych i wyjaśnij, który z nich wybrałeś i dlaczego.
4. Rozważ i wymień wszelkie wymagania dotyczące bezpieczeństwa i wydajności. Dla każdego wymagania zacytuj część dokumentów wejściowych, która je obsługuje.
5. Wyraźnie mapuj logikę biznesową z PRD na punkty końcowe API.
6. Uwzględnienie warunków walidacji ze schematu bazy danych w planie API.

Ta sekcja może być dość długa.

Ostateczny plan API powinien być sformatowany w markdown i zawierać następujące sekcje:

``markdown
# REST API Plan

## 1. Zasoby
- Wymień każdy główny zasób i odpowiadającą mu tabelę bazy danych

## 2. Punkty końcowe
Dla każdego zasobu podaj:
- Metoda HTTP
- Ścieżka URL
- Krótki opis
- Parametry zapytania (jeśli dotyczy)
- Struktura ładunku żądania JSON (jeśli dotyczy)
- Struktura ładunku odpowiedzi JSON
- Kody i komunikaty powodzenia
- Kody i komunikaty błędów

## 3. Uwierzytelnianie i autoryzacja
- Opisz wybrany mechanizm uwierzytelniania i szczegóły implementacji

## 4. Walidacja i logika biznesowa
- Lista warunków walidacji dla każdego zasobu
- Opisz, w jaki sposób logika biznesowa jest zaimplementowana w API
```

Upewnij się, że Twój plan jest kompleksowy, dobrze skonstruowany i odnosi się do wszystkich aspektów materiałów wejściowych. Jeśli musisz przyjąć jakieś założenia z powodu niejasnych informacji wejściowych, określ je wyraźnie w swojej analizie.

Końcowy wynik powinien składać się wyłącznie z planu API w formacie markdown w języku angielskim, który zapiszesz w .ai/api-plan.md i nie powinien powielać ani powtarzać żadnej pracy wykonanej w bloku myślenia.
```

## Generowanie typów na podstawie schematu bazy danych

Do wygenerowania DTOsów i Command Modeli w TypeScript wykorzystałem następujący prompt dla modeli reasoningowych:

```
Jesteś wykwalifikowanym programistą TypeScript, którego zadaniem jest stworzenie biblioteki typów DTO (Data Transfer Object) i Command Model dla aplikacji. Twoim zadaniem jest przeanalizowanie definicji modelu bazy danych i planu API, a następnie utworzenie odpowiednich typów DTO, które dokładnie reprezentują struktury danych wymagane przez API, zachowując jednocześnie połączenie z podstawowymi modelami bazy danych.

Najpierw dokładnie przejrzyj następujące dane wejściowe:

1. Modele bazy danych:
&lt;database_models&gt;
{{db-models}} &lt;- zamień na referencję do typów wygenerowanych z db (np. @database.types.ts)
&lt;/database_models&gt;

2. Plan API (zawierający zdefiniowane DTO):
&lt;api_plan&gt;
{{api-plan}} &lt;- zamień na referencję do @api-plan.md
&lt;/api_plan&gt;

Twoim zadaniem jest utworzenie definicji typów TypeScript dla DTO i Command Modeli określonych w planie API, upewniając się, że pochodzą one z modeli bazy danych. Wykonaj następujące kroki:

1. Przeanalizuj modele bazy danych i plan API.
2. Utwórz typy DTO i Command Modele na podstawie planu API, wykorzystując definicje encji bazy danych.
3. Zapewnienie zgodności między DTO i Command Modeli a wymaganiami API.
4. Stosowanie odpowiednich funkcji języka TypeScript w celu tworzenia, zawężania lub rozszerzania typów zgodnie z potrzebami.
5. Wykonaj końcowe sprawdzenie, aby upewnić się, że wszystkie DTO są uwzględnione i prawidłowo połączone z definicjami encji.

Przed utworzeniem ostatecznego wyniku, pracuj wewnątrz tagów &lt;dto_analysis&gt; w swoim bloku myślenia, aby pokazać swój proces myślowy i upewnić się, że wszystkie wymagania są spełnione. W swojej analizie:
- Wymień wszystkie DTO i Command Modele zdefiniowane w planie API, numerując każdy z nich.
- Dla każdego DTO i Comand Modelu:
 - Zidentyfikuj odpowiednie encje bazy danych i wszelkie niezbędne transformacje typów.
  - Opisz funkcje lub narzędzia TypeScript, których planujesz użyć.
  - Utwórz krótki szkic struktury DTO i Command Modelu.
- Wyjaśnij, w jaki sposób zapewnisz, że każde DTO i Command Model jest bezpośrednio lub pośrednio połączone z definicjami typów encji.

Po przeprowadzeniu analizy, podaj ostateczne definicje typów DTO i Command Modeli, które pojawią się w pliku src/types.ts. Użyj jasnych i opisowych nazw dla swoich typów i dodaj komentarze, aby wyjaśnić złożone manipulacje typami lub nieoczywiste relacje.

Pamiętaj:
- Upewnij się, że wszystkie DTO i Command Modele zdefiniowane w planie API są uwzględnione.
- Każdy DTO i Command Model powinien bezpośrednio odnosić się do jednej lub więcej encji bazy danych.
- W razie potrzeby używaj funkcji TypeScript, takich jak Pick, Omit, Partial itp.
- Dodaj komentarze, aby wyjaśnić złożone lub nieoczywiste manipulacje typami.

Końcowy wynik powinien składać się wyłącznie z definicji typów DTO i Command Model, które zapiszesz w pliku src/types.ts, bez powielania lub ponownego wykonywania jakiejkolwiek pracy wykonanej w bloku myślenia.
```

## Plan implementacji endpointa POST /generations

Do wygenerowania szczegółowego planu implementacji endpointa wykorzystałem następujący prompt dla modeli reasoningowych:

```
Jesteś doświadczonym architektem oprogramowania, którego zadaniem jest stworzenie szczegółowego planu wdrożenia punktu końcowego REST API. Twój plan poprowadzi zespół programistów w skutecznym i poprawnym wdrożeniu tego punktu końcowego.

Zanim zaczniemy, zapoznaj się z poniższymi informacjami:

1. Route API specification:
&lt;route_api_specification&gt;
{{route-api-specification}} &lt;- przekopiuj opis endpointa z api-plan.md
&lt;/route_api_specification&gt;

2. Related database resources:
&lt;related_db_resources&gt;
{{db-resources}} &lt;- przekopiuj z tabele i relacje z db-plan.md
&lt;/related_db_resources&gt;

3. Definicje typów:
&lt;type_definitions&gt;
{{types}} &lt;- zamień na referencje do definicji typów (np. @types)
&lt;/type_definitions&gt;

3. Tech stack:
&lt;tech_stack&gt;
{{tech-stack}} &lt;- zamień na referencje do @tech-stack.md 
&lt;/tech_stack&gt;

4. Implementation rules:
&lt;implementation_rules&gt;
{{backend-rules}} &lt;- zamień na referencje do Rules for AI dla backendu (np. @shared.mdc, @backend.mdc, @astro.mdc)
&lt;/implementation_rules&gt;

Twoim zadaniem jest stworzenie kompleksowego planu wdrożenia endpointu interfejsu API REST. Przed dostarczeniem ostatecznego planu użyj znaczników &lt;analysis&gt;, aby przeanalizować informacje i nakreślić swoje podejście. W tej analizie upewnij się, że:

1. Podsumuj kluczowe punkty specyfikacji API.
2. Wymień wymagane i opcjonalne parametry ze specyfikacji API.
3. Wymień niezbędne typy DTO i Command Modele.
4. Zastanów się, jak wyodrębnić logikę do service (istniejącego lub nowego, jeśli nie istnieje).
5. Zaplanuj walidację danych wejściowych zgodnie ze specyfikacją API endpointa, zasobami bazy danych i regułami implementacji.
6. Określenie sposobu rejestrowania błędów w tabeli błędów (jeśli dotyczy).
7. Identyfikacja potencjalnych zagrożeń bezpieczeństwa w oparciu o specyfikację API i stack technologiczny.
8. Nakreśl potencjalne scenariusze błędów i odpowiadające im kody stanu.

Po przeprowadzeniu analizy utwórz szczegółowy plan wdrożenia w formacie markdown. Plan powinien zawierać następujące sekcje:

1. Przegląd punktu końcowego
2. Szczegóły żądania
3. Szczegóły odpowiedzi
4. Przepływ danych
5. Względy bezpieczeństwa
6. Obsługa błędów
7. Wydajność
8. Kroki implementacji

W całym planie upewnij się, że
- Używać prawidłowych kodów stanu API:
  - 200 dla pomyślnego odczytu
  - 201 dla pomyślnego utworzenia
  - 400 dla nieprawidłowych danych wejściowych
  - 401 dla nieautoryzowanego dostępu
  - 404 dla nie znalezionych zasobów
  - 500 dla błędów po stronie serwera
- Dostosowanie do dostarczonego stacku technologicznego
- Postępuj zgodnie z podanymi zasadami implementacji

Końcowym wynikiem powinien być dobrze zorganizowany plan wdrożenia w formacie markdown. Oto przykład tego, jak powinny wyglądać dane wyjściowe:

``markdown
# API Endpoint Implementation Plan: [Nazwa punktu końcowego]

## 1. Przegląd punktu końcowego
[Krótki opis celu i funkcjonalności punktu końcowego]

## 2. Szczegóły żądania
- Metoda HTTP: [GET/POST/PUT/DELETE]
- Struktura URL: [wzorzec URL]
- Parametry:
  - Wymagane: [Lista wymaganych parametrów]
  - Opcjonalne: [Lista opcjonalnych parametrów]
- Request Body: [Struktura treści żądania, jeśli dotyczy]

## 3. Wykorzystywane typy
[DTOs i Command Modele niezbędne do implementacji]

## 3. Szczegóły odpowiedzi
[Oczekiwana struktura odpowiedzi i kody statusu]

## 4. Przepływ danych
[Opis przepływu danych, w tym interakcji z zewnętrznymi usługami lub bazami danych]

## 5. Względy bezpieczeństwa
[Szczegóły uwierzytelniania, autoryzacji i walidacji danych]

## 6. Obsługa błędów
[Lista potencjalnych błędów i sposób ich obsługi]

## 7. Rozważania dotyczące wydajności
[Potencjalne wąskie gardła i strategie optymalizacji]

## 8. Etapy wdrożenia
1. [Krok 1]
2. [Krok 2]
3. [Krok 3]
...
```

Końcowe wyniki powinny składać się wyłącznie z planu wdrożenia w formacie markdown i nie powinny powielać ani powtarzać żadnej pracy wykonanej w sekcji analizy.

Pamiętaj, aby zapisać swój plan wdrożenia jako .ai/view-implementation-plan.md. Upewnij się, że plan jest szczegółowy, przejrzysty i zapewnia kompleksowe wskazówki dla zespołu programistów.
```

## Poprawiamy niespójne nazewnictwo

## Implementujemy endpoint /generations

Podczas implementacji wykorzystałem następujący prompt:

```
Twoim zadaniem jest wdrożenie endpointa interfejsu API REST w oparciu o podany plan wdrożenia. Twoim celem jest stworzenie solidnej i dobrze zorganizowanej implementacji, która zawiera odpowiednią walidację, obsługę błędów i podąża za wszystkimi logicznymi krokami opisanymi w planie.

Najpierw dokładnie przejrzyj dostarczony plan wdrożenia:

&lt;implementation_plan&gt;
{{endpoint-implementation-plan}} &lt;- dodaj referencję do planu implementacji endpointa (np. @generations-endpoint-implementation-plan.md)
&lt;/implementation_plan&gt;

&lt;types&gt;
{{types}} &lt;- dodaj referencje do definicji typów (np. @types)
&lt;/types&gt;

&lt;implementation_rules&gt;
{{backend-rules}} &lt;- dodaj referencje do reguł backendowych (np. @shared.mdc, @backend.mdc, @astro.mdc)
&lt;/implementation_rules&gt;

&lt;implementation_approach&gt;
Realizuj maksymalnie 3 kroki planu implementacji, podsumuj krótko co zrobiłeś i opisz plan na 3 kolejne działania - zatrzymaj w tym momencie pracę i czekaj na mój feedback.
&lt;/implementation_approach&gt;

Teraz wykonaj następujące kroki, aby zaimplementować punkt końcowy interfejsu API REST:

1. Przeanalizuj plan wdrożenia:
   - Określ metodę HTTP (GET, POST, PUT, DELETE itp.) dla punktu końcowego.
   - Określenie struktury adresu URL punktu końcowego
   - Lista wszystkich oczekiwanych parametrów wejściowych
   - Zrozumienie wymaganej logiki biznesowej i etapów przetwarzania danych
   - Zwróć uwagę na wszelkie szczególne wymagania dotyczące walidacji lub obsługi błędów.

2. Rozpocznij implementację:
   - Rozpocznij od zdefiniowania funkcji punktu końcowego z prawidłowym dekoratorem metody HTTP.
   - Skonfiguruj parametry funkcji w oparciu o oczekiwane dane wejściowe
   - Wdrożenie walidacji danych wejściowych dla wszystkich parametrów
   - Postępuj zgodnie z logicznymi krokami opisanymi w planie wdrożenia
   - Wdrożenie obsługi błędów dla każdego etapu procesu
   - Zapewnienie właściwego przetwarzania i transformacji danych zgodnie z wymaganiami
   - Przygotowanie struktury danych odpowiedzi

3. Walidacja i obsługa błędów:
   - Wdrożenie dokładnej walidacji danych wejściowych dla wszystkich parametrów
   - Używanie odpowiednich kodów statusu HTTP dla różnych scenariuszy (np. 400 dla błędnych żądań, 404 dla nie znaleziono, 500 dla błędów serwera).
   - Dostarczanie jasnych i informacyjnych komunikatów o błędach w odpowiedzi.
   - Obsługa potencjalnych wyjątków, które mogą wystąpić podczas przetwarzania.

4. Rozważania dotyczące testowania:
   - Należy rozważyć edge case&#39;y i potencjalne problemy, które powinny zostać przetestowane.
   - Upewnienie się, że wdrożenie obejmuje wszystkie scenariusze wymienione w planie.

5. Dokumentacja:
   - Dodaj jasne komentarze, aby wyjaśnić złożoną logikę lub ważne decyzje
   - Dołącz dokumentację dla głównej funkcji i wszelkich funkcji pomocniczych.

Po zakończeniu implementacji upewnij się, że zawiera wszystkie niezbędne importy, definicje funkcji i wszelkie dodatkowe funkcje pomocnicze lub klasy wymagane do implementacji.

Jeśli musisz przyjąć jakieś założenia lub masz jakiekolwiek pytania dotyczące planu implementacji, przedstaw je przed pisaniem kodu.

Pamiętaj, aby przestrzegać najlepszych praktyk projektowania REST API, stosować się do wytycznych dotyczących stylu języka programowania i upewnić się, że kod jest czysty, czytelny i dobrze zorganizowany.
```

### Workflow 3x3

W filmie o implementacji endpointa przedstawiłem mój ulubiony sposób współpracy z agentami w IDE. Dodaj do dowolnego prompta następujący fragment, a aktywujesz tryb “3x3”:

```
&lt;implementation_approach&gt;
Realizuj maksymalnie 3 kroki planu implementacji, podsumuj krótko co zrobiłeś i opisz plan na 3 kolejne działania - zatrzymaj w tym momencie pracę i czekaj na mój feedback.
&lt;/implementation_approach&gt;
```

Dzięki niemu uzyskujesz sweet spot pomiędzy sprawczością agenta a własną kontrolą, możliwością nadążania za wprowadzanymi zmianami i wprowadzania niezbędnych korekt kursu.

W ramach każdej iteracji agent wróci do Ciebie z krótkim podsumowaniem wykonanych działań oraz planem na kolejne 3 kroki. Twoim zadaniem jest code review wykonanych kroków i analiza dalszych planów agenta. W odpowiedzi przekaż mu:

```
Feedback do dotychczasowych działań:
[lista punktowana z odniesieniem do poszczególnych zaraportowanych kroków] &lt;- jeżeli krok został wykonany w 100% dobrze, pomiń punkt lub napisz &quot;OK&quot;

Feedback do planowanych kroków:
[lista punktowana z odniesieniem do poszczególnych pranowanych kroków] &lt;- jeżeli nie masz zastrzeżeń, napisz &quot;OK&quot;

[pozostałe uwagi] &lt;- jeżeli masz dodatkowe uwagi, napisz je tutaj
```

Co do pozostałych uwag mogą to być prośby o krótsze/dłuższe opisy wykonanych działań i planów, przeniesienie uwagi agenta na określony aspekt pracy (np. zwróć większą uwagę na obsługę błędów itd.).

## Szybkie testy endpointa z generowanym curlem

Nie chcesz tracić czasu na Postmana lub przeklikywanie się przez UI, aby przetestować endpoint? Zanim zdefiniujesz testy automatyczne, świetnym sposobem jest wygenerowanie i wykonanie curl z poziomu edytora:

## 🏁 Podsumowanie

W tej lekcji poznaliśmy proces generowania kontraktów i endpointów REST API z wykorzystaniem AI:

Inicjalizacja Supabase w projekcie - przedstawiliśmy sposób konfiguracji Supabase w projekcie Astro z wykorzystaniem agentów, w tym tworzenie pliku clienta oraz middleware. Wykorzystaliśmy Supabase CLI do automatycznego wygenerowania typów TypeScript z bazy danych.

Definiowanie specyfikacji API - poznaliśmy prompt do tworzenia kompleksowego planu REST API na podstawie schematu bazy danych i PRD. Plan zawiera zasoby, endpointy, uwierzytelnianie oraz logikę biznesową.

Generowanie typów na podstawie schematu bazy danych - poznaliśmy sposób automatycznego generowania DTOs (Data Transfer Objects) i Command Models dla API, zachowując spójność z modelem bazy danych.

Szczegółowy plan implementacji endpointów - nauczyliśmy się jak tworzyć dokładne plany implementacji endpoint-by-endpoint z uwzględnieniem struktury żądania, odpowiedzi, przepływu danych, bezpieczeństwa i obsługi błędów.

Workflow 3×3 - poznaliśmy efektywny sposób współpracy z agentem AI podczas implementacji, gdzie agent realizuje 3 kroki planu, raportuje postęp i proponuje kolejne 3 działania. Ten model zapewnia równowagę między autonomią AI a kontrolą programisty.

Pamiętaj, że generatywne AI doskonale radzi sobie z rutynowymi elementami tworzenia API, ale nadal wymaga nadzoru i weryfikacji ze strony programisty, szczególnie w zakresie logiki biznesowej i bezpieczeństwa.

## 👨‍💻 Ćwiczenia praktyczne

Zadanie 1: Inicjalizacja Supabase w projekcie

Cel: Skonfigurowanie Supabase jako Backend-as-a-Service w Twoim projekcie.

Instrukcje:

Zainstaluj pakiet @supabase/supabase-js w swoim projekcie (lub innego klienta dla Twojego stacku)

Wykorzystaj przykładowy kod z sekcji &quot;Inicjalizacja Supabase w warstwie API&quot; do stworzenia plików:

/src/db/supabase.client.ts - do inicjalizacji klienta Supabase

/src/middleware/index.ts - do dodania klienta Supabase do kontekstu Astro

/src/env.d.ts - do rozszerzenia definicji typów dla zmiennych środowiskowych

Użyj komendy Supabase CLI do wygenerowania typów TypeScript:

supabase gen types typescript --local &gt; src/db/database.types.tsDodaj wymagane zmienne środowiskowe SUPABASE_URL i SUPABASE_KEY do pliku .env

Ważne: Upewnij się, że plik .env jest dodany do .gitignore, aby zabezpieczyć klucze dostępu przed wyciekiem.

Zadanie 2: Generowanie specyfikacji API

Cel: Stworzenie kompleksowego planu REST API dla Twojego projektu.

Instrukcje:

Wykorzystaj prompt z sekcji &quot;Definiowanie specyfikacji API&quot;, dostosowując go do schematu bazy danych w Twoim projekcie

Wygeneruj specyfikację API przy użyciu modelu reasoningowego i przeprowadź rewizję poprawności struktury danych, warunków oraz logiki biznesowej

Zapisz wygenerowany plan jako api-plan.md

Przejrzyj i w razie potrzeby skoryguj wygenerowaną specyfikację

Zadanie 3: Planowanie implementacji kluczowego endpointa/ów

Cel: Stworzenie szczegółowego planu implementacji dla kluczowego endpointa/ów dla funkcji aplikacji, nad którą pracujesz.

Instrukcje:

Zidentyfikuj najważniejszy endpoint(y) dla głównej funkcjonalności Twojego projektu

Wykorzystaj prompt z sekcji &quot;Plan implementacji endpointa POST /generations&quot;

Wygeneruj i przeanalizuj plan implementacji

Zapisz wygenerowany plan jako [nazwa-endpointa]-implementation-plan.md

Przykładowo: Do obsługi funkcji generowania fiszek w 10xCards będziemy potrzebowali dwóch endpointów: POST generations (rozpoczęcie procesu generowania) oraz POST flashcards (zapis zaakceptowanych fiszek).

Zadanie 4: Implementacja endpointa

Cel: Wdrożenie zaplanowanego endpointa w Twojej aplikacji.

Instrukcje:

Wykorzystaj prompt z sekcji &quot;Implementujemy endpoint /generations&quot;

Po każdej iteracji (3×3) przeprowadź code review i przekaż feedback

Kontynuuj implementację aż do ukończenia endpointa

Wygeneruj i wykonaj polecenia curl do przetestowania endpointa

Upewnij się, że implementacja zawiera:

Prawidłową walidację danych wejściowych

Właściwą obsługę błędów

Zgodność z wygenerowanym planem implementacji

Ważne: Podczas implementacji zwróć szczególną uwagę na bezpieczeństwo API, poprawną obsługę błędów oraz zgodność z zasadami implementacji backendu.

Co dalej? Przygotuj pozostałe endpointy, które będą potrzebne do implementacji głównej funkcji/pierwszego widoku. Zaimplementuj widok zgodnie ze wskazówkami z kolejnej lekcji. Rozwijając dalej aplikację (np. lista CRUD) zaimplementuj endpointy niezbędne do obsługi tego widoku.
![](https://assets-v2.circle.so/05fcqi7bjxfhshkjmex1np1p7xyl)