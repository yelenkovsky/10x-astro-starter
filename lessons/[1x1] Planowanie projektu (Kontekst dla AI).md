<!DOCTYPE html>![](https://assets-v2.circle.so/lslnc60kxdsui9jwud804dq0sjdk)
Zaczynamy naszą przygodę z tworzeniem nowego projektu wykorzystując AI-assisted programming. Zastanówmy się - co powinno być naszym pierwszym krokiem? Generowanie UI? Schema bazy danych? A może zabierzemy się za endpointy API?

Żadne z powyższych! W czasach, gdy jesteśmy w stanie generować kod z niespotykaną dotąd szybkością, jeszcze większe znaczenie ma zadawanie właściwych pytań i staranne planowanie projektu, zanim przejdziemy do samego programowania.

## Dlaczego planowanie jest kluczowe w pracy z AI?

Od planowania i przygotowania odpowiedniego kontekstu dla AI będzie zależała jakość całej naszej dalszej pracy:

Tempo i komfort współpracy z edytorem AI podczas kodowania

Ilość halucynacji i nieścisłości w generowanym kodzie

I co najważniejsze - finalny kształt aplikacji i stopień realizacji wymagań biznesowych

### Korzyści z dokładnego planowania

Jasna wizja projektu działa jak kompas. Gdy wszyscy widzą ten sam cel, droga do niego staje się prostsza.

Dokładne planowanie pozwala nam ustalić precyzyjne granice projektu - co jest jego częścią, a co wykracza poza zakres. To właśnie dzięki temu jesteśmy w stanie skutecznie bronić się przed zjawiskiem &quot;scope creep&quot;, które potrafi zamienić nawet najprostszy projekt w niekończącą się historię bez konkluzji.

Kiedy mamy jasno wytyczone cele i kryteria sukcesu, każda decyzja w projekcie staje się łatwiejsza. Łatwiej też zweryfikować, czy to co budujemy faktycznie odpowiada na potrzeby użytkowników i realizuje założenia biznesowe. Dzięki temu możemy efektywniej alokować zasoby, szacować czas pracy i planować kolejne kroki.

Komunikacja to kolejny aspekt, który zyskuje dzięki solidnemu planowaniu. Wyobraź sobie sytuację, w której programista, designer i product manager rozmawiają o tym samym projekcie, ale każdy widzi go inaczej. Chaos i nieporozumienia są niemal gwarantowane. Wspólna dokumentacja i uzgodnione plany tworzą język, którym wszyscy członkowie zespołu mogą się posługiwać, rozumiejąc się nawzajem.

Gdy nowy członek dołącza do projektu, nie musi spędzać tygodni na domyślaniu się, co i dlaczego jest budowane. Jasna dokumentacja stanowi punkt odniesienia dla wszystkich dyskusji i decyzji, minimalizując przestrzeń dla błędnych założeń i nieporozumień, które mogą kosztować nas cenne godziny, dni, a nawet tygodnie pracy.

Co szczególnie istotne, dobre planowanie drastycznie zmniejsza liczbę czasochłonnych przeróbek. Zamiast budować funkcjonalność, by później odkryć, że nie spełnia ona oczekiwań, możemy już na etapie planowania wyłapać potencjalne problemy i dostosować nasze podejście.

Pamiętaj, że celem planowania nie jest jedynie stworzenie dokumentacji - chodzi przede wszystkim o zbudowanie wspólnego zrozumienia i planu działania prowadzącego do sukcesu projektu - dla Ciebie, asystenta AI oraz całego zespołu deweloperskiego.

### Plan działania 10xDeva

Skoro rozumiesz już, dlaczego planowanie jest tak istotne, rozłóżmy ten proces na czynniki pierwsze, dopasowane do workflow 10xDeva. Zacznijmy od planowania nowego produktu bądź modułu w istniejącym systemie:

Wybór projektu - Nad jakim projektem będziemy pracowali? Czy adresuje on rzeczywiste problemy użytkowników?

Definicja MVP - Co składa się na minimalną działającą wersję naszego projektu?

Stack technologiczny - Jakie technologie i usługi pozwolą nam najefektywniej pracować nad projektem?

Na tej podstawie dopiero możemy przejść do planowania i implementacji w poszczególnych warstwach: bazy danych, API oraz UI.

W tej lekcji, współpracując z AI:

Przejdziemy przez trzy kluczowe etapy planowania projektu

Przygotujemy dokumentację projektową, która posłuży jako kontekst dla AI w dalszej pracy (PRD)

Zweryfikujemy rekomendowany stack do pracy nad MVP

Wygenerujemy działający Proof of Concept za pomocą usługi Bolt.new

Współpraca z AI może zamienić tygodnie planowania w zaledwie kilka godzin produktywnych działań. Lets do this!

## Wybór pomysłu na projekt

Rola programisty w wyborze projektów

Jako programiści często mamy ograniczony wpływ na wybór projektów w ramach zawodowych obowiązków. Decyzje podejmują zazwyczaj działy produktowe, zarząd czy klienci. Możemy jednak kształtować projekty na poziomie modułów i funkcjonalności, wykorzystując naszą wiedzę techniczną.

AI jako motor napędowy dla własnych projektów

Zaawansowane edytory AI takie jak Cursor pozwalają realizować własne pomysły znacznie szybciej niż kiedykolwiek wcześniej. Dzięki nim możemy tworzyć projekty, które:

Rozwiązują problemy, z którymi sami się zmagamy

Adresują potrzeby naszych bliskich czy społeczności

Mogą stać się potencjalnymi startupami

Poszerzają nasze portfolio i umiejętności

Co wcześniej wymagało zespołu programistów, teraz staje się osiągalne dla pojedynczego fullstack developera wspieranego przez AI.

## Przykładowy pomysł na projekt: 10xCards
![](https://assets-v2.circle.so/q5a9p4v13yquz6n9q3s8p5fh96oe)
W ramach tego modułu przeprowadzę Cię przez początkowe fazy procesu tworzenia aplikacji 10xCards – narzędzia do efektywnej nauki z generowaniem fiszek wspieranych przez AI.

### Problem, który rozwiązujemy

Nauka z wykorzystaniem fiszek (tzw. spaced repetition) jest naukowo udowodnioną metodą efektywnego przyswajania i zapamiętywania informacji. Istniejące rozwiązania jak Anki czy SuperMemo mają jednak istotną wadę: tworzenie fiszek jest czasochłonne i żmudne.

Proces tworzenia dobrych fiszek wymaga:

Analizy materiału źródłowego

Wyodrębnienia kluczowych informacji

Sformułowania pytań i odpowiedzi

Ręcznego wprowadzenia ich do systemu

Ta bariera wejścia sprawia, że wielu potencjalnych użytkowników rezygnuje z tej metody nauki, mimo jej udowodnionej skuteczności.

### Rozwiązanie z wykorzystaniem AI

Dzięki modelom językowym możemy ten proces zoptymalizować. Finalna wersja 10xCards pozwoli użytkownikom:

Importować teksty, notatki czy dokumenty

Automatycznie generować wysokiej jakości fiszki

Przeglądać i zarządzać wygenerowanymi fiszkami

Efektywnie utrwalać wiedzę

### Walidacja problemu

Skąd pewność, że to realny problem wart rozwiązania?

Własne doświadczenie po latach konsekwentnego korzystania z Anki

Rozmowy ze znajomymi, którzy byli zainteresowani nauką z fiszkami, ale szybko się zniechęcali

Analiza opinii użytkowników istniejących rozwiązań

Konsultacje z AI na temat głównych przeszkód w korzystaniu z aplikacji do fiszek

Takie rozwiązanie ma potencjał znacząco obniżyć barierę wejścia dla metody nauki, która należy do najbardziej efektywnych technik przyswajania wiedzy.

## Czym są POC i MVP?

Wielu deweloperów myli pojęcia MVP (Minimum Viable Product) i POC (Proof of Concept). Przyjrzyjmy się kluczowym różnicom:

Proof of Concept (POC) to minimalna implementacja demonstrująca, że dane rozwiązanie jest technicznie wykonalne. POC:

Skupia się na weryfikacji technologii i koncepcji

Często ma ograniczoną funkcjonalność

Jest używany wewnętrznie, a nie przez rzeczywistych użytkowników

Pomaga w podejmowaniu decyzji o dalszym rozwoju projektu

Podczas gdy Minimum Viable Product (MVP) to najmniejsza wersja produktu, która:

Dostarcza realną wartość dla użytkowników końcowych

Pozwala na testowanie głównych hipotez biznesowych

Umożliwia zebranie informacji zwrotnej od prawdziwych użytkowników

Zawiera tylko absolutnie niezbędne funkcje
![](https://assets-v2.circle.so/6sn03c6825lg81wl4v9xjmb8ffd7)
W kontekście projektu 10xCards:

POC to prosta aplikacja demonstrująca, że AI potrafi generować fiszki na podstawie tekstu

MVP to pełna aplikacja z rejestracją, generowaniem i zarządzaniem fiszkami

Kluczowe jest to, że MVP to nie prototyp czy demo - to faktycznie działający produkt, który użytkownicy mogą zacząć używać i czerpać z niego korzyści, choć w ograniczonym zakresie.

Dlaczego precyzyjne definiowanie MVP jest kluczowe w pracy z AI?

Praca z asystentami AI wymaga szczególnej precyzji w definiowaniu zakresu projektu z kilku powodów:

Redukcja halucynacji - Ograniczony zakres zmniejsza ryzyko, że AI zaproponuje rozwiązania oderwane od potrzeb biznesowych

Efektywne wykorzystanie kontekstu - Modele językowe mają ograniczony kontekst; skupienie na MVP pozwala lepiej go wykorzystać

Szybsza walidacja - Przemyślany zakres oznacza sprawniejszą weryfikację kodu generowanego przez AI

Stopniowe budowanie złożoności - Rozpoczęcie od prostego MVP pozwala iteracyjnie dodawać funkcjonalności

Potencjalne pułapki przy planowaniu z AI

Podczas planowania projektu z wykorzystaniem AI powinieneś być świadomym kilku pułapek:

Nadmierny optymizm - AI może sugerować rozwiązania, które wydają się łatwiejsze niż są w rzeczywistości

Nadmiernie rozbudowane propozycje - AI ma tendencję do proponowania pełnych, kompleksowych rozwiązań zamiast minimalnych implementacji

Uzależnienie od kontekstu - AI opiera się tylko na dostarczonym kontekście, więc brak kluczowych informacji prowadzi do błędnych założeń

Iluzja kompletności - Dokumentacja wygenerowana przez AI może sprawiać wrażenie kompletnej, pomimo pomijania istotnych detali

Niespójności koncepcyjne - Bez odpowiedniego nadzoru, różne części planu mogą zawierać niespójne założenia

Stąd powinniśmy weryfikować wszystkie propozycje AI, krytycznie je analizować i rozszerzać o całościową perspektywę, który posiadamy jako programiści/zespół.

Jak zdefiniować efektywne MVP dla naszego projektu?

Definiowanie MVP dla projektu wspieranego przez AI powinno zawierać następujące kroki:

Identyfikacja kluczowego problemu - Jaki główny ból użytkownika rozwiązujemy?

Określenie najkrótszej ścieżki do dostarczenia wartości - Jakie absolutne minimum funkcjonalności pozwoli użytkownikowi odczuć korzyść?

Precyzyjne wyznaczenie granic projektu - Co wyraźnie NIE wchodzi w zakres MVP?

Określenie ścieżek użytkownika - Jakie dokładnie scenariusze użycia musi obsługiwać MVP?

Zdefiniowanie kryteriów sukcesu - Jak zmierzymy, czy nasze MVP spełnia swoje zadanie?

### MVP dla 10xCards

Poniżej znajdziesz wysokopoziomową koncepcję MVP dla 10xCards w formacie markdown, która będzie dla nas punktem wyjścia podczas sesji planowania:

```
### Główny problem
Manualne tworzenie wysokiej jakości fiszek edukacyjnych jest czasochłonne, co zniechęca do korzystania z efektywnej metody nauki jaką jest spaced repetition.

### Najmniejszy zestaw funkcjonalności
- Generowanie fiszek przez AI na podstawie wprowadzonego tekstu (kopiuj-wklej)
- Manualne tworzenie fiszek
- Przeglądanie, edycja i usuwanie fiszek
- Prosty system kont użytkowników do przechowywania fiszek
- Integracja fiszek z gotowym algorytmem powtórek

### Co NIE wchodzi w zakres MVP
- Własny, zaawansowany algorytm powtórek (jak SuperMemo, Anki)
- Import wielu formatów (PDF, DOCX, itp.)
- Współdzielenie zestawów fiszek między użytkownikami
- Integracje z innymi platformami edukacyjnymi
- Aplikacje mobilne (na początek tylko web)

### Kryteria sukcesu
- 75% fiszek wygenerowanych przez AI jest akceptowane przez użytkownika
- Użytkownicy tworzą 75% fiszek z wykorzystaniem AI
```

Ważne: Kryteria sukcesu pełnią rolę kontekstu dla AI i mają istotny wpływ na proces planowania i implementacji aplikacji. Definiując kryteria wokół procesu skuteczności procesu generowania fiszek z AI, pojawia się potrzeba przechowywania logów generowania o określonej strukturze (więcej w lekcji #[1x3] Definiowanie bazy danych). Wskazane kryteria sukcesu są przykładowe, najważniejsze żeby były sensowne z punktu widzenia głównej funkcji aplikacji - tutaj jest to generowanie fiszek z AI. Nie będziemy Was rozliczali z ich zrealizowania - to projekt zaliczeniowy do kursu, a nie startup.

### Ścieżki alternatywne

Pierwszy moduł szkolenia 10xDevs będzie tworzony w oparciu o 10xCards - jeśli chcesz zdecydować się na alternatywny pomysł na projekt, zadbaj o dopasowanie założeń. Dzięki temu przedstawiane materiały będą dla ciebie maksymalnie użyteczne:

Full-stackowa aplikacja webowa w popularnych technologiach

Wybrany element funkcjonalności realizowany dzięki współpracy z AI

Praca w standardowych warstwach aplikacji - Baza Danych, Backend, Frontend, CI/CD

Wsparcie dla deploymentu w oparciu o jedną z chmur webowych (lub Docker)

Schemat danych pod użytkownika indywidualnego (np. 1 użytkownik zbiera wiele fiszek)

Poniżej znajdziesz dwa pomysły na projekty alternatywne - pamiętaj, że w ich przypadku pierwszy moduł będzie od ciebie wymagał nieco więcej pracy i uwagi przy interakcji z AI.

Alternatywa nr 1:
![](https://assets-v2.circle.so/7rh0qmrxjuth6vxckxaez1orkfjk)
```
# Aplikacja - HealthyMeal (MVP)

### Główny problem
Dostosowywanie dostępnych w sieci przepisów kulinarnych do osobistych potrzeb i wymagań żywieniowych jest problematyczne. Aplikacja wykorzystuje AI oraz preferencje użytkownika do proponowania dopasowanych przepisów.

### Najmniejszy zestaw funkcjonalności
- Zapisywanie, odczytywanie, przeglądanie i usuwanie przepisów w formie tekstowej
- Prosty system kont użytkowników do powiązania użytkownika z własnymi przepisami
- Strona profilu użytkownika służąca do zapisywania preferencji żywnościowych
- Integracja z AI umożliwiająca modyfikowanie przepisów wg preferencji żywieniowych użytkownika

### Co NIE wchodzi w zakres MVP
- Import przepisów z adresu URL
- Bogata obsługa multimediów (np. zdjęć przepisów)
- Udostępnianie przepisów dla innych użytkowników
- Funkcje społecznościowe

### Kryteria sukcesu
- 90% użytkowników posiada wypełnioną sekcję preferencji żywnościowych w swoim profilu
- 75% użytkowników generuje jeden lub więcej przepisów w tygodniu
```

Alternatywa nr 2:
![](https://assets-v2.circle.so/n3awy26s22ml98739p6pookra5y6)
```
# Aplikacja - VibeTravels (MVP)

### Główny problem
Planowanie angażujących i interesujących wycieczek jest trudne. Dzięki wykorzystaniu potencjału, kreatywności i wiedzy AI, w VibeTravels możesz zamieniać uproszczone notatki o miejscach i celach podróży na konkretne plany.

### Najmniejszy zestaw funkcjonalności
- Zapisywanie, odczytywanie, przeglądanie i usuwanie notatek o przyszłych wycieczkach
- Prosty system kont użytkowników do powiązania użytkownika z notatkami
- Strona profilu użytkownika służąca do zapisywania preferencji turystycznych
- Integracja z AI umożliwiająca konwersję notatek w szczegółowe plany, biorące pod uwagę preferencje, czas, liczbę osób oraz potencjalne miejsca i atrakcje

### Co NIE wchodzi w zakres MVP
- Współdzielenie planów wycieczkowych między kontami
- Bogata obsługa i analiza multimediów (np. zdjęć miejsc do odwiedzenia)
- Zaawansowane planowanie czasu i logistyki

### Kryteria sukcesu
- 90% użytkowników posiada wypełnione preferencje turystyczne w swoim profilu
- 75% użytkowników generuje 3 lub więcej planów wycieczek na rok
```

Powyższe pomysły mogą być równie interesujące co 10xCards, a do ich implementacji w bezpośredni sposób wykorzystasz lekcje dostępne w naszym szkoleniu.

Jeśli masz własny pomysł, koniecznie rozpocznij od określenia 4 elementów MVP:

```
# Aplikacja - {NAZWA} (MVP)

## Główny problem
Jaki problem rozwiązuje twoja aplikacja?

## Najmniejszy zestaw funkcjonalności
Co wchodzi w skład MVP?

## Co NIE wchodzi w zakres MVP
Co nie wchodzi w skład MVP?

## Kryteria sukcesu
Jaki cel chciałbym osiągnąć?
```

Dlaczego wybór pomysłu jest ważny? Aby otrzymać certyfikat, zbudujesz prostą aplikację webową wykorzystując umiejętności pracy z AI zdobyte podczas kursu. Nie martw się - wszystkiego nauczysz się krok po kroku w trakcie zajęć, a zadania praktyczne poprowadzą Cię do tego celu.

Aplikacja zaliczeniowa powinna zawierać:

Obsługę logowania użytkownika (auth)

Jedną funkcję z logiką biznesową (może wykorzystywać LLM, nie musi)

Jedną funkcję typu CRUD (operacje zarządzania danymi, np. lista z zasobami)

Działający, sensowny test (unit - testujący konkretną funkcję lub e2e - testujący przepływ przez aplikację)

Scenariusz CI/CD na Github Actions (np. automatyczne uruchamianie testów)

Pamiętaj! Najważniejsze jest świadome wykorzystanie narzędzi AI w procesie tworzenia aplikacji, a nie jej złożoność (oczekujemy POC a nie MVP). Podczas kursu postaramy się, żebyś zdobył wszystkie potrzebne umiejętności.

Termin realizacji aplikacji: piątek, 16 maja (2 tygodnie po zakończeniu kursu)

Stąd pomysły, które szczególnie przy pierwszym podejściu do kursu mogą być zbyt obciążające w realizacji to przykładowo:

Systemy klasy ERP

Aplikacje multi-tenant

Wielopoziomowy Marketplace (wiele firm, wielu użytkowników, wielu dostawców)

Realizacja projektu w technologiach o niszowej, wyspecjalizowanej adopcji (np. COBOL)

Gry lub projekty oparte o interakcję 3D

Do tego typu projektów możesz spróbować podejść już po zrealizowaniu szkolenia 10xDevs, wyposażony w nową wiedzę.

## Dokumentacja MVP - PRD dla AI

Czym jest PRD i dlaczego jest ważny w pracy z AI?

PRD (Product Requirements Document) to dokument opisujący wymagania dotyczące produktu. W kontekście AI-assisted programming PRD zyskuje nowe znaczenie - staje się kluczowym kontekstem dla modeli językowych.

Dobrze przygotowany PRD dla projektu wspieranego przez AI powinien zawierać:

Zwięzły opis produktu i jego celów - Co budujemy i po co?

Jasno zdefiniowany problem użytkownika - Jaki ból rozwiązujemy?

Wymagania funkcjonalne - Co dokładnie musi robić nasz produkt?

Granice projektu - Co wyraźnie NIE wchodzi w zakres?

Precyzyjne user stories - Jak użytkownicy będą korzystać z naszego rozwiązania?

Metryki sukcesu - Jak zmierzymy, czy nasze rozwiązanie działa?

Teraz przyjrzymy się, jak współpracować z AI, aby stworzyć taki PRD dla naszego projektu 10xCards, a następnie wybierzemy odpowiedni stack technologiczny do jego realizacji.

Zaczniemy od sesji planistycznej, w której model zada nam pytania i przekaże rekomendacje. Dzięki temu podejmiemy niezbędne decyzje i poszerzymy kontekst skromnego pomysłu na projektu:

Pracę strategiczną możemy wykonywać zarówno w edytorze, jak i webowych usługach czatowych (ChatGPT, Claude.ai, Gemini) - niezbędny jest jednak dostęp do modeli reasoningowych (o3-mini-high, o1, Claude 3.7 Sonnet z Thinking, Gemini 2.5 Pro).

O to prompt do sesji planistycznej PRD przeznaczony dla modeli reasoningowych:

```
Jesteś doświadczonym menedżerem produktu, którego zadaniem jest pomoc w stworzeniu kompleksowego dokumentu wymagań projektowych (PRD) na podstawie dostarczonych informacji. Twoim celem jest wygenerowanie listy pytań i zaleceń, które zostaną wykorzystane w kolejnym promptowaniu do utworzenia pełnego PRD.

Prosimy o uważne zapoznanie się z poniższymi informacjami:

&lt;project_description&gt;
{{project-highlevel}} &lt;- przekopiuj wysokopoziomowy opis projektu
&lt;/project_description&gt;

Przeanalizuj dostarczone informacje, koncentrując się na aspektach istotnych dla tworzenia PRD. Rozważ następujące kwestie:
&lt;prd_analysis&gt;
1. Zidentyfikuj główny problem, który produkt ma rozwiązać.
2. Określ kluczowe funkcjonalności MVP.
3. Rozważ potencjalne historie użytkownika i ścieżki korzystania z produktu.
4. Pomyśl o kryteriach sukcesu i sposobach ich mierzenia.
5. Oceń ograniczenia projektowe i ich wpływ na rozwój produktu.
&lt;/prd_analysis&gt;

Na podstawie analizy wygeneruj listę pytań i zaleceń. Powinny one dotyczyć wszelkich niejasności, potencjalnych problemów lub obszarów, w których potrzeba więcej informacji, aby stworzyć skuteczny PRD. Rozważ pytania dotyczące:

1. Szczegółów problemu użytkownika
2. Priorytetyzacji funkcjonalności
3. Oczekiwanego doświadczenia użytkownika
4. Mierzalnych wskaźników sukcesu
5. Potencjalnych ryzyk i wyzwań
6. Harmonogramu i zasobów

&lt;pytania&gt;
[Wymień tutaj swoje pytania, ponumerowane dla jasności].
&lt;/pytania&gt;

&lt;rekomendacje&gt;
[Wymień tutaj swoje zalecenia, ponumerowane dla jasności]
&lt;/rekomendacje&gt;

Kontynuuj ten proces, generując nowe pytania i rekomendacje w oparciu o odpowiedzi użytkownika, dopóki użytkownik wyraźnie nie poprosi o podsumowanie.

Pamiętaj, aby skupić się na jasności, trafności i dokładności wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.

Pracę analityczną należy przeprowadzić w bloku myślenia. Końcowe dane wyjściowe powinny składać się wyłącznie z pytań i zaleceń i nie powinny powielać ani powtarzać żadnej pracy wykonanej w sekcji prd_analysis.
```

Tip dotyczący pracy z Cursorem: Aby przekopiować kontekst wejściowy do prompta, przykładowo w miejsce {{project-highlevel}}, skorzystaj ze skrótku klawiszowego Ctrl+Shift+V / Cmd+Shift+V. Przydaje się to również, gdy chcemy przekopiować fragment istniejącego pliku z projektu, bez dodawania go w całości do kontekstu.

A teraz omówmy dwie istotne kwestie związane z promptem do sesji planistycznej:

Ile rund pytań i odpowiedzi podczas planowania należy odbyć?

Cóż to za tagi &lt;project_description&gt;?

Zacznijmy od początku.

Ile rund planowania należy odbyć?

Jest to zależne od kilku czynników.

Po pierwsze, od poziomu szczegółowości przekazanego project_description, który w przypadku przykładu dla 10xCards jest niska. Druga rzecz, jeszcze istotniejsza. Mianowicie na ile zależy nam na zgodności PRD z określonymi, lecz nieopisanymi, wymaganiami biznesowymi, funkcjonalnymi i technicznymi.

W przypadku projektu do kursu, takie oczekiwania nie są wysokie, jesteśmy otwarci na kreatywność modelu - chcemy w kilka tygodni przejść przez cały proces od pomysłu do realizacji, w ramach side projectu po godzinach.

W przypadku projektów komercyjnych, takie oczekiwania są zupełnie inne. Musimy poświęcić znacznie więcej czasu na planowanie, zbierając wiedzę z wielu źródeł (współpracownicy, klienci, materiały w internecie, książkach).

Tutaj optymalna liczba rund planistycznych wynosi kilkanaście do kilkudziesięciu, w zależności od złożoności projektu.

Warto mieć to tak samo na uwadze przy sesjach planistycznych bazy danych oraz interfejsu użytkownika.

Cóż to za tagi &lt;project_description&gt;?

Jak możesz zauważyć w powyższym prompcie, wykorzystuje on tagi XML (np. &lt;pr_planning_output&gt;) do lepszego strukturyzowania treści i komunikacji z modelem AI. Przyjrzyjmy się bliżej tej metodzie:

Dlaczego warto używać tagów XML?

Większa przejrzystość: Wyraźne oddzielenie różnych części promptu, co zapewnia lepszą strukturę.

Poprawa dokładności: Zmniejszenie ryzyka błędnej interpretacji części promptu przez model.

Elastyczność w modyfikacji: Łatwiejsze dodawanie, usuwanie lub modyfikowanie fragmentów bez przepisywania całości.

Jak efektywnie używać tagów XML

Zachowaj spójność: Stosuj te same nazwy tagów w całym prompcie i odwołuj się do nich, gdy mówisz o zawartości (np. &quot;Korzystając z umowy w tagach &lt;contract&gt;...&quot;).

Używaj zagnieżdżonych tagów: Stosuj strukturę &lt;zewnętrzny&gt;&lt;wewnętrzny&gt;&lt;/wewnętrzny&gt;&lt;/zewnętrzny&gt; dla treści hierarchicznych.

Nie istnieje &quot;kanoniczny&quot; zestaw najlepszych tagów XML, na których modele są specjalnie trenowane. Zaleca się jednak, aby nazwy tagów logicznie odpowiadały otaczanym informacjom.

—

A teraz wracamy do naszej sesji planistycznej, aby otrzymać jej podsumowanie wykorzystaj następujący prompt:

```
{{latest-round-answers}} &lt;- twoja lista odpowiedzi na ostatnią rundę pytań

---

Jesteś asystentem AI, którego zadaniem jest podsumowanie rozmowy na temat planowania PRD (Product Requirements Document) dla MVP i przygotowanie zwięzłego podsumowania dla następnego etapu rozwoju. W historii konwersacji znajdziesz następujące informacje:
1. Opis projektu
2. Zidentyfikowany problem użytkownika
3. Historia rozmów zawierająca pytania i odpowiedzi
4. Zalecenia dotyczące zawartości PRD

Twoim zadaniem jest:
1. Podsumować historię konwersacji, koncentrując się na wszystkich decyzjach związanych z planowaniem PRD.
2. Dopasowanie zaleceń modelu do odpowiedzi udzielonych w historii konwersacji. Zidentyfikuj, które zalecenia są istotne w oparciu o dyskusję.
3. Przygotuj szczegółowe podsumowanie rozmowy, które obejmuje:
   a. Główne wymagania funkcjonalne produktu
   b. Kluczowe historie użytkownika i ścieżki korzystania
   c. Ważne kryteria sukcesu i sposoby ich mierzenia
   d. Wszelkie nierozwiązane kwestie lub obszary wymagające dalszego wyjaśnienia
4. Sformatuj wyniki w następujący sposób:

&lt;conversation_summary&gt;
&lt;decisions&gt;
[Wymień decyzje podjęte przez użytkownika, ponumerowane].
&lt;/decisions&gt;

&lt;matched_recommendations&gt;
[Lista najistotniejszych zaleceń dopasowanych do rozmowy, ponumerowanych]
&lt;/matched_recommendations&gt;

&lt;prd_planning_summary&gt;
[Podaj szczegółowe podsumowanie rozmowy, w tym elementy wymienione w kroku 3].
&lt;/prd_planning_summary&gt;

&lt;unresolved_issues&gt;
[Wymień wszelkie nierozwiązane kwestie lub obszary wymagające dalszych wyjaśnień, jeśli takie istnieją]
&lt;/unresolved_issues&gt;
&lt;/conversation_summary&gt;

Końcowy wynik powinien zawierać tylko treść w formacie markdown. Upewnij się, że Twoje podsumowanie jest jasne, zwięzłe i zapewnia cenne informacje dla następnego etapu tworzenia PRD.
```

Przed skopiowaniem podsumowania, zweryfikuj czy zawiera wszystkie kluczowe decyzje i wnioski oraz upewnij się, że model nie przekręcił w żaden sposób twoich intencji:

Mając gotowe podsumowanie sesji planistycznej, przejdziemy przez proces tworzenia i rewizji dokumentu PRD:

O to prompt wykorzystany do tworzenia PRD:

```
Jesteś doświadczonym menedżerem produktu, którego zadaniem jest stworzenie kompleksowego dokumentu wymagań produktu (PRD) w oparciu o poniższe opisy:

&lt;project_description&gt;
{{project-description}} &lt;- wprowadź pomysł na MVP
&lt;/project_description&gt;

&lt;project_details&gt;
{{project-details}} &lt;- wprowadź podsumowanie sesji planistycznej
&lt;/project_details&gt;

Wykonaj następujące kroki, aby stworzyć kompleksowy i dobrze zorganizowany dokument:

1. Podziel PRD na następujące sekcje:
   a. Przegląd projektu
   b. Problem użytkownika
   c. Wymagania funkcjonalne
   d. Granice projektu
   e. Historie użytkownika
   f. Metryki sukcesu

2. W każdej sekcji należy podać szczegółowe i istotne informacje w oparciu o opis projektu i odpowiedzi na pytania wyjaśniające. Upewnij się, że:
   - Używasz jasnego i zwięzłego języka
   - W razie potrzeby podajesz konkretne szczegóły i dane
   - Zachowujesz spójność w całym dokumencie
   - Odnosisz się do wszystkich punktów wymienionych w każdej sekcji

3. Podczas tworzenia historyjek użytkownika i kryteriów akceptacji
   - Wymień WSZYSTKIE niezbędne historyjki użytkownika, w tym scenariusze podstawowe, alternatywne i skrajne.
   - Przypisz unikalny identyfikator wymagań (np. US-001) do każdej historyjki użytkownika w celu bezpośredniej identyfikowalności.
   - Uwzględnij co najmniej jedną historię użytkownika specjalnie dla bezpiecznego dostępu lub uwierzytelniania, jeśli aplikacja wymaga identyfikacji użytkownika lub ograniczeń dostępu.
   - Upewnij się, że żadna potencjalna interakcja użytkownika nie została pominięta.
   - Upewnij się, że każda historia użytkownika jest testowalna.

Użyj następującej struktury dla każdej historii użytkownika:
- ID
- Tytuł
- Opis
- Kryteria akceptacji

4. Po ukończeniu PRD przejrzyj go pod kątem tej listy kontrolnej:
   - Czy każdą historię użytkownika można przetestować?
   - Czy kryteria akceptacji są jasne i konkretne?
   - Czy mamy wystarczająco dużo historyjek użytkownika, aby zbudować w pełni funkcjonalną aplikację?
   - Czy uwzględniliśmy wymagania dotyczące uwierzytelniania i autoryzacji (jeśli dotyczy)?

5. Formatowanie PRD:
   - Zachowaj spójne formatowanie i numerację.
   - Nie używaj pogrubionego formatowania w markdown ( ** ).
   - Wymień WSZYSTKIE historyjki użytkownika.
   - Sformatuj PRD w poprawnym markdown.

Przygotuj PRD z następującą strukturą:

```markdown
# Dokument wymagań produktu (PRD) - {{app-name}}
## 1. Przegląd produktu
## 2. Problem użytkownika
## 3. Wymagania funkcjonalne
## 4. Granice produktu
## 5. Historyjki użytkowników
## 6. Metryki sukcesu
```

Pamiętaj, aby wypełnić każdą sekcję szczegółowymi, istotnymi informacjami w oparciu o opis projektu i nasze pytania wyjaśniające. Upewnij się, że PRD jest wyczerpujący, jasny i zawiera wszystkie istotne informacje potrzebne do dalszej pracy nad produktem.

Ostateczny wynik powinien składać się wyłącznie z PRD zgodnego ze wskazanym formatem w markdown, który zapiszesz w pliku .ai/prd.md
```

Z wykorzystaniem modelu o3-mini w Cursorze, otrzymałem następujące PRD dla 10xCards:
[prd.md](https://assets-v2.circle.so/we9vd0ffnocoppdr1kdwinhaceny)
Uzyskany PRD powinien znaleźć się w folderze .ai/prd.md w repozytorium, z którym zamierzasz kontynuować pracę z projektem.

Jeśli wybierasz własny stack - już teraz zadbaj o utworzenie repozytorium na GitHubie i zapisz taki dokument w lokalizacji .ai/prd.md

Jeśli pracujesz z Astro - zapisz prd.md w miejscu, którego nie przegapisz - w kolejnej lekcji wykonamy bootstrap nowego projektu, a wtedy uzyskane w tej lekcji informacje powinieneś przenieść do docelowego repozytorium.

## Stack technologiczny

Po zdefiniowaniu naszego MVP i stworzeniu PRD, kolejnym kluczowym krokiem jest wybór odpowiedniego stacku technologicznego. Jest to decyzja, która będzie miała długofalowy wpływ na powodzenie projektu, szybkość rozwoju oraz łatwość współpracy z AI.

## Kryteria wyboru technologii w epoce AI-assisted programming

W czasach, gdy AI staje się istotnym elementem programistycznego workflow, kryteria wyboru technologii ulegają pewnym modyfikacjom. Przyjrzyjmy się najważniejszym czynnikom, które warto uwzględnić:

1. Popularność i stabilność API

Modele językowe są trenowane na ogromnych zbiorach kodu dostępnego publicznie. Im bardziej popularna i stabilna jest technologia, tym więcej przykładów jej użycia znajdowało się w danych treningowych AI, co przekłada się na:

Mniejszą liczbę halucynacji w generowanym kodzie

Bardziej precyzyjne odpowiedzi na pytania techniczne

Lepsze praktyki implementacyjne

Technologie z ustabilizowanym API, które nie przeszły rewolucyjnych zmian w ostatnich latach (np. React, Express, PostgreSQL), są lepiej &quot;zrozumiane&quot; przez modele AI niż najnowsze frameworki lub te, które znacząco zmieniły swoje API (Svelte, Angular).

2. Dokumentacja i ekosystem

Dobrze udokumentowane technologie z bogatym ekosystemem narzędzi i bibliotek umożliwiają:

Łatwiejsze rozwiązywanie problemów

Szybszy rozwój dzięki gotowym komponentom

Lepsze wsparcie ze strony społeczności

Paradoksalnie, w epoce AI, znaczenie dokumentacji nie maleje, a wręcz rośnie - służy ona nie tylko programistom, ale także jako kontekst dla modeli.

3. Potrzeby biznesu

Jak zawsze, ostatecznym kryterium wyboru technologii powinna być wartość biznesowa:

Czy technologia pozwoli nam szybko dostarczyć MVP?

Czy zespół ma doświadczenie w pracy z tymi narzędziami?

Czy rozwiązanie będzie skalowalne w miarę wzrostu projektu?

Czy koszt utrzymania i rozwoju będzie akceptowalny?

4. Unikanie nadmiernej złożoności (overengineering)

Modele AI, trenowane na ogromnych zbiorach kodu i artykułów technicznych, często proponują popularne, ale niekoniecznie najlepiej dopasowane do konkretnego problemu rozwiązania. Warto krytycznie podchodzić do rekomendacji AI i zawsze zadawać pytania:

Czy potrzebujemy aż tak złożonego rozwiązania?

Czy nie istnieje prostsze podejście, które spełni nasze wymagania?

## Stack technologiczny dla 10xCards

Uwzględniając powyższe kryteria oraz wymagania jako twórcy kursu rekomendujemy następujący stack technologiczny do pracy nad projektami w kursie:

```
Frontend - Astro z React dla komponentów interaktywnych:
- Astro 5 pozwala na tworzenie szybkich, wydajnych stron i aplikacji z minimalną ilością JavaScript
- React 19 zapewni interaktywność tam, gdzie jest potrzebna
- TypeScript 5 dla statycznego typowania kodu i lepszego wsparcia IDE
- Tailwind 4 pozwala na wygodne stylowanie aplikacji
- Shadcn/ui zapewnia bibliotekę dostępnych komponentów React, na których oprzemy UI

Backend - Supabase jako kompleksowe rozwiązanie backendowe:
- Zapewnia bazę danych PostgreSQL
- Zapewnia SDK w wielu językach, które posłużą jako Backend-as-a-Service
- Jest rozwiązaniem open source, które można hostować lokalnie lub na własnym serwerze
- Posiada wbudowaną autentykację użytkowników

AI - Komunikacja z modelami przez usługę Openrouter.ai:
- Dostęp do szerokiej gamy modeli (OpenAI, Anthropic, Google i wiele innych), które pozwolą nam znaleźć rozwiązanie zapewniające wysoką efektywność i niskie koszta
- Pozwala na ustawianie limitów finansowych na klucze API

CI/CD i Hosting:
- Github Actions do tworzenia pipeline’ów CI/CD
- DigitalOcean do hostowania aplikacji za pośrednictwem obrazu docker
```

## Uzasadnienie rekomendowanego stacku

Rekomendujemy ten stack technologiczny z kilku powodów:

Niski próg wejścia - technologie są popularne wśród programistów w Polsce, dobrze udokumentowane i łatwe do nauki

Szybki bootstrap - Astro zapewnia możliwość szybkiego stworzenia szkieletu aplikacji fullstackowej, bez konieczności manualnego spinania frontendu i backendu. Dodatkowo przygotowaliśmy dla Was starter, który pozwoli zacząć pracę w kilka minut.

Przyjazność dla AI - wybrane technologie są popularne i z naszego doświadczenia LLMy generują w nich kod dobrej jakości

Oczywiście możesz zdecydować się na pracę ze swoimi ulubionymi technologiami webowymi. Prezentowany przez nas workflow będziesz w stanie przełożyć na dowolny stack, ale może to od Ciebie wymagać więcej pracy przy projekcie, zwłaszcza przy backendzie i bazie danych.

Miej również na uwadze, że decydując się na inny stack, zwłaszcza spoza ekosystemu JavaScript/TypeScript, nie będziemy w stanie asystować Cię przy problemach technicznych - jesteśmy full-stackami specjalizującymi się właśnie w JS/TS.

Nie traćmy proszę czasu na dywagacje o tym jaki stack jest najlepszy, dlaczego X jest do niczego itd. - w wyborze stacku najważniejsze jest zaadresowanie potrzeb produktu, wszystko inne to kwestia indywidualnych preferencji programisty/zespołu - bądźmy otwarci na różnice w perspektywach.

## Weryfikacja stacku z AI

Aby zweryfikować czy wybrany stack technologiczny będzie właściwy dla projektu, warto skonsultować to z asystentem AI, który wcieli się w rolę konstruktywnego krytyka:

Pamietajmy jednak, by również krytycznie analizować rekomendacje AI i dostosowywać je do konkretnych potrzeb biznesowych i technicznych.

Do analizy stacku wykorzystałem następujący prompt:

```
&lt;tech-stack&gt;
{{tech-stack}} &lt;- wprowadź tutaj opis swojego stacku 
&lt;tech-stack&gt;

Dokonaj krytycznej lecz rzeczowej analizy czy &lt;tech-stack&gt; odpowiednio adresuje potrzeby @prd.md. Rozważ następujące pytania:
1. Czy technologia pozwoli nam szybko dostarczyć MVP?
2. Czy rozwiązanie będzie skalowalne w miarę wzrostu projektu?
3. Czy koszt utrzymania i rozwoju będzie akceptowalny?
4. Czy potrzebujemy aż tak złożonego rozwiązania?
5. Czy nie istnieje prostsze podejście, które spełni nasze wymagania?
6. Czy technologie pozwoli nam zadbać o odpowiednie bezpieczeństwo?
```

Po analizie i podjęciu decyzji, stack zapisujemy w repozytorium projektu w folderze .ai/tech-stack.md.

## Inicjalizacja repozytorium GitHub

Kluczowym krokiem po zdefiniowaniu PRD i wyborze technologii jest inicjalizacja repozytorium GitHub. W pracy z AI-assisted programming ten etap nabiera szczególnego znaczenia z kilku powodów:

Zapisywanie stabilnej wersji projektu – Praca z AI może prowadzić do nieoczekiwanych błędów. System kontroli wersji umożliwia szybki powrót do ostatniej działającej wersji, pozwalając bezpiecznie eksperymentować z AI.

Historia i kontekst dla AI – Modele AI nie posiadają pamięci długoterminowej, repozytorium dostarcza kontekst całego projektu oraz zmian jakie zachodziły w nim na przestrzeni czasu.

Proces inicjalizacji repozytorium zaprezentowałem tutaj. Najpewniej dla większości uczestników 10xDevs będzie to oczywiste, ale dbamy o wszystkich 🫡

Jeżeli chodzi o commit messages, to rekomendujemy korzystanie z Conventional Commits.

Swoje repozytorium utworzysz w ramach ćwiczeń praktycznych, które czekają na Ciebie pod koniec lekcji.

## Generowanie prototypu z Bolt.new
![](https://assets-v2.circle.so/vf4f15d3tnpi4okpco2najk4kv2h)
Bolt.new od StackBlitz to narzędzie zaprojektowane specjalnie do szybkiego generowania aplikacji full-stack bez konieczności konfigurowania lokalnego środowiska deweloperskiego. To świetne rozwiązanie do tworzenia Proof of Concept (PoC) na podstawie wcześniej zdefiniowanego PRD.

Czym wyróżnia się Bolt?

Bolt.new wyróżnia się przede wszystkim swoim podejściem do tworzenia aplikacji bezpośrednio w przeglądarce. Eliminuje potrzebę lokalnej konfiguracji, co znacząco przyspiesza proces prototypowania i umożliwia błyskawiczne przekształcenie koncepcji w działający kod.

Narzędzie radzi sobie z najpopularniejszymi frameworki z ekosystemu JavaScript (Astro, React, Angular, Vue itd.), co daje nam elastyczność w doborze technologii bez konieczności dostosowywania się do sztywnych ram narzuconych przez platformę.

Jedną z kluczowych zalet Bolt jest natywne wsparcie dla Supabase, co ułatwia tworzenie aplikacji fullstackowych z funkcjonalnościami takimi jak auth czy przechowywanie danych.

Kiedy warto sięgnąć po Bolta?

Bolt szczególnie przydaje się, gdy chcemy przetestować koncepcję przed zaangażowaniem większych zasobów, lub gdy potrzebujemy przedstawić funkcjonalny prototyp interesariuszom w firmie.

Bolt to jedno z pierwszych narzędzi tego typu, ale pojawia się co raz liczniejsza konkurencja. W porównaniu do usług takich jak v0 (Vercel) czy Lovable, Bolt oferuje najszybszy czas generowania aplikacji full-stack, dając jednocześnie pełen wgląd w kod.

Jak Bolt wykorzystuje potencjał AI?

Cały proces tworzenia aplikacji w Bolt jest oparty o AI. Narzędzie bazuje na modelach językowych, przede wszystkim Claude Sonnet, które wykorzystuje do interpretacji promptów i generowania kodu.

Co więcej, Bolt umożliwia uploadowanie obrazów lub plików jako punktów wyjścia dla UI, co jest szczególnie przydatne, gdy mamy już gotowy design aplikacji.

Sam proces tworzenia aplikacji ma charakter konwersacyjny – możemy iteracyjnie udoskonalać aplikację poprzez kolejne wskazówki i sugestie, obserwując w czasie rzeczywistym, jak zmienia się nasza aplikacja.

Generowanie PoC z Bolt.new na podstawie PRD

W następnym filmie zobaczysz, jak wykorzystać PRD do szybkiego wygenerowania funkcjonalnego prototypu. Pokażę proces przekształcania wymagań z PRD na skutecznego prompta dla Bolt, co jest kluczowym elementem efektywnej pracy z tą usługą:

&quot;Problem 70%&quot; przy pracy z Bolt.new

&quot;Problem 70%&quot; odnosi się do zjawiska, gdy narzędzia generujące kod doskonale radzą sobie z pierwszymi 70% implementacji, ale napotykają trudności z pozostałymi 30%. Przejawia się to w następujący sposób:

Ograniczenia w złożoności - Bolt świetnie generuje podstawową strukturę aplikacji, ale ma problemy z implementacją złożonej logiki biznesowej

Trudności z customizacją - Modyfikacja wygenerowanego kodu pod specyficzne wymagania często wymaga znacznego nakładu pracy

Pułapka rozpędu - Po szybkim wygenerowaniu 70% aplikacji, istnieje pokusa kontynuowania w tym środowisku, mimo że to nieoptymalne

Kwestie najlepszych praktyk - Kod wygenerowany przez Bolt może nie uwzględniać najlepszych praktyk a ciężko mieć na tym kontrolę gdy generujemy całą aplikację “w kilku strzałach”

Stąd właśnie nasza rekomendacja, aby wykorzystywać Bolta do prototypowania zamiast próby wygenerowania kompletnego MVP.

Na zakończenie

Choć Bolt jest świetnym narzędziem do prototypowania, warto pamiętać o tzw. &quot;problemie 70%&quot; – w pewnym momencie rozwijania aplikacji napotkasz ograniczenia, i często efektywniej będzie zacząć samodzielnie od 0 - tak też zrobimy w dalszych lekcjach.

Ważne: Nie jesteśmy sponsorowani przez Bolt. To nasze ulubione rozwiązanie tego typu, i stąd rekomendacja w kursie 10xDevs.

## 🏁 Podsumowanie lekcji

Planowanie z wykorzystaniem AI pozwala przekształcić tygodnie pracy w godziny produktywnych działań. Kluczowe elementy tego procesu to:

Precyzyjne zdefiniowanie problemu i zakresu MVP

Jasne rozróżnienie między POC a MVP

Stworzenie dokładnego PRD jako kontekstu dla AI

Dobór odpowiedniego stacku technologicznego

Szybkie prototypowanie z narzędziami jak Bolt.new

Świadomość pułapek i ograniczeń pracy z AI

W kolejnej lekcji przejdziemy przez proces definiowania “Rules for AI” oraz bootstrapowania szkieletu projektu.

## 👨‍💻Ćwiczenia praktyczne

Zadanie 1: Analiza i wybór pomysłu na projekt certyfikacyjny

Cel: Naucz się wykorzystywać AI do analizy i walidacji pomysłów na projekty.

Zdecyduj jaki projekt zaliczeniowy do certyfikatu 10xDevs będziesz realizował w ramach kursu:

Jeden z rekomendowanych pomysłów na aplikację

Swój własny pomysł

Jeżeli zdecydujesz się na własny pomysł, wykorzystaj modele z reasoningiem takie jak (o1, o3-mini, Claude 3.7 Sonnet Thinking, Gemini 2.5 Pro), aby przeanalizować wybrany pomysł pod kątem:

Realnego problemu, który rozwiązuje

1-2 kluczowych funkcji

Wykonalność w dostępnym czasie (6 tygodni po godzinach pracy, realizując przy tym kurs)

Potencjalnych trudności

Do analizy pomysłu wykorzystaj poniższy prompt:

```
&lt;project-idea&gt;
{{DESCRIPTION}} - krótki opis pomysłu, który rozważasz
&lt;/project-idea&gt;

Jestem programistą i analizuje pomysł na projekt, nad którym będę pracował w ramach kursu 10xDevs. Interesuje mnie analiza pod kątem poniższych kryteriów:
1. Czy aplikacja rozwiązuje realny problem?
2. Czy w aplikacji można skupić się na 1-2 kluczowych funkcjach?
3. Czy jestem w stanie wdrożyć ten pomysł do 6 tygodni pracując nad nim po godzinach z AI?
4. Potencjalnych trudności

Zanim przejdziesz do analizy pomysłu, zapytaj mnie o moje doświadczenie, preferowany stack technologiczny i inne istotne kwestie, które będą miały wpływ na realizację pomysłu.
```

Na podstawie odpowiedzi AI, wybierz projekt do dalszego rozwijania - masz kilka pomysłów? Przeprowadź kilka konwersacji dot. różnych pomysłów.

Zadanie 2: Stworzenie PRD dla wybranego projektu

Cel: Nauczysz się wykorzystywać AI do generowania dokumentacji projektowej

Utwórz folder, w którym będziesz rozwijał projekt z nazwą odpowiadającą wybranemu projektowi

W konwersacji z AI w swoim edytorze (lub usłudze web chat) przejdź przez dwie rundy sesję planowania i wygeneruj podsumowanie. Wykorzystaj prompty z lekcji.

Wygeneruj PRD na bazie wysokopoziomowego opisu MVP oraz notatek z sesji planistycznej.

Przeanalizuj wygenerowany PRD i wprowadź niezbędne poprawki, aby upewnić się że:

Zawiera wszystkie kluczowe sekcje

User stories są kompletne i testowalne

Granice projektu są jasno określone

MVP jest realistyczny do wykonania w założonym czasie

Zapisz finalną wersję PRD w pliku .ai/prd.md w repozytorium projektu.

Zadanie 3: Wybór i weryfikacja stacku technologicznego

Cel: Nauczysz się wykorzystywać AI do podejmowania decyzji technologicznych

Poproś model z reasoningiem o ocenę, czy preferowany przez Ciebie stack jest odpowiedni dla Twojego projektu.

Wykorzystaj prompt do analizy stacku technologicznego

Na podstawie odpowiedzi, podejmij decyzję o stacku technologicznym i zapisz jego opis w .ai/tech-stack.md w repozytorium projektu.

Zadanie 4: Inicjalizacja repozytorium GitHub z kontekstem dla AI

Cel: Przygotujesz środowisko Git, które zapewni wersjonowanie i bezpieczeństwo.

Utwórz nowe repozytorium na GitHub z nazwą odzwierciedlającą Twój projekt

Wykonaj komendy:

```
git init
git add .
git commit -m &quot;chore: initial commit with context for AI&quot;
git push git remote add origin git@github.com:&lt;twoj-username-na-gh&gt;/&lt;nazwa-projektu-na-gh&gt;.git
git branch -M master
git push -u origin master
```

(Opcjonalnie) Zadanie 5: Prototypowanie z Bolt.new

Cel: Nauczysz się wykorzystywać AI do szybkiego generowania Proof of Concept

W edytorze wykorzystaj .ai/prd.md i .ai/tech-stack jako bazę dla prompta do Bolta, prosząc o wygenerowanie prostego prototypu Twojej aplikacji:

Na podstawie opisu MVP z @prd.md oraz stacku technologicznego z @tech-stack.md przygotuj prompt dla generatora proof of concept, który pozwoli nam zweryfikować podstawową funkcjonalność aplikacji czyli {{KEYFEATURE}}. Wyklucz wszystkie nadmiarowe funkcje. Zaznacz, aby generator rozplanował pracę i uzyskał moją akceptację zanim przejdzie do tworzenia PoC.Wskazówka: {{KEYFEATURE}} podmień na kluczową funkcje MVP i skup się na jej implementacji w prototypie.

Wejdź na stronę Bolt i wykorzystaj prompt do wygenerowania POC
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)