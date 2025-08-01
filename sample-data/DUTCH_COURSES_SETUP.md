# Nederlandse Cursussen Setup

## Overzicht
Dit bestand bevat 12 Nederlandse bijbelcursussen die je kunt importeren in je MongoDB database.

## Beschikbare Thema's
De Nederlandse cursussen bevatten de volgende thema's:
- **Faith (Geloof)** - Fundamenten van het Geloof
- **Grace (Genade)** - Gods Genade Begrijpen
- **Parables (Gelijkenissen)** - Wijsheid uit Jezus' Gelijkenissen
- **Prayer (Gebed)** - De Kracht van het Gebed
- **Salvation (Redding)** - Het Pad naar Redding
- **Discipleship (Discipelschap)** - Jezus Volgen
- **Love (Liefde)** - Liefde in Actie
- **Wisdom (Wijsheid)** - Bijbelse Wijsheid voor het Dagelijks Leven
- **Spiritual Growth (Geestelijke Groei)** - De Vrucht van de Geest
- **Prophecy (Profetie)** - Bijbelse Profetieën Verstaan
- **Ethics (Ethiek)** - Christelijke Ethiek in de Moderne Wereld
- **Biblical History (Bijbelse Geschiedenis)** - De Geschiedenis van het Oude Testament

## Cursus Moeilijkheidsgraden
- **Beginner**: 4 cursussen - Perfect voor nieuwe gelovigen
- **Intermediate**: 6 cursussen - Voor groeiende christenen
- **Advanced**: 2 cursussen - Voor diepere theologische studie

## Premium vs Gratis
- **Gratis cursussen**: 6 cursussen toegankelijk voor alle gebruikers
- **Premium cursussen**: 6 cursussen vereisen een abonnement

## Importeren

### Via MongoDB Compass
1. Open MongoDB Compass
2. Ga naar je courses collectie
3. Klik op "Import Data"
4. Selecteer `dutch-courses.json`
5. Importeer als JSON array

### Via Command Line
```bash
mongoimport --db jouw_database_naam --collection courses --file dutch-courses.json --jsonArray
```

### Via Node.js Script
```javascript
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function importDutchCourses() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('courses');
    
    const dutchCourses = JSON.parse(
      fs.readFileSync('./dutch-courses.json', 'utf8')
    );
    
    const result = await collection.insertMany(dutchCourses);
    console.log(`${result.insertedCount} Nederlandse cursussen succesvol geïmporteerd`);
    
  } catch (error) {
    console.error('Fout bij importeren:', error);
  } finally {
    await client.close();
  }
}

importDutchCourses();
```

## Verificatie
Na het importeren:
1. Controleer of 12 Nederlandse cursussen zijn toegevoegd
2. Test de taalfiltering op `/nl/courses`
3. Controleer of alle thema filters werken
4. Verifieer de premium/gratis status

## Aanpassingen
Je kunt de cursussen aanpassen door:
- Inhoud en beschrijvingen aan te passen
- Bijbelse passages toe te voegen of te wijzigen
- Afbeeldingen toe te voegen in `/public/images/`
- Premium status aan te passen
- Nieuwe thema's toe te voegen

## Volgende Stappen
1. Importeer de cursussen in je database
2. Test de Nederlandse taalversie op `/nl/courses`
3. Voeg afbeeldingen toe voor de cursussen
4. Pas de inhoud aan naar je wensen
