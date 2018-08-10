/*  Main script for action on Forms, Option menu and Progress bar   */

// Module Sales App
var SalesApp = angular.module('SalesApp', ['dx', 'angular-loading-bar']);

// Configuring with Loading bar
 SalesApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
   
   cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"></span><h3>Loading Status:</h3><iframe id="frame1" src="http://35.185.42.222:8085/getstat" height="40" width="30%"  style="border:2px solid red; paddingLeft:20%; runat="server""></iframe></div>';
  }])
  
// Sales Controller injection
SalesApp.controller('SalesController', ['$scope', '$http', '$window', '$sce', function SalesController($scope, $http, $window, $sce) {
	
	var submit_url = " http://35.185.42.222:8085/fup"; // endpoint URL 
	var file;
	// Option Items
    $scope.multiple = false;
    $scope.accept = "*"; // file type
    $scope.value = [];
	$scope.startValue1 = 10; // HL
    $scope.endValue1 = 70; // HL
	$scope.startValue2 = 1000; // epoch
    $scope.endValue2 = 10000; // epoch
	$scope.startValue3 = 70; //co
    $scope.endValue3 = 130; // co
	//$scope.sv = 10;
	//$scope.ev = 30;
	
	// For progress Bar
	 var seconds = 10,
        inProgress = false,
        intervalId;
	$scope.progressBarValue = 0;
	
	    $scope.progressBarOptions = 
	{
	    disabled: false,
		visible: false,
        min: 0,
        max: 100,
        width: "90%",
        bindingOptions: {
            value: "progressBarValue"
        },
        statusFormat:  function(value) 
		{ 
            return "Loading: " + value * 100 + "%"; 
        },
        onComplete: function(e)
		{
            inProgress = false;
            //$scope.buttonText = "Restart progress";
            e.element.addClass("complete");
        }
    };
	
		// Slider FORM 
		$scope.formItems = 
	[
		
		{
			dataField: "HiddenLayer",
			name: "HiddenLayer",
			editorType: "dxRangeSlider",
			editorOptions:
		  {
			  min: 0,
			  max: 200,
			  start: 20,
			  end: 60,
               tooltip: 
			   {
                enabled: true,
                format: function (value) 
				{
                    return value;
                },
                showMode: "always"
               },
			    label: 
				{
                 visible: true,
                 format: function(value) 
				 {
                    return value;
				 },
                 position: "top"
                },
				validationRules: 
				[{
					type: "required",
                    message: "HiddenLayer value is required"
				}]
	
             
				
		  }

		},
	 
	 
	 	 {
			 dataField: "Epoch",
			 editorType: "dxRangeSlider",
			editorOptions:
			{
			  min: 0,
			  max: 200,
			  start: 20,
			  end: 70,
				
            tooltip: {
                enabled: true,
                format: function (value) 
				{
                    return value;
                },				    
                showMode: "always"
				
            },
			 label: 
			 {
                visible: true,
                format: function(value) 
				{
                    return value;
                },
                position: "top"
            }
			
        
	}
	 },
	 
	 {
			 dataField: "CutOff",
			 editorType: "dxRangeSlider",
			editorOptions:
		{
			  min: 0,
			  max: 200,
			  start: 30,
			  end: 80,
				
					tooltip: 
				{
					enabled: true,
					format: function (value) 
					{
                      return value;
                    },
			
                  showMode: "always"
                },
			   label: 
			{
                visible: true,
                format: function(value) 
				{
                    return value;
                },
                position: "top"
            }
			    
        
	   }
     }
		
		
	]
	
	$scope.valueForm = 
		{
                alignItemLabels: true,
                bindingOptions: 
				{
                    formData: "Layer1",
                   items: "formItems",
					'items[0].editorOptions.min':'startValue1',
					'items[0].editorOptions.max':'endValue1',
					'items[1].editorOptions.min':'startValue2',
					'items[1].editorOptions.max':'endValue2',
					'items[2].editorOptions.min':'startValue3',
					'items[2].editorOptions.max':'endValue3'				
                },
				//items: $scope.formItems,
				onFieldDataChanged:function(e)
				{
					//console.log(e.component.option('formData'));
					//console.log($scope.Layer1);					
				},
				
                colCount: 1,
                labelLocation: 'left',
                readOnly: false,
                visible: true,
        };
		
	// HL
    $scope.numberBox1 = 
	{
        startValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "startValue1"
            },
			onValueChanged:function(e)
			{
			 //console.log($scope.startValue1);	
			}
        },
        endValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "endValue1"
            }
        }
    };
	
	// Epochs
	$scope.numberBox2 = 
	{
        startValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "startValue2"
            }
        },
        endValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "endValue2"
            }
        }
    };
	
		// Peak
	$scope.numberBox3 = 
	{
        startValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "startValue3"
            }
        },
        endValue: 
		{
            showSpinButtons: true,
            bindingOptions: 
			{ 
                value: "endValue3"
            }
        }
    };
	
    // File upload action
    $scope.options = 
	{
		//uploadUrl: " http://35.185.42.222:8085/fup",
		onUploaded: function (e) 
	   {
					//$scope.Layer1.fileData = e.file.name;
					//console.log($scope.Layer1);
                   //   console.log(e);                     
                    var reader = new FileReader();
                    reader.onload = function (event) 
					{
						//console.log(event);
						//$scope.Layer1.fileData = $.csv.toObjects(reader.result); // file content in objects
						$scope.Layer1.fileData = (reader.result); // raw file content
						
						//console.log();
                    };
                 reader.readAsText(e.file);
				 file = e.file;
				 
				// return file;
				// Doing http post of the File
				//var fd = new FormData();
				//Take the first selected file
				//fd.append("file", file);
				//fd.append("low_hl", $scope.Layer1.HiddenLayer[0]);
				//fd.append("up_hl", $scope.Layer1.HiddenLayer[1]);
				//fd.append("low_ep", $scope.Layer1.Epoch[0]);
				//fd.append("up_ep", $scope.Layer1.Epoch[1]);
				//fd.append("low_rat", $scope.Layer1.CutOff[0]);
				//fd.append("up_rat", $scope.Layer1.CutOff[1]);
				//var url = 'http://35.185.42.222:8085/fup';
				//ser = $sce.trustAsResourceUrl(url);
				
				// Testing File http post.
		/*  	$http({
                    method: 'POST',
					data : fd,
					//processData: false,  // tell jQuery not to process the data
					//contentType: false,  // tell jQuery not to set contentType
                     url: ser,
					//data: file,
					//file: file,
					transformRequest: angular.identity,
                    headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Headers': 'Content-Type'
                             }
					
                })
                .then(function successCallback(response) {
						//console.log(data);
						//$window.open('Works', '_blank');
						$window.alert(response);
						//console.log(response);
                },
                function errorCallback(response) {
						$window.alert("Failed");
						console.log(response);
                });      */
              
       },
        bindingOptions: 
		{
            accept: "accept",
            value: "value"
        }
    };
    // File format 
    $scope.acceptOptions = 
	{
        dataSource: [
            {name: "All types", value: "*"}, 
            {name: "CSV", value: ".csv"}
        ],
        valueExpr: "value",
        displayExpr: "name",
        bindingOptions: 
		{
            value: "accept"
        }
    };
	

	
	 // Submit Action
	 $scope.onSubmit = 
	 {
		
		type: 'success',
		useSubmitBehavior: true,
		onClick: function(e)
		{
			//console.log($('#form1').dxForm('instance').option('formData')); // form data
			//res = submit_url + "?file=" + $scope.Layer1.fileData + "&low_hl=" + $scope.Layer1.HiddenLayer[0] + "&up_hl=" + $scope.Layer1.HiddenLayer[1] + "&low_ep=" + $scope.Layer1.Epoch[0] + "&up_ep=" + $scope.Layer1.Epoch[1] + "&low_rat=" + $scope.Layer1.CutOff[0] + "&up_rat=" + $scope.Layer1.CutOff[1]; // result
			
			// Result URL. 
			// $scope.Layer1.fileData under work.
			res = submit_url + "?file=" + file + "&low_hl=" + $scope.Layer1.HiddenLayer[0] + "&up_hl=" + $scope.Layer1.HiddenLayer[1] + "&low_ep=" + $scope.Layer1.Epoch[0] + "&up_ep=" + $scope.Layer1.Epoch[1] + "&low_rat=" + $scope.Layer1.CutOff[0] + "&up_rat=" + $scope.Layer1.CutOff[1]; // result
			//console.log(file);
			//console.log(res);
			// Testing Http
		
				var fd = new FormData();
				//Take the first selected file
				fd.append("file", file);
				fd.append("low_hl", $scope.Layer1.HiddenLayer[0]);
				fd.append("up_hl", $scope.Layer1.HiddenLayer[1]);
				fd.append("low_ep", $scope.Layer1.Epoch[0]);
				fd.append("up_ep", $scope.Layer1.Epoch[1]);
				fd.append("low_rat", $scope.Layer1.CutOff[0]);
				fd.append("up_rat", $scope.Layer1.CutOff[1]);
				var api_url = 'http://35.185.42.222:8085/fup';
				ser = $sce.trustAsResourceUrl(api_url);
				//console.log(ser);
				//console.log(fd);
           $http({
                    method: 'POST',
                    url: api_url,
					data : fd,
                    headers: {'Content-Type': 'multipart/form-data'}
					
                })
                .then(function successCallback(response) 
				{
					
						//console.log(data);
						var response_url = "http://35.185.42.222:8085/getstat";
						$window.open(response_url, '_blank');
						DevExpress.ui.notify({
			
						message: "You have submitted the form",
						position: 
						{
							my: "center top",
							at: "center top"
						}
          }, "success", 3000);
						//$window.alert(response);
                },
                function errorCallback(response) 
				{
						alert("error posting"); 
					    $window.open('error.html', '_blank');
                });
				
				return false; // Progress bar won't run if false.

                
             
			
			//getProgressResult();
			
			
		    $("#progressBarStatus").removeClass("complete");
            if (inProgress) 
			{
                //$scope.buttonText = "Continue progress";
                clearInterval(intervalId);
            } else 
			{
                //$scope.buttonText = "Stop progress";
                setCurrentStatus();
                intervalId = setInterval(timer, 1000);
            }
            inProgress = !inProgress;  
			
			DevExpress.ui.notify({
			
            message: "You have submitted the form",
            position: 
			{
                my: "center top",
                at: "center top"
            }
          }, "success", 3000);
		  //e.preventDefault();
		}
		
		 
	 };
	
	    function setCurrentStatus() 
		{
         $scope.progressBarValue = (10 - seconds) * 10;
         $("#timer").text(("0" + seconds).slice(-2));
        }
	
	    function timer() 
	   {
          seconds--;
          $scope.$apply(function() 
		  {
            setCurrentStatus();
          });
         if(seconds === 0) 
		 {
            clearInterval(intervalId);
            seconds = 10;
            return;
         }
       }  
	

	
	
	
    
    
}]);