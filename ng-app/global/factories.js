AppEHR = angular.module('AppEHR');

AppEHR.factory("AUTH", function ($resource) {
    return $resource(serverPath + 'user_login', {email: '@email', password: '@password'}, {
        get: {method: 'POST'}
    });
});
AppEHR.factory("PatientInformation", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'},
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistration = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        },
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistration;
});
AppEHR.factory("PatientRegistrationAddress", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_address', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("PatienPlanSaveData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_plan', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationAddress = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationAddress;
});
AppEHR.factory("PatientRegistrationKin", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_kin', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationKin = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("GetArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_archives', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("SaveFiles", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_patient_archive', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("GetResourcesByFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'list_resources', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("DeleteFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'delete_patient_resources', params, {
            get: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("RemoveArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'remove_patient_archive', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("EditArchives", function ($resource) { // edit filename
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_archive', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("EditFolderArchives", function ($resource) { // edit folder
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'update_patient_resources', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("AddFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'add_resources', params, {
            save: {method: 'POST'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        save:function(params,body,success) {
          var res = getResource(params, body);
          return res.save(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("ListFolderArchives", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath +  'list_patient_resources', params, {
            get: {method: 'GET'},
        });
        return res2;
    }
    var patientRegistrationKin = {
        get:function(params,body,success) {
          var res = getResource(params, body);
          return res.get(params,body,success);
        }
    };
    return patientRegistrationKin;
});
AppEHR.factory("AddEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var addEncounter = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return addEncounter;
});
AppEHR.factory("GetVisits", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_visits', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetPatientAllData", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_all_data', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientRegistrationEmployer", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_employees', params, {
            save: {method: 'POST'},
            update: {method: 'PUT'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        },
        update: function (params, body, success) {
            var res = getResource(params, body);
            return res.update(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetPatientInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetEncountersByPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_visit_list', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllEncounters", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_visit_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("CheckOut", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_visit_status', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("PatientDemographics", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_demographics', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("UpdateEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_visit', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetOneEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'visit_details', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("RemoveEncounter", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'remove_visit', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("AddVitals", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'add_patient_vitals', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("RemoveAllergy", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'delete_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("Countries", function ($resource) {
    return $resource(serverPath + 'get_countries', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("States", function ($resource) {
    return $resource(serverPath + 'get_states', {token: '@token', country_id: '@country_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("City", function ($resource) {
    return $resource(serverPath + 'get_cities', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("GetLocalGovermentArea", function ($resource) {
    return $resource(serverPath + 'get_local_goverment_area', {token: '@token', state_id: '@state_id'}, {
        get: {method: 'GET'}
    });
});
AppEHR.factory("DropDownData", function ($resource) {
    return $resource(serverPath + 'get_dropdowndata', {token: '@token'}, {
        get: {method: 'GET'}
    });
});
AppEHR.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                    .success(function () {
                        console.log("here");
                    })
                    .error(function () {
                        console.log("failed");
                    });
        }
    }]);
AppEHR.factory("GetPatientMedications", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_medications', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetVitalsInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_patient_vital_history', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetSupplements", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_supplements', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'patient_allergies', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("UpdateAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllPatients", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_patients', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});
AppEHR.factory("GetAllLabOrders", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_lab_orders', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabOrders = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabOrders;
});
AppEHR.factory("getLabOrderInfo", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_lab_order', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var LabOrder = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return LabOrder;
});




AppEHR.factory("UpdateAllergies", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_patient_allergies', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var patientRegistrationEmployer = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return patientRegistrationEmployer;
});

AppEHR.factory("GetAllInventory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_all_patients', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var InventoryLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return InventoryLists;
});

AppEHR.factory("GetAllSuppliers", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_suppliers', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var SupplierLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return SupplierLists;
});


AppEHR.factory("GetAllCategories", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_category', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var CategoryLists = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return CategoryLists;
});

AppEHR.factory("AddCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'create_inventory_category', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddCategory;
});



AppEHR.factory("AddSupplier", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'create_inventory_supplier', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var AddCategory = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return AddCategory;
});


AppEHR.factory("UpdateSupplier", function ($resource) {

    function getResource(params, body) {
        var res2 = $resource(serverPath + 'update_inventory_supplier', params,{
            save: {method: 'POST'}
        });
        return res2;
    }
    var UpdateSupplier = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return UpdateSupplier;
});



AppEHR.factory("GetSingleSupplier", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_single_supplier', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Supplier = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Supplier;
});

AppEHR.factory("GetSingleCategory", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'get_inventory_single_category', params, {
            get: {method: 'GET'}
        });
        return res2;
    }
    var Categories = {
        get: function (params, body, success) {
            var res = getResource(params, body);
            return res.get(params, body, success);
        }
    };
    return Categories;
});







AppEHR.factory("cancelLabOrder", function ($resource) {
    function getResource(params, body) {
        var res2 = $resource(serverPath + 'cancel_lab_order', params, {
            save: {method: 'POST'}
        });
        return res2;
    }
    var cancelOrder = {
        save: function (params, body, success) {
            var res = getResource(params, body);
            return res.save(params, body, success);
        }
    };
    return cancelOrder;
});