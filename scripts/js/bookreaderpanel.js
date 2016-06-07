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

!function ($, Panel) {
/**
 * A class for displaying XML data in a panel
 * Inherits from Panel using prototype inheritance (see below)
 */
var BookReaderPanel = function (id, type, title, url, position, pinned, zIndex, container, panelController, config) {
    Panel.call(this, id, type, title, url, position, pinned, zIndex, container, panelController, config);

    /**
     * @param -
     * purpose:    loads this.Url via AJAX and places the content of the remote file
     *             inside the searchresult div; afterwards initializes/refreshes the
     *             scrollbar
     * @return    -
     */
    this.GetFullText = function()
        {
            var uri = URI(this.Url);
            var bookId = uri.filename();
            var navFragment = uri.fragment();
            if (navFragment === '') {
                 navFragment = 'page/n11/mode/1up';
            }
            //?ui=embed
            uri = URI('https://archive.org/stream/' + bookId + '#' + navFragment);
            var elem = this.GetCssId();
            $(this.GetCssId()).find(".c_s_fcs_xml_link").addClass("c_s-hidden");
            var responseText = "<iframe id='" + this.Id + "_book' class='content' style='width: 100%; height:100%;' src=" + uri.toString() + ">";
            responseText += "</iframe>";
            $(elem).find(".searchresults").html(responseText);
            // hack FIXME
            $(elem).find(".c_s-scroll-area").css('overflow', 'hidden');
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
        
    };

};

// inherit Panel
BookReaderPanel.prototype = new Panel();

// publish
this.BookReaderPanel = BookReaderPanel;

}(jQuery, Panel);

