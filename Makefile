all: index.html

index.html: autoindex.xsl test.xml header.xml footer.xml
	xsltproc -o index.html ./autoindex.xsl ./test.xml
