function callback(mutations) {
	for (let badelement of mutations[0]["target"].querySelectorAll(".bad")) {
		badelement.remove();
	}
}
let observer = new MutationObserver(callback);
observer.observe(document.body, {childList: true,subtree:true,characterData:true,characterDataOldValue:true});
	