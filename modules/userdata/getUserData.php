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
 * This file script is used to provide the data stored for some user
 * in a server side storage.
 * 
 * Expects an uid as a POST parameter, returns a file with that name from 
 * $userdatapath which has a json ending. The mime type is set accordingly.
 * @uses $userdataPath
 * @see getUserId.php
 * @package user-data
 */
 
  header('Content-type: application/json');

/**
 * Uses the common modules config file.
 */
  include "../utils-php/config.php";

  header('Content-type: application/json');
// use POST
if (isset($_POST['uid']) && trim($_POST['uid']) != "") {
// use GET
//  if (isset($_GET['uid']) && trim($_GET['uid']) != "")
    $uid = trim($_POST['uid']);
    $filename = $userdataPath . $uid . ".json";
    if (file_exists($filename)) {
        readfile($filename);
    } else {
        print "false";
    }
} else {
    print "null";
}