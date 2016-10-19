all: index.html

index.html: autoindex.xsl test.xml
	xsltproc -o index.html ./autoindex.xsl ./test.xml
