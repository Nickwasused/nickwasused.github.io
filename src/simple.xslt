<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:atom="http://www.w3.org/2005/Atom">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="referrer" content="unsafe-url" />
		<title><xsl:value-of select="/atom:feed/atom:title"/></title>
		<link rel="stylesheet" href="https://www.feed.style/css/water.min.css" />
	</head>
	<body>
		<h1>
			<img alt="feed icon" src="https://www.vectorlogo.zone/logos/rss/rss-tile.svg" style="height:1em;vertical-align:middle;" />&#xa0;
			<xsl:value-of select="/atom:feed/atom:title"/>
		</h1>

		<p>
			This is the Atom&#xa0; news feed&#xa0;my website.
		</p>

		<p>It is meant fornews readers, not humans.  Please copy-and-paste the URL into your news reader!</p>

		<p>
			<pre>
				<code id="feedurl"><xsl:value-of select="/atom:feed/atom:link[@rel='self']/@href"/></code>    
			</pre>
		</p>

		<xsl:for-each select="/atom:feed/atom:entry">
			<details><summary>
				<a>
				<xsl:attribute name="href">
					<xsl:value-of select="atom:id"/>
				</xsl:attribute>
				<xsl:value-of select="atom:title"/>
				</a>&#xa0;-&#xa0;
				<xsl:value-of select="atom:updated" />
				</summary>
				<xsl:choose>
					<xsl:when test="atom:content">
						<xsl:value-of disable-output-escaping="yes" select="atom:content" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="atom:summary" />
					</xsl:otherwise>
				</xsl:choose>
				</details>
		</xsl:for-each>
		<p><xsl:value-of select="count(/atom:feed/atom:entry)"/> news items.</p>
	</body>
</html>
	</xsl:template>
</xsl:stylesheet>
