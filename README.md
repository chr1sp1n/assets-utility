
# Chr1Sp1n-dev Assets Utility

## Utility gulp 4 per la gestione semplificata degli assets front-end e non.
### Lo script consente:
-	Tre modalità di esecuzione: sviluppo, distribuzione e watcher
-	L'organizzare e la standardizzazione dello scaffolding per qualsiasi tipo di progetto (wordpress, drupal, php, etc)
-	Compilazione e ottimizzazione del codice SASS
-	Compilazione e ottimizzazione del codice JavaScript
-	Deploy automatico nel progetto di destinazione

---

### **Installazione:**
-	Clonare il repository https://git.chr1sp1n-dev.cloud/utility/chr1sp1n-assets-utility.git con il comando:
> `git clone https://git.chr1sp1n-dev.cloud/utility/chr1sp1n-assets-utility.git`

-	Installare le dipendenze con il comando:
> `npm install`

---

### **Utilizzo:**

E' possibile eseguire lo script nelle tre modalità previste con i seguenti comandi:

> `gulp dev`

Esegue lo script in modalita sviluppo.

> `gulp dist`

Esegue lo script in modalita distribuzione.

> `gulp watch`

Esegue lo script in modalita watcher.<br>
Questa modalità attiva il monitoraggio dei file presenti nelle cartella source configurata con l'opzione `source.path`. In caso di modifica di uno dei file viene avviato il task `gulp dev`.<br>
Il monitoraggio può essere interrotto mediante la combinazione di tasti `ctrl+c`.

> `gulp`

Alias di `gulp dev`.

---

### **Funzionamento nel dettaglio:**

In modalità sviluppo (`gulp dev`) lo script provvede all'esecuzione dei seguenti task:

**Task 1** - `gulp clean`

Questo task provede alla pulizia della cartella di destinazione temporanea definita con l'opzione `temp_path`.

**Task 2, 3, 4** - `gulp sass:dev`, `gulp js:dev`, `gulp assets:dev`

I task sopra elencati vengono eseguiti parallelamente al fine di ottimizzare il tempo di elaborazione totale.

&nbsp;Task 2 - `gulp sass:dev` provvede alla compilazione dei file .scss trovati nella cartella definita con l'opzione `source.scss.src`, inoltre accoda ad ogni file la relativa sourcemap. Il task preserva la struttura dello scaffolding e in caso di inclusioni effettua le dovute concatenazioni. I file e le cartelle ottenute vengono scritte nella cartella temporanea.

&nbsp;Task 3 - `gulp js:dev` provvede alla copia dei file JavaScript presenti nel percorso definito con l'opzione `source.js.src` nella cartella definita con l'opzione `source.js.dest` preservandone lo scaffolding originale.

&nbsp;Task 4 - `gulp assets:dev` provvede alla copia di eventiali file e cartelle presenti nel percorso definito con l'opzione `source.path` che non sono stati processati dai task precedenti. Ad esempio file e cartelle come fonts, images, index.php, favicon.ico, etc. E' possibile replicare la struttura si tema wordpress, drupal, etc.

**Task 5** - `deploy:dev` sincronizza il contenuto delle cartella temporanea con il contenuto della cartella di destinazione definita con l'opzione `deploy_path_dev`.
 
<br>
In modalità distribuzione (`gulp dist`) lo script provvede all'esecuzione dei seguenti task:

**Task 1** - `gulp clean`

Questo task provede alla pulizia della cartella di destinazione temporanea definita con l'opzione `temp_path`.

**Task 2, 3, 4** - `gulp sass:dist`, `gulp js:dist`, `gulp assets:dist`

I task sopra elencati vengono eseguiti parallelamente al fine di ottimizzare il tempo di elaborazione totale.

&nbsp;Task 2 - `gulp sass:dist` provvede alla compilazione dei file .scss trovati nella cartella definita con l'opzione `source.scss.src`, inoltre aggiunge eventuali prefissi cross-browser e minifica il codice risultante. Il task preserva la struttura dello scaffolding e in caso di inclusioni effettua le dovute concatenazioni. I file e le cartelle ottenute vengono scritte nella cartella temporanea.

&nbsp;Task 3 - `gulp js:dist` provvede alla concatenazione, minificazione e offuscazione dei file JavaScript presenti nel percorso definito con l'opzione `source.js.src`. Il codice risultante viene scritto nel file definito con l'opzione `source.js.cocat_to` quindi copiato nella cartella definita con l'opzione `source.js.dest`.

&nbsp;Task 4 - `gulp assets:dist` provvede alla copia di eventiali file e cartelle presenti nel percorso definito con l'opzione `source.path` che non sono stati processati dai task precedenti. Ad esempio file e cartelle come fonts, images, index.php, favicon.ico, etc. E' possibile replicare la struttura si tema wordpress, drupal, etc.

**Task 5** - `deploy:dist` sincronizza il contenuto delle cartella temporanea con il contenuto della cartella di destinazione definita con l'opzione `deploy_path_dist`.

In caso di errore viene visualizzato nell'area di notifica un pop-up riportante informazioni relative all'errore.

---

### **Configurazione:**

Lo script consente la personalizzazione di molti parametri, ciò è possibile editando il file `config.json` presente nella root del progetto.
E' possibile utilizzare la concatenazione nel definire le opzioni utilizzando le doppie parentesi graffe. 

Esempio:
```json
...
"temp_path":  "./.tmp",
"source":{		
    "path":  "./source",
        "scss":{
            "src":  "{{source.path}}/scss",
            "dest":  "{{temp_path}}/css"
        }
...
```
In questo esempio le opzioni `source.scss.src` e `source.scss.dest` vengono definite contatenando le opzioni `source.path` e `temp_path` ottenendo rispettivamente: `"src":  "./source/scss"` e `"dest":  "./.tmp/css"`.

Di seguito l'elenco completo dei parametri:

-	`temp_path`: (./.tmp/) Percorso temporaneo in cui scrivere i file elaborati
-	`deploy_path_dev`: (./deploy/) Percorso di destinazione dei file elaborati in modalità sviluppo
-	`deploy_path_dist`: (./deploy/) Percorso di destinazione dei file elaborati in modalità distribuzione 
-	`source.path`: (./source/) Persorso base dei sorgenti 
-	`source.scss.src`: ({{source.path}}/scss/) Persorso dei sorgenti SASS
-	`source.scss.dest`: ({{temp_path}}/css/) Persorso di destinazione dei file SASS compilati
-	`source.js.src`: ({{source.path}}/js/) Persorso dei sorgenti JavaScript
-	`source.js.dest`: ({{temp_path}}/js/) Percorso di destinazione dei file JavaScript elaborati
-	`source.js.cocat_to`: (scripts.js) Nome del file risultante della concatenazione dei file JavaScript