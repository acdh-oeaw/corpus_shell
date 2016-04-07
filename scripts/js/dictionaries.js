// http://stackoverflow.com/a/17606289
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

!function ($, VirtualKeyboard, params, xcontext, navigator) {
    var m = {};
    m.ready = false;
    m.userLangs = navigator.languages;
    m.userLang = m.userLangs[0];
    m.autoCompleteDelay = 200;
    m.indexes = {};
    m.indexNames = [];
    m.href = new String;

    /* get the relevant indexes for the dictionary and store them in an array */
    m.getIndexes = $.getJSON(params.switchURL + "?version=1.2&operation=explain&x-context=" +
            xcontext + "&x-format=json");

    function gotIndexesDone(data) {
        m.indexes = data.indexes;
        $.each(m.indexes, function (unused, value) {
            $("style").append('.ui-widget-content li.ui-menu-item a.ui-corner-all.' + value.name + '{ color: #F00; }');
            if (value.name === "lemma" || value.name === "inflected" || value.name.substring(0, 6) === "sense-") {
                m.indexNames.push(value.name);
                m.indexesString = +value.name + ",";
            }
            m.ready = true;
        });
    }

    m.getIndexes.done(gotIndexesDone);

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
    });

    function getFilteredSuggestions(unused, callWhenDone) {
        if (!m.ready) {
            return;
        }
        // so now we have to do several requests and then present the result
        // when all of them are done.
        // Solution is similiar to this: 
        // http://stackoverflow.com/a/9865124
        // and this
        // http://stackoverflow.com/a/16287125
        var requestsForAllIndexes = []; // array of promises that will be fullfilled
        // one after the other.
        $.each(m.indexNames, function (unused, value) {
            var filterText = $("#query-text-ui").val();
            var url = params.switchURL + "?version=1.2&operation=scan&scanClause=" +
                    value + "&x-filter=" + filterText + "&x-context=" + xcontext +
                    "&x-format=json&maximumTerms=10";
            requestsForAllIndexes.push($.getJSON(url));
        });
        // when used like this collects all the promises and then delevers all of
        // them to the done function
        $.when.apply($, requestsForAllIndexes).then(function () {
            var results = [];
            $.each(arguments, function (index, responseData) {
                for (var i = 0; i < responseData[2].responseJSON.terms.length; i++) {
                    results.push(responseData[2].responseJSON.terms[i]);
                }
            });
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
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
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
                label: item.value,
                value: item.key,
                href: item.nextHref
            };
        }));
    }

    function onSubmitForm(event) {
        event.preventDefault();
        $("#submit-query").hide();
        $("#loader").show();
        var searchTerm = $("#query-text-ui").val();
        if ((searchTerm[0] !== '"') &&
                (searchTerm.indexOf(' ') !== -1)) {
            searchTerm = '"' + searchTerm + '"';
        }
        console.log(params.switchURL);
        console.log(searchTerm);
        if (m.href === '') {
            m.href = params.switchURL + "?version=1.2&operation=searchRetrieve&query=" +
                    encodeURIComponent(searchTerm) + "&x-context=" + xcontext +
                    "&startRecord=1&maximumRecords=50&x-format=htmlpagetable";
        }

        var encodedHref = m.href.replaceAll('"', '%22').replaceAll(' ', '%20');
        $("#searchcontainer").load(encodedHref + " #result-container", resultContainerLoaded);
    }

    function resultContainerLoaded() {
        /* turn input field into autocomplete field, and fill with data from server for all relevant indexes */

        $("#loader").hide();
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
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            var index = item.href.slice(item.href.search("query=") + 6, item.href.search("%3"));

            listItem.addClass(index);

            return listItem;
        };

        VirtualKeyboard.attachKeyboards();
        m.href = '';
    }
}(jQuery, VirtualKeyboard, params, xcontext, navigator)