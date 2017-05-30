/**
 * author levi
 * url http://levi.cg.am
 */

	var stack = new Undo.Stack(),
		saveCommand = Undo.Command.extend({
			constructor: function(box){
				this.box = box;
				this.boxId=box.attr("id");
				//	this.pageId=$("#pBox").find(".edit").attr("id");
				this.outerHTML=this.box.prop("outerHTML");
			
			},
			execute: function(){
				$("#pBox").append(this.box);
				
			},
			undo: function() {
				
				 this.outerHTML=$("#"+this.boxId).prop("outerHTML");
			     $("#"+this.boxId).remove();
			    
			},
			redo:function() {
				$("#pBox").append(this.outerHTML);
				
				$("#"+this.boxId).mousedown(boxmousedown);
				
				$("#"+this.boxId).dblclick(function(){
			        var type=$(this).attr("type");
				
					if('lable'==type){
					$(this).attr("contentEditable",'true');
					
					return false;
					}
				});
			}
		}),
		deleteCommand = Undo.Command.extend({
		    constructor: function(box) {
			this.boxHtml =box.prop("outerHTML");
			this.boxId=box.attr("id");
		},
		execute: function() {			
			$("#"+this.boxId).remove();
		},
		undo: function() {
			
			$("#pBox").append(this.boxHtml);
			$("#"+this.boxId).mousedown(boxmousedown);
			$("#"+this.boxId).dblclick(function(){
		        var type=$(this).attr("type");
			
				if('lable'==type){
				$(this).attr("contentEditable",'true');
				
				return false;
				}
			});
		},
		redo:function() {
			$("#"+this.boxId).remove();
		}
	     }),
	     moveCommand = Undo.Command.extend({
				constructor: function(oldHtml,newHtml,boxId){
					this.oldJson = oldHtml;
					this.newJson=newHtml;
					this.boxId=boxId;
				
				},
				execute: function(){
				
			
				},
				undo: function() {
					$("#"+this.boxId).css("width",this.oldJson.width);
					$("#"+this.boxId).css("height",this.oldJson.height);
					$("#"+this.boxId).css("top",this.oldJson.top);
					$("#"+this.boxId).css("left",this.oldJson.left);
				     
					
				},
				redo:function() {
					$("#"+this.boxId).css("width",this.newJson.width);
					$("#"+this.boxId).css("height",this.newJson.height);
					$("#"+this.boxId).css("top",this.newJson.top);
					$("#"+this.boxId).css("left",this.newJson.left);
				}
			}),
			reSizeCommand = Undo.Command.extend({
				constructor: function(oldHtml,newHtml,boxId){
				this.oldJson = oldHtml;
				this.newJson=newHtml;
				this.boxId=boxId;
			
			},
			execute: function(){
			
		  
			},
			undo: function() {
				$("#"+this.boxId).css("width",this.oldJson.width);
				$("#"+this.boxId).css("height",this.oldJson.height);
			     
				
			},
			redo:function() {
				$("#"+this.boxId).css("width",this.newJson.width);
				$("#"+this.boxId).css("height",this.newJson.height);
			}
		}),
		bGCommand = Undo.Command.extend({
			constructor: function(oldUrl,newUrl){
			this.oldUrl = oldUrl;
			this.newUrl=newUrl;
			
		
		},
		execute: function(){
		//		$("#pBox").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+json.urlPath+"',sizingMethod='scale',scale='true')");
			$("#pBox").css({'background':this.newUrl}); $("#pBox").css({'background-size':'100%'});
		},
		undo: function() {
			
			$("#pBox").css({'background':this.oldUrl}); $("#pBox").css({'background-size':'100%'});
		},
		redo:function() {
			$("#pBox").css({'background':this.newUrl}); $("#pBox").css({'background-size':'100%'});
		}
	});
	stack.changed = function() {}
var copyHtml='';
$(document).keydown(function(event){
	
	
		if(event.ctrlKey && 90==event.keyCode){
			if(stack.canUndo()){
	  	  stack.undo();
			}
	  
			 return false;
		 }
		if(event.ctrlKey && 89==event.keyCode){
			if(stack.canRedo()){
		  	  stack.redo();
			}
		  
				 return false;
			 }
	if(currItem){
		
         if(event.ctrlKey && 67==event.keyCode){
			 
        	 copyHtml=currItem.prop("outerHTML");;
			 return false;
		 }else if(event.ctrlKey && 86==event.keyCode && ''!=copyHtml){
    	   
    	   cloneItem();
    	   
    	   return false;
       }else{
    	   
	if(46==event.keyCode){
		
		stack.execute(new deleteCommand(currItem));
		//currItem.remove();
		currItem=null;
		rightBoxHide();
	}else if(38==event.keyCode){
		
	
		var top=currItem.css("top").replace("px","");
		
		
		currItem.css({top:(Number(top)-1)+"px"});
	}else if(40==event.keyCode){
		var top1=currItem.css("top").replace("px","");

		currItem.css({top:(Number(top1)+1)+"px"});
		
		
	}else if(37==event.keyCode){
		var left=currItem.css("left").replace("px","");
		
		
		currItem.css({left:(Number(left)-1)+"px"});
	}else if(39==event.keyCode){
		var left1=currItem.css("left").replace("px","");
		
		
		currItem.css({left:(Number(left1)+1)+"px"});
	}
	
       }
	
	}
	
	//比如说上下左右键,分别是38,40,37,39；
	
	
	
});
	$(document).mousemove(function(e) {
		if($(".clone").length>0) 
		{ 
		$(".clone").css('left',e.clientX+1); 
		$(".clone").css('top',e.clientY+1); 
		
		}else{
		if (!!this.move) {
			rightBoxMove(currItem);
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function() {
					var p=$(this.move_target).parent();
	             var offset = p.offset();
	             
	             
					$(this.move_target).css({
						'top': e.pageY - offset.top-posix.y,
						'left': e.pageX - offset.left-posix.x
					});
				};

			callback.call(this, e,posix);
		}
	}
		}).mouseup(function(e) {
			
			appendItem(e);
		if (!!this.move) {
			var callback = document.call_up || function(){
				var width=$(this.move_target).width();
				var height=$(this.move_target).height();
				
				var offset = $(this.move_target).position();
				 var p=$(this.move_target).parent();
				 
				 if(offset.top+height>p.height()){
				 	$(this.move_target).css({top:p.height()-height});
				 	
				 	}
				  if(offset.left+width>p.width()){
				 	$(this.move_target).css({left:p.width()-width});
				 	
				 	}
				 	
				 	if(offset.top<0){
				 	$(this.move_target).css({top:0});
				 	
				 	}
				  if(offset.left<0){
				 	$(this.move_target).css({left:0});
				 	
				 	}
				
				 //$(this.move_target).css("border","0px solid  rgb(209,77,133)");
				  
				    newHtml=boxToJson($(this.move_target));
				  
				  if(isBoxMove(oldHtml,newHtml)){
					
					stack.execute(new moveCommand(oldHtml,newHtml,currItem.attr("id")));
				  }
				};
			callback.call(this, e);
			
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});


var currItem;

var oldHtml="";
function boxmousedown(e)
 {
	   
	    $('.box').each(function(){
	    	$(this).removeClass("currbox");
	    	
	    	});
	    
	    $(this).addClass("currbox");

	      if(null!=currItem){
	    	  if(currItem.attr("id")!=$(this).attr("id")){
	    		  
	    		  currItem.attr("contentEditable",'false');
	    		  
	    	  }
	    	 if(currItem.attr("id")!=$(this).attr("id")){
	    		
	    		  currItem=$(this);
	    		 rightBoxInit(currItem);
	    		 oldHtml=boxToJson(currItem);
	    		 
	    	 }
	    	  
	      }else{
	    	  
	    	  currItem=$(this);	  
	    	  rightBoxInit(currItem);
	    	  oldHtml=boxToJson(currItem);
	      }
	     
	     
	      
	     
	     //判断是否重新初始化
	     
	
	     
	     rightBoxMove(currItem);
	    
	    
	     var p=$(this).parent();
	     var poffset = p.offset();
	     
	      var offset = $(this).position();
	     
	     
	    
	     this.posix = {'x': e.pageX - poffset.left-offset.left, 'y': e.pageY - poffset.top-offset.top};
	    
	    //alert(this.posix.x);alert(this.posix.y);
	    
	    
	    $.extend(document, {'move': true, 'move_target': this});
	    var thisBox=$(this);
	    $(this).find(".coor").on('mousedown', function(e) {
	    var posix = {
	            'w': thisBox.width(), 
	            'h': thisBox.height(), 
	            'x': e.pageX, 
	            'y': e.pageY,
	            'l':thisBox.css("left").replace('px',''),
	            't':thisBox.css("top").replace('px','')
	        };
	    
	    var oldwh={'width': thisBox.width(), 
	             'height': thisBox.height()};
	    var width_t;
	    var height_t;
	    $.extend(document, {'move': true, 'call_down': function(e) {
	    	width_t=Math.max(30, e.pageX - posix.x + posix.w);
	    	height_t =  Math.max(30, e.pageY - posix.y + posix.h);
	    	//不超出手机屏幕
	    	if((width_t+parseInt(posix.l))>320){
	    		width_t=320-parseInt(posix.l);
	    	}
	    	if((height_t +parseInt(posix.t)) >480){
	    		height_t=480-parseInt(posix.t);
	    	}
	        thisBox.css({
	            'width': width_t,
	            'height':height_t
	        });
	        rightBoxMove(thisBox);
	        
	    },'call_up':function(e){ 
	    	 var newwh={'width': thisBox.width(), 
		             'height': thisBox.height()};
	    	 stack.execute(new reSizeCommand(oldwh,newwh,thisBox.attr("id")));
	    	
	    	}});
	    return false;
	    });
	    
	    
	    
	    
	};
	function cloneItem(){
		
		var con=$(copyHtml);
		
		
		con.removeClass("currbox");
		
		
       var id="item"+Math.random();
		
       con.attr("id",id.replace(".",""));
       var top=con.css("top").replace("px","");
       var left=con.css("left").replace("px","");
       
       con.css({top:(Number(top)+5)+"px"});
       con.css({left:(Number(left)+5)+"px"});
       con.css({'z-index':'2'});
       stack.execute(new saveCommand(con));
    
       con.mousedown(boxmousedown);
       con.dblclick(function(){
           var type=$(this).attr("type");
   	
   		if('lable'==type){
   		$(this).attr("contentEditable",'true');
   		
   		return false;
   		}
   	});
       
	}
function appendItem(e){
	
	if(pBoxAger && $(".clone").length>0){
		//alert(e.pageX);//415
		//alert(e.pageY);//120
		
		var item=$(".clone").clone();
		item.removeClass("clone");
	
		item.removeClass("leftDrag");
		
		item.addClass("box");
		$(".clone").remove(); 
		$("body").css('cursor','auto'); 
		
		item.attr("linktype",'0');
		item.attr("delay",'0');
		item.attr("contentEditable",'false');
		
		var type=item.attr("type");
		
		item.append("<div class='coor'></div>");
	
		
		if('lable'==type){
			
			item.attr("contentEditable",'false');
			item.css({'top': e.pageY - 120,
				  'left': 60,'border':""});
			
			
		}else if('img_split'==type){
			
			item.attr("type","img"); 
			item.css({'top': e.pageY - 120,
				  'left': 10,'width':"300px"});
	   }else if('img_logo'==type){
		   
			item.attr("type","img"); 
			item.css({'top': e.pageY - 120,
				  'left': e.pageX - 415});
	   }else if('img'==type){
		   
		  
			item.css({'top': e.pageY - 120,
				  'left': 32,'width':"80%",'height':"auto"});
			
			
	   }else{
		   
		   
		   
		   item.css({'top': e.pageY - 120,
				  'left': 0});
	   }
		
		var id="item"+Math.random();
		
		item.attr("id",id.replace(".",""));
	//$("#pBox").append(item);
		item.css({'z-index':'2'});
	stack.execute(new saveCommand(item));
	item.mousedown(boxmousedown);
	
	item.dblclick(function(){
        var type=$(this).attr("type");
	
		if('lable'==type){
		$(this).attr("contentEditable",'true');
		
		return false;
		}
	});
	
		}else if($(".clone").length>0){
			
			$(".clone").remove(); 
			$("body").css('cursor','auto'); 
			
		}
	
	
}

function rightBoxMove(currItem){



	$("#box_width").val(currItem.css("width").replace("px",""));
	$("#box_height").val(currItem.css("height").replace("px",""));

	$("#box_top").val(currItem.css("top").replace("px",""));
	$("#box_left").val(currItem.css("left").replace("px",""));
	}

	function hex(x) { 
	return ("0" + parseInt(x).toString(16)).slice(-2); 
	} 
	

	function rightBoxHide(){
	$("#rightBox").hide();init=false;
	}

	var init=false;
	function rightBoxInit(currItem){

	if(!init){

	init=true;


	$("#rightBox").show();
	$(".notimgtr").show();

	$("#box_width").val(currItem.css("width").replace("px",""));
	$("#box_height").val(currItem.css("height").replace("px",""));

	$("#box_top").val(currItem.css("top").replace("px",""));
	$("#box_left").val(currItem.css("left").replace("px",""));

	$("#delay").val(currItem.attr("delay"));
	$("#linkUrlbox").hide();
	if(''==currItem.attr("linktype")){
	$("#type").val('0');

	}else{

	$("#type").val(currItem.attr('linktype'));

	if('-1'==currItem.attr('linktype')){
	$("#linkUrlbox").show();
	$("#linkUrl").val(currItem.attr("linkurl"));
	}
	}


		
		
		var editcssFlag=true;
		$("#editcss").find("option").each(function(){	
		
		 if(currItem.hasClass($(this).val())){	
		      editcssFlag=false;
		  $("#editcss").val($(this).val());
		}
		
		});
		
		if(editcssFlag){
		$("#editcss").val('0');
		
		}
			
	       if(''!=currItem.css("z-index") && 'auto'!=currItem.css("z-index")){
			var zIndex =currItem.css("z-index");	
			$("#z_index").val(zIndex);

			 }else{
			 
			  $("#z_index").val('0'); 
			 }	
			 
			 
	if(currItem.attr('type')=='img'){
		$(".notimgtr").hide();
	}else{
	  
	$("#textalign").val(currItem.css('text-align'));

		if(''!=currItem.css("color")){
			var rgb =currItem.css("color").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
			$("#box_color").val("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])); 
		}
		if(''!=currItem.css("font-size")){
			$("#box_font").val(currItem.css("font-size").replace("px",""));
		}
		if(''!=currItem.css("line-height")){
			$("#box_lineheight").val(currItem.css("line-height").replace("px",""));
		}

		if(''!=currItem.css("background-color") &&'transparent'!=currItem.css("background-color")){
			
		var bgrgb =currItem.css("background-color").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
			$("#box_bgcolor").val("#" + hex(bgrgb[1]) + hex(bgrgb[2]) + hex(bgrgb[3])); 
			
		}else{			
			$("#box_bgcolor").val(''); 			
		}
		if(''!=currItem.css("border-top-left-radius")){
			
				$("#border_radius").val(currItem.css("border-top-left-radius").replace("px","")); 
				
			}

	}	
	init=false;
	}	
	}

	function u_center_body(cssnum,e){
		switch(cssnum) 
		{ 
		case 1: currItem.css({width:e.value+"px"});
		break; 
		case 2: currItem.css({height:e.value+"px"});
		break; 
		case 3: currItem.css({left:e.value+"px"});
		break; 
		case 4: currItem.css({top:e.value+"px"});
		break; 
		case 5: currItem.css({'font-size':e.value+"px"});
		break; 
		case 6: currItem.css({'color':e.value});
		break; 
		case 7: currItem.css({'line-height':e.value+"px"});
		break; 
		case 9: currItem.css({'background-color':e.value});
		break; 
		case 10:$("#pBox").css({'background':e.value}); $("#pBox").css({'background-size':'100%'});
		break; 
		case 11:currItem.attr('onclick',"gopage('"+e.value+"')");
		break; 
		case 12:currItem.attr('class','box currbox '+e.value+' animated');
		break; 
		case 13:currItem.css({'text-align':e.value});
		break; 	
		case 14:currItem.attr('delay',e.value);
		break; 
		case 15:
		currItem.css({'z-index':e.value});
		break; 
		case 16:
			currItem.css({'border-radius':e.value+"px"});
			break; 
		default: 
		} 
		
	}
	
	function boxToJson(box){

     var data={};
     
     data.width=box.css("width");
     data.height=box.css("height");
     data.top=box.css("top");
     data.left=box.css("left");
     data.id=box.attr("id");
       
    return data;
		
     }
	
	function isBoxMove(oldBox,newBox){

		
		 if(oldBox.id!=newBox.id){
		    	
		    	
		    	return false;
		    }
	    if(oldBox.width!=newBox.width){
	    	
	    	
	    	return true;
	    }
	    if(oldBox.left!=newBox.left){
	    	
	    	
	    	return true;
	    }
		if(oldBox.height!=newBox.height){
			    	
			    	
			    	return true;
			    }
		if(oldBox.top!=newBox.top){
			
			
			return true;
		}
	     
		return false;
			
	   }
	