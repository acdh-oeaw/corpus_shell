
		
		$('document').ready(function() {
		
			$(".nav").on("click","li",function() {
				var index = $(this).index() + 1;
				$("#main > div").hide();
				$("#main > div:nth-child("+index+")").show();
			});
			
			$('#project').load('http://localhost/corpus_shell/modules/fcs-aggregator/switch.php?x-format=html&version=1.2&x-context='+xcontext+'&operation=explain .zr-description');
		    $("body").on("submit","form",function(event){
			 	event.preventDefault();
         		var a = $("#query-text-ui").val();
         		var o = $("#operator").val();
    			var f = $("#field").val();
  			 	field = f;
         	$("#searchcontainer").load("http://localhost/corpus_shell/modules/fcs-aggregator/switch.php?version=1.2&operation=searchRetrieve&query="+f+o+encodeURIComponent(a)+"&x-context="+xcontext+"&startRecord=1&maximumRecords=10&x-format=htmlpagetable&x-dataview=kwic,title #result-container",function(){$("#query-text-ui").val(a);$("#operator").val(o);$("#field").val(f);});
         	
         
});
		
		});