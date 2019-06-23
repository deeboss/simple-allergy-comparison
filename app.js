// ************************
// ************************
// Utility Functions
// ************************
// ************************

// Trim whitespace
	ltrim = str => {
		if (str == null) return str;
		return str.replace(/^\s+/g, "");
	};

// Capitalize string for better formatting and consistency
	String.prototype.capitalize = function() {
		return this.replace(/(?:^|\s)\S/g, function(a) {
			return a.toUpperCase();
		});
	};

// ************************
// ************************


// 1. Log each toothpaste
// - Name of toothpaste
// - Ingredients

let products = {
	product1: {
		name: "Colgate Optic White - Sparkling Mint",
		ingredients:
			"Sodium monofluorophosphate 0.76% (0.15% w/v fluoride ion), calcium pyrophosphate, propylene glycol, PEG/PPG 116/66 copolymer, PEG-12, glycerin, PVP, flavor, sodium lauryl sulfate, tetrasodium pyrophosphate, silica, hydrogen peroxide, sodium saccharin, phosphoric acid, sucralose, butylated hydroxytoluene, water"
	},
	product2: {
		name: "Crest",
		ingredients:
			"Aqua, Sorbitol, Hydrated Silica, PEG-6, Sodium Lauryl Sulfate, Tetrapotassium Pyrophosphate, Disodium Pyrophosphate, Tetrasodium Pyrophosphate, Aroma, Cellulose Gum, Xanthan Gum, Carbomer, Sodium Saccharin, Triclosan, Copernicia Cerifera (Carnauba) Wax, CI 77891, Limonene, CI 42090, Sodium Fluoride (0.321%)"
	},
	product3: {
		name: "Sensodyne",
		ingredients:
			"Potassium nitrate, sodium fluoride, Water, hydrated silica, sorbitol, glycerin, pentasodium triphosphate, PEG-8, flavor, titanium dioxide, sodium methyl cocoyl taurate, cocamidopropyl betaine, xanthan gum, sodium hydroxide, sodium saccharin, sucralose"
	}
};

// 2. Comparison mode (all)
// - Find all exact ingredient matches across all toothpaste products

// 		Create an object to store each product, with an array of all of the ingredients already separated by commas

// 		Go through each objects and retrieve the arrays
// 		Store arrays into a new variable
// 		Find out duplicates
// 		Put them into a new variable
// 		P.S.: Store numOfDuplicates

let numOfProducts = Object.keys(products).length;
let arr = Object.keys(products);

// Begin
let findDuplicateIngredients = () => {
	console.log(products);
	let allIngredientsArr = [];

	for (let idx = 0; idx < numOfProducts; ++idx) {
		let id = arr[idx];
		// console.log(products[id].ingredients);
		// ISSUE: need to ensure compatibiltiy for items without a space
		let tmpArr = products[id].ingredients.toString().split(",");
		let ingredientsArr = [];
		products[id].ingredients = tmpArr.sort();

		for (let i = 0; i < products[id].ingredients.length; ++i) {
			ingredientsArr.push(
				ltrim(
					products[id].ingredients[i]
					.replace(/ *\([^)]*\) */g, "")
					.capitalize()
				)
			);
			allIngredientsArr.push(ltrim(products[id].ingredients[i].capitalize()));
		}
		products[id].ingredients = ingredientsArr.sort();
	}

	const count = allIngredientsArr =>
		allIngredientsArr.reduce(
			(a, b) => ({
				...a,
				[b]: (a[b] || 0) + 1
			}),
			{}
		); // initialize the accumulator

	// Set the number of duplicates across the products
	let duplicateThreshold = numOfProducts - 1;
	let approximateThreshold = numOfProducts - 2;

	const duplicates = dict =>
		Object.keys(dict).filter(a => dict[a] > duplicateThreshold);

	const approximateMatches = dict =>
		Object.keys(dict).filter(a => dict[a] > approximateThreshold);

	let listOfDuplicates = count(allIngredientsArr);
	let results = duplicates(count(allIngredientsArr));
	let approximateResults = approximateMatches(count(allIngredientsArr));
	let indexOfExactResults = [];

	numOfDuplicates = results.length;
	numOfApproximates = approximateResults.length;
	console.log("______");
		console.log("These ingredients are shared across all " + (duplicateThreshold + 1) + " products");
	console.log(results);
	
	console.log("These ingredients are shared across at least " + (approximateThreshold + 1) + " products");
	console.log(approximateResults);
	console.log("______");

	for (let i = 0; i < results.length; ++i) {
		indexOfExactResults.push(approximateResults.indexOf(results[i]));
	}

	if (indexOfExactResults.length > 0) {
		for (let j = 0; j < indexOfExactResults.length; ++j) {
			if (indexOfExactResults[j] > -1) {
				approximateResults.splice(indexOfExactResults[j], 1);
			}
		}
	}

	// 		Find them in each product, and re-order their respective ingredients array
	// 		to make sure they're first.
	let array_move = (arr, old_index, new_index) => {
		if (new_index >= arr.length) {
			var k = new_index - arr.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		return arr; // for testing
	};

	for (let i = 0; i < numOfProducts; ++i) {
		let id = arr[i];

		for (let j = 0; j < numOfDuplicates; ++j) {
			let indexOfDuplicate = products[arr[i]].ingredients.indexOf(results[j]);
			let sortedArr = array_move(products[arr[i]].ingredients, indexOfDuplicate, j);
			console.log("++++++++");
			console.log("Array after exact matches")
			console.log(sortedArr);
			console.log("++++++++");
			products[id].ingredients = sortedArr;
		}
		
		// let moveToPos = 1;
// 		for (let k = 0; k < numOfApproximates; ++k) {
// 			let indexOfApproximate = products[arr[i]].ingredients.indexOf(approximateResults[k]);
// 			console.log("K is now " + k, " and moveToPos is " + moveToPos)

// 			if (indexOfApproximate > -1) {
// 				console.log("Found a match at index: " + indexOfApproximate);
// 				console.log(products[arr[i]].ingredients);
// 				console.log("Will move it to index: " + moveToPos);
// 				let sortedArr = array_move(products[arr[i]].ingredients, indexOfApproximate, moveToPos);
// 				console.log("~~~~~~~~");
// 				console.log("Results after sorting:")
// 				console.log(sortedArr);
// 				console.log("~~~~~~~~");
// 				products[id].ingredients = sortedArr;
// 				moveToPos += 1;
// 			} else {
// 			}
// 		}
		
	}
};

// End

// 3. For each toothpaste, create a new row for each ingredient
// 					Every entry has a <tr></tr>
// 					First entry is a Table Header object. i.e. <tr><th></th></tr>
// 					Subsequent entries are <tr><td></td></tr>
// 					Maximum number of rows is determined by product with highest num of ingredients + 1
// 					For products that don't have as many ingredients, their <td> should be empty

let createTableHeader = () => {
	let table = document.getElementById("result").getElementsByTagName("thead")[0];
	let row = table.insertRow();
	//	console.log("products to render: " + numOfProducts);

	for (let idx = 0; idx < numOfProducts; ++idx) {
		let header = document.createElement("th");
		header.innerText = products[arr[idx]].name;
		row.append(header);
	}
};

let createTableRow = () => {
	let table = document.getElementById("result").getElementsByTagName("tbody")[0];

	// Max number of rows needed = highest number of ingredients
	let maxNumOfRows = 1;
	for (let idx = 0; idx < numOfProducts; ++idx) {
		if (maxNumOfRows < products[arr[idx]].ingredients.length) {
			maxNumOfRows = products[arr[idx]].ingredients.length;
		}
	}

	// Loop for max number of rows
	for (let idx = 0; idx < maxNumOfRows; ++idx) {
		let row = table.insertRow();
		let ingredientIndex = idx;

		// With each row, create <td> that correspond with the number of products
		for (let idx = 0; idx < numOfProducts; ++idx) {
			let data = document.createElement("td");
			let val = products[arr[idx]].ingredients[ingredientIndex];

			//						If value is null or empty, then enter blank space.
			if (typeof val === "undefined") {
				data.innerText = "";
			} else {
				data.innerText = val;
			}

			row.append(data);
		}
	}

	// Client side: show matches
	for (let i = 0; i < numOfDuplicates; ++i) {
		let matchesEl = document.querySelectorAll("tbody tr");
		if (document.getElementById("result").rows[0].cells.length == 1) {
		} else {
			matchesEl[i].classList.add("match");
			if (i == numOfDuplicates - 1) {
				matchesEl[i].style.borderBottom = "3px solid royalblue";
			}
		}
	}

	setTimeout(function() {
		table.classList.add("show");
	}, 100);
};



let clearTable = () => {
	let tableHeader = document
		.getElementById("result")
		.getElementsByTagName("thead")[0];
	let tableBody = document
		.getElementById("result")
		.getElementsByTagName("tbody")[0];

	while (tableHeader.firstChild) {
		tableHeader.removeChild(tableHeader.firstChild);
	}

	while (tableBody.firstChild) {
		tableBody.classList.remove("show");
		tableBody.removeChild(tableBody.firstChild);
	}
};

// Refresh program/functions, with the refreshed products as the input
let addNewProduct = res => {
	numOfProducts = ++numOfProducts;
	let key = "product" + numOfProducts;
	arr.push(key);
	products[key] = res;

init();

	if (numOfProducts > 5) {
		document.body.classList.add("expand");
	}
};

// Hide/remove columns
let removeProduct = el => {
	let tempProducts = {};
	let iterator = 1;

	for (let idx = 0; idx < numOfProducts; ++idx) {
		let id = arr[idx];

		if (products[id].name !== el) {
			let key = "product" + iterator;
			tempProducts[key] = products[id];
			//console.log(tempProducts);

			++iterator;
		}
	}

	products = tempProducts;
	numOfProducts = Object.keys(products).length;

	init();
	
	

	let tableHeader = document.getElementById("result").getElementsByTagName("thead")[0].querySelector("tr");

	let tableBody = document.getElementById("result").getElementsByTagName("tbody")[0].querySelector("tr");

	if (tableHeader.childNodes.length == 0) {
		let header = document.createElement("th");
		header.innerText = "Empty";
		tableHeader.append(header);

		let data = document.createElement("td");
		data.innerHTML =
			"<div class='empty-state-message'><h2><span>🤔</span>Nothing to compare!</h2><p class='large'>Add a few products down below to compare ingredients</p></div>";
		tableBody.append(data);

		tableHeader.setAttribute("disabled", "true");
	}
};

// Client side: hide column
document
	.getElementById("result")
	.getElementsByTagName("thead")[0].onclick = e => {
	e = e || window.event;
	let th = e.target || e.srcElement; //assumes there are no other elements in the th

	let selectedHeader = th.textContent;
	removeProduct(selectedHeader);
};

// Client side: Add new product for comparison
// Client enters product name, ingredients, and presses submit
// All fields mandatory
// Save as object with key: productNth
// Push to products Obj

document.getElementById("addProduct").onclick = () => {
	let newProductName = document.getElementById("newProductName");
	let newIngredient = document.getElementById("newIngredient");
	if (newProductName.value === "") {
		alert("Required field empty: A product name is needed!");
	} else if (newIngredient.value === "") {
		alert("Required field empty: Ingredients are needed!");
	} else {
		let newProduct = {
			name: newProductName.value,
			ingredients: [newIngredient.value]
		};

		newProductName.value = "";
		newIngredient.value = "";

		addNewProduct(newProduct);
	}
};

// Init
// Client side: create table
let init = () => {
	clearTable();
findDuplicateIngredients();
createTableHeader();
createTableRow();	
}


init();