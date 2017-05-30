Util = {
   fileUpload:function(path , fileArray){  
	  
	   var div = $("<div  id='ajaxfileUpload'></div>");
	   var iframe = $("<iframe id='ajaxiframe'></iframe>");
	 
	  
	   div.append(iframe);
	   $("body").append(div);
	   iframe.contents().find("body").append("<form id='ajaxfileUploadAction'  enctype='multipart/form-data' method='post'>" +
	   		"<input type='submit' >" +
	   		"</form>");
	   for(var i=0;i<fileArray.length;i++ ){

		  
		  iframe.contents().find("#ajaxfileUploadAction").append(fileArray[i]);
	   }
	   iframe.contents().find("#ajaxfileUploadAction").attr("action",path);
	 
	   iframe.contents().find("#ajaxfileUploadAction").submit();
	  // div.remove();
	   
   },
   getUsers:function(path ,userName){
	   var res = null;
	   $.ajax({
		   url:path+"/index/getUsers.do",
		   type:"post",
		   dataType:"json",
		   async:false, 
		   data:{username:userName},
		   success:function(data){
			   
			   if(data.code=='0'){
				   res = data.result;
			   return res;
			   }else if(data.code=='-1'){
				   
				   
				   login1();
			   }
		   }
		   
	   });
	   return res;
   },
   checkVal:function(name){
	   var val= null;
	   $("[name="+name+"]").each(function(){
		  var isTrue =  $(this).prop("checked");
		  if(isTrue){
			  val = $(this).val();
			  
		  }
	   });
	   return val;
   }
		
};
function login1(){
	
 window.location.href="http://huiyi.teamshub.com/meetingOn/login.jsp";
    
}
function login(){
	alert("登录信息失效,请重新登陆.");
 window.location.href="http://huiyi.teamshub.com/meetingOn/login.jsp";
    
}

function alertBox(setting ){
	if(typeof setting.width=="undefined" ){
		setting.width = 300;
	}
	if(typeof setting.height=="undefined" ){
		setting.height = 500;
	}
	
	
	var main  = $("#"+setting.id);
	var o = $("#"+setting.id).find(".body").eq(0);
	o.load(setting.url);
	
	
	
	var left = ($(document).width() - setting.width )/2;
	var height =  ($(document).height() - setting.height )/2;
	main.css("left",left+"px");
	main.css("top",height+"px");
}