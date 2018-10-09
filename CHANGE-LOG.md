1.1.2 - 2018-10-09
-	Ora è possibile eseguire solo i task pubblici: init, dev, dist, watch, db:dump
-	Modificato il comportamento dei task sass e js: Ora la cartella di destinazione dei file compilati
	è determinata concatenano i valori `config.temp_path + config.sorce.scss.src` per i sorgenti sass e `config.temp_path + config.sorce.js.files` per i sorgenti JavaScript
-	Il task assets ora trasferisce anche file che iniziano con .
-	Ora è possibile avviare i task gigitando il comando `./node_modules/.bin/assets-utility [task da eseguire]`
-	L'applicazione ora può essere gestita come dipendenza con il manager di pacchetti NPM

1.1.1 - 2018-09-26
-	Percorso base definito all'avvio di gulp
-	Messaggio che riporta il file di configurazione utilizzato

1.1.0 - 2018-09-26
-	Lista dei file JavaScript da importare specificata nella proprietà `config.source.js.files`
	Default: `[]`
-	Injection dei file JavaScript definiti nel file di configurazione nei file specificati nella proprietà `config.source.js.inject_to`
	I file vengono importati nella seguenza in sui sono specificati nella proprietà `config.source.js.files`
	Default: `[ "*.html", "*.php" ]`

1.0.0 - 2018-07-25
-	Prima release