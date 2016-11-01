var notesApp = angular.module("notesApp", []);
notesApp.controller("MainCtrl", [function() {
    
    console.log("In MainCtrl");
    
    var self = this;
    self.tab = 'first';
    
    self.open = function(tab) {
        self.tab = tab;   
    };
}]);

notesApp.controller("SubCtrl", ['$log', 'ItemServiceSvc', '$location',function($log, itemServiceFactory, $location){
    
    console.log("In SubCtrl");
    
    var self = this;

    
    self.list = function() {

        return itemServiceFactory.list();
    };
    
    
    self.add = function() {
        
        itemServiceFactory.add({
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

function ItemServiceFactoryFn() {

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

//Registering factory function
notesApp.factory("ItemServiceFactory", [ItemServiceFactoryFn]);


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

//Registering the service 
notesApp.service("ItemServiceSvc",[ItemServiceSvcFn]);


