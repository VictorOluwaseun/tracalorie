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
		logData: function () {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function () {

	//Public Methods
	return {

	};
})();



//App Controller
const App = (function (ItemCtrl, UICtrl) {

	//Public Methods
	return {
		init: function () {
			console.log("initialising App...");
		}
	};
})(ItemCtrl, UICtrl);

//Initialise App
App.init();