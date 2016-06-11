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
 * Generates a GUID for identifying a particular corpus_shell user's 
 * persistence file on this web server
 * 
 * A utility service which is otherwise unrelated to the storage and retrieval of
 * the data even though the identifier will be used as a part of the filename
 * on the server. The data is presented to the client as a JSON object with a
 * property of "id". The browser is advised to refetch such GUIDs every time.
 * @see getUserData.php
 * @see saveUserData.php
 * @package user-data
 */
 
 /**
  * Creates a GUID based on the time and origin of the request.
  */
 function create_guid($namespace = '')
 {
    $guid = '';
    $uid = uniqid("", true);
    $data = $namespace;
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
	// The well documented keys are SERVER_* (they exist if apache is used)
    if (array_key_exists("SERVER_ADDR", $_SERVER)) $data .= $_SERVER['SERVER_ADDR'];
    if (array_key_exists("SERVER_PORT", $_SERVER)) $data .= $_SERVER['SERVER_PORT'];
	// These may be set (they seem to exist if CGI or IIS is used)
    if (array_key_exists("LOCAL_ADDR", $_SERVER)) $data .= $_SERVER['LOCAL_ADDR'];
    if (array_key_exists("LOCAL_PORT", $_SERVER)) $data .= $_SERVER['LOCAL_PORT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
    $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
    $guid = '{' .
            substr($hash,  0,  8) .
            '-' .
            substr($hash,  8,  4) .
            '-' .
            substr($hash, 12,  4) .
            '-' .
            substr($hash, 16,  4) .
            '-' .
            substr($hash, 20, 12) .
            '}';
    return $guid;
 }

 header('cache-control: no-cache, must-revalidate');
 header('expires: Mon, 26 Jul 1997 05:00:00 GMT');
 header('content-type: application/json; charset=utf-8');

 $uid = create_guid();
 $data = array('id' => $uid);

 echo json_encode($data);

?>