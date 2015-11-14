var notesApp = angular.module("notesApp", []);
notesApp.controller("MainCtrl", [function() {
    
    console.log("In MainCtrl");
    
    var self = this;
    self.tab = 'first';
    
    self.open = function(tab) {
        self.tab = tab;   
    };
}]);

notesApp.controller("SubCtrl", ['$log', '$location',function($log, $location){
    
    console.log("In SubCtrl");
    
    var self = this;
    self.list = [
        { id:1, label:"Item 0"},
        { id:2, label:"Item 1"}
    ];
    self.add = function() {
        self.list.push({id:self.list.length + 1, label:"Item " +  self.list.length});
        //Log this - added new item
        $log.log("Added new Item");
        $log.log($location.absUrl());
    };

}]);