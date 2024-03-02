
let siteBaseUrl = "/webui/";
let webuiSearchInput = ui("#webuiSearchInput");
let webuiSearchResult = ui("#webuiSearchResult");
let searchResult = null;


let webuiSearchModal = ui("#webuiSearchModal").modalControl({
	transitionDuration: 200,
	closeFromBackdrop: true,
	disablePageScrolling: true,
	focusElement: "#webuiSearchInput"
});


var initialiseSearchData = () => {

	// Initialise search data
	fetch(siteBaseUrl + "assets/js/JSON/search-data.json")
		.then(res => res.json())
		.then(data => {
			searchResult = data;
			displayResults(searchResult.filter(el => el.Keywords.toLowerCase().includes("installation") || el.Keywords.toLowerCase().includes("useage")));
	});

	// Initialise modal
	webuiSearchInput.val("");
	webuiSearchModal.open();
	webuiSearchResult.closest(".scroll-y")[0].scrollTop = 0;
};


let closeSearchModal = () => {
	webuiSearchModal.close();
};


let displayResults = (filteredResult, filteredContent) => {

	webuiSearchResult.removeChildren();

	if (filteredResult) {

		filteredResult.forEach(data => {

				
				ui(`<div class="color-accent-4 text-bold pad-bottom-sm">${data.Heading}</div>`).appendTo(webuiSearchResult);

				ui(`<div class="width-full margin-bottom-xs rounded-sm border-xs border-accent-5" id="webuiSearchHeadings"></div>`).appendTo(webuiSearchResult);


				data.IndexItems.forEach(item => {
					
					if (item.Heading !== null) {

						ui(`<a href="${siteBaseUrl}${item.Url}${item.SectionId}" 
						class="menu-button-link text-left pad-initial-bp-3-under" onclick="closeSearchModal()" tabindex="0">
						<div class="pad-sm search-block">${item.Heading}</div></a>`).appendTo("#webuiSearchHeadings");

					}

				});

		});

		if (webuiSearchInput.val() && webuiSearchInput.val().length > 1) {
			searchHighlighter.highlight(".search-block", webuiSearchInput.val());
		}
	}


	if (filteredContent) {

		filteredContent.forEach(data => {

				data.forEach(item => {

					//console.log(item)

					if (item.TextContent !== null) {

						let section = item.Url != null & item.Url.length ? ui.capitalizeFirstLetter(item.Url.split('/').pop().split('.').shift()) + " - " : "";

						ui(`<div class="color-accent-4 text-bold pad-bottom-sm">${section + item.Heading}</div>`).appendTo(webuiSearchResult);

						ui(`<div class="width-full margin-bottom-xs rounded-sm border-xs border-accent-5" id="webuiSearchHeadings"></div>`).appendTo(webuiSearchResult);
						
						ui(`<a href="${siteBaseUrl}${item.Url}${item.SectionId}" 
						class="menu-button-link text-left pad-initial-bp-3-under" onclick="closeSearchModal()" tabindex="0">
						<div class="pad-sm pad-top-md search-block">${item.TextContent}${item.HtmlContent}</div></a>`).appendTo("#webuiSearchHeadings");

					}
					
				});

		});

		if (webuiSearchInput.val() && webuiSearchInput.val().length > 1) {
			searchHighlighter.highlight(".search-block", webuiSearchInput.val());
		}
	}
	
};


webuiSearchInput.keyUp( (e) => {

	if (webuiSearchInput.val() && webuiSearchInput.val().length > 1) {

		// This returns all objects where the "Keywords" property includes any word in the search term.
		// The Keywords value originates from the H3 heading tags and H4 sub heading tags.
		// These results are the most relevant and highest priority.

		let filteredResult = searchResult.filter(x => x.Keywords.toLowerCase().includes(webuiSearchInput.val().toLowerCase().trim())).slice(0, 50);

		//console.log("RESULT", filteredResult);
		

		
		// This returns only IndexItemSets with IndexItems that include the search term in the "TextContent" property.
		// The TextContent value originates from paragraph, list and table text.
		// These results are the second highest prioriy and the broadest.

		let filteredContent = searchResult.map(function(indexItemSet) {
			return indexItemSet.IndexItems;
		})
		.filter(x => {
			return x.some(({TextContent}) => TextContent !== null && TextContent.toLowerCase().includes(webuiSearchInput.val().toLowerCase().trim())) ||
							x.some(({DataContent}) => DataContent !== null && DataContent.toLowerCase().includes(webuiSearchInput.val().toLowerCase().trim()));
		})		
		.map(function(indexItem) {
			return indexItem.filter(x => x.TextContent !== null && x.TextContent.toLowerCase().includes(webuiSearchInput.val().toLowerCase().trim()) ||
															x.DataContent !== null && x.DataContent.toLowerCase().includes(webuiSearchInput.val().toLowerCase().trim()));
		})
		.slice(0, 50);
			
		//console.log("CONTENT: ", filteredContent);


		displayResults(filteredResult, filteredContent);

		if ((!filteredResult || filteredResult.length === 0) && 
				(!filteredContent || filteredContent.length === 0)) {
			ui(`<div class="width-one-half rounded-sm border-xs border-accent-5">
						<div class="pad-lg search-block">No result found.</div>
					</div>`).appendTo(webuiSearchResult);
		}

	}
	else {
		webuiSearchResult.closest(".scroll-y")[0].scrollTop = 0;

		if (webuiSearchResult !== null) {		
			displayResults(searchResult.filter(el => el.Keywords.toLowerCase().includes("installation") || el.Keywords.toLowerCase().includes("useage")));
		}
	}

});


ui(".modal").on("ui.modal.show.after", (e) => {
	let scrollShift = Math.floor(ui.getScrollbarWidth()) + "px";

	webui("#homeInfoPanel").css("margin-right", scrollShift);
	webui(".nav-button-set").css("margin-right", scrollShift);
});

ui(".modal").on("ui.modal.hide.after", (e) => {
	webuiSearchInput.val("");

	webui("#homeInfoPanel").css("margin-right", 0);
	webui(".nav-button-set").css("margin-right", 0);
});
