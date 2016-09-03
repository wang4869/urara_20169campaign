
var time=document.getElementById('time');
var oLi=time.getElementsByTagName('li');
var one=document.getElementById('one');
var two=document.getElementById('two');
var three=document.getElementById('three');
var four=document.getElementById('four');
var five=document.getElementById('five');
var six=document.getElementById('six');
var seven=document.getElementById('seven');
var eight=document.getElementById('eight');
var oImg=time.getElementsByTagName('img');
var next=document.getElementById('next');
var prev=document.getElementById('prev');
var cross=document.getElementById('cross');

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
//	autoplay: 2500,
//	loop:true,
    autoplayDisableOnInteraction: false
});

window.onscroll=function(){
	var top = document.documentElement.scrollTop || document.body.scrollTop; 
	if(top>=300){
		$('.navbar-fixed-top').css('display','block');
		$("div.navbar-fixed-top").autoHidingNavbar();
	}else{
		$('.navbar-fixed-top').css('display','none');
	}
}




oLi[0].onclick=function(){
	oLi[1].className='';
	oLi[2].className='';
	oLi[3].className='';
	oLi[4].className='';
	oLi[5].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	one.className='show';
	two.className='no';
	three.className='no';
	four.className='no';
	five.className='no';
	six.className='no';
	seven.className='no';
	eight.className='no';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}
oLi[1].onclick=function(){
	oLi[0].className='';
	oLi[2].className='';
	oLi[3].className='';
	oLi[4].className='';
	oLi[5].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	two.className='show';
	one.className='no';
	three.className='no';
	four.className='no';
	five.className='no';
	six.className='no';
	seven.className='no';
	eight.className='no';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}
oLi[2].onclick=function(){
	oLi[0].className='';
	oLi[1].className='';
	oLi[3].className='';
	oLi[4].className='';
	oLi[5].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='show';
	four.className='no';
	five.className='no';
	six.className='no';
	seven.className='no';
	eight.className='no';
	time.className='time-animation';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}
oLi[3].onclick=function(){
	oLi[0].className='';
	oLi[1].className='';
	oLi[2].className='';
	oLi[4].className='';
	oLi[5].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='no';
	four.className='show';
	five.className='no';
	six.className='no';
	seven.className='no';
	eight.className='no';
	time.className='time-animation';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}
oLi[4].onclick=function(){
	oLi[0].className='';
	oLi[1].className='';
	oLi[2].className='';
	oLi[3].className='';
	oLi[5].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='no';
	four.className='no';
	five.className='show';
	six.className='no';
	seven.className='no';
	eight.className='no';
	time.className='time-animation';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}
oLi[5].onclick=function(){
	oLi[0].className='';
	oLi[1].className='';
	oLi[3].className='';
	oLi[4].className='';
	oLi[2].className='';
	oLi[6].className='';
	oLi[7].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='no';
	four.className='no';
	five.className='no';
	six.className='show';
	seven.className='no';
	eight.className='no';
	time.className='time-animation';
	if($("#time").hasClass("time-animation")){
		time.className='';
		time.className='timeOut';
	}
}

oLi[6].onclick=function(){
	oLi[0].className='';
	oLi[1].className='';
	oLi[3].className='';
	oLi[4].className='';
	oLi[2].className='';
	oLi[5].className='';
	oLi[7].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='no';
	four.className='no';
	five.className='no';
	six.className='no';
	seven.className='show';
	eight.className='no';
	time.className='time-animation';
}

oLi[7].onclick=function(){
	oLi[0].className='no';
	oLi[1].className='no';
	oLi[3].className='';
	oLi[4].className='';
	oLi[2].className='';
	oLi[6].className='';
	oLi[5].className='';
	this.className='no';
	two.className='no';
	one.className='no';
	three.className='no';
	four.className='no';
	five.className='no';
	six.className='no';
	seven.className='no';
	eight.className='show';
}
