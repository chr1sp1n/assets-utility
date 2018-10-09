
# Chr1Sp1n-dev Assets Utility
##### Version 1.1.2


## Utility Gulp 4 per la gestione semplificata degli assets front-end e non.
### Features:
-	Tre modalità di esecuzione: sviluppo, distribuzione e watcher
-	Organizzazione e standardizzazione dello scaffolding per qualsiasi tipo di progetto (wordpress, drupal, codeigniter, etc)
-	Scaffolding dei sorgenti [SASS](https://sass-lang.com/) secondo lo standard [SMACSS](https://smacss.com/book/categorizing)
-	Compilazione e ottimizzazione del codice [SASS](https://sass-lang.com/)
-	Compilazione, ottimizzazione e offuscamento del codice JavaScript
-	Inserimento dei tag `<script></script>` nel codice HTML
-	Deploy e sincronizzazione automatica nel progetto di destinazione
-	Dump automatico del databese utilizzato nel progetto

---

### **Installazione:**

-	Installare assets-utility come dipendenza di sviluppo:
> `npm install --save-dev https://github.com/chr1sp1n/assets-utility.git#1.1`

-	Inizializzazione degli assets:
> `./node_modules/.bin/assets-utility init`

Quest'ultimo comando inizializza il file di configurazione e le cartelle utilizzate dai task.
Prima di eseguire i task editare il file di configurazione.

---

### **Utilizzo:**

E' possibile eseguire lo script nelle tre modalità previste con i seguenti comandi:

> `./node_modules/.bin/assets-utility  dev`

Esegue lo script in modalita sviluppo.

> `./node_modules/.bin/assets-utility  dist`

Esegue lo script in modalita distribuzione.

> `./node_modules/.bin/assets-utility  watch`

Esegue lo script in modalita watcher.<br>
Questa modalità attiva il monitoraggio dei file presenti nelle cartella source configurata con l'opzione `source.path`. In caso di modifica di uno dei file viene avviato il task `dev`.<br>
Il monitoraggio può essere interrotto mediante la combinazione di tasti `ctrl+c`.

Sono inoltre disponibili i seguenti task:

> `./node_modules/.bin/assets-utility   init`

Inizializza il file di configurazione e le cartelle utilizzate dai task.

> `./node_modules/.bin/assets-utility   db:dump`

Se configurata la sezione `db` nel file `assets-config.json` effettua un dump del db specificato.

---

### **Funzionamento nel dettaglio:**

In modalità sviluppo (`dev`) lo script provvede all'esecuzione dei seguenti task:

**Task 1** - `clean`

Questo task provede alla pulizia della cartella di destinazione temporanea definita con l'opzione `temp_path`.

**Task 2, 3, 4, 5** - `sass:dev`, `js:dev`, `js:inject:dev`, `assets`

I task sopra elencati vengono eseguiti parallelamente al fine di ottimizzare il tempo di elaborazione totale.

&nbsp;Task 2 - `sass:dev` provvede alla compilazione dei file .scss trovati nella cartella definita con l'opzione `source.scss.src`, inoltre accoda ad ogni file la relativa sourcemap. Il task preserva la struttura dello scaffolding e in caso di inclusioni effettua le dovute concatenazioni. I file e le cartelle ottenute vengono scritte nella cartella temporanea.

&nbsp;Task 3 - `js:dev` provvede alla copia dei file JavaScript nella cartella definita in `source.js.dest` all'interno della cartella temporanea  dei files presenti nell'array `source.js.files` preservandone lo scaffolding originale.

&nbsp;Task 4 - `js:inject:dev` provvede all'inserimento nel codice html dei tag `<script></script>` che fanno riferimento ai files js presenti nell'array `source.js.files` preservandone la sequenza. Nell'array di configurazione `source.js.inject_to` è possibile specificare i files in cui effettuare l'inserimento.
<br>Il task utilizza il seguente codice, da aggiungere al codice HTML, per determinare dove inserire i tag `<script></script>`.
```
<!-- inject:js -->
<!-- endinject -->
```

&nbsp;Task 5 - `assets` provvede alla copia di eventiali file e cartelle presenti nel percorso definito con l'opzione `source.path` che non sono stati processati dai task precedenti. Ad esempio file e cartelle come fonts, images, index.php, favicon.ico, etc. E' possibile replicare la struttura si tema wordpress, drupal, etc.

**Task 6** - `deploy:dev` sincronizza il contenuto delle cartella temporanea con il contenuto della cartella di destinazione definita con l'opzione `deploy_path_dev`.

<br>
**MODALITA' DIST TEMPORANEAMENTE NON FUNZIONANTE**

In modalità distribuzione (`dist`) lo script provvede all'esecuzione dei seguenti task:

**Task 1** - `clean`

Questo task provede alla pulizia della cartella di destinazione temporanea definita con l'opzione `temp_path`.

**Task 2, 3, 4** - `sass:dist`, `js:dist`, `assets`

I task sopra elencati vengono eseguiti parallelamente al fine di ottimizzare il tempo di elaborazione totale.

&nbsp;Task 2 - `sass:dist` provvede alla compilazione dei file .scss trovati nella cartella definita con l'opzione `source.scss.src`, inoltre aggiunge eventuali prefissi cross-browser e minifica il codice risultante. Il task preserva la struttura dello scaffolding e in caso di inclusioni effettua le dovute concatenazioni. I file e le cartelle ottenute vengono scritte nella cartella temporanea.

&nbsp;Task 3 - `js:dist` provvede alla concatenazione, minificazione e offuscazione dei file JavaScript presenti nel percorso definito con l'opzione `source.js.src`. Il codice risultante viene scritto nel file definito con l'opzione `source.js.cocat_to` quindi copiato nella cartella definita con l'opzione `source.js.dest`.

&nbsp;Task 4 - `assets` provvede alla copia di eventiali file e cartelle presenti nel percorso definito con l'opzione `source.path` che non sono stati processati dai task precedenti. Ad esempio file e cartelle come fonts, images, index.php, favicon.ico, etc. E' possibile replicare la struttura si tema wordpress, drupal, etc.

**Task 5** - `deploy:dist` sincronizza il contenuto delle cartella temporanea con il contenuto della cartella di destinazione definita con l'opzione `deploy_path_dist`.

In caso di errore viene visualizzato nell'area di notifica un pop-up riportante informazioni relative all'errore.

---

### **Configurazione:**

Lo script consente la personalizzazione di tutte le opzioni che sono comunque inizializzate con valori di default.<br>
La personalizzazione è possibile nel file `assets-config.json` genrato dal task `init` e scritto nella root del progetto.<br>
Le opzioni possono contenere il valore di altre opzioni con l'utilizzo di doppie parentesi graffe.
Tutti i percorsi sono relativi alla directory contenente assets-utility. Non è possibile definire percorsi assoluti.

Esempio:
```json
"temp_path":  "./.tmp",
"source":{
    "path":  "./source",
	"scss":{
		"src":  "{{source.path}}/scss",
		"dest":  "{{temp_path}}/css"
	}
```
In questo esempio le opzioni `source.scss.src` e `source.scss.dest` vengono definite concatenando le opzioni `source.path` e `temp_path` ottenendo rispettivamente:<br>
`"src":  "./source/scss"` e `"dest":  "./.tmp/css"`.

Di seguito l'elenco completo delle opzioni:

-	`temp_path`: (./.tmp/) Percorso temporaneo in cui scrivere i file elaborati
-	`deploy_path_dev`: (./deploy/) Percorso di destinazione dei file elaborati in modalità sviluppo
-	`deploy_path_dist`: (./deploy/) Percorso di destinazione dei file elaborati in modalità distribuzione
-	`source.path`: (./source/) Persorso base dei sorgenti
-	`source.scss.src`: ({{source.path}}/scss/) Persorso dei sorgenti SASS
-	`source.scss.dest`: ({{temp_path}}/css/) Persorso di destinazione dei file SASS compilati
-	`source.scss.smacss`: (true) Se true in fase di inizializzazione viene creato lo scaffolding SAMCSS
-	`source.js.src`: ({{source.path}}/js/) Persorso dei sorgenti JavaScript
-	`source.js.dest`: ({{temp_path}}/js/) Percorso di destinazione dei file JavaScript elaborati
-	`source.js.cocat_to`: (scripts.js) Nome del file risultante della concatenazione dei files JavaScript

Opzioni relative al task `db:dump`

-	`db.host`: Nome host del databese. *Esempio: localhost*
-	`db.database`: Nome del database. *Esempio: nomedeldatabase*
-	`db.user`:	Utente del database. *Esempio: nomedellutente*
-	`db.password`: Password. Esempio: *lamiapassword*
-	`db.dest`: (./db-dump) Percorso in cui verranno salvati i dump.
-	`site.type`: (pure-html) Tipologia del sito [drupal, wordpress, pure-html].
-	`site.hosts.dev`: URL del sito in modalità sviluppo. *Esempio: http://demo.ilmiosito.it*
-	`site.hosts.dist`: URL del sito in modalità distribuzione. *Esempio: http://ilmiosito.it*
