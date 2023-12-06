// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"
"strict script"
function app(people) {
	//debugger;
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);

	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':
			//! TODO
			results = searchByTraits(people);
			break;
		default:
			return searchPeopleDataSet(people);
	}

	return results;
}

function searchById(people) {
	const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	const idToSearchForInt = parseInt(idToSearchForString);
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}

function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(

	
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}

function searchByTraits(people) {
	const traitToSearchForString = prompt('Please enter the trait of the person you are searching for.');
	const traitParameterToSearchFor = prompt('Please enter desired trait parameter.');

	switch (traitToSearchForString) {
		case `gender`:
			let g = people.filter(
				(trait) => trait.gender === traitParameterToSearchFor.toLowerCase()
			);
			traitSearchResults = g;			
			break;		
		case `height` :
			let h = people.filter(
				(trait) => trait.height === parseInt(traitParameterToSearchFor)
			 );
			 traitSearchResults = h;
			break;
		case `weight` :
			let w = people.filter(
				(trait) => trait.weight === parseInt(traitParameterToSearchFor)
			);
			traitSearchResults = w;
			break;
		case `eyeColor` :
			let ec = people.filter(
				(trait) => trait.eyeColor === traitParameterToSearchFor.toLowerCase()
			);
			traitSearchResults = ec;
			break;
		case `occupation` :
			let o = people.filter(
				(trait) => trait.occupation === traitParameterToSearchFor.toLowerCase()
			);
			traitSearchResults = o;
			break;
		default :
			return searchPeopleDataSet(people);
		}			
			return traitSearchResults;
}

function displayPersonInfo(person){
	alert(`First name: ${person.firstName}\n Last name: ${person.lastName}\n Gender: ${person.gender}\n DOB: ${person.dob}\n Height: ${person.height}\n Weight: ${person.weight}\n Eye color: ${person.eyeColor}\n Occupation: ${person.occupation}`);
	
	return person;
}

function findPersonFamily(person, people){
		let parentName;
		let personFamily;
		let spouseName;
		let personSiblings;
		if(person.currentSpouse != null){
			spouseName = people.filter(people => people.id === person.currentSpouse).map(people => people.firstName + ` ` + people.lastName);
			alert(`Spouse name: ${spouseName}\n`)
		}
		personFamily = spouseName;
		for (i = 0; i < 2; i++){
		if(person.parents[i] != null){
			parentName = people.filter(people => people.id === person.parents[i]).map(people => people.firstName + ` ` + people.lastName);
			alert(`Parent name: ${parentName}\n`);
		}
		} 
	
		if(person.parents[0] != null){
			personSiblings = people.filter(people => people.parents[i] === person.parents[i]).map(people => people.firstName + ' ' + people.lastName);
			alert(`Sibling Name(s): ${personSiblings}\n`);
			}
		
		
		
	return personFamily;
}
function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);

	switch (mainMenuUserActionChoice) {
		case 'info':
			//! TODO
			displayPersonInfo(person);
			break;
		case 'family':
			//! TODO
			findPersonFamily(person, people);
			// displayPeople('Family', personFamily);
			break;
		case 'descendants':
			//! TODO
			// let personDescendants = findPersonDescendants(person, people);
			// displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}
