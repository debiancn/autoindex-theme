<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
  <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
    <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Debian 中文社区软件仓库</title>
      <link href="/static/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="/static/css/debiancn-autoindex.css" rel="stylesheet"/>
    </head>
    <body>
      <xsl:copy-of select="document('header.xml')/*"/>
      <div class="container">
        <div class="col-md-8 col-sm-12 cow-xs-12">
          <h3>文件列表</h3>
          <hr/>
          <h5 id="debiancn-current-pathname"></h5>
          <table class="table table-striped">
            <thead>
              <th>名称</th>
              <th>修改时间</th>
              <th class="shrink">大小</th>
            </thead>
            <tr id="autoindex-upper-dir">
              <td><a href=".."><div class="td-full td-full-dir">../</div></a></td>
              <td></td>
              <td class="shrink"></td>
            </tr>
          <xsl:for-each select="list/directory">
            <tr>
	      <td>
	        <a>
	          <xsl:attribute name="href">
		    <xsl:value-of select="."/>
	 	  </xsl:attribute>
                  <div class="td-full td-full-dir">
                    <xsl:value-of select="."/>
		  </div>
                </a>
	      </td>
              <td class="debiancn-table-time"><xsl:value-of select="./@mtime"/></td>
              <td class="shrink"></td>
            </tr>
          </xsl:for-each>
          <xsl:for-each select="list/file">
            <tr>
              <td>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="."/>
                  </xsl:attribute>
                  <div class="td-full td-full-file"><xsl:value-of select="."/></div>
                </a>
              </td>
              <td class="debiancn-table-time"><xsl:value-of select="./@mtime"/></td>
              <td class="shrink"><xsl:value-of select="./@size"/></td>
            </tr>
          </xsl:for-each>
          </table>
        </div> <!-- .col table -->
        <div class="col-md-4 col-sm-12 col-xs-12">
          <h3>常用链接</h3>
            <hr/>
            <ul id="debiancn-side-linklist">
              <li><a href="https://github.com/debiancn/repo">社区源使用方法</a></li>
              <li><a href="https://github.com/debiancn/repo/issues">Issue tracker</a></li>
            </ul>
        </div> <!-- .col links -->

        <div class="col-md-4 col-sm-12 col-xs-12">
          <h3>简介</h3>
          <hr/>
          <p>Debian 中文社区软件仓库是由 Debian 中文社区维护的软件仓库，主要收录了一些 Debian 官方软件仓库中由于种种原因未收录的软件包，可以作为对 Debian 官方软件仓库的一个补充。</p>
          <p>目前 Debian 中文社区软件仓库的大部分软件主要提供了对 x86_64 架构的支持，另外有部分软件提供了对 x86 架构的支持并且提供软件源码包。</p>
          <p>目前社区软件源在 <a href="https://github.com/debiancn/repo">GitHub 项目</a>中进行维护。</p>
        </div>
      </div> <!-- .container -->
      <xsl:copy-of select="document('footer.xml')/*"/>
      <!-- deal with jquery and js -->
      <script src="/static/js/jquery-3.1.1.min.js"></script>
      <script src="/static/js/bootstrap.min.js"></script>
      <script src="/static/js/debiancn-autoindex.js"></script>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
