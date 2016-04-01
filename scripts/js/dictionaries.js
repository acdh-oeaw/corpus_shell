	$('document').ready(function() {
		 $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });
		var userLang = navigator.language || navigator.userLanguage; 
		var userLangAbbr = userLang.substr(0,2);
		var indexes;
		
		var selectedIndex;
		
		VirtualKeyboard.attachKeyboards();
		 $.ajax({
			url: window.location.href+"corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=explain&x-context=apc_eng_002&x-format=json",
			}).done(function(data) {
				
				indexes = data.indexes;
});
		
		$( "#query-text-ui" ).autocomplete({
			source: function (request, response) {
				$.each(indexes,function(key,value){
					if (value.name == "lemma" || value.name == "inflected" || value.name.substring(0,5) == "sense" ){
			$.getJSON( window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause="+value.name+"="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0", function (data) {
				
				
				response($.map(data.terms, function (item) {
					return {
						label: item.value,
						value: item.key,
						href: item.nextHref
					};
				}));
				
			});
			}
			});
		},
		minLength: 1,
		delay: 1200,
		select: function(event, ui) {
			if(ui.item){
				$('#query-text-ui').val(ui.item.value);
				href = ui.item.href;
				}
				$('#searchretrieve').submit();
		}
			});
		
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
				var href = window.location.href+"/corpus_shell/modules/fcs-aggregator/switch.php?version=1.2&operation=searchRetrieve&query="+encodeURIComponent(a)+"&x-context="+xcontext+"&startRecord=1&maximumRecords=50&x-format=htmlpagetable&x-dataview=kwic,title";

				if (selectedIndex != ''){
					
					console.log(href);
				}
				$("#searchcontainer").load(href + " #result-container",function(){
					 $("#query-text-ui").val(a);
					 $("#loader").hide();
					 $("#submit-query").show();
					 $( "#query-text-ui" ).autocomplete({
				source: function (request, response) {
				$.each(indexes,function(key,value){
					if (value.name == "lemma" || value.name == "inflected" || value.name.substring(0,5) == "sense" ){
			$.getJSON( window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause="+value.name+"="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0", function (data) {
				
				
				response($.map(data.terms, function (item) {
					return {
						label: item.value,
						value: item.key,
						href: item.nextHref
					};
				}));
				
			});
			}
			});
		},
		minLength: 1,
		delay: 1200,
		select: function(event, ui) {
			if(ui.item){
				$('#query-text-ui').val(ui.item.value);
				href = ui.item.href;
				}
				$('#searchretrieve').submit();
		}
			});
		
					 
				 });
			});
		});