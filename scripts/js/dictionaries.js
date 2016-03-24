	$('document').ready(function() {
		 $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });
		var userLang = navigator.language || navigator.userLanguage; 
		var userLangAbbr = userLang.substr(0,2);
		
		VirtualKeyboard.attachKeyboards();
		
		$( "#query-text-ui" ).autocomplete({
			source: function (request, response) {
			$.getJSON( window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause=sense-"+userLangAbbr+"="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0", function (data) {
				
				
				response($.map(data.terms, function (item) {
					return {
						label: item.value,
						value: item.key
					};
				}));
			});
		},
		minLength: 2,
		delay: 100
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
				var o = $("#operator").val();
				var f = $("#field").val();
				field = f;
				$("#searchcontainer").load(window.location.href+"/corpus_shell/modules/fcs-aggregator/switch.php?version=1.2&operation=searchRetrieve&query=sense-"+userLangAbbr+"="+encodeURIComponent(a)+"&x-context="+xcontext+"&startRecord=1&maximumRecords=50&x-format=htmlpagetable&x-dataview=kwic,title #result-container",function(){
					 $("#query-text-ui").val(a);
					 $("#operator").val(o);
					 $("#field").val(f);
					 $("#loader").hide();
					 $("#submit-query").show();
					 $( "#query-text-ui" ).autocomplete({
			source: function (request, response) {
			$.getJSON( window.location.href+"/corpus_shell//modules/fcs-aggregator/switch.php?version=1.2&operation=scan&scanClause=sense-"+userLangAbbr+"="+$("#query-text-ui").val()+"&x-context="+xcontext+"&x-format=json&x-dataview=kwic,title&sort=x&maximumTerms=10&responsePosition=0", function (data) {
				
				
				response($.map(data.terms, function (item) {
					return {
						label: item.value,
						value: item.key
					};
				}));
			});
		},
		minLength: 2,
		delay: 100
			});
		
					 
				 });
			});
		});