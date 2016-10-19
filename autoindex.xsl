<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
  <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Debian 中文社区软件仓库</title>
      <link href="/static/css/bootstrap.min.css" rel="stylesheet"/>
    </head>
    <body>
      <xsl:copy-of select="document('header.xml')/*"/>
      <table>
        <tr id="autoindex-upper-dir">
          <td><a href="..">../</a></td>
          <td></td>
          <td></td>
        </tr>
      <xsl:for-each select="list/file">
        <tr>
          <td>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="."/>
              </xsl:attribute>
              <xsl:value-of select="."/>
            </a>
          </td>
          <td><xsl:value-of select="./@mtime"/></td>
          <td><xsl:value-of select="./@size"/></td>
        </tr>
      </xsl:for-each>
      </table>
      <xsl:copy-of select="document('footer.xml')/*"/>
      <!-- deal with jquery and js -->
      <script src="/static/js/jquery-3.1.1.min.js"></script>
      <script src="/static/js/bootstrap.min.js"></script>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
