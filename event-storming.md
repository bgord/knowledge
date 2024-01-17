# Event storming

## Event storming - co to jest, jaki ma cel

- definicja

  - event storming

    - technika kolaboracji i modelowania procesów biznesowych
    - nowe i istniejące aplikacje, legacy
    - wizualizacja działania aplikacji
    - odkrywanie zachowań i inerakcji systemu
    - identyfikacja zasad biznesowych
    - zbliżanie biznesu i osób technicznych

  - domain driven design
    - podejście do oprogramowania skupione na domenie
    - sercem jest model
      - projekcja Merkatora (zniekształcenie, Grenlandia jest za duża w porównaniu z Afryką)

- rodzaje event stormingu

  - big picture (as is/to be) - na tym się skupimy
  - process level
  - design level

- cel event stormingu

  - big picture

    - zmapowanie systemu
    - poznanie problemów
    - wyjasnienie wątpliwości
    - znalezienie okazji na rozwój
    - wydzielenie domen
    - unikamy zagłębiania się w technikalia
    - dowiedzenie się, czy nie robimy CRUDa

  - process level

    - skupia się na rozwiązaniach technicznych
    - komendy
    - read modele
    - polityki

  - design level
    - przenoszenie modelu 1 do 1 do kodu
    - wyznaczanie agregatów
    - zmiana w modelu -> zmiana w kodzie

- kto powinien brać udział
  - eksperci domenowi
  - biznes
  - osoby techniczne
  - facylitator

## Mechanika event stormingu

- czym jest event

  - zmienia stan systemu
  - ma konsekwencje
  - jest przez kogoś/coś wywoływany
  - może zmieniać widok w aplikacji
  - pisany w czasie przeszłym
  - ważny dla domeny
  - nieodwołalny
  - minimym danych
  - zawiera intencję (nie form submitted, tylko dodano ogłoszenie)
  - najlepiej nie CRUDowy (create/read/update/delete)
  - korzysta z ubiquitous language

- rodzaje eventów

  - środowiskowe (wejście do systemu, odwiedzenie konkretnej podstrony)
  - poziom UI (wybrano datę rezerwacji, wybrano liczbę produktów w koszyku)
  - infrastrukturalne (wysłano metrykę do analytiki, dodano wiadomość do kolejki)
  - domenowe - nad tymi się skupiamy

- ubiquitous language

  - rozumiany przez biznes i osoby techniczne
  - używany w kodzie i modelu
  - ułatwia kolaborację
  - unikamy wieloznaczności

- inne rodzaje kartek

  - event - pomarańczowy - dodano produkt do koszyka, naliczono rabat
  - aktor - ciemnożółty - zalogowany użytkownik, admin
  - hotspot - czerwony - połączenie z X jest wolne
  - system zewnętrzny - różowy - Stripe
  - polityka - żółty - maksymalnie pięć produktów w koszyku
  - widok - zielony - strona logowania
  - info - biały - dodatkowe informacje

- chaotyczne dodawanie zdarzeń

- układanie sekwencji zdarzeń w czasie

- zaznaczanie hotspotów

- grupowanie procesów biznesowych

- priorytetyzacja

- zaznaczanie krytycznej części systemu

- wyznaczanie domen (jak w firmie: księgowość, magazyn, kurier, płatności, marketing)

## Przykład

- link do Miro Test data repository

## Heurystyki

- reverse narrative (zdarzenie końcowe, co musi się zadziać przedtem?)

- czy można powtórzyć ten sam event?

- co jeżeli operacja się nie powiedzie?

- czy można anulować konsekwencje zdarzenia?

- 0/50/100/150

  - 0% (nie opłacono)
  - 50% (opłacono częściowo)
  - 100% (opłacono całość)
  - 150% (nadpłata)

- wyznaczanie granic pomiędzy modułami systemu

  - wykrywanie maszyn stanu (utworzono draft ogłoszenia -> zlecono publikację ogłoszenia -> anulowano zlecenie publikacji -> opublikowano ogłoszenie)
  - pivotal events (wydano do wysyłki - przejście z etapu zamówienia do etapu dostawy)

- unikać property sourcing

  - być może zmiana tego pola to część biznesowego procesu?
  - np. FirstNameUpdated -> PersonalDataChanged (z typem opcjonalnym)

- unikać state obsession

  - nie tracić informacji biznesowej (account withdrawed [amount] zamiast balance updated [balance])
  - albo jedno i drugie dla łatwiejszych read modeli

- "Co jeśli...?"
- "Co się może zdarzyć pomiędzy eventami?"

- "Co jest końcowym efektem?"
- "Co jeszcze może mieć taki sam efekt?"

## Edukacja

- książka Brandolini - "Introducing Event Storming" - https://www.eventstorming.com/book

- Mariusz Gil

- event sourcing

- wzorce strategiczne domain-driven-design

  - bounded context
  - anticorruption layer
  - shared kernel

- wzorce taktyczne domain-driven-design
  - aggregate
  - policy
  - value object
  - entity
  - domain service
  - repository
  - factory
  - module
