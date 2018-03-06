
$(function(){
	/**
	 * 以下4种方法都是可以的
	 * click和onclick
	 */
	$("#btn").click(function(){	//纯jquery
		alert("hello world!");
	});
	
	document.getElementById("btn").onclick = function(){ //纯js
		alert("Hello javascript");
	};
	
	$("#btn")[0].onclick = function(){
		alert("Hello javascript");
	};
	
	document.getElementById("btn").click(function(){
		alert("hello world!");
	});
	
});