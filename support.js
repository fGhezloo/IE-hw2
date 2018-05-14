window.onload=load;


function load() {

	i=0;
    j=0;

	var element = document.createElement("link");
	element.setAttribute("rel", "stylesheet");
	element.setAttribute("type", "text/css");
	element.setAttribute("href", "./style/support.css");
	document.getElementsByTagName("head")[0].appendChild(element);

	supportdiv1 = document.createElement("div"); 
  	supportdiv1.setAttribute("class", "supportdiv1");
	supportbtn = document.createElement("BUTTON"); 
  	supportbtn.setAttribute("class", "supportBtn");
  	supportbtn.setAttribute("onClick", "popUp()");
  	newContent = document.createTextNode("پشتیبانی آنلاین");
  	supportbtn.appendChild(newContent);  

	var supporticon = document.createElement("img");
  	supporticon.src="./img/chat.png";
  	supporticon.style.width="50px";
  	supporticon.style.position="absolute";
  	supporticon.style.top="10px";

	supportdiv1.appendChild(supportbtn);
	supportbtn.appendChild(supporticon);

  	document.body.appendChild(supportdiv1); 


       }

function x(){	start();
window.alert("Error");}



function minimize1(){

	chatbox.removeChild(reply);
	chatbox.removeChild(info);
	chatbox.removeChild(chat);
	load();
}

function popUp(){

	supportdiv1.style.visiblity="hidden";

	start();
	parent = document.createElement("div");

	chatbox = document.createElement("div"); 
  	chatbox.setAttribute("class", "chatBox");

  	info = document.createElement("div"); 
  	info.setAttribute("class", "supportInfo");

	chat = document.createElement("div"); 
	chat.setAttribute("class", "chat");

	reply = document.createElement("div"); 
	reply.setAttribute("class", "reply");

	img = document.createElement("img");
	img.setAttribute("class", "supportimg");

	minimize = document.createElement("img");
	minimize.setAttribute("class", "minimize"); 
	minimize.src="./img/minimise.png";
	minimize.setAttribute("onClick","minimize1()");

	p1 = document.createElement("p");
	p1.setAttribute("class", "supportProfesion"); 
	p1.innerHTML="پشتیبان بخش فروش"
	p2 = document.createElement("p");
	p2.setAttribute("class", "supportName");

	input = document.createElement("input");
	input.type="text";
	input.setAttribute("class", "replybox");
	input.placeholder="...متن پیام به پشتیبانی";

	send = document.createElement("img");
	send.setAttribute("class", "send");
	send.setAttribute("onClick", "send1()");
	send.src="./img/send.png";


	parent.appendChild(chatbox);
	chatbox.appendChild(info);
	chatbox.appendChild(chat);
	chatbox.appendChild(reply);

	info.appendChild(img);
	info.appendChild(minimize);
	info.appendChild(p1);
	info.appendChild(p2);

	reply.appendChild(input);
	reply.appendChild(send);

	document.body.appendChild(chatbox);
}

function start(){

	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://51.15.59.130:46260/start",true); 
	xmlhttp.onreadystatechange = startProcess; 
	xmlhttp.send(null);

}


function startProcess(){
	var status;
    var data;
	if(this.readyState == 4){ 
		status = this.status;
		if(status == 200){
            data = JSON.parse(this.responseText);
            console.log(data);
			var xmlhttp1=new XMLHttpRequest();
			xmlhttp1.open("GET","http://51.15.59.130:46260/support",true); 
			xmlhttp1.onreadystatechange = supportProcess; 
			xmlhttp1.send(null);
			var xmlhttp2=new XMLHttpRequest();
			xmlhttp2.open("GET","http://51.15.59.130:46260/fetch",true); 
			xmlhttp2.onreadystatechange = fetchProcess; 
			xmlhttp2.send(null);

		}
      	else{
            // window.alert("Error: "+ this.statusText);
		} 
	}
}


function supportProcess(){
	var status;
    var data;
	if(this.readyState == 4){ 
		status = this.status;
		if(status == 200){
            data = JSON.parse(this.responseText);
            var first=data.support.first;
            var last= data.support.last;
            var name= first.concat(" ").concat(last);
            img.src=data.support.picture;
            p2.innerHTML=name;
		}
      	else{
            // window.alert("Error: "+ this.statusText);
		} 
	}
}

function send1(){


	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://51.15.59.130:46260/send',true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
    	if (xhr.status === 200) {
        	var userInfo = JSON.parse(xhr.responseText);
        	console.log(userInfo);
			var xmlhttp3=new XMLHttpRequest();
			xmlhttp3.open("GET","http://51.15.59.130:46260/fetch",true); 
			xmlhttp3.onreadystatechange = fetchProcess; 
			xmlhttp3.send(null);        	
    	}
	};
	xhr.send(JSON.stringify({
    	message: input.value
	}));

	m1=document.createElement("p");
    m1.setAttribute("class","message");
    m1.innerHTML=input.value;
    var top1= 55 + j*90;
	m1.style.top=String(top1).concat("px");
    chat.appendChild(m1);

    input.value="";

    var avatar=document.createElement("img");
    avatar.setAttribute("class","avatar");
    avatar.src="./img/avatar.jpg";
    var top2= 70 + j*90;
	avatar.style.top=String(top2).concat("px");
    chat.appendChild(avatar);

    j=j+1;
    
}


function fetchProcess(){

	var status;
    var data;
	if(this.readyState == 4){ 
		status = this.status;
		if(status == 200){
            data = JSON.parse(this.responseText);
            console.log(data);
            var simg=document.createElement("img");
    		simg.setAttribute("class","simg");
    		simg.src=img.src;
    		chat.appendChild(simg);
			var top1= 23 + i*90;
			simg.style.top=String(top1).concat("px");

            s1=document.createElement("p");
            s1.setAttribute("class","answer");
            var top2= 10 + i*90;
            s1.style.top=String(top2).concat("px");
            s1.innerHTML=data.responses[0].message;
            chat.appendChild(s1);

            i=i+1;
		}
      	else{
            // window.alert("Error: "+ this.statusText);
		} 
	}
}
