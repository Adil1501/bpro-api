# B-Pro Services API - Node.js Project

B-Pro API is een API gebouwd met Node.js, Express en MySQL voor het beheren van diensten en offertes van B-Pro Services.


## 🚀 Features

### Minimum Requirements
* **CRUD** operaties voor twee entiteiten (`Services` en `Quotes`).
* **Relaties**: Een offerte is gekoppeld aan een dienst (One-to-Many).
* **Zoeken**: Zoeken op dienst-titel of categorie.
* **Paginatie**: Limit en Offset implementatie op de services lijst.
* **Validatie**: Velden mogen niet leeg zijn, types worden gecheckt.

### Extra Features (voor hoger cijfer)
* **Geavanceerde Validatie**: 
    * Datums van offertes *moeten* in de toekomst liggen.
    * Emailadressen worden gecontroleerd op correct formaat.
* **Sorteren**: Sorteren op prijs (`hourlyRate`) of datum.
* **Database Relaties**: Gebruik van Sequelize Associations en Foreign Keys.

## 🛠️ Installatie & Setup

Volg deze stappen om het project lokaal te draaien:

1.  **Clone de repository**
    ```bash
    git clone https://github.com/Adil1501/bpro-api
    cd bpro-api
    ```

2.  **Installeer dependencies**
    ```bash
    npm install
    ```

3.  **Database Configuratie**
    * Zorg dat XAMPP draait (MySQL).
    * Maak een bestand `.env` aan in de root en vul in:
    ```env
    PORT=3000
    DB_NAME=bpro_api
    DB_USER=root
    DB_PASSWORD=
    DB_HOST=localhost
    DB_DIALECT=mysql
    ```

4.  **Start de server**
    ```bash
    npm run dev
    ```
    De server draait op `http://localhost:3000`.

## 📚 Documentatie
Bezoek de root URL (`http://localhost:3000`) voor een overzicht van alle beschikbare endpoints.

## 🔗 Bronvermelding
* Node.js Docs: https://nodejs.org/
* Sequelize Docs: https://sequelize.org/
* Express Docs: https://expressjs.com/
* Hulp bij structuur en debugging: AI ondersteuning (Gemini) gebruikt als "Senior Developer Mentor" voor uitleg over MVC architectuur.