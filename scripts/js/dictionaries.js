// http://stackoverflow.com/a/17606289
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

!function ($, VirtualKeyboard, params, xcontext, navigator, URI) {
    var m = {};
    m.ready = false;
    m.userLangs = navigator.languages;
    m.userLang = m.userLangs[0];
    m.autoCompleteDelay = 200;
    m.indexes = {};
    m.indexNames = [];
    m.href = new String;
    m.specialChars = [];
    m.cqlIdentifier = '("([^"])*")|([^\\s()=<>"\/]*)';
    m.contextQLre = new RegExp('(' + m.cqlIdentifier + ') *((==?)|(>=?)|(<=?)|(any)|(exact)) *(' + m.cqlIdentifier +')');

    /* get the relevant indexes for the dictionary and store them in an array */
    m.getIndexes = $.getJSON(params.switchURL+"?version=1.2&operation=explain&x-context=" +
            xcontext + "&x-format=json");

    function isContextQL(query) {       
        return m.contextQLre.test(query);
    }
    
    function gotIndexesDone(data) {
        m.indexes = data.indexes;
        $.each(m.indexes, function (unused, value) {
            $("style").append('.ui-widget-content li.ui-menu-item a.ui-corner-all.' + value.name + '{ color: #F00; }');
            if (value.name === "autocomp") {
                m.ready = true;
            }
        });
    }

    m.getIndexes.done(gotIndexesDone);
	
	m.getSpecialChars = $.get(params.switchURL+'?version=1.2&operation=searchRetrieve&x-context='+xcontext+'&query=rfpid=1');
    
	function gotSpecialCharsDone(data)  {
		$(data).find('value').each(function(){
			m.specialChars.push($(this).text());
		});
        VirtualKeyboard.keys[xcontext] =  m.specialChars;
        VirtualKeyboard.attachKeyboards();
	}

	m.getSpecialChars.done(gotSpecialCharsDone);
	

    $('document').ready(function () {
        resultContainerLoaded();
        
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

        $(".nav").on("click", "li", function () {
            var index = $(this).index() + 2;
            $("#main > div").hide();
            $("#main > div:nth-child(" + index + ")").show();
        });

        $(".jumbotron").click(function () {
            $("#main > div").hide();
            $("#front").show();
        });

        $("body").on("submit", "form", onSubmitForm);
        $("#front .search-caller").on("click", onSearchCall);
    });

    function getFilteredSuggestions(unused, callWhenDone) {
        if (!m.ready) {
            callWhenDone();
            return;
        }

        var filterText = $("#query-text-ui").val();
        var url = params.switchURL + "?version=1.2&operation=scan&scanClause=autocomp" +
                  "&x-filter=" + filterText + "&x-context=" + xcontext +
                  "&x-format=json&maximumTerms=100";
        var requestsForAllIndexes = $.getJSON(url);
        requestsForAllIndexes.then(function (responseJSON) {
            var results = [];
            for (var i = 0; i < responseJSON.terms.length; i++) {
                results.push(responseJSON.terms[i]);
            }
            gotFilteredSuggestions(results, callWhenDone);
        }, function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            callWhenDone();
        });
    }

    function gotFilteredSuggestions(results, callWhenDone) {
        var sortedResults = [];
        var firstTenOfsortedResults = [];

        sortedResults = results.sort(function (a, b) {
			var alabel = a.label
			.substr(0, a.label.indexOf('|'))
			.trim()
			.toLowerCase();
			var blabel = b.label.substr(0, b.label.indexOf('|'))
			.trim()
			.toLowerCase();
            if (alabel > blabel) {
                return 1;
            }
            if (alabel < blabel) {
                return -1;
            }
            return 0;
        });

        for (var j = 0; j < 9; j++) {
            if (sortedResults[j] !== undefined) {
                firstTenOfsortedResults.push(sortedResults[j]);
            }
        }

        callWhenDone($.map(firstTenOfsortedResults, function (item) {
            return {
                label: item.label,
                value: item.key,
                href: item.nextHref,
				index: item.index,
				count: item.count
            };
        }));
    }

    function onSubmitForm(event) {
        event.preventDefault();
        $("#submit-query").hide();
        $("#submit-query").next(".loader").show();
        var searchTerm = $("#query-text-ui").val();
        if (!isContextQL(searchTerm) && (searchTerm.indexOf('"') === -1) &&
                (searchTerm.indexOf(' ') !== -1)) {
            searchTerm = '"' + searchTerm + '"';
        }
        console.log(params.switchURL);
        console.log(searchTerm);
        if (m.href === '') {
            m.href = params.switchURL + "?version=1.2&operation=searchRetrieve&query=" +
                    encodeURIComponent(searchTerm) + "&x-context=" + xcontext +
                    "&x-userlangs=" + m.userLangs.join() + "&startRecord=1&maximumRecords=1000&x-format=htmlpagetable";
        }

        var encodedHref = m.href.replaceAll('"', '%22').replaceAll(' ', '%20');
        $("#searchcontainer").load(encodedHref + " .searchresults, input#exampleToggle", resultContainerLoaded);
    }

    function resultContainerLoaded() {
        /* turn input field into autocomplete field, and fill with data from server for all relevant indexes */

        $(".loader").hide();
        $("#submit-query").show();
        $("#query-text-ui").autocomplete({
            source: getFilteredSuggestions,
            minLength: 1,
            delay: m.autoCompleteDelay,
            select: function (event, ui) {
                if (ui.item) {

                    $('#query-text-ui').val(ui.item.value);
                    // quick fix; bad!
                    m.href = ui.item.href;

                }
                $('#searchretrieve').submit();
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            var listItem = $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "<span class='acmeta'> | "+item.count+" | "+item.index+"</span></a>")
                    .appendTo(ul);
					console.log(item);
            var index = item.href.slice(item.href.search("query=") + 6, item.href.search("%3"));

            listItem.addClass(index);

            return listItem;
        };
        
        VirtualKeyboard.attachKeyboards();
        // hide query
        $("#query-text-ui").val($("#query-text-ui").data('searchstring'));
        m.href = '';
    }
    
    function onSearchCall(event) {
        event.preventDefault();
        var searchConfig = (new URI(event.currentTarget.href)).query(true);
        if (searchConfig.query === 'metaText==Dictionaries') {            
            $('#li-about a').click();
            return;
        }
        $('#query-text-ui').val(searchConfig.query.replace('serverChoice=', ''));
        $('#li-search a').click();
        $('form#searchretrieve').submit();
        console.log(searchConfig);
    }
}(jQuery, VirtualKeyboard, params, xcontext, navigator, URI)