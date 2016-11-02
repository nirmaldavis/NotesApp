var notesApp = angular.module("notesApp", []);
notesApp.controller("MainCtrl", [function() {
    
    console.log("In MainCtrl");
    
    var self = this;
    self.tab = 'first';
    
    self.open = function(tab) {
        self.tab = tab;   
    };
}]);

notesApp.controller("SubCtrl", ['$log', 'ItemServicePrvder', '$location',function($log, itemService, $location){
    
    console.log("In SubCtrl");
    
    var self = this;

    
    self.list = function() {

        return itemService.list();
    };
    
    
    self.add = function() {
        
        itemService.add({
                id : self.list().length+1,
                label : 'Item ' + (self.list().length + 1)
            });
        
        //Log this - added new item
        $log.log("Added new Item");
        $log.log($location.absUrl());
    };

}]);

//Creating a factory - functional programming style - return itself defines API contracts

//Creating a function for factory

function itemServiceFactoryFn() {

    var items = [{ id: 1, label: "Item 1"}, { id: 2, label: "Item 2"}];
    
    return {
        list : function() {
            return items;
        },
        add : function(item) {
            items.push(item);   
        }
    };
}

//Registering "factory" function
notesApp.factory("ItemServiceFactory", [itemServiceFactoryFn]);


//Creating a service - Class/OO style - new will be called by Angular before use - constructr function


//Creating a service constructor function
function ItemServiceSvcFn() {
    var items = [{id : 1, label : "Item 1"}, { id : 2, label : "Item 2"}];
    
    this.list = function() {
        return items;
    }
    
    this.add = function(item) {
        items.push(item);   
    }
}

//Registering the "service" 
notesApp.service("ItemServiceSvc",[ItemServiceSvcFn]);


//Creating a provider - can be customized in config phase

//Creating a Provider function
function ItemServiceProviderFn(optionalItems) {
    var items = optionalItems || [];
    
    this.list = function() {
        return items;
    }
    
    this.add = function(item) {
        items.push(item);   
    }
}

//Registering provider function as provider $get API
notesApp.provider("ItemServicePrvder", function(){
    var haveDefaultItems = true;
    
    this.disableDefaultItems = function() {
        haveDefaultItems = false;
    }
    
    this.$get = [ function() 
                 {
                     var optItems = [];
                     if(haveDefaultItems) {
                        optItems = [{ id : 1, label : "Item 1"}, { id : 2 , label : "Item 2" }];   
                     }
                     
                     return new ItemServiceProviderFn(optItems);
                 }];
    
});

//Config phase customization for "Provider". by convention "---Provider". Can call configuration methods exposed by the provider if needed
notesApp.config(["ItemServicePrvderProvider", function(ItemServiceProvider) {
    //Can have different configuration as need
    var shouldHaveDefaultValues = true;
    
    if(!shouldHaveDefaultValues) {
        ItemServiceProvider.disableDefaultItems();
    }

}]); 