// Storage Controller
const StorageCtrl = (function () {

	//Public methods
	return {
		storeItem: function (item) {
			let items;
			//Check if any items in LS
			if (localStorage.getItem("items") === null) {
				items = [];
				//Push new item
				items.push(item);
				//Set LS
				localStorage.setItem("items", JSON.stringify(items));
			} else {
				//Get what is already in LS
				items = JSON.parse(localStorage.getItem("items"));
				//Push new item
				items.push(item);
				//Re set LS
				localStorage.setItem("items", JSON.stringify(items));
			}
		},
		getItemsFromStorage: function () {
			let items;
			if (localStorage.getItem("items") === null) {
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem("items"));
			}
			return items;
		}
	};
})();

// Item Controller
const ItemCtrl = (function () {
	//Item Constructor
	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	//Data Structure / State
	const data = {
		items: [
			// {
			// 	id: 1,
			// 	name: "Steak Dinner",
			// 	calories: 1200
			// },
			// {
			// 	id: 2,
			// 	name: "Cookie",
			// 	calories: 400
			// },
			// {
			// 	id: 3,
			// 	name: "Eggs",
			// 	calories: 300
			// }
		],
		currentItem: undefined,
		totalCalories: 0
	};

	//Public Methods
	return {
		getItems: function () {
			return data.items;
		},
		addItem: function (name, calories) {
			let ID;
			//Create ID
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			//Calories to number
			calories = parseInt(calories);

			//Create new item
			const newItem = new Item(ID, name, calories);

			data.items.push(newItem);

			return newItem;
		},
		getItemById: function (id) {
			let found = "";

			//loop through items;
			data.items.forEach(item => {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updatedItem: function (name, calories) {
			//Calories to number
			calories = parseInt(calories);

			let found = "";

			data.items.forEach(item => {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function (item) {
			//Get ids
			const ids = data.items.map(item => item.id);

			//Get index
			const index = ids.indexOf(item.id);

			//Remove item
			data.items.splice(index, 1);
		},
		clearAllItems: function () {
			data.items = [];
		},
		setCurrentItem: function (item) {
			data.currentItem = item;
		},
		getCurrentItem: function () {
			return data.currentItem;
		},
		getTotalCalories: function () {
			let total = 0;

			// Loop through items and add cals
			data.items.forEach(item => {
				total += item.calories;
			});

			// Set total items and add cals
			data.totalCalories = total;

			//Return total
			return data.totalCalories;
		},
		logData: function () {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function () {
	const UISelectors = {
		itemList: "#item-list",
		listItems: "#item-list li",
		addBtn: ".add-btn",
		updateBtn: ".update-btn",
		deleteBtn: ".delete-btn",
		backBtn: ".back-btn",
		clearBtn: ".clear-btn",
		itemNameInput: "#item-name",
		itemCaloriesInput: "#item-calories",
		totalCalories: ".total-calories"
	};
	//Public Methods
	return {
		populateItemsList: function (items) {
			let html = "";

			items.forEach(item => {
				html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
`;
			});

			//Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getItemsInput: function () {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			};
		},
		addListItem: function (item) {
			//Show the list 
			document.querySelector(UISelectors.itemList).style.display = "block";
			//Create li element
			const li = document.createElement("li");
			//Add class
			li.className = "collection-item";
			//Add ID
			li.id = `item-${item.id}`;
			//Add HTML
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i></a>`;
			// Insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
		},
		updateListItem: function (item) {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list into array
			listItems = Array.from(listItems);

			listItems.forEach(listItem => {
				const itemID = listItem.getAttribute("id");

				if (itemID === `item-${item.id}`) {
					document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"> <i class="edit-item fa fa-pencil"></i></a>`;
				}
			});
		},
		deleteListItem: function (id) {
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID);
			item.remove();
		},
		clearInput: function () {
			document.querySelector(UISelectors.itemNameInput).value = "";
			document.querySelector(UISelectors.itemCaloriesInput).value = "";
		},
		addItemToForm: function () {
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		removeItems: function () {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			//Turn node list into array
			listItems = Array.from(listItems);

			listItems.forEach(item => {
				item.remove();
			});
		},
		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = "none";
		},
		showTotalCalories: function (totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		clearEditState: function () {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = "none";
			document.querySelector(UISelectors.deleteBtn).style.display = "none";
			document.querySelector(UISelectors.backBtn).style.display = "none";
			document.querySelector(UISelectors.addBtn).style.display = "inline";
		},
		showEditState: function () {
			document.querySelector(UISelectors.updateBtn).style.display = "inline";
			document.querySelector(UISelectors.deleteBtn).style.display = "inline";
			document.querySelector(UISelectors.backBtn).style.display = "inline";
			document.querySelector(UISelectors.addBtn).style.display = "none";
		},
		getSelectors: function () {
			return UISelectors;
		}
	};
})();



//App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
	// Load event listeners
	const loadEventListeners = function () {
		const UISelectors = UICtrl.getSelectors();

		//Add item event
		document.querySelector(UISelectors.addBtn).addEventListener("click",
			itemAddSubmit);

		//Disable submit on enter
		document.addEventListener("keypress", function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

		//Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

		//Delete item event
		document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

		//Back button event
		document.querySelector(UISelectors.backBtn).addEventListener("click", UICtrl.clearEditState);

		//Clear items event
		document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);

	};
	//Add item submit
	const itemAddSubmit = function (e) {
		e.preventDefault();
		//Get form input from UI Controller
		const input = UICtrl.getItemsInput();

		//Check for name and calories input
		if (input.name !== "" && input.calories !== "") {
			//Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);

			// Add item to UI list
			UICtrl.addListItem(newItem);

			//Get the total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			//Store in local storage
			StorageCtrl.storeItem(newItem);

			//Clear fields
			UICtrl.clearInput();
		}
	};

	//Edit item 
	const itemEditClick = function (e) {
		e.preventDefault();
		if (e.target.classList.contains("edit-item")) {
			//Get list item id (item-0, item-1)
			const listId = e.target.parentNode.parentNode.id;

			//Break into an array
			const listIdArr = listId.split("-");

			//Get the actual id
			const id = parseInt(listIdArr[1]);

			//Get item
			const itemToEdit = ItemCtrl.getItemById(id);

			//Set current item
			ItemCtrl.setCurrentItem(itemToEdit);

			//Add item to form
			UICtrl.addItemToForm();
		}

	};

	//Update item submit
	const itemUpdateSubmit = function (e) {
		e.preventDefault();
		// Get item input
		const input = UICtrl.getItemsInput();

		//Update item
		const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

		//Update  UI
		UICtrl.updateListItem(updatedItem);

		//Get the total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		//Clear edit state
		UICtrl.clearEditState();
	};

	//Delete button event
	const itemDeleteSubmit = function (e) {
		e.preventDefault();
		//Get current item
		const currentItem = ItemCtrl.getCurrentItem();

		//Delete from Data structure
		ItemCtrl.deleteItem(currentItem);

		//Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		//Get the total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		//Clear edit state
		UICtrl.clearEditState();

		//fetch items from data structure
		const items = ItemCtrl.getItems();

		//Check if any items
		if (!items.length) {
			UICtrl.hideList();
		}
	};

	// Clear items event
	const clearAllItemsClick = function (e) {
		e.preventDefault();

		//Clear all items from data structure
		ItemCtrl.clearAllItems();

		//Remove from UI
		UICtrl.removeItems();

		//Get the total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		//hide list		
		UICtrl.hideList();

	};
	//Public Methods
	return {
		init: function () {
			console.log("initialising App...");
			//Clear edit state / set inital state
			UICtrl.clearEditState();

			//fetch items from data structure
			const items = ItemCtrl.getItems();

			//Check if any items
			if (!items.length) {
				UICtrl.hideList();
			}
			// Populate list with items
			UICtrl.populateItemsList(items);

			//Get the total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			//Load Event Listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, StorageCtrl, UICtrl);

//Initialise App
App.init();