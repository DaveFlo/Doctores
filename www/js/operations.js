
if(localStorage.getItem("user")!=null){
	if(localStorage.getItem("tipo")=="pac"){
		$.mobile.navigate( "#menu", {transition:"pop" });
	}else{
		$.mobile.navigate( "#menuD", {transition:"pop" });
	}
    	
}
  


Conekta.setPublicKey('key_BpifLpJUQoudFUeD45P8HCw');
Conekta.setLanguage("es"); 
function checkC(){
	var $form = $("#payForm");
    $form.find("button").prop("disabled", true);
    Conekta.Token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
	
    	
}
 var conektaSuccessResponseHandler = function(token) {
  	
    var $form = $("#payForm");
    //Inserta el token_id en la forma para que se envíe al servidor
    $form.append($("<input type='hidden' name='conektaTokenId' id='conektaTokenId'>").val(token.id));
    pay("#regFormP");
    	

  };
  var conektaErrorResponseHandler = function(response) {
  var $form = $("#payForm");
    $form.find("button").prop("disabled", false);
  	
  	swal("Error",response.message_to_purchaser,"error");
  	

    var $form = $("#payForm");
    
    
  };
    var datesArray= Array();
    var calendar="";
    function getPac(){
    	html = $("body").jqmData( "html" ) || "";
      
   	var idu = localStorage.getItem("usi");
 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {patients:idu},
	success: function(data){
		
		 $("#pacUl").empty();
		var docts = jQuery.parseJSON(data);
		for(var i=0;i<docts.length;i++){
			$("#pacUl").append(' <li><a class="showP" data-pac="'+docts[i][2]+'">'+
    	'<img src="http://icone-solutions.com/doct/img/'+docts[i][1]+'" />'+
    	'<span class="dname">'+docts[i][0]+'</span>'+
    	'</a>'+
    	'</li>')
		}
		if ($("#pacUl").hasClass('ui-listview')) {
			$("#pacUl").listview('refresh');
		}
		
	},
	error: function(data){
	              
	              	swal("Error","Revisa tu conexión e intentalo de nuevo","error");
	              }
	});

    }
    function getHP(idc,date){
    	var hours;
    	var weekend ,
		saturday ,
		sunday ;
    	$.ajax({
    		url:"http://www.icone-solutions.com/doct/sqlOP.php",
    		type: "POST",
    		async:false,
    		data:{rid:idc,datep:date},
    		success:function(data){
    			
    			var obj = jQuery.parseJSON(data);
    			
    			hours = obj[0];
    			weekend = obj[1];
    			saturday = obj[2];
    			sunday = obj[3];
    			
    		},
    		error:function(){
    			swal("Error","Revisa tu conexión e intentalo de nuevo","error");
    		}
    	});
    	var disabledp = [];
 	if(weekend=="Cerrado"){
 		disabledp.push(1);
 		disabledp.push(2);
 		disabledp.push(3);
 		disabledp.push(4);
 		disabledp.push(5);
 	}
 	if(saturday=="Cerrado"){
 		disabledp.push(6);
 	}
 	if(sunday=="Cerrado"){
 		disabledp.push(0);
 	}
 	d = new Date();
 	todaytime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    	$('#timeP').datetimepicker({
 	   formatDate:'Y-m-d',
 	   formatTime:'H:i',
 	   defaultTime: "9:00",
 	   disabledWeekDays: disabledp,
 	   allowTimes: hours,
 	   minDate: todaytime,
 	   startDate: todaytime,
 	   onSelectDate:function(ct,$i){
 	   	var d = new Date(ct);
 	   		html = $(this).jqmData( "html" ) || "";
 	        $.mobile.loading( "show", {
            text: "Cargando Horarios",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
            });
 	   	var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
 	   	$.ajax({
 	   		url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {sdate:now, cd: 1},
	        success: function(data){
	        	$.mobile.loading("hide");
	        	var hours= jQuery.parseJSON(data);
	        	
	        	$i.datetimepicker('setOptions', { allowTimes:hours});
	        	
	        },
	        error: function(){
	        	swal("Error","No se ha podido conectar al servidor, revisa tu conexión","error");
	        }
 	   	});
 	   	
 	   	
       }
      });
    }
    function getPD(){
 	var idu = localStorage.getItem("usi");
 	var datat =localStorage.getItem("tipo");

 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {idu:idu,datat:datat},
	success: function(data){
		
		var obj = jQuery.parseJSON(data);
		datosp =obj;
		if(datat=="pac"){
			$("#nombreU").val(obj[0][0]);
			$("#mailU").val(obj[0][1]);
			$("#telU").val(obj[0][2]);
			$("#sexoU").val(obj[0][3]);
			$("#ecU").val(obj[0][4]);
			$("#edadU").val(obj[0][5]);
			$("#pacP").attr("src","http://icone-solutions.com/doct/img/"+obj[0][6]);
			$('#sexoU').selectmenu('refresh', true);
			$('#ecU').selectmenu('refresh', true);
		}else{
			$("#nombreD").val(obj[0][0]);
			$("#mailD").val(obj[0][1]);
			$("#telD").val(obj[0][2]);
			
			$("#docP").attr("src","http://icone-solutions.com/doct/img/"+obj[0][3]);
		}
		
		
	},
	error: function(data){
	              	$.mobile.loading("hide");
	              	swal("Error","Revisa tu conexión e intentalo de nuevo","error");
	              }
	});
 }
 function getED(){
 	var idm = localStorage.getItem("usi");

 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {idm:idm,},
	success: function(data){
		
		var obj = jQuery.parseJSON(data);
		var exp =obj[0][3];
		
			$("#uniD").val(obj[0][1]);
			$("#espD").val(obj[0][0]);
			$("#cedD").val(obj[0][2]);
		for(var i =0;i<exp.length;i++){
			$("#expL").append("<li><div class='edate'>"+exp[i][0]+"</div> <div class='edesc'>"+exp[i][1]+". "+exp[i][2]+"</div></li>")
		}
		
		
	},
	error: function(data){
	              	$.mobile.loading("hide");
	              	swal("Error","Revisa tu conexión e intentalo de nuevo","error");
	              }
	});
 }
 var citap=0;
 var fechap="";
 function getIDa(){
 	
   	var gd = localStorage.getItem("usi");
   	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {gd:gd},
	async: false,
	success: function(data){
		$("#citasUL").empty();
		var obj= jQuery.parseJSON(data);
		for(var i=0;i< obj.length;i++){
			
			var color ="";
			var color2 ="";
			if(obj[i][6]=="Liberado"){
				color = "blueb";
				color2 = "greenp";
			}else{
				color="orangeb";
				color2 = "orangep"
			}
			$("#citasUL").append(' <li class="'+color+'">'+
   	 	'<div class="flexb">'+
   	 		'<div class="idate"><div style="background-image: url('+obj[i][4]+'");" class="doci"></div><div class="info_d">'+
   	 			'<h1>Dr(a). '+obj[i][2]+' <hr></h1>'+
   	 			'<p>'+obj[i][5]+'</p>'+
   	 			'<p>'+obj[i][1]+'</p>'+
   	 			'<p class="'+color2+'">$'+obj[i][3]+' '+obj[i][6]+'</p>'+
   	 			'</div></div>'+
   	 	'</div>'+
   	 	
   	 	'</li>');
   	 	
		
		
			
		}
		if ($("#citasUL").hasClass('ui-listview')) {
			$("#citasUL").listview('refresh');
		}
		
		
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
   }
 
 
 
   function getSchedule(){
   	datesArray=Array();
   	var gd = localStorage.getItem("usi");
   	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {gd:gd},
	async: false,
	success: function(data){
		
		var obj= jQuery.parseJSON(data);
		
		for(var i=0;i< obj.length;i++){
			var temp = {start: obj[i][0],
            title: obj[i][2], id: obj[i][8]}
			datesArray.push(temp);
			var color ="";
			var color2 ="";
			if(obj[i][6]=="Liberado"){
				color = "blueb";
				color2 = "greenp";
			}else{
				color="orangeb";
				color2 = "orangep"
			}
		}
		
		$('#calendars').fullCalendar({
        locale: 'es',
         header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
         views: {
          listWeek: { buttonText: 'L' },
          month: {buttonText: 'M'},
           agendaWeek: {buttonText: 'S'},
            agendaDay: {buttonText: 'D'}
        },
       eventClick: function(calEvent, jsEvent, view) {
       	console.log($(window).width());
       	if($(window).width()<500){
       		if(!$(view.el[0]).hasClass("fc-month-view")){
       		citap = calEvent.id;
        fechap = new Date(calEvent.start._d);
        $('#modalP').iziModal('startLoading');
$('#modalP').iziModal('open');
       	}
       	}else{
       		citap = calEvent.id;
        fechap = new Date(calEvent.start._d);
        $('#modalP').iziModal('startLoading');
$('#modalP').iziModal('open');
       	}
       	
        
       },
         defaultView: 'month',
        events: datesArray
   });
		
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
   }
   
   function getAgenda(){
   		datesArray=Array();
   	var gd = localStorage.getItem("usi");
   	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {gdo:gd},
	async: false,
	success: function(data){
		
		var obj= jQuery.parseJSON(data);
		for(var i=0;i< obj.length;i++){
			var temp = {start: obj[i][0],
            title: obj[i][2], id:obj[i][5]}
			datesArray.push(temp);
		
			
		}
		
		$('#calendarsD').fullCalendar({
        locale: 'es',
         header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
         views: {
          listWeek: { buttonText: 'L' },
          month: {buttonText: 'M'},
           agendaWeek: {buttonText: 'S'},
            agendaDay: {buttonText: 'D'}
        },
       eventClick: function(calEvent, jsEvent, view) {
        citap = calEvent.id;
        fechap = new Date(calEvent.start._d);
        $('#modalD').iziModal('startLoading');
$('#modalD').iziModal('open');
       },
         defaultView: 'month',
        events: datesArray
   });
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
   }
   
   function paymentList(){
   	var pl = localStorage.getItem("usi");
   	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {pl:pl},
	async: false,
	success: function(data){
		
		var obj= jQuery.parseJSON(data);
		for(var i=0;i< obj.length;i++){
			
   	 	$("#paymentL").append('<li class="greenB">'+
   	 	'<div class="flexb">'+
   	 		'<div class="idate"><div class="info_pay">'+
   	 			'<p>Cita con Dr(a). '+obj[i][2]+' </p>'+
   	 			'<p>'+obj[i][1]+' </p>'+
   	 			'<p>Costo: '+obj[i][3]+'</p>'+
   	 			'</div></div>'+
   	 	'</div>'+
   	 	
   	 	'</li>');
		
		
			
		}
		if ($("#paymentL").hasClass('ui-listview')) {
			$("#paymentL").listview('refresh');
			
		}
		 
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
   }
   
   
   function getScheduleP(){
   	var gd = localStorage.getItem("usi");
   	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {gdp:gd},
	async: false,
	success: function(data){
		var obj= jQuery.parseJSON(data);
		$("#citasRUL").empty();
		if(obj.length==0){
			$("#citasRUL").append(' <li >'+
   	 	'<div class="flexb">'+
   	 		'<div class="idate"><div class="info_d">'+
   	 			'<h1>Aún no hay citas <hr></h1>'+
   	 	'</div>'+
   	 	
   	 	'</li>');
		}
		for(var i=0;i< obj.length;i++){
			
			
			
   	 	$("#citasRUL").append(' <li >'+
   	 	'<div class="flexb">'+
   	 		'<div class="idate"><div style="background-image: url('+obj[i][4]+'");" class="doci"></div><div class="info_d">'+
   	 			'<h1>Dr(a). '+obj[i][2]+' <hr></h1>'+
   	 			'<p>'+obj[i][5]+'</p>'+
   	 			'<p>'+obj[i][1]+'</p>'+
   	 			'</div></div>'+
   	 	'</div>'+
   	 	
   	 	'</li>');
		
		
			
		}
		if ($("#citasRUL").hasClass('ui-listview')) {
			$("#citasRUL").listview('refresh');
			
		}
		 
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
   }
    
    function pay(){
    var form = new FormData($("#payForm")[0]);
    var horario= $("#default_datetimepicker").val().toString().split(" ");
   var inputr = document.getElementById("radiograf"),
      inputre = document.getElementById("recetaf"),
      inpute = document.getElementById("elab");
    
    form.append("fecha",horario[0]);
    form.append("hora",horario[1]);
    form.append("radio",inputr.files[0]);
    form.append("recipe",inputre.files[0]);
    form.append("elab",file = inpute.files[0]);
    form.append("patient",localStorage.getItem("usi"));
    $.ajax({
	url: "http://www.icone-solutions.com/doct/conekta.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		$("#payForm").find("button").prop("disabled", false);
		
	    if(data.toString()=="1"){
	    	$("#radiograf").val("");
	    	$("#receta").val("");
	    	$("#elab").val("");
	    	$("#default_datetimepicker").val("");
            var newEv = [{start: horario[0],title:"Nueva Cita"}];
	    	$("#calendars").fullCalendar( 'addEventSource', newEv );
            swal("Listo","Tu cita fue registrada exitosamente.","success");
	    	$.mobile.navigate( "#calendar_p", { transition : "slide",info: "info about the #foo hash" });


	    }else{
	    	var mes="";
	    	
	    	mes=data.toString();
	    	
           swal("Error",mes,"error");
	    }
	   
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
    }
    function paynt(){
    var form = new FormData($("#payForm")[0]);
    var horario= $("#default_datetimepicker").val().toString().split(" ");
     var inputr = document.getElementById("radiograf"),
      inputre = document.getElementById("recetaf"),
      inpute = document.getElementById("elab");
    
    form.append("fecha",horario[0]);
    form.append("hora",horario[1]);
    form.append("radio",inputr.files[0]);
    form.append("recipe",inputre.files[0]);
    form.append("elab",file = inpute.files[0]);
    form.append("patient",localStorage.getItem("usi"));
    $.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
	     if(data.toString()=="1"){
	     	$("#radiograf").val("");
	    	$("#receta").val("");
	    	$("#elab").val("");
	     	$("#default_datetimepicker").val("");
	    	var newEv = [{start: horario[0],title:"Nueva Cita"}];
	    	$("#calendars").fullCalendar( 'addEventSource', newEv );
            swal("Listo","Tu cita fue registrada exitosamente.","success");
	    	$.mobile.navigate( "#calendar_p", { transition : "slide",info: "info about the #foo hash" });


	    }else{
	    	
	    	var mes="";
	    	
	    	mes=data.toString();
	    	
           swal("Error",mes,"error");
	    }
	   
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
    }
    function updateD(){
    var form = new FormData($("#datosForm")[0]);
    form.append("userm",localStorage.getItem("usi"));
    $.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
	    if(data.toString()=="1"){
	    	
	    	
            swal("Listo","Tus datos han sido modificados.","success");
           

	    }else{
	    	
	    	
	    	
           swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
	    }
	   
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
    }
    
    function updateDD(){
    var form = new FormData($("#datosdForm")[0]);
    form.append("userm",localStorage.getItem("usi"));
    $.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
	    if(data.toString()=="1"){
	    	
	    	
            swal("Listo","Tus datos han sido modificados.","success");
           

	    }else{
	    	
	    	
	    	
           swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
	    }
	   
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
    }
    function updateDE(){
    var form = new FormData($("#datoseForm")[0]);
    form.append("userm",localStorage.getItem("usi"));
    $.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
	    if(data.toString()=="1"){
	    	
	    	var nl = $("#expD").val().split("/");
	    	$("#expL").append("<li><div class='edate'>"+nl[0]+"</div> <div class='edesc'>"+nl[1]+". "+nl[2]+"</div></li>")
            swal("Listo","Tus datos han sido modificados.","success");
           

	    }else{
	    	
	    	
	    	
           swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
	    }
	   
	},

	error: function(){
		swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	}

        });
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $(input).prev().find(".profileimg").attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    
  var connectionStatus = false;
  function reSchedule(){
  	var form = new FormData($("#repForm")[0]);
      $.ajax({
      	url: "http://www.icone-solutions.com/doct/sqlOP.php",
        type: "POST",
        data: form,
        contentType: false,
        cache: false,
        processData:false,
        error: function(xhr, settings, exception){ swal("Error","Revisa tu conexión a internet.","error")},
        success: function(data){
        	if(data.toString()=="0"){
        		$('.modalSch').iziModal('close');
             	swal("Listo","Tu cita ha sido reprogramada.","success");
        	}else{
        		$('.modalSch').iziModal('close');
             	swal("Listo","Ocurrio un error al hacer tu cambio, por favor inténtalo de nuevo.","error");
        	}
             	
        }
      });
  }
   function login(){
	
    var form = new FormData($("#loginForm")[0]);
    	
    //form.append("regID",localStorage.getItem('registrationId'));
     $.ajax({
        url: "http://www.icone-solutions.com/doct/sqlOP.php",
        type: "POST",
        data: form,
        contentType: false,
        cache: false,
        processData:false,
        error: function(xhr, settings, exception){ swal("Error","Revisa tu conexión a internet.","error")},
        success: function(data){
          $.mobile.loading( "hide" );
          //$("#logac").prop("disabled",false);
          if(data.toString()!=="0"){
            var datos = data.toString().split(",");
            user = datos[0];
            usi = datos[1];
            //$(".usern").text(user);
            localStorage.setItem("user",user);
            localStorage.setItem("usi",usi);
            if($("#tipoL").val()=="pac"){
            	localStorage.setItem("tipo","pac");
            	$.mobile.navigate( "#menu", { transition : "slide",info: "info about the #foo hash" });
            }else{
            	localStorage.setItem("tipo","doc");
            	$.mobile.navigate( "#menuD", { transition : "slide",info: "info about the #foo hash" });
            }
            
          } else{
            swal("Error","Usuario o contraseña incorrectos","error");
          }  
        },
      error: function(){
      	 $.mobile.loading( "hide");
        swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
      }
    });
    }

function register(){
    	var form = new FormData($("#regForm")[0]);
    	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
	    if(!isNaN(data)){
	    	var datos = data.toString().split(",");
	    	if($("#tipoR").val()=="pacientes"){
	    		localStorage.setItem("tipo","pac");
	    	}else{
	    		localStorage.setItem("tipo","doc");
	    	}
            swal("Listo","Tu usuario ha sido registrado exitosamente.","success");
            localStorage.setItem("user",$("#mailR").val());
            localStorage.setItem("usi",data.toString());
            
            $.mobile.navigate( "#menu", { transition : "slide",info: "info about the #foo hash" });


	    }else{
           swal("Error",data.toString(),"error");
	    }
	    $("#rega").prop("disabled",false);
	    },
	    error: function(){
	    	swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
	    }

        });
    }
    
    function cancelC(idc){
    	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {idc:idc},
	success: function(data){
	    if(data.toString()=="1"){
	    	if($("#calendars").is(":visible") ){
	    		$("#calendars").fullCalendar( 'removeEvents', [idc] )
	    	}else{
	    		$("#calendarsd").fullCalendar( 'removeEvents', [idc] )
	    	}
	    	
	    	swal("Listo","Tu cita ha sido eliminada exitosamente.","success");
	    }else{
	    	swal("Ups!","Tu cita no ha podido ser eliminada.","error");
	    }
   },
  error: function(){
  	swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
  }
        });
    }

$(document).ready(function(){
	$("#modalP").iziModal({
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    onOpened: function(modal) {
    	
    	getHP(citap,fechap);
        $.ajax({
        	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {citap:citap},
	        success: function(data){
	        	var jobj = jQuery.parseJSON(data);
	        	modal.stopLoading();
	        	$(".doctN").text(jobj[0][2]);
	        	$(".doctM").text(jobj[0][5]);
	        	$(".doctPh").text(jobj[0][4]);
	        	$(".cdate").text(jobj[0][0]);
	        	$(".hdate").text(jobj[0][1]);
	        	$(".citaI").css("background-image", "url("+jobj[0][3]+")");
	        },
	        error: function(){
	        	modal.stopLoading();
	        	$('#modalP').iziModal('close');
	        }
        })
        
    },
    onClosed: function() {
        //console.log('onClosed');  
    }
});
$("#modalD").iziModal({
		 group: 'grupo1',
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    onOpened: function(modal) {
        $.ajax({
        	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {citad:citap},
	        success: function(data){
	        	var jobj = jQuery.parseJSON(data);
	        	modal.stopLoading();
	        	$(".doctN").text(jobj[0][2]);
	        	$(".doctM").text(jobj[0][5]);
	        	$(".doctPh").text(jobj[0][4]);
	        	$(".cdate").text(jobj[0][0]);
	        	$(".hdate").text(jobj[0][1]);
	        	$(".citaI").css("background-image", "url("+jobj[0][3]+")");
	        },
	        error: function(){
	        	modal.stopLoading();
	        	$('#modalD').iziModal('close');
	        }
        })
        
    },
    onClosed: function() {
        //console.log('onClosed');  
    }
});

$("#modalP, #modalD").on('click', 'header a', function(event) {
    event.preventDefault();
    var $this = $(this);
    var index = $this.index();
    $this.addClass('active').siblings('a').removeClass('active');
    
    var $sections = $this.closest('div').find('.sections');
    var $currentSection = $this.closest("div").find("section").eq(index);
    //var $nextSection = $this.closest("div").find("section").eq(index).siblings('section');

    $sections.css('height', $currentSection.innerHeight());

    function changeHeight(){
        $this.closest("div").find("section").eq(index).fadeIn().siblings('section').fadeOut(100);
    }

    if( $currentSection.innerHeight() > $sections.innerHeight() ){
        changeHeight();
    } else {
        setTimeout(function() {
            changeHeight();
        }, 150);
    }

    if( $this.index() === 0 ){
        $("#modalP .iziModal-content .icon-close").css('background', '#ddd');
    } else {
        $("#modalP .iziModal-content .icon-close").attr('style', '');
    }
});
	$(function() {
    $("#expD").inputmask({
    mask: "9999 / *{1,256} / *{1,256}",
    greedy: false,
     validator: "[A-Za-z0-9 ]"
    
  });
                $("#card").inputmask("9999 9999 9999 9999", {"placeholder": "0000 0000 0000 0000"});
                $("#cvv").inputmask("999", {"placeholder": "000"});
               $("#expdate").inputmask("99/9999", {"placeholder": "mm/aaaa"});
                $("[data-mask]").inputmask();

     });
    document.addEventListener("backbutton", function(e){
    	
    
           if($.mobile.activePage.is('#inicio')||$.mobile.activePage.is('#land')){
              
           }
           else {
               navigator.app.backHistory()
          }
         }, false);
     
      $( '#recentA' ).on( 'pagebeforeshow',function(event){
      
        
         getScheduleP();
      
      });
      $( '#important_d' ).on( 'pagebeforeshow',function(event){
      
        
         getIDa();
      
      });
     $( '#calendar_p' ).on( 'pagebeforeshow',function(event){
      
        
         getSchedule();
      
      });
      $( '#agenda' ).on( 'pagebeforeshow',function(event){
      
        
         getAgenda();
      
      });
      $( '#profileP' ).on( 'pageshow',function(event){
      
        
         getPD();
      
      });
      $( '#profileD' ).on( 'pageshow',function(event){
      
        
         getPD();
         getED();
      });
      $( '#patient_list' ).on( 'pagebeforeshow',function(event){
      
        
        getPac();
      
      });
         paymentList();
         $('#loginForm').submit(function(e){
     e.preventDefault();
     html = $(this).jqmData( "html" ) || "";
      var form = new FormData($("#loginForm")[0]);
      $.mobile.loading( "show", {
            text: "Verificando",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
    login();
      //form.append("regID",localStorage.getItem('registrationId'));
     
  });
   $('#repForm').submit(function(e){
     e.preventDefault();
     if($(".chooseDT").val()!=""){
 		var check = $("#timePs").val();
 		var doct = $(".doctM").val();
 		$.ajax({
 			url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {checkds:check,docd:doct},
	        success:function(data){
	        	if(data.toString()=="0"){
	        		reSchedule();
	        	}else{
	        		swal("Error",data.toString(),"error");
	        	}
	        	
	        },
	        error:function(){
	        	
	        	swal("Error","Revisa tu conexión de internet.","error");
	        }
 		})
 		
 	}else{
 		swal("Elige una fecha para continuar","","info");
 	}
     
     
  });
         
         
         $("#payForm").submit(function(e){
         	e.preventDefault();
         	
         	swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
	        	if($('#cPay').is(":visible")) {
	        	var exd = $("#expdate").val().split("/");
                var month =  exd[0];
                var year =  exd[1];
                $("#month").val(month);
                $("#year").val(year);       
 	            checkC();
 	           }else{
 	        	paynt();
 	           }
            }
         });
         });
    
   
    $("#CIP").click(function(){
       $("#fotoP").click();
    });
    $("#elabi").click(function(){
       $("#elab").click();
    });
    $("#radioi").click(function(){
       $("#radiograf").click();
    });
    $("#recei").click(function(){
       $("#recetaf").click();
    });
    $("#fotoP").change(function(){
        readURL(this);
    });
    $("#fotoD").change(function(){
        readURL(this);
    });
   
   $("#regForm").submit(function(e){
    	e.preventDefault();
    	 var empty = $(this).find("input").filter(function() {

        return this.value === "";
        
    });
    if(empty.length==0){
	    if($("#pass1").val()==$("#pass2").val()){
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         register("#regForm");
            }
         });
        }else{
        	swal("Error","Las contraseñas no coinciden","error");
        }
       }else{
       	swal("Error","Debes completar todos los campos","error");
       }
   });
   $("#datosForm").submit(function(e){
    	e.preventDefault();
	
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         updateD();
            }
         });
   });
  
   $("#datosdForm").submit(function(e){
    	e.preventDefault();
	
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         updateDD();
            }
         });
   });
   
   $("#datoseForm").submit(function(e){
    	e.preventDefault();
	
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         updateDE();
            }
         });
   });
    $(".cancelAp").click(function(e){
 	swal({
          title: "¿Estás seguro que deseas cancelar tu cita?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         cancelC(citap);
            }
         });
 });
 
 var datosp= Array();
 
 $("#edit").click(function(){
 	if($(this).hasClass("ui-icon-edit")){
 	$(this).removeClass("ui-icon-edit");
 	$(this).addClass("ui-icon-delete");
 	$('#accForm input[type=text],#accForm textarea').css("background-color","#fff");
 	$('#accForm input[type=text],#accForm textarea').prop('readonly', false);
 	$('#joba').selectmenu('enable');
 	$("#saveD").css("visibility","visible");
 	}else{
 	$(this).addClass("ui-icon-edit");
 	$(this).removeClass("ui-icon-delete");
 	$('#accForm input[type=text],#accForm textarea').css("background-color","transparent");
 	$('#accForm input[type=text],#accForm textarea').prop('readonly', true);
 	$('#joba').selectmenu('disable');
 	
 	$("#nombrea").val(datosp[1]);
		$("#compa").val(datosp[2]);
		$("#addressa").val(datosp[3]);
		$("#statea").val(datosp[4]);
		$("#citya").val(datosp[5]);
		$("#paisa").val(datosp[6]);
		$("#telefonoa").val(datosp[8]);
		$("#cellpa").val(datosp[9]);
		$("#joba").val(datosp[10]);
		$("#saveD").css("visibility","hidden");
 	}
 	$('#joba').selectmenu('refresh', true);
 	
 });
 
 
 

$(".close").click(function(){
   	       localStorage.clear();
   	       $.mobile.navigate( "#inicio", {transition:"pop", info: "info about the #foo hash" });
   });

var thisMonth = moment().format('YYYY-MM');


   

   var saturday;
   var weekend;
   var sunday;
   var allowed;
   var disabledt;
   var todaytp;
   $("#doctUl, #map_canvas").on("click",".showD",function(e){
   	e.preventDefault();
   	var d = $(this).data("doct");
   		html = $(this).jqmData( "html" ) || "";
 	$.mobile.loading( "show", {
            text: "Cargando Info",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
    var idug =localStorage.getItem("usi");
 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {doctor:d, idug:idug},
	success: function(data){
		
		var docts = jQuery.parseJSON(data);
		$("#doctP").val(docts[0][0]);
		$("#imgd").css("background-image", "url('http://www.icone-solutions.com/doct/images/"+docts[0][4]+"')");
		$("#a-imgd").css("background-image", "url('http://www.icone-solutions.com/doct/images/"+docts[0][4]+"')");
		$("#sdname").text(docts[0][1]);
		$("#a-sdname").text(docts[0][1]);
		$("#spec").text(docts[0][2]);
		$("#a-spec").text(docts[0][2]);
		$("#a-price").text("Consulta: $"+docts[0][3]);
		$("#p-price").text("$"+docts[0][3]);
		$("#totsf").val(parseFloat(docts[0][3]));
		$("#location").text(docts[0][5]);
		$("#lv,#sat,#dom").empty();
		$("#lv").append("Lun-Vie "+docts[0][6]);
		$("#sat").append("Sábados "+docts[0][7]);
		$("#dom").append("Domingos "+docts[0][8]);
		
		$("#totU").text(docts[0][13])
		weekend = docts[0][9];
		saturday = docts[0][10];
		sunday = docts[0][11];
		allowed = docts[0][12];
		var d = new Date();
			 var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 0!
    
    var yyyy = d.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    todaytp = yyyy+'-'+mm+'-'+dd;
		if(allowed.length==0){
			
			disabledt = [todaytp];
			dd = '0'+(d.getDate()+1);
			todaytp = yyyy+'-'+mm+'-'+dd;
			
		}else{
			disabledt = [];
		}
		$.mobile.loading( "hide");
		
		$.mobile.navigate( "#doctor_show", {transition:"slidedown" });
	}
	});
 });
   $("#listg").click(function(e){
   	e.preventDefault();
   		html = $(this).jqmData( "html" ) || "";
 	$.mobile.loading( "show", {
            text: "Cargando Lista",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {doctors:1},
	success: function(data){
		 $("#doctUl").empty();
		var docts = jQuery.parseJSON(data);
		for(var i=0;i<docts.length;i++){
			$("#doctUl").append(' <li><a class="showD" data-doct="'+docts[i][4]+'">'+
    	'<img src="http://icone-solutions.com/doct/images/'+docts[i][3]+'" />'+
    	'<span class="dname">'+docts[i][0]+'</span>'+
    	'<span class="scp">'+docts[i][1]+'</span>'+
    	'<span class="scp">Consulta: $'+docts[i][2]+'</span>'+
    	'</a>'+
    	'</li>')
		}
		if ($("#doctUl").hasClass('ui-listview')) {
			$("#doctUl").listview('refresh');
		}
		$.mobile.loading( "hide");
		
		$.mobile.navigate( "#doctor_list", {transition:"slide" });
	}
	});
 });
 
 $('#np').click(function(e) {
 	e.preventDefault();
 	html = $(this).jqmData( "html" ) || "";
 	        $.mobile.loading( "show", {
            text: "Verificando",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
            });
 	if($(".chooseDT").val()!=""){
 		var check = $(".chooseDT").val();
 		var doct = $("#doctP").val();
 		$.ajax({
 			url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {checkd:check,docd:doct},
	        success:function(data){
	        	$.mobile.loading( "hide");
	        	if(data.toString()=="1"){
	        		$.mobile.navigate( "#payment", {transition:"slidedown" });
	        	}else{
	        		swal("Ups!",data.toString(),"error");
	        	}
	        },
	        error:function(){
	        	$.mobile.loading( "hide");
	        	swal("Error","Revisa tu conexión de internet.","error");
	        }
 		})
 		
 	}else{
 		swal("Elige una fecha para continuar","","info");
 	}
 });
 jQuery.datetimepicker.setLocale('es');
 $( '#chooseD' ).on( 'pageshow',function(event){ 
 	var disabled = [];
    var allowedt=[];
 	if(weekend[0]=="Cerrado"){
 		disabled.push(1);
 		disabled.push(2);
 		disabled.push(3);
 		disabled.push(4);
 		disabled.push(5);
 	}
 	if(saturday[0]=="Cerrado"){
 		disabled.push(6);
 	}
 	if(sunday[0]=="Cerrado"){
 		disabled.push(0);
 	}
     $('#default_datetimepicker').datetimepicker({
 	   formatDate:'Y-m-d',
 	   formatTime:'H:i',
 	   defaultTime: "9:00",
 	   disabledWeekDays: disabled,
 	   allowTimes: allowed,
 	   minDate: todaytp,
 	   startDate: todaytp,
 	   onSelectDate:function(ct,$i){
 	   	var d = new Date(ct);
 	   		html = $(this).jqmData( "html" ) || "";
 	        $.mobile.loading( "show", {
            text: "Cargando Horarios",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
            });
 	   	var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
 	   	$.ajax({
 	   		url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {sdate:now, cd: 1},
	        success: function(data){
	        	$.mobile.loading("hide");
	        	allowed= jQuery.parseJSON(data);
	        	
	        	$i.datetimepicker('setOptions', { allowTimes:allowed});
	        	
	        },
	        error: function(){
	        	swal("Error","No se ha podido conectar al servidor, revisa tu conexión","error");
	        }
 	   	})
 	   	
 	   	
       }
      });
   });
   
    
   
   
   $('input[name="mpay"]').click(function() {
       if($(this).val()=="t"){
       	$("#cPay").show();
       }else{
       	$("#cPay").hide();
       }
     });
     
 $(function() {
             
                $("#card").inputmask("9999 9999 9999 9999", {"placeholder": "0000 0000 0000 0000"});
                $("#cvv").inputmask("999", {"placeholder": "000"});
               $("#expdate").inputmask("99/9999", {"placeholder": "mm/aaaa"});
                

            });

});

