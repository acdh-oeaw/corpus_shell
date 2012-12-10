<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:exsl="http://exslt.org/common"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    xmlns:my="myFunctions"
    extension-element-prefixes="exsl xs" 
    version="2.0">
    
    <xd:doc scope="stylesheet">
        <xd:desc>
            <xd:p><xd:b>Created on:</xd:b> 2012-09-28</xd:p>
            <xd:p><xd:b>Author:</xd:b> m</xd:p>
            <xd:p>some helper functions for processing the solr-result</xd:p>
        </xd:desc>
    </xd:doc>
    
    <xd:doc>
        <xd:desc>
            <xd:p>baseurl for the subrequests</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:param name="baseurl" select="'http://193.170.82.207:8984/solr/select?'"/>
    <xd:doc>
        <xd:desc>
            <xd:p>if the base-data with the baseq cannot be retrieved (e.g. network-error) 
                this provides a link to the default base-data, which should be a cached version of an all-result (<code>*:*</code>) </xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:param name="default-base-data-path" select="'http://localhost:8985/solr/collection2/admin/file?file=/data-cache/stats_base.xml'" />
    
    <xd:doc>
        <xd:desc>
            <xd:p>flag to invoke reldata even if no baseq-param was found</xd:p>
            <xd:p>tries to read from the result-header</xd:p>
            <xd:p>0|1</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:param name="reldata" select="my:params('reldata',0)" />
    
    <xd:doc>
        <xd:desc>
            <xd:p>optional string-list to restrict metrics processed from the <xd:a href="http://wiki.apache.org/solr/StatsComponent">stats-component</xd:a></xd:p>
            <xd:p>allowed values:  min, max, sum, count, missing, sumOfSquares, mean, stddev </xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:param name="statsx_metrics" select="my:params('statsx.metrics',0)"></xsl:param>
    
    <xd:doc>
        <xd:desc>
            <xd:p>a multiple of 10 to multiply the relative frequency, i.e. the quotient of absolute frequency of the query and the base-query, which is usually quite a small number</xd:p>
            <xd:p>million seems a good default</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="percentile-base" select="1000000" /> 
    <xd:doc>
        <xd:desc>
            <xd:p>a multiple of 10 to round the relative frequency numbers</xd:p>
            <xd:p>100 yields two decimal places</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="decimal-base" select="100" />
    <xd:doc>
        <xd:desc>
            <xd:p>a verbose description of the percentile-base, (to be displayed in the output, to explain the numbers)</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="percentile-unit" select="'ppm articles'" /> <!-- ppm, % -->
    
    <xsl:decimal-format decimal-separator="," grouping-separator="."/>
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="number-format-dec" >#.##0,##</xsl:variable>    
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="number-format-default" >#.###</xsl:variable>
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="number-format-plain" >0,##</xsl:variable>
    
    <xd:doc>
        <xd:desc>
            <xd:p>the base-link parameters encoded as url</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="base-link">
        <xsl:call-template name="base-link"></xsl:call-template>
    </xsl:variable>
    
    
    <xd:doc>
        <xd:desc>
            <xd:p>store in a variable the params list as delivered by solr in the header of a response</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="params" select="//lst[@name='params']" />
    
    <xd:doc>
        <xd:desc>
            <xd:p>access function to the params-list </xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:function name="my:params">
        <xsl:param name="param-name"></xsl:param>
        <xsl:param name="default-value"></xsl:param>
        <xsl:value-of select="if(exists($params/*[@name=$param-name])) then $params/*[@name=$param-name] else $default-value "></xsl:value-of>
    </xsl:function>
    
    <xd:doc>
        <xd:desc>
            <xd:p>convenience format-number function, 
                if empty -> 0, else if not a number return the string</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:function name="my:format-number">
        <xsl:param name="number"></xsl:param>
        <xsl:param name="pattern"></xsl:param>
        <xsl:value-of select="
            if (xs:string($number)='' or number($number) =0) then 0 else
            if(number($number)=number($number)) then format-number($number,$pattern) 
            else $number"></xsl:value-of>
    </xsl:function>
    
    
    <xd:doc >
        <xd:desc>
            <xd:p>does the sub-calls </xd:p>
            <xd:p>uses XSLT-2.0 function: <xd:ref name="doc-available()" type="function"/></xd:p>
        </xd:desc>
        <xd:param name="q">the query string; default is the query of the original result </xd:param>
        <xd:param name="link">url to retrieve; overrides the q-param</xd:param>
    </xd:doc>
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
        <xd:param name="q"></xd:param>
        <xd:param name="link"></xd:param>
    </xd:doc>
    <xsl:template name="subrequest" >
        <xsl:param name="q" select="//*[contains(@name,'q')]" />
        <xsl:param name="link" select="concat($baseurl, $base-link, 'q=', $q)" />
        
        <xsl:message>DEBUG: subrequest: <xsl:value-of select="$link" /></xsl:message>        
        
        <xsl:choose>
            <xsl:when test="doc-available($link)" >
                <xsl:copy-of select="doc($link)" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:message>WARNING: subrequest failed! <xsl:value-of select="$link"></xsl:value-of></xsl:message>
            </xsl:otherwise>
        </xsl:choose>
        
    </xsl:template>  
    
    
    <xd:doc>
        <xd:desc>
            <xd:p>generates a link out of the param-list, but leaves out special parameters (q, qx, baseq, wt)</xd:p>
            <xd:p>used as base for subrequests</xd:p>
        </xd:desc>
        <xd:param name="params"></xd:param>
    </xd:doc>    
    <xsl:template name="base-link">
        <xsl:param name="params" select="//lst[@name='params']" />
        <xsl:apply-templates select="$params/*[not(@name='q')][not(@name='qx')][not(@name='baseq')][not(@name='wt')]" mode="link"></xsl:apply-templates>        
    </xsl:template>        
    
    
    <xd:doc>
        <xd:desc>
            <xd:p>(re)generates a link out of the param-list in the result</xd:p>
        </xd:desc>
    </xd:doc>    
    <xsl:template name="link" >        
        <xsl:variable name="link" ><xsl:text>?</xsl:text><xsl:apply-templates select="//lst[@name='params']" mode="link" /></xsl:variable>
        <a href="{$link}"><xsl:value-of select="$link" /></a>
    </xsl:template>
    
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="lst[@name='params']/str"  mode="link">
        <xsl:value-of select="concat(@name,'=',.,'&amp;')" />
    </xsl:template>
    
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="lst[@name='params']/arr" mode="link">        
        <xsl:apply-templates  mode="link"/>        
    </xsl:template>
    
    <xd:doc>
        <xd:desc>
            <xd:p></xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="lst[@name='params']/arr/str" mode="link">        
        <xsl:value-of select="concat(../@name,'=',.,'&amp;')" />
        
    </xsl:template>
    
    <xd:doc>
        <xd:desc>
            <xd:p>in link-mode discard any text-nodes not handled explicitely</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="text()" mode="link"/>
    
    
    <xd:doc>
        <xd:desc>
            <xd:p>flatten array to node-sequence</xd:p>
            <xd:p>solr delivers parameters differently depending on 
                if they are one (&lt;str name="param">value&lt;/str>)
                or many (&lt;arr name="param">&lt;str>value1&lt;/str>&lt;str>value2&lt;/str>&lt;/arr>)
            </xd:p>
            <xd:p>this is to generate a flat node-sequence out of both structures, 
                so that it can be traversed in the same way
            </xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="*" mode="arrayize">
        
        <xsl:choose>
            <xsl:when test="name(.)='arr'">
                <xsl:copy-of select="*" />                    
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy-of select="exsl:node-set(.)" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xd:doc>
        <xd:desc>
            <xd:p>inverts the dataset, i.e. labels will get dataseries and vice versa</xd:p>
            <xd:p>needed mainly for AreaChart display.</xd:p>
        </xd:desc>
        <xd:param name="dataset"></xd:param>
    </xd:doc>
    <xsl:template match="dataset" mode="invert">
        <xsl:param name="dataset" select="."></xsl:param>
        <dataset name="{@name}">
            <labels>
                <xsl:for-each select="dataseries">
                    <label>
                        <xsl:if test="@type"><xsl:attribute name="type" select="@type"></xsl:attribute></xsl:if>
                        <xsl:value-of select="@name" />
                    </label>
                </xsl:for-each>
            </labels>
            <xsl:for-each select="labels/label">
                <xsl:variable name="curr_label_old" select="text()" ></xsl:variable>
                <dataseries name="{$curr_label_old}" >
                    <xsl:for-each select="$dataset//value[@label=$curr_label_old]">                            
                        <value label="{../@name}" formatted="{@formatted}" >
                            <xsl:if test="../@type"><xsl:attribute name="type" select="../@type"></xsl:attribute></xsl:if>
                            <xsl:value-of select="."/>
                        </value>
                    </xsl:for-each>
                </dataseries>
            </xsl:for-each>
        </dataset>
    </xsl:template>
    
</xsl:stylesheet>

