var questions = {
	q1 : {
		question: "What is the name of Linda's sister?",
		answers: ["Gayle", "Gloria", "Jocelyn", "Gretchen"],
		correctAnswer: "Gayle"
	},
	q2 : {
		question: "What is the name of the island across the water from the mainland?",
		answers: ["Kingsfisher Island", "Kings Rock Island", "Kings Head Island", "Good King Island"],
		correctAnswer: "Kings Head Island"
	},
	q3 : {
		question: "Which one of these characters is not a pesto child?",
		answers: ["Ollie", "Tammy", "Jimmy Jr.", "Andy"],
		correctAnswer: "Tammy"
	},
	q4 : {
		question: "What is the name of the school that the Belcher kids attend?",
		answers: ["Huxley", "Glencrest", "Schooner", "Wagstaff"],
		correctAnswer: "Wagstaff"
	},
	q5 : {
		question: "What is the name of the amusement park down the street from the restaurant?",
		answers: ["Fishermans Wharf", "Wonder Wharf", "Wildwood Wharf", "Dream Wharf"],
		correctAnswer: "Wonder Wharf"
	},
	q6 : {
		question: "What is the name of Linda's ex-fiance and the local health inspector?",
		answers: ["Hugo", "Mort", "Peter", "Stan"],
		correctAnswer: "Hugo"
	},
	q7 : {
		question: "What color shirt does Gene wear for the majority of the show?",
		answers: ["Red", "Blue", "Yellow", "Green"],
		correctAnswer: "Yellow"
	},
	q8 : {
		question: "Which local gang foes Louise seek help from in retrieving her ears from Logan?",
		answers: ["Two Horned Toads", "Four Toes Slothes", "Three Headed Dogs", "One Eyed Snakes"],
		correctAnswer: "One Eyed Snakes"
	},
	q9 : {
		question: "What is the name of the organization that both Tina and Louise were once a part of?",
		answers: ["Girlwinds", "Girl Scouts", "ThunderGirls", "Girl Whalers"],
		correctAnswer: "ThunderGirls"
	},
	q10 : {
		question: "Who does Louise end up sharing her first kiss with?",
		answers: ["Regualr Sized Rudy", "Jimmy Pesto", "No one", "Ollie Pesto"],
		correctAnswer: "Regualr Sized Rudy"
	}
};

// Creates array of questions for questions object.
var questionsArray = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5, questions.q6, questions.q7, questions.q8, questions.q9, questions.q10];

// Control which page is displayed.
var startPage = $("#start-page");
var questionPage = $("#question-page");
var answerPage = $("#answer-page");
var resultsPage = $("#results-page");

// More global variables.
//____________________________________________________________________________________
var questionID;
var index = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var section = "";
var timeNumber = 10
var timeIntervalID;

// Event listeners.
//____________________________________________________________________________________

// Fires when start button clicked.
function addStartClickListener() {
	$("#start").on("click", function() {
		console.log("Start button clicked");
		
		// Reset index so first question on start.
		index = 0;
		questionID = questionsArray[index];

		// Shows question page.
		showSection(questionPage);

		// Displays question and possible answers.
		displayQuestion();

		// Start question countdown.
		startTimer();

		// Reset correct answer counter.
		correctAnswers = 0;

		// Reset incorrect answers counter.
		incorrectAnswers = 0;

		// Reset unanswered counter.
		unanswered = 0;

	});
};

// Fires when answer list item selected.
function addAnswerClickListener() {
	$("li").on("click", function() {
		
		// Set selected answer to selected list item.
		selectedAnswer = $(this).html();

		// Show answer page.
		showSection(answerPage);

		// Add answer information to answer page.
		createAnswerSection(selectedAnswer);
	});
};

// When fired, returns to start page.
function addRestartClickListener() {
	$("#restart").on("click", function() {
		showSection(startPage);
	});
};

// Functions
//_____________________________________________________________________________________

// Displays only one active page.
function showSection(section) {
	startPage.css({'display' : 'none'});
	questionPage.css({'display' : 'none'});
	answerPage.css({'display' : 'none'});
	resultsPage.css({'display' : 'none'});

	if (section) {
		section.css({'display' : 'block'});
	}
};

// Displays question and list of possible answers in DOM.
function displayQuestion() {
	$("#question").html(questionID.question);

	// Displays question's possible answers.
	displayQuestionAnswers();
};

// Starts timer on question page.
function startTimer() {
	timeIntervalID = setInterval(decrement, 1000);
};

// Decrements time on question page.
function decrement() {
	timeNumber--;

	//  Show time in time span.
     $(".time").html(timeNumber);

     // If time runs out, set question to unanswered.
     if (timeNumber === 0) {
     	setQuestionUnanswered();
     }
};

// Set question unanswered.
function setQuestionUnanswered() {
	showSection(answerPage);
	selectedAnswer = false;
	createAnswerSection(selectedAnswer);
};

// Stops timer.
function stopTimer() {
	clearInterval(timeIntervalID);
};

// Displays possible answers to question.
function displayQuestionAnswers() {

	// Empties out existing answers from previous question.
	$( ".answer-choices" ).empty();

	// Creates new list of answers for question.
	for (var i = 0; i < questionID.answers.length; i++) {

		// Create answer option list item.
		var answerOption = $("<li>");

		// List item selectable.
		answerOption.addClass("ui-widget-content");

		// Set answer option text to answer in questions array.
		answerOption.html(questionID.answers[i]);

		// Append answer option to the list of answer choices.
		answerOption.appendTo(".answer-choices");
	}

	$("li").hover(function() {
			$(this).addClass("hover");
		}, function() {
			$(this).removeClass("hover");
		}
	);
	// Listens for answer click event.
	addAnswerClickListener();
};

// Displays content in answer section.
function createAnswerSection(selectedAnswer) {
	
	// Stops timer.
	stopTimer();

	// Get correct answer for question.
	var correctAnswer = questionID.correctAnswer;

	// Display correct answer information.
	$("#correct-answer-info").html("The correct Answer was: " + correctAnswer);

	// If selected answer correct...
	if (correctAnswer === selectedAnswer) {
		
		// Empty out preview question's correct answer information.
		$("#correct-answer-info").empty();

		// Update correct answers count.
		correctAnswers++;
		$("#answer-assessment").html("Correct!");
	
	// Else if no answer selected.
	} else if (selectedAnswer === false) {
		
		// Update unanswered answers count.
		unanswered++;
		$("#answer-assessment").html("Out of Time!");

	// Else selected answer incorrect.
	} else {
		// Update incorrect answers count.
		incorrectAnswers++;
		$("#answer-assessment").html("Nope!");
	}

	// Length of time answer page appears.
	setTimeout(answerTimeOut, 3000);
};

// Called when answer page times out.
function answerTimeOut() {

	// If there's another question, display it.
	if (index < questionsArray.length - 1) {
		index++;
		questionID = questionsArray[index];
		goToNextQuestion();

	// If there's no more questions, show results.
	} else {
		showTriviaResults();
	}
}

// Display correct, incorrect, and unanswered question counts.
function showTriviaResults() {
	showSection(resultsPage);
	$("#correct-answers").html(correctAnswers);
	$("#incorrect-answers").html(incorrectAnswers);
	$("#unanswered").html(unanswered);
}

// Go to next question.
function goToNextQuestion(){

	// Display question page.
	showSection(questionPage);

	// Empties out existing answers from previous question.
	$( ".answer-choices" ).empty();

	// Displays question and possible answers.
	displayQuestion();

	// Resets question timer.
	resetTimer();

}

// Resets question timer.
function resetTimer() {
	
	// Timer interval countdowns from 10 seconds.
	timeNumber = 10;

	// Starts timer with time number reset.
	startTimer();
}

$(document).ready(function() {

	// Displays start page.
	showSection(startPage);

	// Listens for stark click event.
	addStartClickListener();
	
	// Listens for restart click event
	addRestartClickListener();

});