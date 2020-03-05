// ==UserScript==
// @name         CanvasLMS Semester Choice
// @namespace    https://github.com/JohnTheBoss/CanvasLMS-Semester-Choice
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/JohnTheBoss/CanvasLMS-Semester-Choice/master/csc.js
// @downloadURL  https://raw.githubusercontent.com/JohnTheBoss/CanvasLMS-Semester-Choice/master/csc.js
// @description  CanvasLMS Semester Choice
// @author       JohnTheBoss
// @match        https://canvas.elte.hu
// @grant        none
// ==/UserScript==

function RenderTargyak(selectedFelev){
      const OsszesTargy = document.getElementsByClassName("ic-DashboardCard");
      for(let i = 0; i< OsszesTargy.length; i++){
        let melyikFelev = OsszesTargy[i].getElementsByClassName("ic-DashboardCard__header-term ellipsis")[0].getAttribute("title");

        if(melyikFelev === selectedFelev || selectedFelev === "all"){
            OsszesTargy[i].style = "display: inline-block";
        } else {
             OsszesTargy[i].style = "display: none";
        }
    }
}

(function() {
    'use strict';

    const SideBar = document.getElementById("right-side");
    const osszesFelev = document.getElementsByClassName("ic-DashboardCard__header-term ellipsis");
    let felevek = [];
    let FelevSelect = "";

    // console.log(osszesFelev.length);
    // console.log(osszesFelev);

    for(let i = 0; i<osszesFelev.length; i++){
        console.log(osszesFelev[i]);
        let felev = osszesFelev[i].getAttribute("title");
        if(!felevek.includes(felev)){
            felevek.push(felev);
            FelevSelect += `<option value="${felev}">${felev}</option>`;
        }
    }

    let selectBox = document.createElement('div');
    selectBox.id = "JTB_felev_select_box";
    selectBox.innerHTML = `<h2>Semester:</h2><select id="selectFelev">${FelevSelect}<option value="all">All</option></select>`;

    SideBar.parentNode.insertBefore(selectBox, SideBar);

    const selectFelev = document.getElementById("selectFelev");

    selectFelev.options.selectedIndex = (felevek.length -1);

    RenderTargyak(selectFelev.value);

    selectFelev.addEventListener('change', function() {
        RenderTargyak(this.value);
    });
})();
