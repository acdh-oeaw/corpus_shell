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
 * @fileOverview Configuration of available search contexts, downloaded from corpus3.aac.ac.at.
 * last updated 2012-07-26
 */

/**
 * @module corpus_shell 
 */

/**
 * @typedef {Object} SearchConfigItem
 * @property {string} x-context internal name
 * @property {string} DisplayText a user readable name (eg. for buttons)
 */

/**
 * An array of maps which provides all possible search contexts (['x-context'] => internal name) and
 * their respective human readable description (['DisplayText'] => a user readable name)
 * @type {array.<SearchConfigItem>}
 */
var SearchConfig = new Array();
SearchConfig[0] = new Array();
SearchConfig[0]['x-context'] = 'vicav_profiles_001';
SearchConfig[0]['DisplayText'] = 'Profiles';

SearchConfig[1] = new Array();
SearchConfig[1]['x-context'] = 'vicav_sampletexts';
SearchConfig[1]['DisplayText'] = 'Sample Texts';

SearchConfig[2] = new Array();
SearchConfig[2]['x-context'] = 'vicav_meta';
SearchConfig[2]['DisplayText'] = 'Meta Texts';

SearchConfig[3] = new Array();
SearchConfig[3]['x-context'] = 'vicav_tools_001';
SearchConfig[3]['DisplayText'] = 'Tools Texts';

SearchConfig[4] = new Array();
SearchConfig[4]['x-context'] = 'vicav_lingfeatures_001';
SearchConfig[4]['DisplayText'] = 'Linguistic Feature Texts';

SearchConfig[5] = new Array();
SearchConfig[5]['x-context'] = 'vicav_bibl_002';
SearchConfig[5]['DisplayText'] = 'Bibliography';

SearchConfig[6] = new Array();
SearchConfig[6]['x-context'] = 'arz_eng_006';
SearchConfig[6]['DisplayText'] = 'Dictionary Cairo Variety';

SearchConfig[7] = new Array();
SearchConfig[7]['x-context'] = 'aeb_eng_001';
SearchConfig[7]['DisplayText'] = 'TUNICO Dictionary';

SearchConfig[8] = new Array();
SearchConfig[8]['x-context'] = 'aeb_eng_001__v001';
SearchConfig[8]['DisplayText'] = 'Dictionary Tunis Variety';

SearchConfig[9] = new Array();
SearchConfig[9]['x-context'] = 'apc_eng_002';
SearchConfig[9]['DisplayText'] = 'Dictionary Damascus Variety';

SearchConfig[10] = new Array();
SearchConfig[10]['x-context'] = 'ar_de__v001';
SearchConfig[10]['DisplayText'] = 'Dictionary Standard Arabic';

SearchConfig[11] = new Array();
SearchConfig[11]['x-context'] = 'tunico_conc';
SearchConfig[11]['DisplayText'] = 'Tunico Concordance';

SearchConfig[12] = new Array();
SearchConfig[12]['x-context'] = 'tunico';
SearchConfig[12]['DisplayText'] = 'Tunico Texts';
