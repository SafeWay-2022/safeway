"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/hello";
exports.ids = ["pages/api/hello"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "(api)/./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_HOST\": () => (/* binding */ API_HOST),\n/* harmony export */   \"CLIENT_HOST\": () => (/* binding */ CLIENT_HOST)\n/* harmony export */ });\nconst API_HOST = \"http://c4u-match-org.ew.r.appspot.com\";\nconst CLIENT_HOST = \"api/hello\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxNQUFNQSxRQUFRLEdBQUcsdUNBQXVDLENBQUM7QUFDekQsTUFBTUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dlZC1zYWZld2F5Ly4vY29uZmlnLmpzP2MyYjMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSV9IT1NUID0gXCJodHRwOi8vYzR1LW1hdGNoLW9yZy5ldy5yLmFwcHNwb3QuY29tXCI7XG5leHBvcnQgY29uc3QgQ0xJRU5UX0hPU1QgPSBcImFwaS9oZWxsb1wiO1xuIl0sIm5hbWVzIjpbIkFQSV9IT1NUIiwiQ0xJRU5UX0hPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./config.js\n");

/***/ }),

/***/ "(api)/./pages/api/hello.js":
/*!****************************!*\
  !*** ./pages/api/hello.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ \"(api)/./config.js\");\n\n\nasync function handler(req, res) {\n    try {\n        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(_config__WEBPACK_IMPORTED_MODULE_1__.API_HOST + \"/poi/\");\n        return res.status(200).json(data);\n    } catch (e) {\n        return res.status(400).json({\n            message: e.message\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvaGVsbG8uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQjtBQUNjO0FBRXpCLGVBQWVFLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxHQUFFLEdBQUcsTUFBTUwsZ0RBQVMsQ0FBQ0MsNkNBQVEsR0FBRyxPQUFPLENBQUM7UUFDcEQsT0FBT0csR0FBRyxDQUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ0gsSUFBSSxDQUFDLENBQUM7S0FDbkMsQ0FBQyxPQUFPSSxDQUFDLEVBQUU7UUFDVixPQUFPTCxHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVFLE9BQU8sRUFBRUQsQ0FBQyxDQUFDQyxPQUFPO1NBQUUsQ0FBQyxDQUFDO0tBQ3JEO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZWQtc2FmZXdheS8uL3BhZ2VzL2FwaS9oZWxsby5qcz8xZjc0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEFQSV9IT1NUIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQoQVBJX0hPU1QgKyBcIi9wb2kvXCIpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGUubWVzc2FnZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiQVBJX0hPU1QiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiZGF0YSIsImdldCIsInN0YXR1cyIsImpzb24iLCJlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/hello.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/hello.js"));
module.exports = __webpack_exports__;

})();