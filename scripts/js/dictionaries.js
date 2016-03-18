
		
		$('document').ready(function() {
		
			$(".nav").on("click","li",function() {
			var index = $(this).index() + 1;
			console.log(index);
			$("#main > div").hide();
			$("#main > div:nth-child("+index+")").show();
			console.log($("#main div:nth-child("+index+")").attr("id"));
			});
			
			$('#project').load('http://localhost/corpus_shell/modules/fcs-aggregator/switch.php?x-format=html&amp;version=1.2&amp;x-context='+xcontext+'&amp;operation=explain .zr-description');
		});