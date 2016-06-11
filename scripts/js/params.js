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

/**
 * @fileOverview a default version of the params-file for instance specific configuration.
 * Makes things work just pointing a CORS compatible Browser (non-IE, IE >= 10) at the
 * local copy. The switch URL is a temporary reverse proxy solution.
 */

/**
 * @module corpus_shell 
 */

/** Base url or where do we live. Does not make much sense on a locally downloaded copy.
 * @type {path|url}  
 */
if (baseURL === undefined) { var baseURL = "./"; }
/** The place where the php scripts for user data management live (see the modules/userdata sub directory). It's assumend this is a path which needs to be added to baseUrl.
 * @type {path}
 */
if (userData === undefined) { var userData = "modules/userdata/"; }
/** The url of the switch script. May be anywhere on the internet if cross-origin resource shareing (CORS, see enable-cors.org) is properly set up.
 * Most probably this is set to a sane default in some (XSL) generated script tags.
 * @type {url} 
 */
if (switchURL === undefined) { var switchURL = "http://localhost/corpus_shell/modules/fcs-aggregator/switch.php"; }
/** The url or path where the templates which are used for the UI should be loaded from.
 * Please not: if this is a relative url it may be relative to whatever URL the
 * corpus_shell is called from. Do not use relative URLs if you can't be sure
 * about that. Note that this is assumed to end with a slash (/)
 * @type {url|path}
 */
if (templateLocation === undefined) { var templateLocation = "/corpus_shell/scripts/js/"; }

/**
 * Default width of a new panel.
 * Anything acceptable as a CSS width, px preferable.
 * @type {string}
 */
if (defaultWidth === undefined) { var defaultWidth = "525px"; }

/**
 * Default height of a new panel
 * Anything acceptable as a CSS height, px preferable.
 * @type {string}
 */
if (defaultHeight === undefined) { var defaultHeight = "600px"; }

/**
 * Default left offset for new panels.
 * This will be used to calculate the offset of new windows so a cascading
 * windows effect is achieved.
 * @type {number}
 */
if (defaultLeftOffset === undefined) { var defaultLeftOffset = 212; }

/**
 * Default top offset for new panels.
 * This will be used to calculate the offset of new windows so a cascading
 * windows effect is achieved.
 */
if (defaultTopOffset === undefined) { var defaultTopOffset = 10; }

//TODO make use of the module pattern
!function() {
    var module = {};

    module.baseURL = baseURL;
    module.userData = userData;
    module.switchURL = switchURL;
    module.templateLocation = templateLocation;
    module.defaultWidth = defaultWidth;
    module.defaultHeight = defaultHeight;
    module.defaultLeftOffset = defaultLeftOffset;
    module.defaultTopOffset = defaultTopOffset;

    this.params = module;
}();