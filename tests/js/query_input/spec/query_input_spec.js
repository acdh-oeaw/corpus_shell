describe("Query input generator:", function() {
    beforeEach(function(){
        
    });
    
    afterEach(function(){});
    
    describe("Prerequisites:", function() {
//        xit("should not run ;-)", function() {
//           expect(true).toBeFalsy(); 
//        });
        it("should have access to its jQuery-UI slider dependency", function() {
            expect($.fn.slider).toBeDefined();
        });
        it("should have access to its jQuery-UI autocomplete dependency", function() {
            expect($.fn.autocomplete).toBeDefined();
        });
        it("should have access to its param dependency", function() {
            expect(params).toBeDefined();
        });
//        xit("should have access to the jquery.jScrollPane dependency", function () {
//            expect($.fn.jScrollPane).toBeDefined();
//        });
    });
    
    xdescribe("Getting data:", function() {
        beforeEach(function(done) {
            jasmine.addMatchers(SpecHelper.matchers);
            SpecHelper.setUpFakeXHR();
// fails to cleanly uninstall.
//        jasmine.Ajax.withMock(function() {
           // https://damasz.hephaistos.arz.oeaw.ac.at/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause=sense-en&x-context=apc_eng_002&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0

//        });
        });
        it("should have some keys in the TEI header fetched", function() {
            var i = 0;
            for (i in VirtualKeyboard.keys) {
                expect(VirtualKeyboard.keys[i].length).toBeGreaterThan(0);
                for (var j in VirtualKeyboard.keys[i])
                    expect(VirtualKeyboard.keys[i][j]).toBeTypeOf('String');
            }
            // check there was any iteration!
            expect(i).not.toEqual(0);
// Get the JSON for the outermost beforeEach with this.
//            console.log(JSON.stringify(VirtualKeyboard.keys));
        });
    });

    simpleFixtureSetup = function() {
        loadFixtures("form.html");
    };

    describe("Creating Inputs:", function() {
        beforeEach(simpleFixtureSetup);
        afterEach(function () {});
        describe("Simple submit textfield:", function () {
            it("should replace the form with a text field and a submit button", function () {
                expect($("#submit_form")).toBeInDOM();
                $("div.header").QueryInput({params: {
                        query: {label: "", value: "test", widget: "text"},
                        submit: {label: "", value: "suchen", widget: "submit"}
                        /*,
                         "x-context": {label:"Werke", value:"", widget:"multiselect", values:["abacus2.1","abacus2.2","abacus2.3"], width:"300px"}*/

                    },
                    onValueChanged: function (v) {}
                });                
                expect($("div.header>form")).toBeInDOM();                
                expect($("#input-query")).toBeInDOM();                
                expect($("div.header>form>input[type='submit']")).toBeInDOM();
            });
//            xit("should add keyboards to inputs that don't provide context data if a default is given", function() {
//                $(".virtual-keyboard-input#sth-unique").data('context', '');
//                VirtualKeyboard.attachKeyboards('arz_eng_006');
//                expect($(".virtual-keyboard")).toExist();
//            });
//            xit("should add those keys to the template", function() {
//                VirtualKeyboard.attachKeyboards();
//                // Currently may fail because of unsupported CORS for JSON on IE up to 9. Keyboard unuseabel (no keys)
//                expect($(".virtual-keyboard *").length).toEqual(VirtualKeyboard.keys["arz_eng_006"].length);
//                $(".virtual-keyboard *").each(function(i, element) {
//                    expect($(element).text()).toEqual(VirtualKeyboard.keys["arz_eng_006"][i]);
//                });
//            });
//            xit("should change the keyboard if the context changes", function() {
//                VirtualKeyboard.attachKeyboards();
//                expect($('.virtual-keyboard')).toExist();
//                $('#sth-unique').data('context', '');
//                VirtualKeyboard.attachKeyboards();
//                expect($('.virtual-keyboard')).not.toExist();
//            });
        });
        describe("Simple autocomplete textfield:", function () {
            it("should replace the form with an autocomplete text field", function (done) {
                expect($("#autocomplete_form")).toBeInDOM();
                expect($("#submit_form")).toBeInDOM();
                $("div.header").QueryInput({params: {
                        query: {
                            label: "",
                            value: "test",
                            widget: "autocomplete",
                            static_source: "https://damasz.hephaistos.arz.oeaw.ac.at/corpus_shell/modules/fcs-aggregator/switch.php",
                            },
                        /*,
                         "x-context": {label:"Werke", value:"", widget:"multiselect", values:["abacus2.1","abacus2.2","abacus2.3"], width:"300px"}*/

                    },
                    onValueChanged: function (v) {}
                });
                setTimeout(function(){                
                    expect($("div.header>form")).toBeInDOM();
                    done();                    
                }, 4000);
            });
        });
    });

//    xdescribe("End (deacitvated)", function() {
//        xit("the end", function(){});
//    });
});

