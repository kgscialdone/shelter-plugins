(function(exports) {

"use strict";

//#region plugins/gifpaste/index.jsx
const { flux: { subscribe }, observeDom, patcher } = shelter.plugin.scoped;
const { getFiber, reactFiberWalker } = shelter.util;
function onLoad() {
	const closeExpressionPicker = findByExportedFunctionBodyContains(".setState({activeView:null")[1];
	subscribe("GIF_PICKER_INITIALIZE", () => {
		const textBox = reactFiberWalker(getFiber(document.querySelector("[class^=\"channelTextArea_\"] [class^=\"textArea_\"]")), "onPaste", true).pendingProps.ref.current;
		const unobserve = observeDom("#gif-picker-tab-panel > [class^=\"content_\"]", (elem) => {
			const selectionHandler = reactFiberWalker(getFiber(elem), "onSelectGIF", true);
			const doSelectGIF = ([{ url }]) => {
				textBox.insertText(url);
				textBox.focus();
				closeExpressionPicker();
			};
			patcher.instead("onSelectGIF", selectionHandler.pendingProps, doSelectGIF);
			patcher.instead("onSelectGIF", selectionHandler.return.pendingProps, doSelectGIF);
			unobserve();
		});
	});
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