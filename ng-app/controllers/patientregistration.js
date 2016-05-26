var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$rootScope', '$scope', '$window', 'Countries', 'States', 'GetLocalGovermentArea', 'City', 'DropDownData', 'PatientRegistration', function ($rootScope, $scope, $window, Countries, States, GetLocalGovermentArea, City, DropDownData, PatientRegistration) {
    $rootScope.pageTitle = "EHR - Patient Registration";
    $scope.PI = {};
    $scope.contactAddressCountries = [];
    $scope.permanentAddressCountries = [];
    $scope.addressContactCities = [];
    $scope.addressPerminentCities = [];
    $scope.nextOfKinCountries = [];
    $scope.contactAddressStates = [];
    $scope.permanentAddressStates = [];
    $scope.patientInfolocalGovtArea = [];
    $scope.addresslocalGovtArea = [];
    $scope.employerCountries = [];
    $scope.nextOfKinCities = [];
    $scope.nextOfKinStates = [];
    $scope.employerStates = [];
    $scope.employerCities = [];
    $scope.dropDownData = [];
    $scope.isDisabled = false;
    $scope.sameAsAbove = true;
    $('.hidePermanentAddress').slideUp(500);
    $scope.dropDownInfo = dropDownInfo;
    //$scope.PI.identity_type = dropDownInfo.IdType[0].id;
    //$scope.PI.kin_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.dependant_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.principal_relationship = dropDownInfo.relationship[0].id;
    //$scope.PI.nhis_principal_relationship = dropDownInfo.relationship[0].id;

    $scope.validateEmail = function (email) { 
        var re = /^(([^<>()[\]\\.,;:+-\s@\"]+(\.[^<>()[\]\\.,;:+-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    Countries.get({token: $window.sessionStorage.token}, countrySuccess, countryFailed);

    function countrySuccess(res){
    	if(res.status ==  true){
    		angular.copy(res.data, $scope.contactAddressCountries);
    		angular.copy(res.data, $scope.permanentAddressCountries);
    		angular.copy(res.data, $scope.nextOfKinCountries);
    		angular.copy(res.data, $scope.employerCountries);
    		//$scope.PI.patient_country = $scope.contactAddressCountries[0].id;
    		//$scope.PI.permanent_country = $scope.permanentAddressCountries[0].id;
    		//$scope.PI.nextOfKinCountries = $scope.nextOfKinCountries[0].id;
    		//$scope.PI.employerCountries = $scope.employerCountries[0].id;
    	}else{
    		console.log(res);
    	}
    }

    function countryFailed(error){
    	console.log(error);
    }

	DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailed);

	function dropDownSuccess(res) {
		if(res.status == true){
			angular.copy(res.data, $scope.dropDownData);
    		//$scope.PI.maritial_status = $scope.dropDownData.maritial_status[0].id;
    		//$scope.PI.religion = $scope.dropDownData.religion[0].id;
    		//$scope.PI.nationality = $scope.dropDownData.nationality[0].id;
    		//$scope.PI.blood_group = $scope.dropDownData.blood_group[0].id;
    		//$scope.PI.language = $scope.dropDownData.language[0].id;
		/*	$scope.PI = {martial_status : $scope.dropDownData.maritial_status[0].name};
			console.log($scope.dropDownData.maritial_status[0].name);
			console.log($scope.PI.martial_status);*/
		}
	}

	function dropDownFailed(error) {
		console.log(error);
	}
    // Address
    $scope.addressStateByCountry = function(id, flag){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, stateSuccess, stateFailed);
    	}else{
			if(flag){
				$scope.PI.permanent_country = "null";
				$scope.PI.permanent_state = "null";
    			$scope.permanentAddressStates = [];
    			$scope.addressPerminentCities = [];
    			$scope.PI.permanent_city = 'null';
    		}else{
    			$scope.addressContactCities = [];
    			$scope.PI.patient_city = "null";
    			$scope.PI.patient_state = "null";
    			$scope.contactAddressStates = [];
    			$scope.PI.local_goverment_area = "null";
    			$scope.addresslocalGovtArea = [];
    		}
		}
    	function stateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.contactAddressStates);
    			angular.copy(res.data, $scope.permanentAddressStates);
    			//$scope.PI.patient_state = $scope.contactAddressStates[0].id;
    			//$scope.PI.permanent_street = $scope.permanentAddressStates[0].id;
	    	}/*else{
	    		
	    	}*/
	    }
	    function stateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.addressLocalGovtAreaByStates = function(state, flag){
    	console.log(state);
    	if(state != "null"){
    		GetLocalGovermentArea.get({token: $window.sessionStorage.token, state_id: state}, LGASuccess, LGAFailed);
    		City.get({token: $window.sessionStorage.token, state_id: state}, citySuccess, cityFailed);
    		function LGASuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.patientInfolocalGovtArea);
    				angular.copy(res.data, $scope.addresslocalGovtArea);
    			}else{
    				console.log(111);
    			}
    		}
    		function LGAFailed(error){
    			console.log(error);
    		}

    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.addressContactCities);
    				angular.copy(res.data, $scope.addressPerminentCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			if(flag){
				$scope.PI.patient_local_goverment_area = "null";
    			$scope.patientInfolocalGovtArea = [];
    		}else{
    			$scope.PI.local_goverment_area = "null";
    			$scope.addresslocalGovtArea = [];
    		}
    	}
    }

    // Next of Kin
    $scope.nextOfKinStateByCountry = function(id){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, nextOfKinStateSuccess, nextOfKinStateFailed);
    	}else{
			$scope.PI.kin_state = "null";
			$scope.nextOfKinStates = [];
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
		}
    	function nextOfKinStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.nextOfKinStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function nextOfKinStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.nextOfKinCityByStates = function(states){
    	console.log(states);
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.nextOfKinCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.kin_city = "null";
			$scope.nextOfKinCities = [];
    	}
    };

    // Employer
    $scope.employerStateByCountry = function(id){
    	if(id != "null"){
			States.get({token: $window.sessionStorage.token, country_id: id}, employerStateSuccess, employerStateFailed);
    	}else{
			$scope.PI.employer_state = "null";
			$scope.employerStates = [];
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
		}
    	function employerStateSuccess(res){
	    	if(res.status ==  true && res.data.length > 0){
	    		angular.copy(res.data, $scope.employerStates);
	    	}/*else{
	    		
	    	}*/
	    }
	    function employerStateFailed(error){
	    	console.log(error);
	    }
    };

    $scope.employerCityByStates = function(states){
    	console.log(states);
    	if(states != "null"){
    		City.get({token: $window.sessionStorage.token, state_id: states}, citySuccess, cityFailed);
    		function citySuccess(res){
    			if(res.status == true && res.data.length > 0){
    				console.log(res);
    				angular.copy(res.data, $scope.employerCities);
    			}else{
    				console.log(111);
    			}
    		}
    		function cityFailed(error){
    			console.log(error);
    		}
    	}else{
			$scope.PI.employer_city = "null";
			$scope.employerCities = [];
    	}
    };

    // Permanent Address checkbox
    $scope.isChecked = function(checked){
    	if(checked){
    		$('.hidePermanentAddress').slideUp(500);
    		//$scope.isDisabled = true;
    	}else{
    		//$scope.isDisabled = false;
    		$('.hidePermanentAddress').slideDown(500);
    	}
    };

    $scope.submit = function(itemsToBeAdded){
    	console.log($scope.PI);
    	if($scope.sameAsAbove == false){
	    	itemsToBeAdded.permanent_phonenumber = '';
	    	itemsToBeAdded.permanent_mobilenumber = '';
	    	itemsToBeAdded.permanent_email = '';
	    	itemsToBeAdded.permanent_housenumber = '';
	    	itemsToBeAdded.permanent_street = '';
	    	itemsToBeAdded.permanent_country = '';
	    	itemsToBeAdded.permanent_state = '';
	    	itemsToBeAdded.permanent_postalCode = '';
	    	itemsToBeAdded.permanent_city = '';
	    }
    	PatientRegistration.save({
    		token: $window.sessionStorage.token,
    		patient_unit_number: $scope.PI.patient_unit_number,
    		first_name: $scope.PI.first_name,
    		middle_name: $scope.PI.middle_name,
    		last_name: $scope.PI.last_name,
    		date_of_birth: $scope.PI.date_of_birth,
    		age: $scope.PI.age,
    		martial_status: $scope.PI.maritial_status,
    		patient_local_goverment_area: $scope.PI.patient_local_goverment_area,
    		religion: $scope.PI.religion,
    		identity_type: $scope.PI.identity_type,
    		identity_number: $scope.PI.identity_number,
    		patient_state: $scope.PI.patient_state,
    		tribe: $scope.PI.tribe,
    		language: $scope.PI.language,
    		nationality: $scope.PI.nationality,
    		blood_group: $scope.PI.blood_group,
    		father_firstname: $scope.PI.father_firstname,
    		father_middlename: $scope.PI.father_middlename,
    		father_lastname: $scope.PI.father_lastname,
    		mother_firstname: $scope.PI.mother_firstname,
    		mother_middlename: $scope.PI.mother_middlename,
    		mother_lastname: $scope.PI.mother_lastname,
    		refered_name: $scope.PI.refered_name
    	}, registrationSuccess, registrationFailed);
    	function registrationSuccess(res){
    		if(res.states ==  true){
    			alert("Hola!");
    		}else{
    			console.log(res);
    		}
    	}
    	function registrationFailed(error){
    		alert(error);
    		console.log(error);
    	}
    };
    
}]);
