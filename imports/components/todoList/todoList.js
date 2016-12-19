import angular from "angular";
import angularmeteor from "angular-meteor";

import {Tasks} from "../../api/tasks.js";
import template from "./todoList.html";

class todoListCtrl{
    constructor($scope){
        $scope.viewModel(this);
        this.helpers({
            tasks(){
                return Tasks.find({});
            }
        })

    }

    addTask(newTask){
        Tasks.insert({
            text :newTask,
                    date :Date()
        });

        this.newTask='';
    }

    removeTask(task){
        Tasks.remove(task._id);
        this.task ='';
    }

    setTask(task){
        Tasks.update(task._id,{
            $set:{
                checked : !task.checked
            },
        })
    }
}



export default angular.module('todoList',[angularmeteor])
.component('todoList',{
    templateUrl :template,
    controller:['$scope',todoListCtrl]
});