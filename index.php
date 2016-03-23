<?php

$runner = true;

require_once __DIR__ . '/corpus_shell/vendor/autoload.php';
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

    case 'localhost':
$sru_fcs_params->xcontext = 'apc_eng_002';
$sru_fcs_params->query = 'sense=Damascene';
break;
}
$sru_fcs_params->context = array($sru_fcs_params->xcontext);
$s = new FCSSwitch();
$s->run();


