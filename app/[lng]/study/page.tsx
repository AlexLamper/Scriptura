import React from 'react';
import { FileText, Edit, BookOpen, Folder } from 'lucide-react';

export default function Home() {
  return (
    <div className="mt-2">
      {/* Top controls: Bible/book/chapter selectors, arrows, print/download */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Bible Selector */}
        <select className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm">
          <option>Statenvertaling</option>
          <option>NBV21</option>
          <option>HSV</option>
        </select>
        {/* Book Selector */}
        <select className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm">
          <option>Genesis</option>
          <option>Exodus</option>
          <option>Leviticus</option>
          {/* ...more books... */}
        </select>
        {/* Chapter Selector */}
        <select className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          {/* ...more chapters... */}
        </select>
        {/* Prev/Next Arrows */}
        <button className="p-2 rounded bg-gray-100 hover:bg-brand hover:text-white transition" title="Vorige hoofdstuk">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button className="p-2 rounded bg-gray-100 hover:bg-brand hover:text-white transition" title="Volgende hoofdstuk">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        {/* Print/Download Button */}
        <button className="p-2 rounded bg-gray-100 hover:bg-brand hover:text-white transition ml-auto" title="Print of download hoofdstuk">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 17v4H7v-4M12 12v6m0 0l-3-3m3 3l3-3M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
      {/* Left: Bible verse section */}
      <section className="bg-white p-6 rounded shadow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">BIJBELTEKST (Statenvertaling)</h2>
        <div className="space-y-2">
          <p><sup className="font-semibold">1</sup> In den beginne schiep God den hemel en de aarde.</p>
          <p><sup className="font-semibold">2</sup> En de aarde was woest en ledig, en duisternis lag op de afgrond, en de Geest Gods zweefde op het water.</p>
          <p><sup className="font-semibold">3</sup> En God zeide: Dat er licht zij; en er was licht.</p>
          <p><sup className="font-semibold">4</sup> En God zag het licht, dat het goed was; en God scheidde het licht van de duisternis.</p>
          <p><sup className="font-semibold">5</sup> En God noemde het licht Dag, en de duisternis noemde Hij Nacht. Toen was het avond geweest, en het morgen geweest: de eerste dag.</p>
          <p><sup className="font-semibold">6</sup> En God zeide: Dat er een uitspansel zij in het midden der wateren, en het scheide de wateren van de wateren.</p>
          <p><sup className="font-semibold">7</sup> En God maakte het uitspansel, en scheidde de wateren, die onder het uitspansel waren, van de wateren, die boven het uitspansel waren; en het was alzo.</p>
          <p><sup className="font-semibold">8</sup> En God noemde het uitspansel Hemel. Toen was het avond geweest, en het morgen geweest: de tweede dag.</p>
          <p><sup className="font-semibold">9</sup> En God zeide: Dat de wateren onder den hemel in één plaats verzameld worden, dat het droge kome. En het was alzo.</p>
          <p><sup className="font-semibold">10</sup> En God noemde het droge Aarde, en de vergadering der wateren noemde Hij ZEEën; en God zag, dat het goed was.</p>
          <p><sup className="font-semibold">11</sup> En God zeide: Dat de aarde gras voortbringe, kruid zaaiende naar zijn aard, en vruchtbomen dragende vrucht, die zaad in zich had, naar hun aard, op de aarde; en het was alzo.</p>
          <p><sup className="font-semibold">12</sup> En de aarde bracht voort gras, kruid zaaiende naar zijn aard, en boomen dragende vrucht, die zaad in zich had naar hun aard; en God zag, dat het goed was.</p>
          <p><sup className="font-semibold">13</sup> Toen was het avond geweest, en het morgen geweest: de derde dag.</p>
          <p><sup className="font-semibold">14</sup> En God zeide: Dat er lichten wezen in het uitspansel des hemels, om te scheiden den dag van de nacht; en zij wezen tot tekenen, en tot vaststellingen van tijden, dagen en jaren.</p>
        </div>
      </section>
      {/* Right: Commentary section */}
      <section className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">COMMENTAAR</h2>
          <div className="flex space-x-3">
            <button className="p-2 bg-gray-100 rounded hover:bg-brand hover:text-white transition">
              <FileText size={18} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-brand hover:text-white transition">
              <Edit size={18} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-brand hover:text-white transition">
              <BookOpen size={18} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-brand hover:text-white transition">
              <Folder size={18} />
            </button>
          </div>
        </div>
        <h3 className="font-semibold mb-2">Boek 1: De schepping van hemel en aarde (Gen.1:1–2:3)</h3>
        <p className="mb-4">
          In <a href="#" className="text-blue-600">Gen.1:1-2:3</a> wordt over Gods scheppingswerk verteld. De zeven dagen vormen de eerste week van Gods handelen. De uitdrukkingen &apos;God&apos;, &apos;scheppen&apos; en &apos;hemel en aarde&apos; komen voor in <a href="#" className="text-blue-600">Gen.1:1</a> (het begin) en in omgekeerde volgorde in <a href="#" className="text-blue-600">Gen.2:1-3</a> (het slot van dit gedeelte). De taal is proza en geen poëzie, maar het onderwerp is zo verheven dat de taal soms bijna poëtisch wordt. Het boek Genesis begint met de grote en goede daden van God en eindigt in de laatste hoofdstukken met het ontstaan van het volk Israël. <span className="bg-yellow-200">De schepping vindt plaats in een oplopende reeks van gebeurtenissen, in een andere volgorde dan de hedendaagse evolutietheorie dat doet. De mensen komen niet voort uit dieren, in een proces van toeval en overleving van de sterkste, maar zij zijn ontstaan door Gods scheppingswoorden.</span>
        </p>
        <p className="mb-4">Er zijn enige overeenkomsten tussen de 1e en 4e dag, tussen de 2e en 5e dag en de 3e en 6e dag; de 7e dag staat apart. In de eerste drie dagen wordt de aarde gevormd, in de volgende drie dagen wordt de geschapen wereld verder ingericht.</p>
        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <tbody>
              <tr className="border">
                <td className="px-2 py-1 border border-gray-300">dag 1: licht</td>
                <td className="px-2 py-1 border">dag 4: hemellichten</td>
              </tr>
              <tr className="border">
                <td className="px-2 py-1 border">dag 2: water en lucht</td>
                <td className="px-2 py-1 border">dag 5: vissen en vogels</td>
              </tr>
              <tr className="border">
                <td className="px-2 py-1 border">dag 3: land en zee (planten)</td>
                <td className="px-2 py-1 border">dag 6: dieren en mensen (planten voor voedsel)</td>
              </tr>
              <tr className="border">
                <td className="px-2 py-1 border" colSpan={2}>dag 7: de sabbat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      </div>
    </div>
  );
}
