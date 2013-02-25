var add_id;
var count=24,max=0;
var global = false;
var value = [];
Wines=new Meteor.Collection("wines");
if (Meteor.isClient) {
	
//		history.back(function(e){console.info("pressed");})
Meteor.startup(function(){
	/*$.address.externalChange(function (event){
		console.info(event.value);
	});*/
	$(".main-row").hide();
	$(".inner-status-bar").hide();
	$(".button-add").hide();
	//$( "#dialog-box" ).hide();
	$( "#dialog-confirm" ).hide();
	 var modem = Backbone.Router.extend({
   	routes : {
			'home':'func',
			'wines/:id' : 'wine',
			'addwine' : 'add',
			'*path' : "error"
				
		},
		
		'func':function(){
			//console.log("home");
			main();
			},
		'wine' : function (id){
			//console.log("id... "+id);
			id = parseInt(id);
			//Meteor.subscribe("get_single_wine", id);
			cursor = Wines.find({current_id: id}).fetch();
			//console.log("len.. "+cursor.length);
			/*if(cursor.length == 0)
			{
				alert("wine not found");
				window.location.href="/#/home";
				main();
			}
			else
			{*/
			
			Meteor.call("foo",id, function(one, two){
				//console.info("err: "+one);
				//console.info("success: "+two[0]._id);	
				value = two;				
				show_wine(value);
			});
			//}
			//console.log(value);
		},
		'add' : function () {
			addWine();
			
		},
		'error' : function () {
			//console.info('link not found');
			//this.navigate("home",true);
			//console.info(window.location.pathname);
			window.location.href="/#/home";

		}
		
	});
	/*var routes = {
			'home':'func',
			'wines/:id' : 'wine',
			'addwine' : 'addwine',
			'*path':'error'
				
		};
	var path; 
		path = window.location.pathname.replace("/", "");
		console.info("path..."+path);
		var page = routes[path];
		console.info("page..."+page);
		if (!page) {
 			page = "home";
}*/
   
   	new modem();
   	Backbone.history.start();
	
	});
  Template.container.wines=function(){
	  	return Wines.find({},{sort : {current_id: 1}});
	  };
  Template.wine.events({
	  'click .thumbnail-small':function(e){
		  
		  
		  $(".wine1").hide();
		  $(".main-row").show();
		 	  
		  var form_name=document.getElementById("input-name");
		  var form_grapes=document.getElementById("input-grapse");	
		  var form_country=document.getElementById("input-country");	
		  var form_region=document.getElementById("input-region");	
		  var form_year=document.getElementById("input-year");	
		  var form_id=document.getElementById("input-id");
		  var form_pic=document.getElementById("picture-info-id");
		  var form_note=document.getElementById("input-note");
		  $(".button-save").attr("id",this._id);
		  $(".button-delete").attr("name",this._id);
		  $(".button-yes").attr("id",this._id);
		  $(".button-no").attr("name",this._id);
		  
		  form_name.value=this.name;
		  form_grapes.value=this.grapes;
		  form_country.value=this.country;
		  form_region.value=this.region;
		  form_year.value=this.year;
		  form_id.value=this.current_id;
		  
		 
		  var any=e.currentTarget;
		  any=$(any).children(any);
		  any=$(any).children(any);
		 
		  if(any.hasClass("generic"))
		  	form_pic.src="images/generic.jpg"
		else
		  	form_pic.src="images/"+this.current_id+".jpg"
		  form_note.value=this.notes; 
		 
		  },		
	  });
	Template.wineDetail.events({
			'click .button-save':function(e){
				var form_name=document.getElementById("input-name");
		  		var form_grapes=document.getElementById("input-grapse");	
		  		var form_country=document.getElementById("input-country");	
		 		var form_region=document.getElementById("input-region");	
		  		var form_year=document.getElementById("input-year");	  		
		  		var form_note=document.getElementById("input-note");
				cur_id=e.currentTarget.id;
				
				Wines.update({_id:cur_id},{$set:{name:form_name.value,grapes:form_grapes.value ,country:form_country.value, region:form_region.value, year:form_year.value, notes:form_note.value }});
				$('.wine-small').hide();
				$(".main-row").css("padding-top","74px");
				$(".inner-status-bar").show();
				
				},
		
			'click .button-add':function(e){
			var form_name=document.getElementById("input-name");
			 var form_grapes=document.getElementById("input-grapse");	
			 var form_country=document.getElementById("input-country");	
			 var form_region=document.getElementById("input-region");	
			 var form_year=document.getElementById("input-year");	
			 var form_id=document.getElementById("input-id");
			 var form_pic=document.getElementById("picture-info-id");
			 var form_note=document.getElementById("input-note");
			var obj=Wines.find({});
			
			obj.forEach( function (index) {
				
				
					if( max == index.current_id)
					{
						//console.log("max in add"+max);
						max = Number(max)+1;
						form_id.value=Number(max);						
						}
					else
						//console.log("max in add else"+max);
						 form_id.value=Number(max);
						 //console.log(max);
				
			 });
			 add_id=Wines.insert({
				 name:form_name.value,
				 country:form_country.value,
				 region:form_region.value,
				 grapes:form_grapes.value,
				 year:form_year.value,
				 notes:form_note.value,
				 current_id:parseInt(form_id.value)		 
				 });
			
			$(".inner-status-bar").show();
			},
				
		'click .button-delete':function clickButton(e){
			var delete_id=e.currentTarget.name;
			//console.log(delete_id);
			
			
			
			 var object=Wines.findOne({_id:delete_id});
				//console.log(object.current_id);
				/*$( "#dialog-box" ).show();
				$("#dialog-box").css({"top": "280px",
    								"left" : "328px"});
				$(".main-row").css("opacity","0.3");
				$("#dialog-message").css({"margin-bottom":"10px","font-size":"18px"});
				$("#dialog-message").text("Do you want to delete this ID:"+object.current_id+"?");*/
				
			
			//$("#dialog-confirm").dialog("open");
			//$( "#dialog-confirm" ).dialog("enable");
			$( "#dialog-confirm" ).dialog({
				resizable: false,
				modal:true,
      			height:100,     			
				buttons: {
        		
      			}
   		 	});
			$("#dialog-confirm").dialog("option","buttons",{
				"Yes": function() {
        			 //console.log(this);
					 $( this ).dialog( "close" );
					$(".wine1").show();
		  				$(".main-row").hide();
						$('.wine-small').show();
						$(".thumbnail-small").show();
						Wines.remove({_id:delete_id});
						 setTimeout(function () {
 						clickButton(); // now we call your function (knowing the modal is gone)
						 }, 100);
       			 },
       			 "No": function() {
         			 var a=$( this ).dialog("close");
					 //console.log(a);
       			 }
			}
			);
			
			$(".ui-widget-content").css("border","none");
			$(".ui-dialog .ui-dialog-content").css("overflow","visible");
			$(".ui-dialog .ui-dialog-buttonpane").css("margin-top","2.5em");
			$("#dialog-confirm p").text("Do you want to delete this ID:"+object.current_id+"?");
			
			},
		/*'click .button-yes':function(e){
			var delete_id=e.currentTarget.id;
			//console.log(delete_id);			
			 var object=Wines.findOne({_id:delete_id});
			 $(".wine1").show();
			$(".main-row").hide();
			$('.wine-small').show();
			$(".thumbnail-small").show();
			Wines.remove({_id:delete_id});
			 $( "#dialog-box" ).hide();
			 $(".main-row").css({"opacity":"1", 
			 					
								});
				
		},
		'click .button-no':function(e){
			$( "#dialog-box" ).hide();
			$(".main-row").css("opacity","1");
		}*/
		}); 
	Template.hello.events({
		'click .brand':function(){
			main();
			/*$(".wine1").show();
		  	$(".main-row").hide();
			$('.wine-small').show();
			$(".thumbnail-small").show();
			$(".inner-status-bar").hide(); 
			$(".main-row").css("padding-top","0px");
			
			$("#"+add_id+"").attr("src","images/generic.jpg");
			
			$("#"+add_id+"").addClass("generic");
			$(".button-save").show();
			$(".button-add").hide();*/
			
			},
		'click .add':function(e){
			
			
			addWine(e);
			/*$(".wine1").hide();
		  	$(".main-row").show();
			$('.wine-small').hide();
			$(".thumbnail-small").hide();
			$(".inner-status-bar").hide();
			$(".main-row").css("padding-top","74px");
				
			$(".button-save").hide();
			$(".button-add").show();
			
			 var form_name=document.getElementById("input-name");
			 var form_grapes=document.getElementById("input-grapse");	
			 var form_country=document.getElementById("input-country");	
			 var form_region=document.getElementById("input-region");	
			 var form_year=document.getElementById("input-year");	
			 var form_id=document.getElementById("input-id");
			 var form_pic=document.getElementById("picture-info-id");
			 var form_note=document.getElementById("input-note");
			 
			 ////make all fields empty
			 form_name.value="";
			 form_grapes.value="";
			 form_country.value="";
			 form_region.value="";
			 form_year.value="";
			 form_note.value="";
			 var object=Wines.find({});
			 //var max = 0;
			 var obj=Wines.find({});
			 global = false;
			 obj.forEach( function (index) {
				
				
					if( max <=index.current_id)
					{max = index.current_id;
					//console.log("max add wine"+max);			
					global = true;
					//console.log(form_id.value);
					 max=Number(max)+1;
					}
					
			 });
			 
			 
				
				form_id.value=max;
			 //var object=Wines.findOne({cur});	
			//console.log(max +' max');
			 
			
			 form_pic.src="images/generic.jpg";*/
			 
			 
			
			}
		});
		
		function addWine(e){
			//window.location.href="/#/home";		
			$(".wine1").hide();
		  	$(".main-row").show();
			$('.wine-small').hide();
			$(".thumbnail-small").hide();
			$(".inner-status-bar").hide();
			$(".main-row").css("padding-top","74px");
			
			$(".button-save").hide();
			$(".button-add").show();
			
			 var form_name=document.getElementById("input-name");
			 var form_grapes=document.getElementById("input-grapse");	
			 var form_country=document.getElementById("input-country");	
			 var form_region=document.getElementById("input-region");	
			 var form_year=document.getElementById("input-year");	
			 var form_id=document.getElementById("input-id");
			 var form_pic=document.getElementById("picture-info-id");
			 var form_note=document.getElementById("input-note");
			 
			 ////make all fields empty
			 form_name.value="";
			 form_grapes.value="";
			 form_country.value="";
			 form_region.value="";
			 form_year.value="";
			 form_note.value="";
			 var object=Wines.find({});
			 //var max = 0;
			 var obj=Wines.find({});
			 global = false;
			 obj.forEach( function (index) {
				
				
					if( max <=index.current_id)
					{max = index.current_id;
					//console.log("max add wine"+max);			
					global = true;
					//console.log(form_id.value);
					 max=Number(max)+1;
					}
					
			 });
			 
			 
				
				form_id.value=max;
			 //var object=Wines.findOne({cur});	
			//console.log(max +' max');
			 
			
			 form_pic.src="images/generic.jpg";
			 
			 
			
			
		
		}
		function main(){
			$(".wine1").show();
		  	$(".main-row").hide();
			$('.wine-small').show();
			$(".thumbnail-small").show();
			$(".inner-status-bar").hide(); 
			$(".main-row").css("padding-top","0px");
			
			$("#"+add_id+"").attr("src","images/generic.jpg");
			
			$("#"+add_id+"").addClass("generic");
			$(".button-save").show();
			$(".button-add").hide();
		}
		
		function show_wine(data){
			//console.log(data[0]);
			 $(".wine1").hide();
		  $(".main-row").show();
		 	  
		  var form_name=document.getElementById("input-name");
		  var form_grapes=document.getElementById("input-grapse");	
		  var form_country=document.getElementById("input-country");	
		  var form_region=document.getElementById("input-region");	
		  var form_year=document.getElementById("input-year");	
		  var form_id=document.getElementById("input-id");
		  var form_pic=document.getElementById("picture-info-id");
		  var form_note=document.getElementById("input-note");
		  $(".button-save").attr("id",data[0]._id);
		  $(".button-delete").attr("name",data[0]._id);
		  $(".button-yes").attr("id",data[0]._id);
		  $(".button-no").attr("name",data[0]._id);
		  
		  form_name.value=data[0].name;
		  form_grapes.value=data[0].grapes;
		  form_country.value=data[0].country;
		  form_region.value=data[0].region;
		  form_year.value=data[0].year;
		  form_id.value=data[0].current_id;
		  
		  form_pic.src="images/"+data[0].current_id+".jpg"
		  form_note.value=data[0].notes; 
		}
		
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	Wines.remove({});

	var wine_name = ["CHATEAU DE SAINT COSME",
                   "LAN RIOJA CRIANZA",
                   "MARGERUM SYBARITE",
                   "OWEN ROE",
				   "REX HILL",
				   "VITICCIO CLASSICO RISERVA",
				   "CHATEAU LE DOYENNE",
				   "DOMAINE DU BOUSCAT",
				   "BLOCK NINE",
				   "DOMAINE SERENE",
				   "BODEGA LURTON",
				   "LES MORIZOTTES",
				   "ARGIANO NON CONFUNDITUR",
				   "DINASTIA VIVANCO",
				   "PETALOS BIERZO",
				   "SHAFER RED SHOULDER RANCH",
				   "PONZI",
				   "HUGEL",
				   "FOUR VINES MAVERICK",
				   "QUIVIRA DRY CREEK VALLEY",
				   "CALERA 35TH ANNIVERSARY",
				   "CHATEAU CARONNE STE GEMME",
				   "MOMO MARLBOROUGH",
				   "WATERBROOK",];
	var wine_year=["2009","2012","2010","2009","2009","2007","2012","2009","2009","2007","2011","2009","2009","2008","2009","2009","2010",
				   "2010",
				   "2011",
				   "2009",
				   "2010",
				   "2010",
				   "2010",
				   "2009",];
	var wine_grapes=["Grenache / Syrah",
					"Tempranillo",
					"Sauvignon Blanc",
					"Syrah",
					"Pinot Noir",
					"Sangiovese Merlot",
					"Merlot",
					"Merlot",
					"Pinot Noir",
					"Pinot Noir",
					"Pinot Gris",
					"Chardonnay",
					"Cabernet Sauvignon",
					"Tempranillo",
					"Mencia",
					"Chardonnay",
					"Pinot Gris",
				   	"Pinot Gris",
				   	"Zinfandel",
				   	"Zinfandel",
				   	"Pinot Noir",
				   	"Cabernet Sauvignon",
				   	"Sauvignon Blanc",
				   	"Merlot",];
	var wine_region=["Southern Rhone",
					"Rioja",
					"California Central Cosat",
					"Washington",
					"Oregon",
					"Tuscany",
					"Bordeaux",
					"Bordeaux",
					"California"
					,"Oregon",
					"Mendoza",
					"Burgundy",				
					"Tuscany",
					"Rioja",
					"Castilla y Leon",
					"California",
					"Oregon",
				   	"Alsace",
				   	"California",
				   	"California",
				   	"California",
				   	"Bordeaux",
				  	"South Island",
				   	"Washington"];
	var wine_country=["France",
					"Spain",
					"USA",
					"USA",
					"USA",
					"Italy",
					"France",
					"France",
					"USA",
					"USA",
					"Argentina",
					"France",
					"Italy",
					"Spain",
					"Spain",
					"USA",
					"USA",
				   	"France",
				   	"USA",
				   	"USA",
				   	"USA",
				   	"France",
				   	"New Zealand",
				   	"USA",];
	var wine_note=["The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
					"A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.",
					"The cache of a fine Cabernet in ones wine cellar can now be replaced with a childishly playful wine bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
					"A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
					"One cannot doubt that this will be the wine served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
					"Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
					"Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
					"The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
					"With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.",
					"Though subtle in its complexities, this wine is sure to please a wide range of enthusiasts. Notes of pomegranate will delight as the nutty finish completes the picture of a fine sipping experience.",
					"Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
					"Breaking the mold of the classics, this offering will surprise and undoubtedly get tongues wagging with the hints of coffee and tobacco in perfect alignment with more traditional notes. Sure to please the late-night crowd with the slight jolt of adrenaline it brings.",
					"Like a symphony, this cabernet has a wide range of notes that will delight the taste buds and linger in the mind.",
					"Whether enjoying a fine cigar or a nicotine patch, don't pass up a taste of this hearty Rioja, both smooth and robust.",
					"For the first time, a blend of grapes from two different regions have been combined in an outrageous explosion of flavor that cannot be missed.",
					"Keep an eye out for this winery in coming years, as their chardonnays have reached the peak of perfection.",
					"For those who appreciate the simpler pleasures in life, this light pinot grigio will blend perfectly with a light meal or as an after dinner drink.",
					"Fresh as new buds on a spring vine, this dewy offering is the finest of the new generation of pinot grigios.  Enjoy it with a friend and a crown of flowers for the ultimate wine tasting experience.",
					"o yourself a favor and have a bottle (or two) of this fine zinfandel on hand for your next romantic outing.  The only thing that can make this fine choice better is the company you share it with.",
					"Rarely do you find a zinfandel this oakey from the Sonoma region. The vintners have gone to extremes to duplicate the classic flavors that brought high praise in the early '90s.",
					"Fruity and bouncy, with a hint of spice, this pinot noir is an excellent candidate for best newcomer from Napa this year.",
					"Find a sommelier with a taste for chocolate and he's guaranteed to have this cabernet on his must-have list.",
					"Best served chilled with melon or a nice salty prosciutto, this sauvignon blanc is a staple in every Italian kitchen, if not on their wine list.  Request the best, and you just may get it.",
					"Legend has it the gods didn't share their ambrosia with mere mortals.  This merlot may be the closest we've ever come to a taste of heaven."
					];
		
      //for (i = start+(page_no*no_of_items); i < end+(page_no*no_of_items); i++){
       for (i =0; i < wine_name.length; i++){
	    Wines.insert({
			name: wine_name[i],
			year:wine_year[i],
			grapes:wine_grapes[i],
			region:wine_region[i],
			country:wine_country[i],
			notes:wine_note[i],
			current_id:i+1				
		});
		
		
		
	  
	  }
	  
	
	
  });
  	Meteor.methods({
			'foo':function(id){
					//console.log("foo");
					cursor=Wines.find({current_id:id}).fetch();
					//console.log(id+" i "+cursor.length +"cursor");
					cursor.forEach(function(index){
						//console.log(index.current_id);
					});
					return cursor;
				}
		});
  Meteor.publish("get_single_wine", function(data){
		return Wines.find({current_id: data});  
  });
}
