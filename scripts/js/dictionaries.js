	$('document').ready(function() {
		 $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });
		var userLang = navigator.language || navigator.userLanguage; 
		var userLangAbbr = userLang.substr(0,2);
		var indexes;
		var href;
		var selectedIndex;
		var results = [];
		var indexNames = [];
		var resultdata = {};
		var indexesString = '';
		var requestsForAllIndexes = [];
		
		
		VirtualKeyboard.attachKeyboards();
		
		/* get the relevant indexes for the dictionary and store them in an array */
		 $.ajax({
			url: window.location.href+"corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=explain&x-context="+xcontext+"&x-format=json",
			}).done(function(data) {
				
				indexes = data.indexes;
				$.each(indexes,function(key,value){
					$("style").append('.ui-widget-content li.ui-menu-item a.ui-corner-all.'+ value.name + '{ color: #F00; }');
					if (value.name == "lemma" || value.name == "inflected" || value.name.substring(0,6) == "sense-" ){
						indexNames.push(value.name);
						indexesString =+ value.name + ",";
						}
				});
				
			
			});
		/* turn input field into autocomplete field, and fill with data from server for all relevant indexes */
			
				console.log(requestsForAllIndexes);
				
		
		$( "#query-text-ui" ).autocomplete({
			
			source: function (request, response) {
				requestsForAllIndexes = [];
			$.each(indexNames,function(i,value){
				requestsForAllIndexes.push($.ajax(window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause="+value+"&x-filter="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0"))});
				
				
				 $.when.apply($,requestsForAllIndexes).done(function () {
					var results = [];
					var sortedResults=[];
				    var firstTenOfsortedResults = [];
					
			$.each(arguments, function(index, responseData){
				
				for (var i = 0; i < responseData[2].responseJSON.terms.length;i++ ){
				results.push(responseData[2].responseJSON.terms[i]);
				}
				 });
				
				
				
				 
				 sortedResults = results.sort(function (a, b) {
					 if (a.value > b.value) {
						 return 1;
						 }
						 if (a.value < b.value) {
							 return -1;
							 }
							 return 0;
							 });
							 
				for (var j = 0; j < 9; j++){
				firstTenOfsortedResults.push(sortedResults[j]);
				}
				
				
				
       response($.map(firstTenOfsortedResults, function (item) {
		   			
								return {
									label: item.value,
									value: item.key,
									href: item.nextHref
									};
							
					
				
				}));
				
				
			
				
			});
			
			
			
			
		},
		minLength: 1,
		delay: 600,
		select: function(event, ui) {
			if(ui.item){
				
				$('#query-text-ui').val(ui.item.value);
				href = ui.item.href;
				
				}
				$('#searchretrieve').submit();
		}
			}).data("autocomplete")._renderItem = function(ul, item) {
    var listItem = $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a>" + item.label + "</a>")
        .appendTo(ul);
		var index = item.href.slice(item.href.search("query=")+6,item.href.search("%3"));
  
    
        listItem.addClass(index);
    
    
    return listItem;
};
		
		$(".nav").on("click","li",function() {
			var index = $(this).index() + 2;
			$("#main > div").hide();
			$("#main > div:nth-child("+index+")").show();
			});
			
			$(".jumbotron").click(function(){
			$("#main > div").hide();
			$("#front").show();	
			});
			  
			$("body").on("submit","form",function(event){
	
				event.preventDefault();
				$("#submit-query").hide();
				$("#loader").show();
				var a = $("#query-text-ui").val();
				console.log(window.location.href);
				href = window.location.href+"/corpus_shell/modules/fcs-aggregator/switch.php?version=1.2&operation=searchRetrieve&query="+encodeURIComponent(a)+"&x-context="+xcontext+"&startRecord=1&maximumRecords=50&x-format=htmlpagetable&x-dataview=kwic,title";

				if (selectedIndex != ''){
					
					console.log(href);
				}
				$("#searchcontainer").load(href + " #result-container",function(){
					
					 $("#loader").hide();
					 $("#submit-query").show();
					 $( "#query-text-ui" ).autocomplete({
			
			source: function (request, response) {
				requestsForAllIndexes = [];
			$.each(indexNames,function(i,value){
				requestsForAllIndexes.push($.ajax(window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause="+value+"&x-filter="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0"))});
				
				
				 $.when.apply($,requestsForAllIndexes).done(function () {
					var results = [];
					var sortedResults=[];
				    var firstTenOfsortedResults = [];
					
			$.each(arguments, function(index, responseData){
				
				for (var i = 0; i < responseData[2].responseJSON.terms.length;i++ ){
				results.push(responseData[2].responseJSON.terms[i]);
				}
				 });
				
				
				
				 
				 sortedResults = results.sort(function (a, b) {
					 if (a.value > b.value) {
						 return 1;
						 }
						 if (a.value < b.value) {
							 return -1;
							 }
							 return 0;
							 });
							 
				for (var j = 0; j < 9; j++){
				firstTenOfsortedResults.push(sortedResults[j]);
				}
				
				
				
       response($.map(firstTenOfsortedResults, function (item) {
		   			
								return {
									label: item.value,
									value: item.key,
									href: item.nextHref
									};
							
					
				
				}));
				
				
			
				
			});
			
			
			
			
		},
		minLength: 1,
		delay: 600,
		select: function(event, ui) {
			if(ui.item){
				
				$('#query-text-ui').val(ui.item.value);
				href = ui.item.href;
				
				}
				$('#searchretrieve').submit();
		}
			}).data("autocomplete")._renderItem = function(ul, item) {
    var listItem = $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a>" + item.label + "</a>")
        .appendTo(ul);
		var index = item.href.slice(item.href.search("query=")+6,item.href.search("%3"));
  
    
        listItem.addClass(index);
    
    
    return listItem;
};
		
					 
				 });
			});
		});
		
		
			
		
			
		