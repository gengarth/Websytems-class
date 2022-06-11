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
	  
	     document.getElementById("wordSearchTable").onmouseup = function() {
         endChecker();
         var wordList = document.querySelectorAll("ul#wordSearchList li");
         var solved = true;
         for (var i = 0; i < wordList.length; i++) {
            if (wordList[i].style.textDecoration !== "line-through") {
               solved = false;
               break;
            }
         }
         if (solved) {
            alert("You solved the puzzle!");
         }
      };
document.getElementById("showSolution").addEventListener("mousedown", showSolution);

	
   
}

function startChecker(e) {
      document.getElementById("pickedLetters").value += e.target.textContent;
      if (e.target.style.backgroundColor != "green") {
         e.target.style.backgroundColor = "pink";
      }
      for (var i = 0; i < allCells.length; i++) {
         allCells[i].addEventListener("mouseenter", contChecker);
      }
      e.preventDefault();
   }

function contChecker(e) {
      if (e.target.style.backgroundColor != "green") {
         e.target.style.backgroundColor = "pink";
      }
      document.getElementById("pickedLetters").value += e.target.textContent;
   }

function endChecker() {
      for (var i = 0; i < allCells.length; i++) {
         allCells[i].removeEventListener("mouseenter", contChecker);
      }
      checkLetters();
   }
   
function checkLetters() {
      var pickedLetters = document.getElementById("pickedLetters").value;
      var wordList = document.querySelectorAll("ul#wordSearchList li");
      for (var i = 0; i < wordList.length; i++) {
         if (pickedLetters == wordList[i].textContent) {
            wordList[i].style.textDecoration = "line-through";
            wordList[i].style.color = "gray";
            found = true;
         }
      }
	for (var i = 0; i < allCells.length; i++) {
			 if (allCells[i].style.backgroundColor !== "green") {
				if (allCells[i].style.backgroundColor == "pink" && found) {
				   allCells[i].style.backgroundColor = "green";
				} else {
				   allCells[i].style.backgroundColor = "";
				}
			 }
		  }
		  document.getElementById("pickedLetters").value = "";
		  found = false;
 }
 
 function showSolution(e) {
	 for (var i = 0; i < allCells.length; i++) {
            if (allCells[i].className == "wordCell") {
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
