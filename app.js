var notesApp = angular.module("notesApp", []);
notesApp.controller("MainCtrl", [function() {
    
    console.log("In MainCtrl");
    
    var self = this;
    self.tab = 'first';
    
    self.open = function(tab) {
        self.tab = tab;   
    };
}]);

notesApp.controller("SubCtrl", ['$log', 'ItemService', '$location',function($log, ItemService, $location){
    
    console.log("In SubCtrl");
    
    var self = this;

    
    self.list = function() {

        return ItemService.list();
    };
    
    
    self.add = function() {
        
        ItemService.add({
                id : self.list().length+1,
                label : 'Item ' + (self.list().length + 1)
            });
        
        //Log this - added new item
        $log.log("Added new Item");
        $log.log($location.absUrl());
    };

}]);

notesApp.factory("ItemService", [function() {

    var items = [{ id: 1, label: "Item 1"}, { id: 2, label: "Item 2"}];
    
    return {
        list : function() {
            return items;
        },
        add : function(item) {
            items.push(item);   
        }
    };
}]);