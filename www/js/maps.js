

   var lato=23.634501;
   var longo=-102.55278399999997;
   
   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
    	var onSuccess = function(position) {
    		lato = parseFloat(position.coords.latitude) ;
    		longo = parseFloat(position.coords.latitude) ;
    		if(lato == 0 || longo ==0){
    			lato= 40.7127837;
    			longo=-74.00594130000002;
    		}
    		
      
        };

    // onError Callback receives a PositionError object
    //
       function onError(error) {
       	lato= 23.634501;
    			longo=-102.55278399999997;
         //swal("Error","Revisa tu conexión a internet para tener acceso a todas las funciones","error");
       }

    navigator.geolocation.getCurrentPosition(onSuccess, onError); 
    console.log(lato+"nanananaasdn");
  var map = new GMaps({
        div: '#map_canvas',
         width: '100%',
        height: '400px',
        lat: lato,
        lng: longo,
        zoom:5
      });
    $(document).ready(function(){
	 

      $( '#map_search' ).on( 'beforepageshow',function(event){
       
        map.refresh();
         
      
      });
     
       
      
       GMaps.geolocate({
        success: function(position){
         
          map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error){
          //alert('Geolocation fallo: '+error.message);
        },
        not_supported: function(){
         // alert("Tu equipo no soporta esta función");
        },
        always: function(){
          
        }
      });
        $('#geocoding_form').submit(function(e){
        e.preventDefault();
        map.removeMarkers();
        html = $(this).jqmData( "html" ) || "";
 	    $.mobile.loading( "show", {
            text: "Cargando...",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
        var addr = $('#address').val().trim();
        $.ajax({
        	url: "http://icone-solutions.com/doct/sqlOP.php",
        	type: "post",
        	data:{search:addr},
        	success: function(data){
        		
        		var icon;
        		var locations = new Array();
        		var doctors= jQuery.parseJSON(data);
        		
        		for (var i=0;i<doctors.length;i++){
        			var doctors2= doctors[i][3];
        			console.log(doctors);
        			icon={
                     url: "http://icone-solutions.com/doct/images/"+doctors[i][2], // url
                     scaledSize: new google.maps.Size(70, 70), // scaled size
                     origin: new google.maps.Point(0,0), // origin
                     anchor: new google.maps.Point(0, 0) // anchor
                     };
        		  GMaps.geocode({
                  address: doctors[i][1],
                  callback: function(results, status){
                  if(status=='OK'){
                     var latlng = results[0].geometry.location;
                    
                 
                     map.setCenter(latlng.lat(), latlng.lng());
                     map.addMarker({
                     lat: latlng.lat(),
                     lng: latlng.lng(),
                     icon: icon,
                     infoWindow: {
                        content: '<a  class="showD" data-doct="'+doctors2+'" data-transition="slide">Ver más</a >'
                     }
                  });
                 }
                }
              });
        		}
        		 $.mobile.loading( "hide");
        		 map.setZoom(13);
        	}
        });
        
      });
     
    });