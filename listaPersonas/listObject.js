"use strict";

/*Generic exception */
function ListException(){
	this.name = "ListException";
	this.message = "Error: List Exception.";
}
ListException.prototype = new BaseException();
ListException.prototype.constructor = ListException;

function EmptyListException(){
	this.name = "EmptyListException";
	this.message = "Error: The List is empty.";
}
EmptyListException.prototype = new ListException();
EmptyListException.prototype.constructor = EmptyListException;

function FullListException(){
	this.name = "FullListException";
	this.message = "Error: The List is full.";
}
FullListException.prototype = new ListException();
FullListException.prototype.constructor = FullListException;

/* Page functions */

var personlist = new PersonList;

 /*var NUMBERS_LIST = create(); function cleanData(){
 	document.getElementById ("num").value = "" ;  
 }*/

function addPerson(name, surname){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
		personlist.add(new Person(name, surname));
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}	
}

function addPersonAtPosition(name, surname, index){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.addAt(new Person(name, surname), index);
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}	
}

function removeIndex(index){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.remove(index);
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

function removeByElement(num){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.removeElement(num);
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

function setNumber(num, index){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.set(num, index);
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

/*Person Object */
function Person(name, surname){
	this.name= name || "";
	this.surname= surname || "";
}

Person.prototype.toString = function personToString(){
	var retorno = "Persona: " + this.name + " " + this.surname + ". ";
	return retorno;
}

/*Object */
function PersonList(){
	var list = [];
 	var MAX_ELEM_LIST = 5; 

 	this.isEmpty = function(){
		return (list.length === 0);
	} 

	this.isFull = function(){
		return (list.length === MAX_ELEM_LIST);
	} 

	this.size = function(){
		return list.length;
	} 

	this.add = function(elem){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		if (!this.isFull(list)){
			list.push(elem);
		} else {
			throw new FullListException();
		}
		return this.size();
	} 

	this.addAt = function(elem,index){
		index = parseInt(index);
		if (index > list.length) {
			throw "The index is out of range";
		}
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		if (!this.isFull(list)){
			list.splice(index, 0, elem);
		} else {
			throw FullListException();
		}
		return this.size();
	} 

	this.get = function(index){
		index = parseInt(index);
		var elem = 0;
		if (isNaN(index)) {
			throw "The index is not a number";
		}
		if (index > list.length) {
			throw "The index is out of range";
		}
		if (!isEmpty(list)){ 			
			elem = list[index];
		} else {
			throw "The list is empty. You can't get any element";
		} 	
		return elem;
	} 

	this.toString = function(){
		var str = "";
		if (!this.isEmpty()){
			for (var i=0; i<list.length-1;i++){
				str = str + list[i] + " - ";
			} 		 		
			str = str + list[i]; 		
		} 	
		return str;
	} 

	this.indexOf = function(elem){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		var position = -1;
		if (!isNaN(elem)) {
			if (!isEmpty(list)){
				position = list.indexOf(elem);		 		
			} 	
		} else{
			throw "The element is not a number";
		}
		return position;
	} 

	this.lastIndexOf = function(list,elem){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		var position = -1;
		if (!isNaN(elem)) {
			if (!isEmpty(list)){
				position = list.lastIndexOf(elem);		 		
			} 	
		} else{
			throw "The element is not a number";
		}
		return position;
	} 

	this.capacity = function(list){
		return MAX_ELEM_LIST;
	} 

	this.clear = function(list){
		var elem = Number.NaN;
		if (!isEmpty(list)){
			list.splice(0, list.length);		 		 		
		} 	
	} 

	this.firstElement = function(list){
		var first;
		if (!isEmpty(list)){
			first = list[0]; 		
		} else {
			throw "The list is empty.";
		}
		return first;
	} 

	this.lastElement = function(list){
		var last;
		if (!isEmpty(list)){
			last = list[list.length-1]; 		
		} else {
			throw "The list is empty.";
		}
		return last;
	} 

	this.remove = function(list,index){
		index = parseInt(index);
		var elem;
		if (isNaN(index)) {
			throw "The index is not a number";
		}
		if (isEmpty(list)){
			throw "The list is Empty. You can't remove any element in it";
		}
		if (index > list.length) {
			throw "The index is out of range";
		}
		else if (!isNaN(list[index])) {
			elem = list[index];
			list.splice(index, 1);
		} else {
			throw "The index is already empty";
		}
		return elem;
	}


	this.removeElement = function(list,elem){
		elem = parseInt(elem);
		var elem;
		if (isNaN(elem)) {
			throw "The elem is not a number";
		}
		if (isEmpty(list)){
			throw "The list is Empty. You can't remove any element in it";
		}
		else {
			var position = -1;
			position = list.indexOf(elem);
			if(position !== -1){
				remove(list, position);
			}
		}
		return position;
	}

	this.set = function(list, elem, index){
		index = parseInt(index);
		elem = parseInt(elem);
		var temp;
		if (isNaN(elem)) {
			throw "The elem is not a number";
		}
		if (isNaN(index)) {
			throw "The index is not a number";
		}
		if (isEmpty(list)){
			throw "The list is Empty. You can't set any element in it";
		}
		if (index > list.length) {
			throw "The index is out of range";
		}
		if (!isNaN(list[index])) {
			temp = list[index];
			list[index] = elem;
		} else {
			throw "The index is already empty";
		}
		return temp;
	}

}



 function testlist(){
 	//var list = create (); 	
 	var list=[]; 	
 	console.log ("Capacidad: " + capacity(list));
 	console.log("Es vacía: " + isEmpty(list));
 	console.log("Longitud: " + size(list));

 	try {
	 	for (var i=0; i<MAX_ELEM_LIST; i++){
	 		console.log("Nº de elementos: " + add(list,i*10));
	 	}
	 	add(list,i); //It will generate an exception.
 	} catch (err) {
 		console.log(err);
 	}

 	console.log ("The full list: " + toString(list));	 	
 	console.log ("The first element list: " + firstElement(list));
 	console.log ("The last element list: " + lastElement(list));

 	console.log ("is 40 in list: " + indexOf(list,40));	 	
 	console.log ("is -40 in list: " + indexOf(list,-40));		 	
 	//clear(list);

 	try {
	 	while (true){
			console.log ("Unnonsumed Element: " + firstElement(list));
			console.log ("Consumed Element: " + remove(list, 0));
			console.log ("The list: " + toString(list));	 	 		 	
	 	}
 	} catch (err) {
 		console.log(err); //When the list is empty, an exception will be catched.
 	}

 	console.log ("The list: " + toString(list));	 	
 } 
window.onload = testlist;
