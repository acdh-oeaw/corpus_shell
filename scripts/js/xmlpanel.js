/* 
 * The MIT License
 *
 * Copyright 2016 OEAW/ACDH.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var XmlPanel;

// Everything here assumes $ === jQuery so ensure this
(function ($, Panel, ace) {

/**
 * A class for displaying XML data in a panel
 * Inherits from Panel using prototype inheritance (see below)
 */
XmlPanel = function (id, type, title, url, position, pinned, zIndex, container, panelController, config) {
    Panel.call(this, id, type, title, url, position, pinned, zIndex, container, panelController, config);
    this.Url = encodeURI(this.Url.replace("x-format=html", "x-format=xml"));

    this.xmlResult;
    this.editor;

    /**
     * @param -
     * purpose:    loads this.Url via AJAX and places the content of the remote file
     *             inside the searchresult div; afterwards initializes/refreshes the
     *             scrollbar
     * @return    -
     */
    this.GetFullText = function()
    {
        var elem = this.GetCssId();
        var panel = this;
        $(panel.GetCssId()).find(".c_s_fcs_xml_link").addClass("c_s-hidden");
        $.ajax(
                {
                    type: 'GET',
                    url: this.Url,
                    dataType: 'xml',
                    complete: function(xml, textStatus)
                    {
                        panel.xmlResult = xml.responseText;
                        var responseText = "<div id='" + panel.Id + "_editor' class='content' style='width: 100%; height:100%;'>"
                        responseText += "</div>";
                        $(elem).find(".searchresults").html(responseText);
                        panel.editor = ace.edit(panel.Id + "_editor");
                        panel.editor.setValue(panel.xmlResult);
                        panel.editor.setTheme("ace/theme/tomorrow");
                        panel.editor.getSession().setMode("ace/mode/xml"); 
                        panel.editor.setReadOnly(true);
                        panel.editor.clearSelection();
                    }
                }
        );
    };

    /**
     * This method is not needed by this type of panel.
     * @returns -
     */
    this.InitScrollPane = function() {
    };
    /**
     * This method needs to pass the call to map's updateSize.
     * @returns -
     */
    this.UpdateContentView = function() {
        this.editor.resize();
    };

}

XmlPanel.prototype = new Panel();

})(jQuery, Panel, ace);

