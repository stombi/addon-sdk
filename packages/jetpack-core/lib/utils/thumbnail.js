/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Jetpack.
 *
 * The Initial Developer of the Original Code is
 * the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Irakli Gozalishvili <gozala@mozilla.com> (Original Author)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"use strict";

const { Cc, Ci, Cu } = require("chrome");
const AppShellService = Cc["@mozilla.org/appshell/appShellService;1"].
  getService(Ci.nsIAppShellService);

const NS = "http://www.w3.org/1999/xhtml";
const COLOR = "rgb(255,255,255)";

/**
 * Creates canvas element with a thumbnail of the passed window.
 * @param {Window} window
 * @returns {Element}
 */
function thumbnailCanvas(window) {
  let aspectRatio = 0.5625; // 16:9
  let thumbnail = AppShellService.hiddenDOMWindow.document
                    .createElementNS(NS, "canvas");
  thumbnail.mozOpaque = true;
  thumbnail.width = Math.ceil(window.screen.availWidth / 5.75);
  thumbnail.height = Math.round(thumbnail.width * aspectRatio);
  let ctx = thumbnail.getContext("2d");
  let snippetWidth = window.innerWidth * .6;
  let scale = thumbnail.width / snippetWidth;
  ctx.scale(scale, scale);
  ctx.drawWindow(window, window.scrollX, window.scrollY, snippetWidth,
                snippetWidth * aspectRatio, COLOR);
  return thumbnail;
}
exports.thumbnailCanvas = thumbnailCanvas

/**
 * Creates Base64 encoded data URI of the thumbnail for the passed window.
 * @param {Window} window
 * @returns {String}
 */
exports.thumbnailURI = function thumbnailURI(window) {
  return thumbnailCanvas(window).toDataURL()
}
