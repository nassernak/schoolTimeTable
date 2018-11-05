jQuery(document).ready(function($) {
	var daysEveryWeek = ['Suturday','Sunday','Monday','Tusday','Wendsday','Thursday'];
	var totalClassLevel = [];
	var subClassEachClass = ['A','B','C','D'];
	var seelctedItems = {};
	var classesSubCount = [];
		// create new box to enter subcalss
	$('select').change(function(event) {
		seelctedItems = $(this).val();
		$('select + div#subClass').empty();
		for (var i = seelctedItems.length - 1; i >= 0; i--) {
			$(this).siblings('div#subClass').prepend(`
				<div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-12">
					<label for="`+seelctedItems[i]+`">Subcalsses for `+seelctedItems[i]+` Level</label>
					<input id="`+seelctedItems[i]+`" class="form-control sub_class_count" type="number" max="5" name="sub_class_`+seelctedItems[i]+`" required title="How many groups do you have for class `+seelctedItems[i]+`">
				</div>
				`);
		}
	});
			// end sub calsses
	$('#create').click(function(event) {
		$('.hidden.main-table').removeClass('hidden');
		var mySelector,selected;
		var seelctedItemsForProccess = [];
		$.each(seelctedItems, function(index, val) {
			mySelector = '.sub_class_count#'+val+'';
			selectedTag = $(mySelector).val();
			seelctedItemsForProccess[val] = selectedTag;
		});
		var timeEveryDay = parseInt($('input.timesinday').val());
		totalClassLevel = $("option:selected").map(function(){ return this.value }).get();
		// var timeEveryDay = parseInt($('input.timesinday').val());
		$('table').html(`<caption>Your School Time Table</caption><col><col><thead><tr id="totalClassLevelName"><th colspan="2" scope="colgroup"></th></tr><tr id="subClassEachClassName"><th scope="col">Days</th><th scope="col">Time</th></tr></thead><tbody></tbody>`);
		action(daysEveryWeek , timeEveryDay ,totalClassLevel , subClassEachClass);
	});
function action(daysEveryWeek , timeEveryDay ,totalClassLevel , subClassEachClass) {
	// create the class level name
	for (var i = 0; i < totalClassLevel.length; i++) {
		$('#totalClassLevelName').append(`
				<th colspan="`+subClassEachClass.length+`" scope="colgroup">`+totalClassLevel[i]+`</th>
			`);
		// create subcalls name section
		for (var j = 0; j < subClassEachClass.length; j++) {
			$('#subClassEachClassName').append(`
		      <th  scope="colgroup">`+subClassEachClass[j]+`</th>
	      	`);
		}
	}
	// create the total week days
		for (var i = 0; i < daysEveryWeek.length; i++) {
			$('tbody').append(`
				<tr class="`+daysEveryWeek[i]+`">
				      <th rowspan="`+(timeEveryDay+1)+`" scope="rowgroup">`+daysEveryWeek[i]+`</th>
				</tr>
				`);
		}

		// create some td to use in the insert the time with content
		var expression = [];
		for (var i = 0; i < (totalClassLevel.length * subClassEachClass.length); i++) {
			expression[i] = `<td><span>ABCDEFGHI2</span><br><span>teacher name</span></td>`;
		}
	// insert the time for each day to table
		
		for (var j = 0; j < daysEveryWeek.length; j++) {
			for (var i = timeEveryDay; i > 0; i--) {
				$('.'+daysEveryWeek[j]+'').after(`<tr class="sub_`+daysEveryWeek[j]+`" ><th scope="row">`+i+`</th>
					`+expression+`
								    </tr>`);
			}
		}
}








});