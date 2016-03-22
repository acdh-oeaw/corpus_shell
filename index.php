<?php

$runner = true;

require_once __DIR__ . '/corpus_shell/vendor/autoload.php';
//require_once __DIR__ . '/corpus_shell/modules/fcs-aggregator/switch.php';
chdir(__DIR__ . '/corpus_shell/modules/fcs-aggregator');
require_once 'switch.php';

use ACDH\FCSSRU\SRUWithFCSParameters,
    ACDH\FCSSRU\switchAggregator\FCSSwitch;

$sru_fcs_params = new SRUWithFCSParameters("strict");
$sru_fcs_params->xformat = 'htmlpagetable';
$sru_fcs_params->operation = 'searchRetrieve';
$sru_fcs_params->version = '1.2';
$sru_fcs_params->xdataview = 'kwic,title';
$sru_fcs_params->maximumRecords = '10';
switch ($_SERVER['SERVER_NAME']) {
    case 'persengldict.hephaistos.arz.oeaw.ac.at':
// Set up the parameter object
// x-format=htmlpagetable&operation=searchRetrieve&version=1.2&
// x-dataview=kwic,title&maximumRecords=10&x-context=pes_eng_032&
// query=senses==Persian
$sru_fcs_params->xcontext = 'pes_eng_032';
$sru_fcs_params->query = 'sense==Persian';
break;
    case 'zulu.hephaistos.arz.oeaw.ac.at':
$sru_fcs_params->maximumRecords = '100';
$sru_fcs_params->xcontext = 'zul_eng_016';
$sru_fcs_params->query = 'lemma=zulu';
break;
    case 'damasz.hephaistos.arz.oeaw.ac.at':
$sru_fcs_params->xcontext = 'apc_eng_002';
$sru_fcs_params->query = 'sense=Damascene';
break;
}
$sru_fcs_params->context = array($sru_fcs_params->xcontext);
$s = new FCSSwitch();
$s->run();


