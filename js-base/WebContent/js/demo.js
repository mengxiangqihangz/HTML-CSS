
$(function(){
	/**
	 * ����4�ַ������ǿ��Ե�
	 * click��onclick
	 */
	$("#btn").click(function(){	//��jquery
		alert("hello world!");
	});
	
	document.getElementById("btn").onclick = function(){ //��js
		alert("Hello javascript");
	};
	
	$("#btn")[0].onclick = function(){
		alert("Hello javascript");
	};
	
	document.getElementById("btn").click(function(){
		alert("hello world!");
	});
	
});