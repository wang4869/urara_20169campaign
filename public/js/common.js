 var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			webKit: u.indexOf('AppleWebKit') > -1, 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
			weixin: u.indexOf('MicroMessenger') > -1, 
			txnews: u.indexOf('qqnews') > -1,
			sinawb: u.indexOf('weibo') > -1,
			mqq   : u.indexOf('QQ') > -1
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};




function createHeart(n,obj){
	var heart=$('<img>').attr('src','/images/heart'+n+'.png').addClass('heart');
	$(obj).append(heart); 
	heart.fadeIn(1000);
	 var x = 0;
     var y = 0;
	 

	 var heartTimer = setInterval(function(){
		 var top = Math.abs(Math.sin(x)*50 + 80);
         var left = y;
			heart.css({"WebkitTransform" :"translate("+ top +"px,"+ y +"px)"});
			y = y - 3.6;
			x = (0.03) * y + 2;
            if (y < -200){
				heart.remove();
				heart.fadeOut(600,function(){
					clearInterval(heartTimer);
					});
			}
		}, 30);
}




if (browser.versions.ios){
	$("#andrio").remove()
	$("#videoIndex1").attr('src','/1.mp4')
}else{
	$("#ios").remove()
	$("#videoIndex2").attr('src','/2.mp4')
	}

	  //var baseUrl=$('base').attr('href');
 var baseUrl='/';
      var loadimg=function(imgs,callback){
            if(!imgs){return false};//参数判断
            var img=[];
            var len=imgs.length;
            var loadedCount = 0;
            for(var i=0;i<len;i++){
                img[i]=new Image();
                img[i].src=baseUrl+imgs[i];
                img[i].onload = function(){
                  loadedCount++;
                  $('.loadnum').html(Math.ceil(loadedCount/len*100)+'%');
                  if (loadedCount>=len){
              callback ? callback.apply(img) : null;
            }
                }
            }
        }
      var imgs=['images/loading.jpg','images/intro1.jpg','images/form2.jpg','images/form1.jpg','images/btn1.png','images/btn2.png','images/btn1light.png','images/ewm.png','images/gift1.png','images/gift2.png','images/gnum.png','images/heart0.png','images/heart1.png','images/heart2.png','images/heart3.png','images/llight.png','images/lpz.png','images/mp.png','images/p01.png','images/p02.png','images/p03.png','images/person.png','images/pz.png'];
	      loadimg(imgs,function(){
			 
					$("#loadingbox").hide();  
					$("#indexbox").show();
					
					 $("#idxperson ul").animate({top:-31},1000);
  
				  
	      });
	
	
var gid=0;
var gtimer;
function addGift(){
	if(gid==9){
		gid=0
		}	
	gid++;

	TweenMax.to($(".mp p"),0.8,{scale:0,opacity:0,ease :Elastic.easeOut})
	
	var mpnum=$('<p></p>').addClass('num'+gid);
	$(".mp").append(mpnum);
	TweenMax.to(mpnum,1,{scale:1,opacity:1,ease :Elastic.easeOut})
	
	clearInterval(gtimer);
	gtimer=setTimeout(function(){
		gid=0;
		
		TweenMax.to($(".mp p"),0.8,{scale:0,opacity:0,ease :Elastic.easeOut});
					
		},2000)
}
	
	
	
	
	
function sf(obj){
	$(obj).find('img').addClass('scale');
	setTimeout(function(){
		$(obj).find('img').removeClass('scale');
		},2000)
}	
	
  
function showsp(){
	$("#indexbox").hide();
	if (browser.versions.ios){
		var v1 = document.getElementById('videoIndex1');
		$("#ios").show();
		v1.play();
		$(".ios_btn2").trigger('click');
		
		v1.addEventListener("ended",function(evt) {
			location.href="/tryPage";
		});
	}else{
		var v2 = document.getElementById('videoIndex2');
		var initV2 = function (){
			if (v2.currentTime>0){
				$(".poster").hide();
				$("#videoIndex2").show();
			}
		}
		$("#andrio").show();
		v2.play();
		v2.addEventListener("timeupdate", initV2, false);
		v2.addEventListener("ended",function(evt) {
			location.href="/tryPage";
		});
		
		}
		
} 
 
 
 
  
  
  
$("#ios .ios_btn1").bind('click',function(){
		addGift();
		ga('send','event','button','click','ios_gift')
})  

$('#ios .ios_btn2').bind('click',function(){
	createHeart(0,'#ios')
	setTimeout(function(){
		createHeart(1,'#ios')
		},700)
	setTimeout(function(){
		createHeart(2,'#ios')
		},1400)
	setTimeout(function(){
		createHeart(3,'#ios')
		},2100)	
	
	setTimeout(function(){
			createHeart(3,'#ios')
			setTimeout(function(){
				createHeart(2,'#ios')
				},700)
			setTimeout(function(){
				createHeart(1,'#ios')
				},1400)
			setTimeout(function(){
				createHeart(0,'#ios')
				},2100)	
		},400)	
		ga('send','event','button','click','ios_xin')
	})  
