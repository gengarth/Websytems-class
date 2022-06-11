"use strict";

/*
   
   Word Search Game Script
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
     
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array
	  
	startChecker()
		On mousedown, if focus not on a marked correct letter, changes
		letter background to pink. Calls contChecker on mouseenter.
		Prevents highlighting when mousedown
	
	contChecker()
		Continues checking and changing colors adds picked letters
		while mouse is held down
		
	endChecker()
		On mouseup event ends eventListener for contChecker
		calls checkState
		
	checkState()
		checks selected letters against list
		changes letter colors and strikes correct words
		checks for a win
		

*/

var allCells;
var found = false;

window.onload = init;

function init() {
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   document.getElementById("wordList").innerHTML = showList(wordArray);

   allCells = document.querySelectorAll("table#wordSearchTable td");

	for (var i = 0; i < allCells.length; i++) {
		allCells[i].style.cursor = "pointer";
		allCells[i].addEventListener("mousedown", startChecker);
	}
	document.getElementById("wordSearchTable").addEventListener("mouseup", endChecker)
	document.getElementById("showSolution").addEventListener("mousedown", showSolution);
}

function startChecker(e) {
	document.getElementById("pickedLetters").value += e.target.textContent;
	if (e.target.style.backgroundColor != "green") {
		e.target.style.backgroundColor = "pink";
	}
	for (var i = 0; i < allCells.length; i++) {
		allCells[i].addEventListener("mouseenter", holdChecker);
	}
	e.preventDefault();
}

function holdChecker(e) {
	if (e.target.style.backgroundColor != "green") {
		e.target.style.backgroundColor = "pink";
	}
	document.getElementById("pickedLetters").value += e.target.textContent;
}

function endChecker() {
	for (var i = 0; i < allCells.length; i++) {
		allCells[i].removeEventListener("mouseenter", holdChecker);
	}
	checkState();
}
   
function checkState(){
	var pickedLetters = document.getElementById("pickedLetters").value;
	var wordList = document.querySelectorAll("ul#wordSearchList li");
	for (var i = 0; i < wordList.length; i++) {
		if (wordList[i].textContent == pickedLetters) {
			wordList[i].style.textDecoration = "line-through";
			wordList[i].style.color = "gray";
			found = true;
		}
	}
	
	for (var i = 0; i < allCells.length; i++) {
		if (allCells[i].style.backgroundColor != "green") {
			if (allCells[i].style.backgroundColor == "pink" && found) {
				allCells[i].style.backgroundColor = "green";
			} 
			else {
				allCells[i].style.backgroundColor = null;
			}
		}
	}
	document.getElementById("pickedLetters").value = null;
	found = false;
	
	var allFound = true;
	var wordList = document.querySelectorAll("ul#wordSearchList li");
	for (var i = 0; i < wordList.length; i++) {
		if (wordList[i].style.textDecoration !== "line-through") {
			allFound = false;
			break;
		}
	}
	if (allFound == true) {
		alert("All words found! Good job");
	}
}

function showSolution(e) {
	for (var i = 0; i < allCells.length; i++) {
		if (allCells[i].className == "wordCell" && allCells[i].style.backgroundColor != "green") {
			allCells[i].style.backgroundColor = "skyblue";
		}		
	}
}

/*============================================================*/

function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
