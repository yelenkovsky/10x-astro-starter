<!DOCTYPE html>![](https://assets-v2.circle.so/b49ill0imluhdmyicrda43s44vxz)
Sztuczna inteligencja zmienia sposób, w jaki pracujemy jako programiści, ale jej skuteczność zależy w dużej mierze od tego, jak dopasujemy ją do potrzeb naszego projektu. W tej lekcji skupimy się na odpowiednim przygotowaniu środowiska projektowego oraz stworzeniu reguł dla AI, które znacząco podniosą jakość generowanego kodu.

Dlaczego to takie ważne? Nawet najlepsze modele językowe, jak Claude Sonnet, mogą generować kod niedostosowany do konkretnych wymagań projektu, używać nieaktualnych wzorców albo być niespójne ze standardami przyjętymi w zespole. Problem ten jest szczególnie widoczny, gdy pracujemy z nowymi wersjami frameworków (np. Angular 19, Svelte), wydanymi już po dacie knowledge cutoff dla danego modelu AI (obecnie standardem knowledge cutoff jest końcówka 2023, początek 2024 roku).

W ramach tej lekcji nauczysz się:

Skonfigurować lintery i narzędzia statycznej analizy kodu wspierające pracę z AI

Tworzyć efektywne Rules for AI dostosowane do różnych edytorów

Aktualizować dokumentację projektu wraz z wprowadzaniem zmian i rozszerzeń

Zaczynajmy!

## Generowanie szkieletu aplikacji

Czy kiedykolwiek próbowałeś poprosić AI o wygenerowanie całego projektu od zera? Jeśli tak, to zapewne zauważyłeś problemy: niekompletne pliki, nieaktualne zależności, błędy w konfiguracji.

Dlaczego nie warto generować projektu od zera z AI

Generowanie całego projektu od podstaw przy użyciu AI to ryzykowne podejście z kilku powodów:

Niespójność struktury - AI może pominąć istotne pliki konfiguracyjne i zastosować suboptymalną strukturę folderów/plików

Nieaktualne zależności - LLMy mogą proponować przestarzałe, lecz popularne wersje bibliotek

Trudności w debugowaniu - wiele problemów może ujawnić się dopiero w trakcie pracy

Stąd warto skorzystać z oficjalnych narzędzi do bootstrapowania projektów, a modele wykorzystywać do rozbudowy i dostosowania istniejącego szkieletu.

W naszym przypadku, dla projektu 10xCards, bazującego na Astro, React i TypeScript, proces jest opisany w dokumentacji Astro:
![](https://assets-v2.circle.so/bsdljnqgl0kf3w53bqly7xt0rw2v)
Przed rozpoczęciem pracy z projektem, należy również zadbać o odpowiednią wersję Node.js. W pliku .nvmrc (dla użytkowników nvm) ustawimy wymaganą wersję 22.14.0, która jest obecnie oznaczona jako LTS.

W ten sposób zachowujemy kontrolę nad procesem bootstrapowania - dzięki czemu mamy pewność, że struktura projektu jest zgodna z obecnymi standardami, a wprowadzone zależności są aktualne i faktycznie dostosowane do naszych potrzeb.

To jeden z przypadków, w których odstawienie modeli jest rozsądnym podejściem, które będzie procentowało przez całe życie projektu.

### Statyczna analiza kodu i jej wpływ na pracę modeli

Lintery i formattery to narzędzia do statycznej analizy kodu, które pomagają wykrywać błędy, niespójności i potencjalne problemy w projekcie. W ekosystemie JavaScript/TypeScript najpopularniejszymi rozwiązaniami są ESLint oraz Prettier.

Topowe edytory AI (Cursor, Windsurf) wykorzystują informacje o błędach i ostrzeżeniach zwracanych przez te narzędzia, aby w czasie rzeczywistym wprowadzać poprawki do wygenerowanego kodu.

Zamiast szczegółowo omawiać proces konfiguracji, skupmy się na tym, jak lintery współpracują z AI w poszczególnych edytorach:

Cursor

Najlepsza integracja. Cursor automatycznie odczytuje pliki konfiguracyjne (.eslintrc, .prettierrc, tsconfig.json) oraz stosuje zawarte w nich reguły przy generowaniu kodu. Wykrywa błędy zgłaszane przez linter, sugeruje poprawki i potrafi uruchamiać komendy typu lint:fix.

Dokumentacja potwierdza, że integruje się z narzędziami z ekosystemu JavaScript/TypeScript (dokumentacja) oraz Python (dokumentacja).

Jeżeli chodzi o limity: skorzystanie z feedbacku linterów jest traktowane jako pojedyncze wykorzystanie narzędzia (tool call). W ramach jednej odpowiedzi agenta na prompt mamy limit 25 tool calli. Rozliczamy się z samej odpowiedzi (500 fast request w planie Pro), a nie wykorzystania narzędzi.

Windsurf

Srebrny medal. Rozpoznaje pliki konfiguracyjne i stosuje standardowe ustawienia (np. standardowy setup ESLint dla React), może wywoływać komendy typu lint:fix, ale nie oferuje tak rozbudowanej integracji jak Cursor.

Dokumentacja potwierdza, że integruje się z rozwiązaniami z ekosystemu JavaScript/TypeScript (dokumentacja). Każde udana poprawka w oparciu o lintery kosztuje 1 Flow Action (z 1500 dostępnych w planie Pro), co sprawia że Cursor jest tutaj znacznie bardziej przystępny cenowo.

GitHub Copilot

Nie uwzględnia konfiguracji linterów przy generowaniu kodu, pozwala jednak rozwiązywać błędy wskazywane przez lintery za pomocą integracji “Quick Fix”, która przekazuje błąd do Copilot Chat.

JetBrains AI Assistant

Analogicznie jak w przypadku Github Copilot - brak bezpośredniej integracji z linterami, ale jest możliwość przekazania błędu do Chatu i debugowanie go z modelem.

—

Wspominamy o tym nie pierwszy (i nie ostatni) raz: najpewniej konkurencja będzie z czasem równała do poziomu Cursora, pogłębiając swoją integrację z narzędziami do statycznej analizy kodu. Trzymamy również kciuki za poszerzanie zakresu wspieranych ekosystemów poza JS/TS i Python.

Wyzwania z konfiguracją ESLint

Konfiguracja ESLint dla projektu łączącego Astro, React i TypeScript jest czasochłonna i frustrująca - ekosystem ESlint przechodził na przestrzeni ostatnich lat duże zmiany (nowy format konfiguracji) i opiera się na współpracy wielu zależności.

Modele mają ograniczoną skuteczność we wspieraniu nas przy tego typu zadaniach. Dlaczego? Poprawna konfiguracja ESLint łącząca Astro, React i TypeScript nie jest szeroko opisana w internecie, a  większość źródeł nt. ESLint bazuje na starym formacie konfiguracji i nieaktualnych wersjach zależności.

Oczywiście za pomocą wyspecjalizowanych promptów moglibyśmy sobie poradzić z tym problemem, tylko warto zadać sobie pytanie: po co? Konfiguracja linterów od zera to wyzwanie, które występuje jednorazowo przy bootstrapie projektu i nie jest kluczowe dla sukcesu biznesowego projektu.

W takich przypadkach, jak za starych dobrych czasów, lepiej skorzystać z dokumentacji i doświadczenia kolegów po fachu prosto z Github Issues:

Dokumentacja eslint-plugin-astro

Jak skonfigurować Astro + React + TypeScript w ESLint (Github Issue)

Nie chcesz poświęcać na to czasu? Nie ma problemu, możesz skorzystać z naszego startera 10x-astro-starter, który dostarcza gotowy szkielet z Astro, Reactem, Tailwindem oraz TypeScriptem w połączeniu z działającą konfiguracją ESLint, Prettier, husky oraz lint-staged.
![](https://assets-v2.circle.so/43kkzfnx020ulzj2aje7ohe1i8w0)
Ten projekt to tzw. “template repository” - w prawym górnym rogu zobaczysz przycisk “Use this template” - kliknij w niego, a następnie “Create a new repository” żeby na twoim profilu GitHub znalazła się twoja osobista kopia. Na nowym repo możesz już wykonać `git clone` i szykować się do pracy.
![](https://assets-v2.circle.so/cadj7mxtrzfy1mwhl3w36qzgaw8h)
👉 Dla użytkowników Windowsa: Pierwsze uruchomienie projektu może skutkować błędem zależności narzędzia “rollup” - sugerowane rozwiązania w tym wątku (usunięcie package-locka, node_modules i ponowna instalacja u nas naprawiła problem). Upewnij się również, że pracujesz z Node 22.

## Personalizacja modeli dzięki “Rules for AI”

Samo posiadanie dobrze skonfigurowanych linterów to dopiero początek. Prawdziwy potencjał współpracy z asystentami AI realizuje się, gdy dostosujemy modele do specyficznych wymagań naszego projektu za pomocą “Rules for AI”.

Dlaczego personalizacja AI jest niezbędna?

Modele językowe, nawet te najbardziej zaawansowane, mają swoje ograniczenia. Zostały wytrenowane na ogólnodostępnych danych, które mogą nie być dostosowane do konwencji i praktyk, na których zależy nam w projekcie. Problem staje się szczególnie widoczny, gdy:

Pracujesz z technologiami, które zostały wydane lub znacząco zaktualizowane po dacie knowledge cutoff modelu

Twój zespół stosuje niestandardowe konwencje nazewnictwa lub architektury

Projekt wymaga specyficznego podejścia do testowania, logowania czy obsługi błędów

Bez odpowiednich wytycznych, nawet najlepszy model AI może generować kod, który wymaga znaczących poprawek, co może niwelować korzyści płynące z jego wykorzystania.

Problemy kodu generowanego bez Rules for AI

Zanim przejdziemy do tworzenia reguł, zobaczmy przykładowy kod, który możemy otrzymać z modelu  bez konfiguracji odpowiednich reguł. Dla stacku z Astro, React, TypeScript i Tailwind, może to wyglądać następująco:

```
// Przykładowy kod wygenerowany bez Rules for AI
class FlashcardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      question: this.props.question,
      answer: this.props.answer
    };
  }

  componentWillMount() {
    console.log(&#39;Component will mount&#39;);
  }

  flipCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    return (
      &lt;div className=&quot;flashcard-container&quot; onClick={() =&gt; this.flipCard()}&gt;
        &lt;div className={this.state.isFlipped ? &#39;hidden&#39; : &#39;&#39;}&gt;
          &lt;h3&gt;{this.state.question}&lt;/h3&gt;
        &lt;/div&gt;
        &lt;div className={!this.state.isFlipped ? &#39;hidden&#39; : &#39;&#39;}&gt;
          &lt;p&gt;{this.state.answer}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}
```

Powyższy kod ma liczne problemy. Wykorzystuje komponent klasowy zamiast funkcyjnego, stosuje przestarzałe metody cyklu życia (componentWillMount), brakuje również statycznego typowania (TypeScript) i klas Tailwind CSS do stylowania.

Co zyskasz dzięki personalizacji?

Lepsza integracja  - modele lepiej zrozumieją strukturę i filozofię Twojego projektu

Spójność kodu - LLMy będą generowały rozwiązania bardziej zgodne z konwencjami i stackiem stosowanym w projekcie

Wyższą jakość - uwzględnienie specyficznych wymagań dotyczących jakości, bezpieczeństwa, wydajności czy testowania

Oszczędność czasu - mniej poprawek i refaktoryzacji wygenerowanego kodu

To istotne korzyści, stąd warto poznać mechanizmy personalizacji oferowane w wykorzystywanym przez Ciebie edytorze.
![](https://assets-v2.circle.so/4vijeyqjtfw59nc4kpj4ms9t6vmc)
👉 Teraz zapoznaj się z naszym poradnikiem “Personalizacja AI dla programisty”, który dogłębnie omawia te zagadnienia. Udostępnialiśmy ten materiał jako podziękowanie za zapisanie się na listę mailingową 10xDevs przed startem kursu. Stanowi on integralną część tej lekcji, stąd:

Nie czytałeś? Zapraszamy do lektury!

Czytałeś? Warto sobie odświeżyć, pojawiła się aktualizacja dla reguł w Cursorze 0.47+.

## Definiowanie Rules for AI

Wsparcie w procesie definiowania reguł: 10xRules.ai
![](https://assets-v2.circle.so/vfe52j331ldup56wb44i4ud04mm5)
10xRules.ai to aplikacja webowa, który pomaga w generowaniu reguł dla AI na podstawie informacji o projekcie. Narzędzie przyspiesza proces definiowania reguł dla dowolnego stacku technologicznego - nie musimy robić tego samodzielnie od zera.

W skrócie proces korzystania z 10xRules.ai wygląda następująco:

Wybierz sposób dostarczenia informacji o projekcie:

Ręczne wybranie technologii z dostępnej listy

Przesłanie pliku package.json (dla projektów Node.js)

Przesłanie pliku requirements.txt (dla projektów Python)

Generowanie reguł:

Narzędzie automatycznie dostosowuje reguły do formatu wybranego edytora (Cursor, Copilot, itp.)

Upewnij się, że wszystkie potrzebne reguły zostały dodane

Pobierz pliki z regułami lub skopiuj je bezpośrednio do edytora

Zapisz reguły w formacie zgodnym z Twoim edytorem

Doprecyzuj szczegóły reguł:

Wersje technologii

Konwencje nazewnictwa

Struktura katalogów

Preferowane wzorce i konwencje

Nie znalazłeś u nas zasad dostosowanych do Twojego stacku? Skorzystaj z konkurencyjnego rozwiązania jakim jest cursor.directory i/lub zgłoś PRa do 10xRules - więcej informacji znajdziesz w repozytorium projektu.

Teraz, gdy rozumiesz już dlaczego personalizacja AI jest tak ważna i jak działa w poszczególnych edytorach, przejdźmy do omówienia reguł dla AI dostosowanego do stacku projektu 10xCards:

## Aktualizacja dokumentacji ze wsparciem AI

Na tym etapie mamy przygotowany szkielet projektu. Możemy teraz wygenerować plik README.md, które przekaże najważniejsze informacje o projekcie:

Do wygenerowania README, wykorzystałem następujący prompt dla modeli reasoningowych:

```
Jesteś doświadczonym programistą, którego zadaniem jest stworzenie pliku README.md dla projektu GitHub. Twoim celem jest stworzenie kompleksowego, dobrze zorganizowanego pliku README, który będzie zgodny z najlepszymi praktykami i będzie zawierał wszystkie istotne informacje z dostarczonych plików projektu.

Oto pliki projektu, które należy przeanalizować:

&lt;prd&gt;
@prd.md
&lt;/prd&gt;

&lt;tech_stack&gt;
@tech-stack.md
&lt;/tech_stack&gt;

&lt;dependencies&gt;
@package.json
@.nvmrc
&lt;/dependencies&gt;

Twoim zadaniem jest utworzenie pliku README.md o następującej strukturze:

1. Project name
2. Project description
3. Tech stack
4. Getting started locally
5. Available scripts
6. Project scope
7. Project status
8. License

Instrukcje:
1. Uważnie przeczytaj wszystkie dostarczone pliki projektu.
2. Wyodrębnij odpowiednie informacje dla każdej sekcji README.
3. Zorganizuj informacje w określoną strukturę.
4. Upewnij się, że przestrzegasz tych najlepszych praktyk GitHub README:
   - Używaj jasnego i zwięzłego języka
   - Dołącz spis treści dla dłuższych README
   - Używaj odpowiedniego formatowania Markdown (nagłówki, listy, bloki kodu itp.).
   - Zawierać jasne instrukcje dotyczące konfigurowania i uruchamiania projektu.
   - Uwzględnianie znaczników tam, gdzie jest to istotne (np. status kompilacji, wersja, licencja).
   - Link do dodatkowej dokumentacji, jeśli jest dostępna
5. Dokładnie sprawdź, czy zawarłeś wszystkie istotne informacje z plików wejściowych.

Przed napisaniem ostatecznego README, zawiń swoją analizę wewnątrz znaczników &lt;readme_planning&gt; w bloku myślenia. W tej sekcji:
- Wymień kluczowe informacje z każdego pliku wejściowego osobno (PRD, stos technologiczny, zależności).
- Utwórz krótki zarys dla każdej sekcji README.
- Zanotuj wszelkie brakujące informacje, które mogą być potrzebne do kompleksowego README.

Proces ten pomoże zapewnić dokładne i dobrze zorganizowane README.

Po przeprowadzeniu analizy, dostarcz pełną zawartość README.md w formacie Markdown.

Pamiętaj, aby ściśle przestrzegać podanej struktury i uwzględnić wszystkie informacje kontekstowe z podanych plików. Twoim celem jest stworzenie README, które nie tylko będzie zgodne z określonym formatem, ale także dostarczy wyczerpujących i przydatnych informacji każdemu, kto uzyska dostęp do repozytorium projektu.

Końcowy wynik to wyłącznie utworzenie pliku README.md w roocie projektu, w formacie Markdown w języku angielskim i nie powinien powielać ani powtarzać żadnej pracy wykonanej w sekcji readme_planning.
```

## 🏁 Podsumowanie

W tej lekcji poznaliśmy kluczowe aspekty personalizacji AI dla programisty:

Samodzielny bootstrap - zamiast “kopać się z AI”, lepiej oprzeć się na oficjalnych szablonach i podwinąć rękawy. Świadomość ograniczeń modeli jest kluczem do satysfakcjonującej pracy z ich wykorzystaniem.

Integracja z linterami - jeżeli pracujesz z Cursorem lub Windsurfem w ekosystemach JS/TS lub Python, narzędzia statycznej analizy kodu automatycznie dostarczą cenne wskazówki dla AI. Pracujesz w innym setupie? Tak czy inaczej warto inwestować w konfigurację statycznej analizy kodu na poziomie edytora, przekazywanie feedbacku z linterów do modeli będzie wymagało jednak więcej pracy manualnej (przynajmniej na razie 😉)

Personalizacja z AI - reguły dla AI redukują halucynacje i podnoszą jakość kodu bez konieczności ciągłego powtarzania naszych preferencji i oczekiwań. Miej jednak na uwadze, że modele traktują te reguły jako przydatne sugestie a nie przykazania.

Pamiętaj, że nawet najlepiej skonfigurowane AI jest wciąż tylko narzędziem, które wymaga pilnego nadzoru. Konfiguracja linterów i reguły dla AI pomagają modelom generować lepszy kod, ale to 10xDev jest odpowiedzialny za końcową ocenę jakości kodu i wprowadzanie niezbędnych poprawek.

## 👨‍💻 Ćwiczenia praktyczne

Zadanie 1: Konfiguracja projektu

Cel: Utworzenie i skonfigurowanie projektu z odpowiednimi regułami dla AI.

Instrukcje:

1a. Jeżeli pracujesz z rekomendowanym stackiem Astro/React/TS:

Sklonuj repozytorium 10x-astro-starter i przekopiuj jego zawartość do repozytorium projektu

Pamiętaj o modyfikacji pola “name” w package.json i package-lock.json

Upewnij się, że masz zainstalowany Node.js w wersji 22.14.0

Upewnij się, że masz zainstalowane wtyczki do VS Code: Astro, ESLint oraz Prettier.

1b. Jeżeli pracujesz z własnym stackiem:

Wykorzystaj preferowane metody bootstrapowania projektu w danym ekosystemie

Odwiedź strony 10xRules.ai oraz cursor.directory, i wyszukaj reguły dla wykorzystywanych technologii

Pobierz wygenerowane pliki w formacie dla Twojego edytora

Zaimplementuj pobrane reguły w swoim projekcie:

Cursor: .cursor/rules/{rule}.mdc

Windsurf: .windsurfrules

Github Copilot: .github/copilot-instructions.md

Ważne: Pamiętaj o opisie stacku i struktury projektu. Nie przesadzaj z ilością reguł, stawiaj na konkrety i nie popadaj w perfekcjonizm - możesz edytować reguły z czasem, na bazie ekspertymentów.

👉 Ku pokrzepieniu serc: po wykonaniu tego zadania, będziemy mogli ponownie zbić piątkę z modelami i osiągać imponujące rezultaty w zaskakującym tempie.
![](https://assets-v2.circle.so/s0q5ar8vqcyq1hqxne8m5slk20dj)
Zadanie 2 (Opcjonalne): Porównanie kodu generowanego z regułami i bez reguł

Cel: Praktyczne zrozumienie wpływu Rules for AI na jakość generowanego kodu.

Instrukcje:

Dla wybranego edytora, wyłącz na chwilę Rules for AI:

Cursor: Przełącz wszystkie reguły w tryb “Manual”

Github Copilot: Wyczyść zawartość pliku .github/copilot-instructions.md

Windsurf: Wyczyść zawartość pliku .windsurfrules

Poproś AI o wygenerowanie komponentu lub endpointa dopasowanego do kontekstu Twojego projektu. Przykładowy prompt:

Wygeneruj komponent fiszki (Flashcard). Komponent powinien wyświetlać pytanie, a po kliknięciu pokazywać odpowiedź. Przygotuj stronę /flashcards, która będzie wyświetlała przykładową fiszkę dotyczącą Reacta.Zobacz jak agent poradził sobie z realizacją zadania (bardzo możliwe, że próba skończy się porażką i chaosem)

Wycofaj wprowadzone zmiany i przywróć Rules for AI do stanu wyjściowego.

Poproś AI o ponowną realizację zadania, z wykorzystaniem tego samego prompta. Dodaj jednak bezpośrednią referencję do plików z regułami (to istotne, aby na 100% zostały zaaplikowane również dla nowych plików). Przykładowy prompt dla Cursora:

```
Wygeneruj komponent fiszki (Flashcard). Komponent powinien wyświetlać pytanie, a po kliknięciu pokazywać odpowiedź. Przygotuj stronę /flashcards, która będzie wyświetlała przykładową fiszkę dotyczącą Reacta. 

@shared.mdc @frontend.mdc @react.mdc @astro.mdc
```

Porównaj dwie sesje pracy agenta, zwracając uwagę na:

Czy agent rozpoznał strukturę projektu?

Czy agent wykorzystał poprawnie stack?

Zgodność z najlepszymi praktykami

Wycofaj wprowadzone zmiany, pracą nad aplikacją zajmiemy się w kolejnych lekcjach ;).

### Zadanie 3: Generowanie README z wykorzystaniem PRD i tech-stack

Cel: Praktyczne wykorzystanie AI do generowania dokumentacji projektu.

Instrukcje:

Poproś model rozumujący (o3-mini, DeepSeek R1) o wygenerowanie kompletnego README.md na podstawie prompta z lekcji.

Oceń wygenerowany README pod kątem:

Kompletności informacji

Czytelności i organizacji

Zgodności z prd.md i tech-stack.md

Wprowadź niezbędne korekty i zacommituj plik.
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)