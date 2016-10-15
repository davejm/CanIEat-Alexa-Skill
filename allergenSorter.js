function sortAllergens(json) {
	var red = [];
	var yellow = [];
	json.allergens.forEach(function(al){
		if (al.allergen_red_ingredients != "") { red.push(al.allergen_name); }
		if (al.allergen_yellow_ingredients != "") { yellow.push(al.allergen_name); }
	});
	return { 'red':red, 'yellow':yellow };
}