'use client';

import { useState } from 'react';
// import { Textarea } from "../../../components/ui/textarea";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Input } from "../../../components/ui/input";
// import { Button } from "../../../components/ui/button";

export default function BijbelPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoofdstuk, setHoofdstuk] = useState(1);

  return (
    <div className="flex min-h-screen bg-muted text-muted-foreground">

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Linkerhelft - Bijbeltekst */}
        <section className="w-full lg:w-1/2 p-6 border-r border-border overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary">Genesis {hoofdstuk}</h2>
            <p className="text-sm text-muted-foreground">Statenvertaling (SV)</p>
          </div>

          <div className="space-y-6">
            {/* Voorbeeldvers */}
            <div>
              <p className="font-semibold">Vers 1</p>
              <p className="text-base leading-relaxed">
                In den beginne schiep God de hemel en de aarde.
              </p>

              <div className="mt-2 grid grid-cols-6 gap-2 text-center text-sm">
                <div><p className="font-medium">בְּרֵאשִׁית</p><p>In het begin</p></div>
                <div><p className="font-medium">בָּרָא</p><p>schiep</p></div>
                <div><p className="font-medium">אֱלֹהִים</p><p>God</p></div>
                <div><p className="font-medium">אֵת</p><p>de</p></div>
                <div><p className="font-medium">הַשָּׁמַיִם</p><p>hemel</p></div>
                <div><p className="font-medium">וְאֵת</p><p>en</p></div>
              </div>
            </div>
            {/* Herhaal voor meerdere verzen... */}
          </div>
        </section>

        {/* Rechterhelft - Commentaar */}
        <section className="w-full lg:w-1/2 p-6 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Commentaar</h2>
            <Input placeholder="Zoek in commentaar..." className="w-60" />
          </div>

          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="prose max-w-none dark:prose-invert prose-sm">
              <h3>Het begin en de eerste drie scheppingsdagen (1:1–13)</h3>
              <p>
                In het begin schiep God de hemel en de aarde. De Schepper wordt hier niet geïntroduceerd,
                maar is bekend en zijn bestaan is het vanzelfsprekende uitgangspunt.
              </p>
              <p>
                Israël kent geen wordingsgeschiedenis van de goden (‘theogonie’) en spreekt niet van een tijd
                vóór God er was; Hij is er van eeuwigheid (Ps. 90:2).
              </p>
              <p>
                De hemel en de aarde vloeien niet uit Hem voort, en er is ook geen godenstrijd, zoals in de
                mythen van de buurlanden.
              </p>
              <p>
                Het Hebreeuwse woord voor ‘God’ is een meervoudsvorm die bedoeld is om Gods verhevenheid
                en macht uit te drukken en die bijna een eigennaam wordt.
              </p>
              <p>
                In het kader van de schepping past deze aanduiding. Hier wordt nog niet de naam JHWH gebruikt;
                in hoofdstuk 2 komt die meer persoonlijke naam er pas in relatie tot de mens.
              </p>
              <p>
                Het werkwoord <i>bara</i> (scheppen, bouwen, voortbrengen) staat in het enkelvoud, zodat slechts
                één God bedoeld kan zijn.
              </p>
              <p>
                Dit werkwoord heeft altijd God als onderwerp en betreft handelingen waar goddelijke kracht
                en wil voor nodig zijn.
              </p>
              {/* Meer commentaar hier... */}
            </div>
          </ScrollArea>
        </section>
      </main>
    </div>
  );
}
