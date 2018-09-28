1.1.1 	2018-09-26
-	Percorso base definito all'avvio di gulp
-	Messaggio che riporta il file di configurazione utilizzato

1.1 	2018-09-26
-	Lista dei file JavaScript da importare specificata nella proprietà `config.source.js.files`.
	Default: `[]`
-	Injection dei file JavaScript definiti nel file di configurazione nei file specificati nella proprietà `config.source.js.inject_to`
	I file vengono importati nella seguenza in sui sono specificati nella proprietà `config.source.js.files`.
	Default: `[ "*.html", "*.php" ]`

1.0		2018-07-25
-	Prima release