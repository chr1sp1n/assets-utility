1.1.2 - 2018-10-03
-	Ora è possibile eseguire solo i task pubblici: init, dev, dist, watch, db:dump
-	Modificato il comportamento dei task sass e js. Ora per determinare la cartella di destinazione dei file compilati```language
	concatenano i valori config.temp_path e sorce.scss.src o config.temp_path e sorce.js.files
-	Il task assets ora trasferisce anche file che iniziano con .
-	Ora è possibile avviare i task gigitando il comando `./node_modules/.bin/assets-utility [task da eseguire]`
-	L'applicazione ora può essere gestita come dipendenza con il manager di pacchetti NPM

1.1.1 - 2018-09-26
-	Percorso base definito all'avvio di gulp
-	Messaggio che riporta il file di configurazione utilizzato

1.1.0 - 2018-09-26
-	Lista dei file JavaScript da importare specificata nella proprietà `config.source.js.files`.
	Default: `[]`
-	Injection dei file JavaScript definiti nel file di configurazione nei file specificati nella proprietà `config.source.js.inject_to`
	I file vengono importati nella seguenza in sui sono specificati nella proprietà `config.source.js.files`.
	Default: `[ "*.html", "*.php" ]`

1.0.0 - 2018-07-25
-	Prima release