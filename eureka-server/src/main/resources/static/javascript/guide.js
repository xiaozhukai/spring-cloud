GuidingLayer = {
		PreStepEvent: function() {
	        $("#nextStep").show(), 
	        $("#enterMD").hide(),
	        $("#guidingLayerMask #preStep").unbind();
	        var a = $("#guidingLayerMask .palyBtnList").find(".on"),  // 页面底部原型导航按钮
	        b = $("#guidingLayerMask .palyBtnList li").index(a),  // 页面底部原型导航按钮
	        c = $("#guidingLayerMask .imgList li:eq(" + b + ")"),
	        d = null, 
	        e = null;
	        4 == b ? $("#guidingLayerMask .topBar").show() : $("#guidingLayerMask .topBar").hide(),
	        		$("body").scrollTop(3 == b ? 150 : 0), prePlayBtnIndex = b - 1, 
	        		0 == prePlayBtnIndex && $("#preStep").addClass("Visibility"), 
	        		e = $("#guidingLayerMask .imgList li:eq(" + prePlayBtnIndex + ")"),
	        		d = $("#guidingLayerMask .palyBtnList li:eq(" + prePlayBtnIndex + ")"),
	        		a.removeClass("on").addClass("off"), 
	        		d.removeClass("off").addClass("on"), 
	        		c.fadeOut(function() {
	            e.fadeIn(function() {
	                $("#guidingLayerMask #preStep").bind("click", function() {
	                    GuidingLayer.PreStepEvent()
	                })
	            })
	        })
	    },NextSetpEvent: function() {
	        $("#preStep").removeClass("Visibility"),
	        $("#guidingLayerMask #nextStep").unbind();
	        var a = $("#guidingLayerMask .palyBtnList").find(".on"), 
	        b = $("#guidingLayerMask .palyBtnList li").index(a), 
	        c = $("#guidingLayerMask .imgList li:eq(" + b + ")"),
	        d = null, 
	        e = 0, 
	        f = null;
	        $("body").scrollTop(1 == b ? 150 : 0),
	        2 == b ? $("#guidingLayerMask .topBar").show() : $("#guidingLayerMask .topBar").hide(),
	        e = b + 1, 
	        		e == $("#guidingLayerMask .palyBtnList li").length - 1 ? ($("#nextStep").hide(), 
	        				$("#enterMD").show()) : ($("#nextStep").show(), $("#enterMD").hide()),
	        				f = $("#guidingLayerMask .imgList li:eq(" + e + ")"),
	        				d = $("#guidingLayerMask .palyBtnList li:eq(" + e + ")"), 
	        				a.removeClass("on").addClass("off"),
	        				d.removeClass("off").addClass("on"), 
	        				c.fadeOut(function() {
	            f.fadeIn(function() {
	                $("#guidingLayerMask #nextStep").bind("click", function() {
	                    GuidingLayer.NextSetpEvent()
	                })
	            })
	        })
	    },ItemClickEvent: function(a) {
	        if (!a.hasClass("on")) {
	            var b = $("#guidingLayerMask .palyBtnList").find(".on"), 
	            c = $("#guidingLayerMask .palyBtnList li").index(b), 
	            d = $("#guidingLayerMask .imgList li:eq(" + c + ")"), 
	            e = $("#guidingLayerMask .palyBtnList li").index(a), 
	            f = $("#guidingLayerMask .imgList li:eq(" + e + ")"), 
	            g = $("#guidingLayerMask .palyBtnList li:eq(" + e + ")");
	            
	            $("body").scrollTop(2 == e ? 150 : 0), 3 == e ? $("#guidingLayerMask .topBar").show() : $("#guidingLayerMask .topBar").hide(), e == $("#guidingLayerMask .palyBtnList li").length - 1 ? ($("#nextStep").hide(), $("#enterMD").show()) : ($("#nextStep").show(), $("#enterMD").hide()), 0 == e ? $("#preStep").addClass("Visibility") : $("#preStep").removeClass("Visibility"), b.removeClass("on").addClass("off"), g.removeClass("off").addClass("on"), d.fadeOut(function() {
	                f.fadeIn()
	            })
	        }
	    },Close: function() {
	        $("#guidingLayerMask .topBar").remove(), $("#guidingLayerMask").animate({top: "40%",left: "40%",opacity: "0.2",width: 200,height: 30}, 1e3, function() {
	            $("#guidingLayerMask").animate({top: "70%",left: "3%",opacity: "0.2",width: 0,height: 0}, 1e3, function() {
	                 $("#guidingLayerMask").remove()
	            })
	        })
	    },BindEvent: function() {
	    	$("#nextStep").bind("click", function() {
				GuidingLayer.NextSetpEvent();
			});
			$("#preStep").bind("click", function() {
				GuidingLayer.PreStepEvent();
			});
			$("#closeButton").bind("click",function(){
				GuidingLayer.Close();
			});
			$("#guidingLayerMask .palyBtnList li").unbind().bind("click", function() {
	            GuidingLayer.ItemClickEvent($(this))
	        })
	    }
		
		
};