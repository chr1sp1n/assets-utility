
# Chr1Sp1n-dev Assets Utility
### Questo script gulp mette a disposizione dell'utente una piattaforma semplice e affidabile per la gestione degli assets front-end e non.
#### Lo script consente:
-	Due modalità di esecuzione: sviluppo e produzione
-	L'organizzare e la standardizzazione dello scaffolding per qualsiasi tipo di progetto (wordpress, drupal, php, etc)
-	Compilazione e ottimizzazione del codice SASS
-	Compilazione e ottimizzazione del codice JavaScript
-	Deploy automatico nel progetto di destinazione
-	Conservazione dello scaffolding previsto dal progetto

#### Come funziona:
### Modalità sviluppo:
Lo script come prima cosa provvede alla pulizia della cartella di destinazione temporanea (vedi opzione `temp_path`) quindi procede all'elaborazione dei file presenti nella cartella source (vedi opzione `source.path`).
L'elaborazione in modalità sviluppo prevede la compilazione del codice SASS nella cartella di destinazione del codice elaborato (vedi opzione `source.scss.src`) preservandone la struttura delle cartelle, la clonazione dei file JavaScript presenti nella cartella sorgente (vedi opzione `source.js.src`) e relativa struttura delle cartelle nella cartella di destinazione (vedi opzione `source.scss.dest`). Eventuali altri file e cartelle presenti nella cartella source verranno clonati nella cartella di destinazione temporanea.
Terminata l'elaborazione la cartella di destinazione temporanea viene sincronizzata con la cartella di distribuzione (vedi opzione `deploy_path_dev`).

### Modalità produzione:
Lo script come prima cosa provvede alla pulizia della cartella di destinazione temporanea (vedi opzione `temp_path`) quindi procede all'elaborazione dei file presenti nella cartella source (vedi opzione `source.path`).
L'elaborazione in modalità produzione prevede la compilazione del codice SASS nella cartella di destinazione del codice elaborato (vedi opzione `source.scss.src`) preservandone la struttura delle cartelle. La compilazione provvede inoltre alla ottimizzazione del codice aggiungendo prefissi cross-browser e alla minificazione. Segue la concatenazione, minificazione e offuscazione dei file JavaScript  nella cartella di destinazione (vedi opzione `source.scss.dest`). Eventuali altri file e cartelle presenti nella cartella source verranno clonati nella cartella di destinazione temporanea.
Terminata l'elaborazione la cartella di destinazione temporanea viene sincronizzata con la cartella di distribuzione (vedi opzione `deploy_path_dev`).


In caso di errore viene visualizzato nell'area di notifica un pop-up riportante informazioni relative all'errore.


## Utilizzo:

#### Download e installazione:
-	Clonare il repository https://git.chr1sp1n-dev.cloud/utility/chr1sp1n-assets-utility.git con il comando:
> `git clone https://git.chr1sp1n-dev.cloud/utility/chr1sp1n-assets-utility.git`

-	Installare le dipendenze con il comando:
> `npm install`

#### Configurazione:
Lo script consente la personalizzazione di molti parametri, ciò è possibile editando il file config.json prente nella root del progetto.

Di seguito l'elenco completo dei parametri:

-	`temp_path`:
Percorso temporaneo in cui scrivere i file elaborati. Il contenuto di questa cartella verra clonato al termine dell'elaborazione nella cartella configurata con la proprietà `deploy_path_dev` o `deploy_path_dist`.
-	`deploy_path_dev`: Percorso di destinazione dei file elaborati in modalità sviluppo
-	`deploy_path_dist`: Percorso di destinazione dei file elaborati in modalità produzione 
-	`source.path`: Persorso base dei sorgenti 
-	`source.scss.src`: Persorso dei sorgenti SASS. I file il cui nome inizia con il simbolo _ sono considerati inclusioni quindi ignorati se non esplicitamnte importati con il comando `@import "path/nome del file";`
-	`source.scss.dest`: Persorso di destinazione dei file SASS compilati. Percorso relativo all'opzione `deploy_path_dist`. Lo script mantiene la struttura originale delle cartelle.
-	`source.js.src`: Persorso dei sorgenti JavaScript. Eseguendo lo script in modalità sviluppo questi si limiterà a clonare la struttura e i file nella cartella di destinazione specificata con l'opzione `source.js.dest`. Lo script mantiene la struttura originale delle cartelle. Nel caso della modalità produzione tutti i file JavaScript vengono concatenati minimizzati e offuscati quindi clonati nella cartella di destinazione specificata con l'opzione `source.js.dest`.
-	`source.js.dest`: Percorso di destinazione dei file JavaScript elaborati. Percorso relativo all'opzione `deploy_path_dist`.
-	`source.js.cocat_to`: Nome del file risultante della concatenazione dei file JavaScript.
-	`notifier.success.title`: Titolo visualizzato nel pop-up di notifica in caso di successo.
-	`notifier.success.message`: Messaggio visualizzato nel pop-up di notifica in caso di successo.
-	`notifier.success.icon`: Percorso del file icona visualizzata nel pop-up di notifica in caso di successo.
-	`notifier.error.title`: Titolo visualizzato nel pop-up di notifica in caso d'errore.
-	`notifier.error.message`: Messaggio visualizzato nel pop-up di notifica in caso d'errore.
-	`notifier.error.icon`: Percorso del file icona visualizzata nel pop-up di notifica in caso d'errore.
-	`notifier.stop_on_error`: Se `true` lo script viene interrotto in caso di errore altriment procede nell'elaborazione.
