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

function IndexOutOfRangeException(){
	this.name = "IndexOutOfRangeException";
	this.message = "Error: The Index is out of range.";
}
IndexOutOfRangeException.prototype = new ListException();
IndexOutOfRangeException.prototype.constructor = IndexOutOfRangeException;

function EmptyIndexException(){
	this.name = "EmptyIndexException";
	this.message = "Error: The index is already empty."
}
EmptyIndexException.prototype = new ListException();
EmptyIndexException.prototype.constructor = EmptyIndexException;

/* Page functions */

var personlist = new PersonList;

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

function removeByPerson(name, surname){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.removePerson(new Person(name, surname));
	 	list.innerHTML = personlist.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

function setPerson(name, surname, index){
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
	 	personlist.set(new Person(name, surname), index);
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
		if (!this.isFull()){
			list.push(elem);
		} else {
			throw new FullListException();
		}
		return this.size();
	} 

	this.addAt = function(elem,index){
		index = parseInt(index);
		if (index > list.length) {
			throw new IndexOutOfRangeException();
		}
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		if (!this.isFull()){
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
			throw new ValueIsNaNException(index);
		}
		if (index > list.length) {
			throw new IndexOutOfRangeException();
		}
		if (!this.isEmpty()){ 			
			elem = list[index];
		} else {
			throw new EmptyListException();
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
			if (!this.isEmpty()){
				position = list.findIndex(i => (i.name === elem.name && i.surname === elem.surname));		 		
			} 	
		 else{
			throw new EmptyListException();
		}
		return position;
	} 

	this.lastIndexOf = function(elem){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		var position = -1;
			if (!isEmpty(list)){
				position = list.lastIndexOf(elem);		 		
			} 	
		 else{
			throw new EmptyListException();
		}
		return position;
	} 

	this.capacity = function(){
		return MAX_ELEM_LIST;
	} 

	this.clear = function(){
		if (!this.isEmpty()){
			list.splice(0, list.length);		 		 		
		} 	
	} 

	this.firstElement = function(){
		var first;
		if (!this.isEmpty()){
			first = list[0]; 		
		} else {
			throw new EmptyListException();
		}
		return first;
	} 

	this.lastElement = function(){
		var last;
		if (!this.isEmpty()){
			last = list[list.length-1]; 		
		} else {
			throw new EmptyListException();
		}
		return last;
	} 

	this.remove = function(index){
		index = parseInt(index);
		var elem;
		if (isNaN(index)) {
			throw new ValueIsNaNException(index);
		}
		if (this.isEmpty()){
			throw new EmptyListException();
		}
		if (index > list.length) {
			throw new IndexOutOfRangeException();
		}
		else if (list[index] instanceof Person) {
			elem = list[index];
			list.splice(index, 1);
		} else {
			throw new EmptyIndexException();
		}
		return elem;
	}


	this.removePerson = function(elem){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		var elem;
		if (this.isEmpty()){
			throw new EmptyListException();
		}
		else {
			var position = -1;
			position = this.indexOf(elem);
			if(position !== -1){
				this.remove(position);
			}
		}
		return position;
	}

	this.set = function(elem, index){
		if(!(elem instanceof Person)){
			throw new InvalidValueException(elem);
		}
		var temp;
		if (isNaN(index)) {
			throw new ValueIsNaNException(index);
		}
		if (this.isEmpty()){
			throw new EmptyListException();
		}
		if (index > list.length) {
			throw new IndexOutOfRangeException();
		}
		if (list[index] instanceof Person) {
			temp = list[index];
			list[index] = elem;
		} else {
			throw new EmptyIndexException();
		}
		return temp;
	}

}



 function testlist(){
 	//var list = create (); 	
 	var list=[]; 	
 	console.log ("Capacidad: " + personlist.capacity());
 	console.log("Es vacía: " + personlist.isEmpty());
 	console.log("Longitud: " + personlist.size());

 	try {
	 	for (var i=0; i<personlist.capacity(); i++){
	 		console.log("Nº de elementos: " + personlist.add(new Person("Persona nº",""+i*10)));
	 	}
	 	personlist.add(new Person("Persona","Personez")); //It will generate an exception.
 	} catch (err) {
 		console.log(err);
 	}

 	console.log ("The full list: " + personlist.toString());	 	
 	console.log ("The first element list: " + personlist.firstElement());
 	console.log ("The last element list: " + personlist.lastElement());

 	console.log ("is 40 in list: " + personlist.indexOf(new Person("Persona nº",""+40)));	 	
 	console.log ("is -40 in list: " + personlist.indexOf(new Person("Persona nº",""-40)));		 	
 	//clear(list);

 	try {
	 	while (true){
			console.log ("Unnonsumed Element: " + personlist.firstElement());
			console.log ("Consumed Element: " + personlist.remove(0));
			console.log ("The list: " + personlist.toString());	 	 		 	
	 	}
 	} catch (err) {
 		console.log(err); //When the list is empty, an exception will be catched.
 	}

 	console.log ("The list: " + personlist.toString());	 	
 } 
window.onload = testlist;
