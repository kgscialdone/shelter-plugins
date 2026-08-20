(function(exports) {

"use strict";

//#region plugins/gifpaste/index.jsx
const { flux: { subscribe }, observeDom, patcher } = shelter.plugin.scoped;
const { getFiber, reactFiberWalker } = shelter.util;
let unobserveGifPickerResults;
let closeExpressionPicker;
function onLoad() {
	closeExpressionPicker = findByExportedFunctionBodyContains(".setState({activeView:null")[1];
	subscribe("GIF_PICKER_INITIALIZE", () => {
		const textBox = reactFiberWalker(getFiber(document.querySelector("[class^=\"channelTextArea_\"] [class^=\"textArea_\"]")), "onPaste", true).pendingProps.ref.current;
		unobserveGifPickerResults = observeDom("#gif-picker-tab-panel [class^=\"results_\"] [class^=\"result_\"]:not([data-gifpaste-modded])", (elem) => {
			elem.dataset.gifpasteModded = true;
			const selectionHandler = reactFiberWalker(getFiber(elem), "onSelectGIF", true);
			patcher.instead("onSelectGIF", selectionHandler.pendingProps, ([{ url }]) => {
				textBox.insertText(url);
				closeExpressionPicker();
			});
		});
	});
	subscribe("GIF_PICKER_QUERY", () => setTimeout(() => {
		if (!document.querySelector("#gif-picker-tab-panel")) unobserveGifPickerResults?.();
	}));
}
const _wpmodules = webpackChunkdiscord_app.push([
	[Symbol()],
	{},
	(r) => r.c
]);
webpackChunkdiscord_app.pop();
function findByExportedFunctionBodyContains(codeString) {
	for (const m of Object.values(_wpmodules)) try {
		if (!m.exports || m.exports === window) continue;
		const exportedFunctions = Object.values(m.exports).filter((e) => e instanceof Function);
		for (const e of exportedFunctions) if (e.toString().includes(codeString)) return [m.exports, e];
	} catch {}
}

//#endregion
exports.onLoad = onLoad
return exports;
})({});