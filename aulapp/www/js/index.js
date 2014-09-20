/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
$(document).bind("mobileinit", function(){
  $.mobile.ajaxEnabled = true;
});
 
function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
	//startWatch();
	carregaEstacionamento();
	google.maps.event.addDomListener(window, 'load', mapaEstacionamento);
}
 

function carregaEstacionamento(){
	$.getJSON('http://localhost/hackathon/www/listaEmpresa.json', 
	
	function(data) {
		var listaEstacionamentoHtml = '';
		
		$.each(data, function(i, estacionamento) {
			var jsonEstacionamento = JSON.stringify(estacionamento);
			
			listaEstacionamentoHtml += '<li class="ui-first-child ui-last-child" >';
			listaEstacionamentoHtml += '<a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="#detalheEstacionamento" onclick=\'mostrarEstacionamento(' + jsonEstacionamento + ');\'  data-transition=\'slide\' >';
			listaEstacionamentoHtml += '<h3>';
			listaEstacionamentoHtml += estacionamento.Nome;
			listaEstacionamentoHtml += '</h3>';
			listaEstacionamentoHtml += '<p>';
			var listaValoresHtml = '';
			var i = 0;
			$.each(estacionamento.Valores, function(i, valor) {
				if(i != 0){
					listaValoresHtml += ' - ';	
				}
				
				listaValoresHtml += valor.Descricao;
				listaValoresHtml += " ";
				listaValoresHtml += valor.Preco;
			
			})
			listaEstacionamentoHtml += listaValoresHtml;
			listaEstacionamentoHtml += '</p>';
			listaEstacionamentoHtml += '</a>';
			listaEstacionamentoHtml += '</li>';		
		});	
		
		$('#listaEstacionamento').html(listaEstacionamentoHtml);
	})
}

function mostrarEstacionamento(data) {
	$('#nomeEstacionameto').html(data.Nome);
	$('#ruaEstacionameto').html(data.Rua);
	
	var listaValoresHtml = '';
	var i = 0;
	$.each(data.Valores, function(i, valor) {
		listaValoresHtml += "<tr>";
		listaValoresHtml += "<td>";
		listaValoresHtml += valor.Descricao;
		listaValoresHtml += "</td>";
		listaValoresHtml += "<td>";
		listaValoresHtml += valor.Preco;
		listaValoresHtml += "</td>";
		listaValoresHtml += "</tr>";
	
	})
	
	$('#listaValores').html(listaValoresHtml);
	
	mapaEstacionamento(data.Latitude,data.Longitude);
}


function mapaEstacionamento(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
	zoom: 15,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'Kwai Burger'
  });
}
