// 1. Log each toothpaste
// - Name of toothpaste
// - Ingredients

let products = {
	"product1": {
		"name": "Colgate Optic White - Sparkling Mint",
		"ingredients": "Sodium monofluorophosphate 0.76% (0.15% w/v fluoride ion), calcium pyrophosphate, propylene glycol, PEG/PPG 116/66 copolymer, PEG-12, glycerin, PVP, flavor, sodium lauryl sulfate, tetrasodium pyrophosphate, silica, hydrogen peroxide, sodium saccharin, phosphoric acid, sucralose, butylated hydroxytoluene, water"
	},
	"product2": {
		"name": "Crest",
		"ingredients": "Aqua, Sorbitol, Hydrated Silica, PEG-6, Sodium Lauryl Sulfate, Tetrapotassium Pyrophosphate, Disodium Pyrophosphate, Tetrasodium Pyrophosphate, Aroma, Cellulose Gum, Xanthan Gum, Carbomer, Sodium Saccharin, Triclosan, Copernicia Cerifera (Carnauba) Wax, CI 77891, Limonene, CI 42090, Sodium Fluoride (0.321%)"
	},
	"product3": {
		"name": "Sensodyne",
		"ingredients": "Potassium nitrate, sodium fluoride, Water, hydrated silica, sorbitol, glycerin, pentasodium triphosphate, PEG-8, flavor, titanium dioxide, sodium methyl cocoyl taurate, cocamidopropyl betaine, xanthan gum, sodium hydroxide, sodium saccharin, sucralose"
	},
	"product4": {
		"name": "Darlie Double Action Toothpaste",
		"ingredients": "Dicalcium Phosphate Dihydrate, Water, Sorbitol, Glycerin, Dicalcium Phosphate, Sodium Lauryl Sulphate, Flavour (Contains Spearmint Essence & Peppermint Essence), Carageenan, Sodium Lauroyl Sarcosinate, Sodium Monofluorophosphate, Tetrasodium Pyrophosphate, Sodium Saccharin"
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
	let allIngredientsArr = [];
	// Capitalize string for better formatting and consistency
	String.prototype.capitalize = function() {
		return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};
	
	// Trim whitespace
	ltrim = (str) => {
			if(str == null) return str;
			return str.replace(/^\s+/g, '');
	}

	for (let idx = 0; idx < numOfProducts; ++idx) {
		let id = arr[idx];
		// console.log(products[id].ingredients);
		// ISSUE: need to ensure compatibiltiy for items without a space
		let tmpArr = products[id].ingredients.toString().split(',');
		let ingredientsArr = [];
		products[id].ingredients = tmpArr.sort();

		for (let i = 0; i < products[id].ingredients.length; ++i) {
			ingredientsArr.push(ltrim(products[id].ingredients[i].capitalize()));
			allIngredientsArr.push(ltrim(products[id].ingredients[i].capitalize()));
		}
		products[id].ingredients = ingredientsArr.sort();
	}
	
	const count = allIngredientsArr => allIngredientsArr.reduce((a, b) => ({ ...a,
																																						[b]: (a[b] || 0) + 1
																																					}), {}) // initialize the accumulator

	// Set the number of duplicates across the products
	let duplicateThreshold = numOfProducts - 1;

	const duplicates = dict =>
	Object.keys(dict).filter((a) => dict[a] > duplicateThreshold)

	let listOfDuplicates = count(allIngredientsArr)
	let results = duplicates(count(allIngredientsArr))
	numOfDuplicates = results.length;
	
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
				let sortedArr = array_move(products[arr[i]].ingredients, indexOfDuplicate, j)
				console.log(sortedArr);
				// products[id].ingredients = sortedArr;
			}
		}
	
}

// End












// let allIngredientsArr = [];
// // Capitalize string for better formatting and consistency
// String.prototype.capitalize = function() {
// 	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
// };

// for (let idx = 0; idx < numOfProducts; ++idx) {
// 	let id = arr[idx];
// 	// ISSUE: need to ensure compatibiltiy for items without a space
// 	let tmpArr = products[id].ingredients.split(',');
// 	let ingredientsArr = [];
// 	products[id].ingredients = tmpArr.sort();

// 	for (let i = 0; i < products[id].ingredients.length; ++i) {
// 		ingredientsArr.push(products[id].ingredients[i].capitalize());
// 		allIngredientsArr.push(products[id].ingredients[i].capitalize());
// 	}
// 	products[id].ingredients = ingredientsArr.sort();
// }

// const count = allIngredientsArr =>
// allIngredientsArr.reduce((a, b) => ({ ...a,
// 																																					[b]: (a[b] || 0) + 1
// 																																				}), {}) // don't forget to initialize the accumulator

// // Set the number of duplicates across the products
// let duplicateThreshold = numOfProducts - 1;

// const duplicates = dict =>
// Object.keys(dict).filter((a) => dict[a] > duplicateThreshold)

// let listOfDuplicates = count(allIngredientsArr)
// let results = duplicates(count(allIngredientsArr))
// let numOfDuplicates = results.length;

// // 		Find them in each product, and re-order their respective ingredients array
// // 		to make sure they're first.
// let array_move = (arr, old_index, new_index) => {
// 	if (new_index >= arr.length) {
// 		var k = new_index - arr.length + 1;
// 		while (k--) {
// 			arr.push(undefined);
// 		}
// 	}
// 	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
// 	return arr; // for testing
// };

// for (let i = 0; i < numOfProducts; ++i) {
// 	let id = arr[i];
// 	for (let j = 0; j < numOfDuplicates; ++j) {
// 		let indexOfDuplicate = products[arr[i]].ingredients.indexOf(results[j]);
// 		let sortedArr = array_move(products[arr[i]].ingredients, indexOfDuplicate, j)
// 		products[id].ingredients = sortedArr;
// 	}
// }



// 3. For each toothpaste, create a new row for each ingredient
// 					Every entry has a <tr></tr>
// 					First entry is a Table Header object. i.e. <tr><th></th></tr>
// 					Subsequent entries are <tr><td></td></tr>
// 					Maximum number of rows is determined by product with highest num of ingredients + 1
// 					For products that don't have as many ingredients, their <td> should be empty

let createTableHeader = () => {
	let table = document.getElementById('result').getElementsByTagName('thead')[0];
	let row = table.insertRow();
//	console.log("products to render: " + numOfProducts);
	
	for (let idx = 0; idx < numOfProducts; ++idx) {

		let header = document.createElement('th');
		header.innerText = products[arr[idx]].name;
		row.append(header);
	}
}

let createTableRow = () => {
		let table = document.getElementById('result').getElementsByTagName('tbody')[0];
	
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
				let data = document.createElement('td');
				let val = products[arr[idx]].ingredients[ingredientIndex];
				
				//						If value is null or empty, then enter blank space.
				if (typeof val === 'undefined') {
						data.innerText = '';							
				} else {
						data.innerText = val;					
				}

				row.append(data);
			}
		}
	
		// Client side: show matches
		for (let i = 0; i < numOfDuplicates; ++i) {
			let matchesEl = document.querySelectorAll("tbody tr");
			matchesEl[i].classList.add("match")
		}
}

let clearTable = () => {
		let tableHeader = document.getElementById('result').getElementsByTagName('thead')[0];
		let tableBody = document.getElementById('result').getElementsByTagName('tbody')[0];
	
		while (tableHeader.firstChild) {
			tableHeader.removeChild(tableHeader.firstChild);
		}
	
	while (tableBody.firstChild) {
			tableBody.removeChild(tableBody.firstChild);
		}
}

// Refresh program/functions, with the refreshed products as the input
let addNewProduct = (res) => {
	numOfProducts = ++numOfProducts;
	let key = "product" + numOfProducts;
	arr.push(key)
	products[key] = res;

	clearTable();
	findDuplicateIngredients();
	createTableHeader();
	createTableRow();
}


// Client side: create table
findDuplicateIngredients();
createTableHeader();
createTableRow();

// Client side: Add new product for comparison
// Client enters product name, ingredients, and presses submit
// All fields mandatory
// Save as object with key: productNth
// Push to products Obj

document.getElementById("addProduct").onclick = () => {
		let newProductName = document.getElementById("newProductName");
		let newIngredient = document.getElementById("newIngredient");
  if (newProductName.value === '') {
			alert("Required field empty: A product name is needed!");
		} else if (newIngredient.value === '') {
			alert("Required field empty: Ingredients are needed!");
		} else {
			let newProduct = {
				"name": newProductName.value,
				"ingredients": [newIngredient.value]
			}
			
			newProductName.value = '';
			newIngredient.value = '';
			
			addNewProduct(newProduct);
		}
}

