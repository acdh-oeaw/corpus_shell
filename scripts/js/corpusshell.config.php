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

/*
	generates an js-array out of switch.config
	containing the available targets
	
	new feature: add items of type == "fcs.resource"
*/

  require_once "../../modules/utils-php/common.php";

  $ddcConfig = "../../modules/fcs-aggregator/fcs.resource.config.php";
  $ddcConfigFound = false;

  function GetNodeValue($node, $tagName)
  {
     $list = $node->getElementsByTagName($tagName);
     if ($list->length != 0)
     {
       $value = $list->item(0);
       return $value->nodeValue;
     }
     return "";
  }

  if (file_exists($ddcConfig))
  {
    include $ddcConfig;
    $ddcConfigFound = true;    
  }  

  header("Content-Type: application/x-javascript");
  print "var SearchConfig = new Array();\n";

  $doc = new DOMDocument;
  $doc->Load($switchConfig);

  $xpath = new DOMXPath($doc);
  $query = '//item';
  $entries = $xpath->query($query);

  $idx = 0;

  foreach ($entries as $entry)
  {
     $type = GetNodeValue($entry, "type");
     print "SearchConfig[$idx] = new Array();\n";
     $name = GetNodeValue($entry, "name");
     print "SearchConfig[$idx]['x-context'] = '$name';\n";
     $label = GetNodeValue($entry, "label");
     print "SearchConfig[$idx]['DisplayText'] = '$label';\n\n";     
     $idx++;

     if (($type == "fcs.resource") && ($ddcConfigFound === true))
     {
       $keys = array_keys($configName);
       $parentName = $name;
       
       foreach ($keys as $key)
       {         
         $pos = strpos($key, $parentName);
         if (($pos !== false) && ($pos == 0))
         {
           print "SearchConfig[$idx] = new Array();\n";
           $conf = $configName[$key];
           
           $name = $conf["name"];
           print "SearchConfig[$idx]['x-context'] = '$name';\n";
           $label = $conf["displayText"];
           print "SearchConfig[$idx]['DisplayText'] = ' -> $label';\n\n";     
           $idx++;
         }
       }       
     }

  }