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

function renderCourses(selectedSemester){
    const allCourses = document.getElementsByClassName("ic-DashboardCard");
    for(let course of allCourses){
      const currentSemester = course.getElementsByClassName("ic-DashboardCard__header-term ellipsis")[0].innerText;

      if(currentSemester == selectedSemester || selectedSemester == "all"){
          course.style = "display: inline-block";
      } else {
           course.style = "display: none";
      }
  }
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
      const sideBar = document.getElementById('right-side');
      const data = document.getElementsByClassName('ic-DashboardCard__header-term');
      const semesters = [];
      let semesterSelect = '';
      for(var semester of data){
          if(!semesters.includes(semester.getAttribute('title'))){
              semesters.push(semester.getAttribute('title'));
              semesterSelect += `<option value="${semester.getAttribute('title')}">${semester.getAttribute('title')}</option>`;
          }
      }

      let selectBox = document.createElement('div');
      selectBox.id = "JTB_felev_select_box";
      selectBox.innerHTML = `<h2>Semester:</h2><select id="selectSemester">${semesterSelect}<option value="all">All</option></select>`;

       sideBar.parentNode.insertBefore(selectBox, sideBar);

      const selectSemester = document.getElementById("selectSemester");

      selectSemester.options.selectedIndex = (semesters.length -1);

      renderCourses(selectSemester.value);

      selectSemester.addEventListener('change', function() {
          renderCourses(this.value);
      });


  }, false);
})();