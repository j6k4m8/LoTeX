"use strict";
var _interpolate = function(str, args) {
    var regex = /\{\}/;
    var _r=function(p,c){return p.replace(regex,c);}
    return args.reduce(_r, str);
}

var syntaxes = {
    integral: {
        re: /\\int\^\{(.*)\}_\{(.*)\} (.*)/,
        template: "<div integral><div upperbound>{}</div><div lowerbound>{{}}</div><div of>{{}}</div></div>"
    },
    summation: {
        re: /\\sum\^\{(.*)\}_\{(.*)\} (.*)/,
        template: "<div summation><div upperbound>{{}}</div><div lowerbound>{{}}</div><div of>{{}}</div></div>"
    },
    fraction: {
        re: /\\frac\{(.*)\}\{(.*)\}/,
        template: "<div fraction><div top>{{}}</div><div bottom>{{}}</div></div>"
    },
    exponent: {
        re: /\{(.*)\}\^\{(.*)\}/,
        template: "{{}}<sup>{{}}</sup>"
    },
};

var compileSyntax = function(str) {
    var result = "";
    for (var key in syntaxes) {
        var match = str.match(syntaxes[key].re);
        if (match && match.length) {
            return _interpolate(
                syntaxes[key].template,
                match.slice(1)
            );
        }
    }
    return str;
}

var LoTeXParser = class LoTeXParser {
    constructor() { }




    progressHtml(str) {
        // check for remaining {}
        return str.replace(/\{(.*)\}/, compileSyntax)
        // matching {1}{2} but not \frac{1}{2} because of leading {...
    }




    compileEquation(str) {
        var result = "";
        while (result != this.progressHtml(str)) {
            result = this.progressHtml(str);
            console.log(result)
        }
        return result;
    }

}
