"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FullPageScroll;
var _react = _interopRequireWildcard(require("react"));
require("./css/Main.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function FullPageScroll(props) {
  const scrolling = (0, _react.useRef)(false);
  const dragging = (0, _react.useRef)(false);
  const currentPage = (0, _react.useRef)(0); // now page
  const totalPage = (0, _react.useRef)(0); // all page's length
  const outerDiv = (0, _react.useRef)(null);
  const contents = (0, _react.useRef)(null);
  const mouseScreenY = (0, _react.useRef)(0);
  const initMouseScreenY = (0, _react.useRef)(0);
  const pageHeight = (0, _react.useRef)(0);
  (0, _react.useEffect)(() => {
    var _outerDiv$current;
    totalPage.current = document.getElementById('outer').children.length;
    contents.current = document.getElementById('outer').children;
    outerDiv.current = document.getElementById('outer');
    pageHeight.current = (_outerDiv$current = outerDiv.current) === null || _outerDiv$current === void 0 || (_outerDiv$current = _outerDiv$current.children.item(0)) === null || _outerDiv$current === void 0 ? void 0 : _outerDiv$current.clientHeight; // 100vh(화면 세로 길이)

    outerDiv.current.addEventListener('wheel', handleWheel);
    outerDiv.current.addEventListener('touchstart', touchDown);
    outerDiv.current.addEventListener('toudchend', touchUp);
    outerDiv.current.addEventListener('touchmove', handleScroll);
    outerDiv.current.addEventListener('mousedown', mouseDown);
    outerDiv.current.addEventListener('mouseup', mouseUp);
    outerDiv.current.addEventListener('mousemove', handleMouse);
    return () => {
      outerDiv.current.removeEventListener('wheel', handleWheel);
      outerDiv.current.removeEventListener('touchstart', touchDown);
      outerDiv.current.removeEventListener('toudchend', touchUp);
      outerDiv.current.removeEventListener('touchmove', handleScroll);
      outerDiv.current.removeEventListener('mousedown', mouseDown);
      outerDiv.current.removeEventListener('mouseup', mouseUp);
      outerDiv.current.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  /**
   * Desktop mouse wheel
   * @param {*} e 
   */
  const handleWheel = e => {
    e.preventDefault();
    if (scrolling.current) return;
    const {
      deltaY
    } = e;
    if (deltaY < 0) scrollUp();else scrollDown();
  };
  const scrollUp = () => {
    if (currentPage.current === 0) return;
    currentPage.current -= 1;
    if (pageHeight.current && outerDiv.current) {
      window.scrollTo({
        top: pageHeight.current * currentPage.current,
        left: 0,
        behavior: "smooth"
      });
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  };
  const scrollDown = () => {
    if (currentPage.current === totalPage.current - 1) return;
    currentPage.current += 1;
    if (pageHeight.current && outerDiv.current) {
      window.scrollTo({
        top: pageHeight.current * currentPage.current,
        left: 0,
        behavior: "smooth"
      });
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  };
  const scrollBack = () => {
    window.scrollTo({
      top: pageHeight.current * currentPage.current,
      left: 0,
      behavior: "smooth"
    });
  };

  /**
   * Mobile touch
   * @param {*} e 
   */
  const touchDown = e => {
    console.log(e);
  };
  const touchUp = e => {
    console.log(e);
  };

  /**
   * Desktop mouse drag
   * @param {*} e 
   */
  const mouseDown = e => {
    mouseScreenY.current = e.screenY;
    initMouseScreenY.current = e.screenY;
    dragging.current = true;
  };
  const mouseUp = e => {
    const movedMouseY = e.screenY - initMouseScreenY.current;
    if (Math.abs(movedMouseY) > pageHeight.current / 2) {
      if (movedMouseY > 0) {
        scrollUp();
      } else {
        scrollDown();
      }
    } else {
      scrollBack();
    }
    dragging.current = false;
  };
  const handleScroll = e => {
    e.preventDefault();
  };
  const handleMouse = e => {
    let movedMouseY = e.screenY - mouseScreenY.current;
    if (dragging.current) {
      window.scrollBy(0, movedMouseY * -1);
      mouseScreenY.current = e.screenY;
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fp",
    id: 'outer'
  }, props === null || props === void 0 ? void 0 : props.children);
}