// Storage Controller

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
		items: [{
				id: 0,
				name: "Steak Dinner",
				calories: 1200
			},
			{
				id: 1,
				name: "Cookie",
				calories: 400
			},
			{
				id: 0,
				name: "Eggs",
				calories: 300
			}
		],
		currentItem: undefined,
		totalCalories: 0
	};

	//Public Methods
	return {
		getItems: function () {
			return data.items;
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
		addBtn: ".add-btn",
		itemNameInput: "#item-name",
		itemCaloriesInput: "#item-calories"
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
		getSelectors: function () {
			return UISelectors;
		}
	};
})();



//App Controller
const App = (function (ItemCtrl, UICtrl) {
	// Load event listeners
	const loadEventListeners = function () {
		const UISelectors = UICtrl.getSelectors();

		//Add item event
		document.querySelector(UISelectors.addBtn).addEventListener("click",
			itemAddSubmit);

	};
	//Add item submit
	const itemAddSubmit = function (e) {
		e.preventDefault();
		//Get form input from UI Controller
		const input = UICtrl.getItemsInput();
		console.log(input);

	};
	//Public Methods
	return {
		init: function () {
			console.log("initialising App...");

			//fetch items from data structure
			const items = ItemCtrl.getItems();

			// Populate list with items
			UICtrl.populateItemsList(items);

			//Load Event Listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, UICtrl);

//Initialise App
App.init();