

var editRecipient = function (boxName,hyyt){
    
    if(hyyt){
       
    	$(boxName).append('<div name="edit_input" class="divView forever" tabindex="0"><input   oninput="javascript:gethyytUsers(this);" onpropertychange="javascript:gethyytUsers(this);"  type="text" class="tabinput" size="10" value="" style="width:30px;"><font id="iniSpan"  class="specifyTip"></font></div>');

    	
    }else{
    $(boxName).append('<div name="edit_input" class="divView forever" tabindex="0"><input   oninput="javascript:getUsers(this);" onpropertychange="javascript:getUsers(this);"  type="text" class="tabinput" size="10" value="" style="width:30px;"><font id="iniSpan"  class="specifyTip"></font></div>');

    }
    
    
    
    
    
    /*全选或选中后点击backspace,delete可删除*/
    $(boxName).delegate('.divView', 'keydown', function(event){  
		var kValue = event.keyCode; 
		if((kValue==46 || kValue==8) &&　$(this).parent().find(".selected").length > 2){ //当选中的个数大于2的时候
			$(this).parent().find(".selected").remove();
			return false;
		}else if((kValue==46 || kValue==8) && $(this).hasClass("selected")){
			//alert("delete?");
			$(this).next().addClass("current").find(".tabinput").focus();
			$(this).remove(); 
			return false;
		}
	});

	/*光标闪烁时，点击backspace,delete可删除*/
	$(boxName).delegate('.current', 'keydown', function(event){  
		var kValue = event.keyCode; 
		var sizeValue = $(this).find(".tabinput").attr("size");
		if(kValue==65 && event.ctrlKey && sizeValue == 1){  //点击Ctrl+A时
			$(this).parent().find(".divView").addClass("selected").last().removeClass("selected");
			$(this).find("input").blur();
			$(this).parent().find(".selected").focus();
			return false;
		}
		if(kValue==8 && sizeValue == 1){ 
			$(this).prev().remove();			
		} 
		if( kValue==46 && !$(this).hasClass("forever") && sizeValue == 1){
			$(this).next().addClass("current").find(".tabinput").focus().attr({"value":"","size":"1"}).css("width","3px");;
			$(this).remove(); 
		}
	});

	/*光标闪烁时，点击←,→光标可移动*/
	$(boxName).delegate('.current', 'keydown', function(event){  
		var kValue = event.keyCode; 
		var sizeValue = $(this).find(".tabinput").attr("size");
		if(kValue==37 && sizeValue == 1 ){  //点击←且当前为非输入状态时
			$(this).prev().addClass("current").siblings().removeClass("current");
			$(this).prev().find(".tabinput").focus();			
		} 
		if( kValue==39 && !$(this).hasClass("forever") && sizeValue == 1){ //点击→且当前为非输入状态时
			$(this).next().addClass("current").siblings().removeClass("current");
			$(this).next().find(".tabinput").focus();
		}
	});


	

	/*初始化输入框tabinput委托focusin事件*/
    $(boxName).delegate('.tabinput', 'focusin', function(){  
    	$(".recSpecTip").find("span").remove(); 
    	$(boxName).find(".divView").find("#iniSpan").css("display","none");
    });
    
    $(boxName).delegate('#iniSpan', 'click', function(){  
    	$(".recSpecTip").find("span").remove();
    	$(boxName).find(".divView").find("#iniSpan").css("display","none");
    	$(boxName).find(".divView").find(".tabinput").focus();
    	
    });
	/*点击选中效果*/
    $(boxName).delegate('span,b', 'click', function(){  
        $(this).parent().addClass("selected current").siblings().removeClass("selected current");	
    });

	/*鼠标滑入滑出效果*/
    $(boxName).delegate('span,b', 'hover', function(){
            $(this).parent().toggleClass("hover");
            
    });

	/*输入框获得焦点后输入宽度可自动增大，光标按backspace和del可删除*/
    $(boxName).delegate('input.tabinput', 'keyup', function(event){ 
		var kValue = event.keyCode;  
		var sizeValue = $(this).attr("size");
		//按下的不是功能键f1-f12时或者按下的是backspace或者del且当前的输入框为输入状态时
		if(!(kValue < 48 || (kValue>111&&kValue<136)) || ((kValue == 8 || kValue == 46)&& sizeValue!=1) ){ 
            var iCount = $(this).attr("value").replace(/[^\u0000-\u00ff]/g,"aa");
            $(this).attr("size",iCount.length+2).css("width","auto");
			if(sizeValue==2 && kValue == 8){ //按backspace可删除
				$(this).parent().prev().remove();
				$(this).css("width","3px").attr("size","1");
			}
			if(sizeValue==2 && kValue == 46 && !$(this).parent().hasClass("forever")){ //按del可删除
				$(this).parent().next().addClass("current").find(".tabinput").focus();
				$(this).parent().remove(); 
			}
		}		
    });

	/*修改框获得焦点后输入宽度可自动增大，光标按backspace和del可删除*/
	$(boxName).delegate('input.inputView', 'keyup', function(event){ 
		var kValue = event.keyCode;  
		var sizeValue = $(this).attr("size");
		//alert(sizeValue);
		var iCount = $(this).attr("value").replace(/[^\u0000-\u00ff]/g,"aa");
		$(this).attr("size",iCount.length+2).css("width","auto");
		if(sizeValue==2 && kValue == 8){ //按backspace可删除
			$(this).parent().prev().remove();
			$(this).parent().next().addClass("current").find(".tabinput").focus();
			$(this).parent().remove();
		}
		if(sizeValue==2 && kValue == 46){//按del可删除
			$(this).css("width","3px");
			$(this).parent().next().remove();
			$(this).parent().next().addClass("current").find(".tabinput").focus();
			$(this).parent().remove(); 
		}
    });

	/*tabinput点击清楚所有的选中效果，并将当前的div设置为current*/
    $(boxName).delegate('input.tabinput', 'click', function(){  
            $(boxName).find(".divView").removeClass("selected hover"); 
			$(this).parent().addClass("current").siblings().removeClass("current");
			$(".recSpecTip").find("span").remove();
			
    });

	/*当点击的目标不是div时，选中效果切换*/
    $(document).click(function(event){   
        if(!$(event.target).parent().hasClass("divView"))
        { 
            $(boxName).find(".divView").removeClass("selected");
            var classBoxName = boxName.substring(1); 
            if($(event.target).hasClass(classBoxName)){ //当点击的目标是整个大的输入区且不是div时获取焦点
                $(boxName).find(".tabinput:last").css("display","inline").focus().parent().addClass("current").siblings().removeClass("current");
                $(".recSpecTip").find("span").remove();
            }
        }  
    });
    
 
}

/*实现input获取光标时位置置于所有文字后*/
$.fn.setCursorPosition = function(position){
    if(this.lengh == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.lengh == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
}

