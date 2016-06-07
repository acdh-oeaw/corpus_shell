<?php

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
 * Saves corpus_shell user data for the provided uid
 * 
 * The data is saved in $userdataPath using the uid as filename and .json as
 * extension.
 * If a uid and data is provided as a POST request the function is assumed
 * to have succeeded.
 * TODO: Should be: If the file is actually saved the function has succeeded.
 * On success <msg>ok</msg> is returned on error <msg>not ok<msg>.
 * @uses $userdataPath
 * @see getUserId.php
 * @package user-data
 */
  
  include "../utils-php/config.php";

  if (function_exists('xdebug_disable')) {
    xdebug_disable();
  }
//  xdebug_start_error_collection();
  header("content-type: text/xml");
  // print_r's output is directed to the browser!
  print "<userdata>";
  print "<debug>"
  . "<var name='\$_POST'>";
  print(str_replace(array("<", "&", ">"), array("&lt;", "&amp;", "&gt;"), print_r($_POST, true)));
  print "</var></debug>";
  if (isset($_POST['uid']) && trim($_POST['uid']) != "" && isset($_POST['data']) && trim($_POST['data']) != "") {
    $uid = trim($_POST['uid']);
    $data = trim($_POST['data']);

    print "uid: $uid";

    $filename = $userdataPath . $uid . ".json";

    // disable warning
    $handle = @fopen($filename, "w");
    if ($handle === false) {
        print "<msg>open error</msg>";
    } else {
        if (fwrite($handle, $data) === false) {
            "<msg>write error</msg>";
        } else {
            print "<msg>ok</msg>";
        }
        fclose($handle);
    }
} else {
    print "<msg>not ok</msg>";
}
//xdebug_stop_error_collection();
//$xdebug_errors = xdebug_get_collected_errors();
//print "<debug>";
//print "<xdebug>";
//print(str_replace(array("<", "&", ">"), array("&lt;", "&amp;", "&gt;"), print_r($xdebug_errors, true)));
//print "</xdebug>";
//print "</debug>";
print "</userdata>";