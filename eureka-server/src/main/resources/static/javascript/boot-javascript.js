/*Boot Javascript*/
;(function (window, $) {

    g=document.documentElement.clientWidth;
    h=document.documentElement.clientHeight;
      var i = 480 / g;
      var j = 800 / h;
      var k = Math.max(i, j);
        k = k > 1 ? k: 240 * k;
        k = parseInt(k);
        alert(k);
        
        if(k==1){
        
        document.write('<meta name="viewport" id="eqMobileViewport" content="width=480,target-densitydpi=240" servergenerated="true" />');
        	
        }else{
        document.write('<meta name="viewport" id="eqMobileViewport" content="width=480,target-densitydpi='+k+'" servergenerated="true" />');
        }
    

})(window, jQuery);