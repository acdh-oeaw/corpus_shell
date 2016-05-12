<?php

namespace tests\unit\ACDH\FCSSRU\mysqlonsru;

// use contents of tests/config.
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../../../../config';

$runner = true;

require_once __DIR__ . '/../../../../../modules/utils-php/common.php';
require_once __DIR__ . '/../../../../../vendor/autoload.php';
// this is not autoload enabled yet. There are to many magic global constants that need to be set when loading.
require_once __DIR__ . '/../../../../../modules/mysqlonsru/GlossaryOnSRU.php';

use ACDH\FCSSRU\mysqlonsru\glossaryComparatorFactory,
    ACDH\FCSSRU\mysqlonsru\glossaryComparator;    

/**
 * Description of glossarySearchResultComparatorTest
 *
 * @author osiam
 */
class glossarySearchResultComparatorTest extends \PHPUnit_Framework_TestCase {
    /**
     * @var glossaryComparator
     */
    protected $object;
    protected $compA = array();
    protected $compB = array();
    protected $compBest = array();
    protected $comp2A = array();
    protected $comp2B = array();
    protected $comp2Best = array();
    
    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
        $factory = new glossaryComparatorFactory('ḥarf');
        $this->object = $factory->createComparator();
        $this->compA['content'] = $this->xmlSampleA;
        $this->compB['content'] = $this->xmlSampleB;
        $this->compBest['content'] = $this->xmlSampleBest;
        $this->comp2A['content'] = $this->xmlSample2A;
        $this->comp2B['content'] = $this->xmlSample2B;
        $this->comp2Best['content'] = $this->xmlSample2Best;
    }
    
    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        
    }
    
    public function testBestBetterA() {
        $this->assertEquals(-1, $this->object->sortSearchResult($this->compBest, $this->compA),
                'Best example should be better than example A');
    }
    
    public function testBestBetterB() {
        $this->assertEquals(-1, $this->object->sortSearchResult($this->compBest, $this->compB),
                'Best example should be better than example B');
    }
    
    public function testBBetterA() {
        $this->assertEquals(-1, $this->object->sortSearchResult($this->compB, $this->compA),
                'Example B should be better than example B');
    }
        
    public function testBest2BetterA2() {
        $factory = new glossaryComparatorFactory('kardan');
        $this->object = $factory->createComparator();
        $this->assertEquals(-1, $this->object->sortSearchResult($this->comp2Best, $this->comp2A),
                'Best example 2 should be better than example 2 A');
    }
        
    public function testBest2BetterB2() {
        $factory = new glossaryComparatorFactory('kardan');
        $this->object = $factory->createComparator();
        $this->assertEquals(-1, $this->object->sortSearchResult($this->comp2Best, $this->comp2B),
                'Best example 2 should be better than example 2 A');
    }
    
    protected $xmlSampleA = <<<EOT
<entry xmlns:wkp="urn:general" xml:id="harf_e_rabt_001">
   <form type="multiWordUnit">
      <orth xml:lang="fa-Arab">حرف ربط</orth>
      <orth xml:lang="fa-x-modDMG">ḥarf-e rabṭ</orth>
   </form>
   <wkp:link target="C:\temp\wikipedia_fa\fa_wiki_split_002\out_227903.xml"/>
   <wkp:link target="http://fa.wikipedia.org/wiki/حرف ربط"/>
   <wkp:sense>
      <usg type="dom" xml:lang="fa-Arab">دستور زبان, پاره‌های سخن</usg>
    
      <cit type="translation" xml:lang="en">
         <quote>Conjunction (grammar)</quote>
      </cit>
    
      <cit type="translation" xml:lang="de">
         <quote>Konjunktion (Wortart)</quote>
      </cit>
   </wkp:sense>
  
   <sense>
      <usg type="dom">grammar</usg>
    
      <cit type="translation" xml:lang="en">
         <quote>conjunction</quote>
      </cit>
   </sense>
   <wkp:usg type="dom" xml:lang="fa-Arab">دستور زبان, پاره‌های سخن</wkp:usg>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_06_08"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
        protected $xmlSampleB = <<<EOT
<entry xml:id="harf_zadan_001">
   <form type="multiWordUnit">
      <orth xml:lang="fa-Arab">حرف زدن</orth>
      <orth xml:lang="fa-x-modDMG">ḥarf zadan</orth>
   </form>
  
   <gramGrp>
      <gram type="pos">lightVerbConstruction</gram>
   </gramGrp>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>to talk, to speak</quote>
      </cit>
   </sense>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_07"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
        protected $xmlSampleBest = <<<EOT
<entry xml:id="h_arf0">
   <form type="lemma">
      <orth xml:lang="fa-Arab">حرف</orth>
      <orth xml:lang="fa-x-modDMG">ḥarf</orth>
   </form>
  
   <gramGrp>
      <gram type="pos">noun</gram>
   </gramGrp>
  
   <form type="inflected" ana="#n_pl">
      <orth xml:lang="fa-Arab">حروف</orth>
      <orth xml:lang="fa-x-modDMG">ḥoruf</orth>
   </form>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>letter, character</quote>
      </cit>
      <ptr type="example" target="in_ketaab_baa_horuf_001"/>
   </sense>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>speech, talk, word</quote>
      </cit>
      <cit  type="example">
   <quote xml:lang="fa-Arab">حرفش‮را برید وگفت: دیگر بچه نیست٠</quote>
   <quote xml:lang="fa-x-modDMG">ḥarf-aš˗rā borid wa-goft: digar bačče nist.</quote>
  
   <cit type="translation" xml:lang="en">
      <quote>She interrupted him and said: he is not a child any more.</quote>
   </cit>
  
   <cit type="translation" xml:lang="de">
      <quote>-</quote>
   </cit>
   <fs type="create">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_27"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_27"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</cit>

      <cit  type="example">
   <quote xml:lang="fa-Arab">دیگر با آن‮ها حرفی نداشتم٠</quote>
   <quote xml:lang="fa-x-modDMG">digar bā ān˗hā ḥarf-i nadāštam.</quote>
  
   <cit type="translation" xml:lang="en">
      <quote>I had nothing more to say to them.</quote>
   </cit>
  
   <cit type="translation" xml:lang="de">
      <quote>-</quote>
   </cit>
   <fs type="create">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_30"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_30"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</cit>

      <cit  type="example">
   <quote xml:lang="fa-Arab">وسط حرفش دوید و گفت: نرو!</quote>
   <quote xml:lang="fa-x-modDMG">wasaṭ-e ḥarf-aš dawid wa-goft: na-row!</quote>
  
   <cit type="translation" xml:lang="en">
      <quote>He interrupted her and said: Don’t go!</quote>
   </cit>
  
   <cit type="translation" xml:lang="de">
      <quote>-</quote>
   </cit>
   <fs type="create">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_06_07"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_06_07"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</cit>

   </sense>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>particle</quote>
      </cit>
   </sense>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2011_12_21"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_05_22"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_07"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_01_19"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_27"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_30"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_06_08"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_06_08"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
        protected $xmlSample2Best = <<<EOT
<entry xml:id="kardan_001">
   <form type="lemma">
      <orth xml:lang="fa-Arab">کردن</orth>
      <orth xml:lang="fa-x-modDMG">kardan</orth>
   </form>
  
   <gramGrp>
      <gram type="pos">verb</gram>
   </gramGrp>
  
   <form type="presStem">
      <orth xml:lang="fa-Arab">کن</orth>
      <orth xml:lang="fa-x-modDMG">kon</orth>
   </form>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>to do, to make, to perform, to render</quote>
      </cit>
   </sense>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_05_17"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2013_04_24"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2014_07_12"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
        protected $xmlSample2A = <<<EOT
<entry xml:id="aabdaac_kardan0">
   <form type="multiWordUnit">
      <orth xml:lang="fa-Arab">ابداع كردن</orth>
      <orth xml:lang="fa-x-modDMG">ebdāʕ kardan</orth>
   </form>
  
   <gramGrp>
      <gram type="pos">lightVerbConstruction</gram>
   </gramGrp>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>to invent, to create, to innovate</quote>
      </cit>
      <cit  type="example">
   <quote xml:lang="fa-Arab">یک روبات پلاستیکی ابداع کرده‮اند٠</quote>
   <quote xml:lang="fa-x-modDMG">yek rọbāt-e plāstiki ebdāʕ karde˗and.</quote>
  
   <cit type="translation" xml:lang="en">
      <quote>They have created a plastic robot.</quote>
   </cit>
  
   <cit type="translation" xml:lang="de">
      <quote>-</quote>
   </cit>
   <fs type="create">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2014_09_11"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2014_09_11"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</cit>

   </sense>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_05_15"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2014_07_27"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2014_09_11"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
        protected $xmlSample2B = <<<EOT

<entry xml:id="paark_kardan_001">
   <form type="multiWordUnit">
      <orth xml:lang="fa-Arab">پارک کردن</orth>
      <orth xml:lang="fa-x-modDMG">pārk kardan</orth>
   </form>
  
   <gramGrp>
      <gram type="pos">lightVerbConstruction</gram>
   </gramGrp>
  
   <sense>
      <cit type="translation" xml:lang="en">
         <quote>to park
            <usg type="hint">a car</usg>
         </quote>
      </cit>
    
      <cit type="translation" xml:lang="de">
         <quote>parken</quote>
      </cit>
      <cit  type="example">
   <quote xml:lang="fa-Arab">ماشین‮را در وسط خیابان پارک کرد٠</quote>
   <quote xml:lang="fa-x-modDMG">māšin˗rā dar wasaṭ-e ḫiyābān pārk kard.</quote>
  
   <cit type="translation" xml:lang="en">
      <quote>He parked his car in the middle of the road.</quote>
   </cit>
  
   <cit type="translation" xml:lang="de">
      <quote>Er hat sein Auto mitten auf der Straße geparkt.</quote>
   </cit>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_10"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_10"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</cit>

   </sense>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_10"/>
      </f>
   </fs>
   <fs type="change">
      <f name="who">
         <symbol value="charly"/>
      </f>
      <f name="when">
         <symbol value="2012_06_10"/>
      </f>
      <f name="status">
         <symbol value="released"/>
      </f>
   </fs>
</entry>
EOT;
}
