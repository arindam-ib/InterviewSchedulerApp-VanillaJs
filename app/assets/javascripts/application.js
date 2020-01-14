// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require_tree .

"use strict";

let template1 = `
<br><br><center>
<h1> The Interview Scheduler App</h1>
</center>
`;

let new_participant = `
  <br><br>
  <div id="new_participant">
    <b>New Participant</b>
    <form action="/" id="participant_form">
     <div class="form-group">
       <label for="name">Name</label>
       <input type="text" class="form-control" id="name">
     </div>
     <div class="form-group">
       <label for="name">Email</label>
       <input type="email" class="form-control" id="email">
     </div>
     <button type="submit" id="participant_submit" class="btn btn-default">Submit</button>
    </form>
    <br>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let new_interview = `
  <br><br>
  <h2>New Interview</h2>
  <br>
  <div id="new_interview">
    <form action="/" id="interview_form">
     <div class="form-group">
       <label for="title">Title</label>
       <input type="text" class="form-control" id="title">
     </div>
     <div class="form-group">
       <label for="participants">Participants</label>
       <input type="text" class="form-control" id="participants">
     </div>
     <div class="form-group">
       <label for="starttime">Start Time</label>
       <input type="datetime" class="form-control" id="starttime" value="2020-01-04T03:40">
     </div>
     <div class="form-group">
       <label for="endtime">End Time</label>
       <input type="datetime" class="form-control" id="endtime"  value="2020-01-04T03:40">
     </div>
     <div id="drop-area">
      <div class="my-form">
        <p>Upload file</p>
        <input type="file" id="fileElem">
      </div>
    </div>
    <br>
     <button type="submit" id="interview_submit" class="btn btn-default">Submit</button>
    </form>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let participants = `
  <br><br>
  <div class="container">
    <b>All Participants</b>
    <br><br>
    <div id="plist">
    </div>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let interviews = `
  <br><br>
  <div class="container">
    <b>All Interviews</b>
    <br><br>
    <div id="ilist">
    </div>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let interview = `
  <br><br>
  <div class="container">
    <b>Interview Detail</b>
    <br><br>
    <div id="ione">
    </div>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let interview_edit = `
  <br><br>
  <h2> Edit Interview </h2>
  <br>
  <div id="edit_interview">
    <form action="/" id="edit_interview_form">
     <div class="form-group">
       <label for="title">Title</label>
       <input type="text" class="form-control" id="edit_title">
     </div>
     <div class="form-group">
       <label for="participants">Participants</label>
       <input type="text" class="form-control" id="edit_participants">
     </div>
     <div class="form-group">
       <label for="starttime">Start Time</label>
       <input type="datetime" class="form-control" id="edit_starttime" value="2020-01-04T03:40">
     </div>
     <div class="form-group">
       <label for="endtime">End Time</label>
       <input type="datetime" class="form-control" id="edit_endtime"  value="2020-01-04T03:40">
     </div>
     <button type="submit" id="edit_interview_submit" class="btn btn-default">Submit</button>
    </form>
  </div>
  <br>
  <a href="/#/">Back</a>
`;

let interview_delete = `

  <a href="/#/" id="back">Back</a>
`;

let routes = {
  '/': template1,
  '/new_participant': new_participant,
  '/new_interview': new_interview,
  '/participants': participants,
  '/interviews': interviews,
  '/interviews/:id': interview,
  '/interviews/:id/edit': interview_edit,
  '/interviews/:id/delete': interview_delete,

};

let contentDiv = document.getElementById("content");
// navbarParticipant = document.getElementById("a1")
// navbarParticipant.addEventListener("click", showParticipants);
// navbarInterview = document.getElementById("a2")
// navbarInterview.addEventListener("click", showInterviews);

// participants = document.getElementById("participants");
// interviews = document.getElementById("interviews");

function parseRequestURL(){

    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]

    return request
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = () => {

    contentDiv = document.getElementById("content");
    // Get the parsed URl from the addressbar
    let request = parseRequestURL();
    // console.log(request);
    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL];
    contentDiv.innerHTML = page;

    if(parsedURL == '/new_participant')
    {
      const xhr = new XMLHttpRequest();
      // interviews.style.display = 'none';
      // participants.style.display = 'block';
      document.getElementById("participant_submit").addEventListener("click", function(event){
        event.preventDefault();
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        console.log(name+" "+email);
        let data = "name="+name+"&"+"email="+email;
        const url = 'http://127.0.0.1:3004/api/v1/participants';
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
        xhr.onreadystatechange = (e) => {
         console.log(xhr.responseText)
        }
      });
    }

    if(parsedURL == '/participants')
    {
      const xhr = new XMLHttpRequest();
      const url='http://127.0.0.1:3004/api/v1/participants';
      xhr.open("GET", url);
      xhr.send();
      var getData = [];
      xhr.onreadystatechange = (e) => {
       getData = JSON.parse(xhr.responseText);
       // console.log(getData);
       let plist = "";
       for ( var i=0; i < getData.length; i+=1 )
       {
         plist += "<p>" + getData[i].name + " <----> " + getData[i].email + "</p><br/>" ;
       }
       document.getElementById("plist").innerHTML = plist;
      }
    }

    if(parsedURL == '/new_interview')
    {
      const xhr = new XMLHttpRequest();
      // let dropArea = document.getElementById('drop-area');
      // ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      //   dropArea.addEventListener(eventName, preventDefaults, false)
      // });
      // function preventDefaults (e) {
      //   e.preventDefault()
      //   e.stopPropagation()
      // }
      // ['dragenter', 'dragover'].forEach(eventName => {
      //   dropArea.addEventListener(eventName, highlight, false)
      // });
      //
      // ['dragleave', 'drop'].forEach(eventName => {
      //   dropArea.addEventListener(eventName, unhighlight, false)
      // });
      //
      // function highlight(e) {
      //   dropArea.classList.add('highlight')
      // }
      //
      // function unhighlight(e) {
      //   dropArea.classList.remove('highlight')
      // }
      //
      // dropArea.addEventListener('drop', handleDrop, false)
      //
      // function handleDrop(e) {
      //
      //   let dt = e.dataTransfer;
      //   let files = dt.files;
      //   handleFiles(files);
      // }
      //
      // function handleFiles(files) {
      //   ([...files]).forEach(uploadFile);
      // }
      //
      // let formData = new FormData();
      // function uploadFile(file) {
      //   formData.append('file', file);
      // }
      var file;
      let formData = null;
      document.getElementById('fileElem').addEventListener('change', function(e) {
        file = this.files[0];
        console.log(file);

        formData = new FormData();

        formData.append('file', file, 'pic1.png');
        console.log(formData);

    }, false);

      // interviews.style.display = 'none';
      // participants.style.display = 'block';
      document.getElementById("interview_submit").addEventListener("click", function(event){
        event.preventDefault();
        var title = document.getElementById("title").value
        var participants = document.getElementById("participants").value
        var starttime = document.getElementById("starttime").value
        var endtime = document.getElementById("endtime").value
        let data = {
          "title": title,
          "participant_ids": participants.split(","),
          "starttime": starttime,
          "endtime": endtime,
          "attachment": formData,
        };

        const url = 'http://127.0.0.1:3004/api/v1/interviews';
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = (e) => {
         console.log(xhr.responseText);
         document.getElementById("a4").click();
        }
      });
    }

    if(parsedURL == '/interviews')
    {
      const xhr = new XMLHttpRequest();
      const url='http://127.0.0.1:3004/api/v1/interviews';
      xhr.open("GET", url);
      xhr.send();
      var getData = [];
      xhr.onreadystatechange = (e) => {
       getData = JSON.parse(xhr.responseText);
       // console.log(getData);
       let ilist = "";
       for ( var i=0; i < getData.length; i+=1 )
       {
         let plist = " | ";
         for( var j=0;j<getData[i].participants.length;j+=1)
         {
           plist += getData[i].participants[j].email + " | ";
         }
        //  if(getData[i].attachment)
        //   ilist += "<p>" + getData[i].id + " <----> " + getData[i].title + " <----> " + getData[i].starttime + " <----> " + getData[i].endtime + " <----> " + plist + " <----> " + getData[i].attachment + "&nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "'>Show</a> &nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "/edit'>Edit</a> &nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "/delete'>Delete</a> </p><br>" ;
        // else {
          ilist += "<p>" + getData[i].id + " <----> " + getData[i].title + " <----> " + getData[i].starttime + " <----> " + getData[i].endtime + " <----> " + plist + "&nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "'>Show</a> &nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "/edit'>Edit</a> &nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData[i].id.toString() + "/delete'>Delete</a> </p><br/>" ;
        //}
       }
       document.getElementById("ilist").innerHTML = ilist;
      }
    }

    if(parsedURL == '/interviews/:id')
    {
      const xhr = new XMLHttpRequest();
      const url='http://127.0.0.1:3004/api/v1/interviews/'+request.id.toString().slice(1);
      console.log(url);
      xhr.open("GET", url);
      xhr.send();
      var getData = [];
      xhr.onreadystatechange = (e) => {
       getData = JSON.parse(xhr.responseText);
       console.log(getData);
       let ilist = "";
       let plist = " | ";
       for( var j=0;j<getData.participants.length;j+=1)
       {
         plist += getData.participants[j].email + " | ";
       }
       ilist += "<p> Id = " + getData.id + " <br> " + "Title = " + getData.title + " <br> " + "Start Time = " + getData.starttime + " <br> " + "End Time = " + getData.endtime + " <br> " + "Participants = " + plist + "<br> <a href='/#/interviews/:" + getData.id.toString() + "/edit'>Edit</a> &nbsp;&nbsp;&nbsp;&nbsp <a href='/#/interviews/:" + getData.id.toString() + "/delete'>Delete</a> </p><br/>" ;
       document.getElementById("ione").innerHTML = ilist;
      }
    }

    if(parsedURL == '/interviews/:id/edit')
    {
      const xhr = new XMLHttpRequest();
      const url='http://127.0.0.1:3004/api/v1/interviews/'+request.id.toString().slice(1);
      console.log(url);
      xhr.open("GET", url);
      xhr.send();
      var getData = [];

      xhr.onreadystatechange = (e) => {
       getData = JSON.parse(xhr.responseText);
       console.log(getData);
       let ilist = "";
       let plist = "";
       for( var j=0;j<getData.participants.length;j+=1)
       {
         plist += ","+getData.participants[j].email;
       }
       document.getElementById("edit_title").value = getData.title;
       document.getElementById("edit_participants").value = plist.slice(1);
       document.getElementById("edit_starttime").value = getData.starttime;
       document.getElementById("edit_endtime").value = getData.endtime;
       document.getElementById("edit_interview_submit").addEventListener("click", function(event){
         event.preventDefault();
         var title = document.getElementById("edit_title").value
         var participants = document.getElementById("edit_participants").value
         var starttime = document.getElementById("edit_starttime").value
         var endtime = document.getElementById("edit_endtime").value
         let data = {
           "title": title,
           "participant_ids": participants.split(","),
           "starttime": starttime,
           "endtime": endtime
         };

         const url = 'http://127.0.0.1:3004/api/v1/interviews/'+request.id.toString().slice(1);
         xhr.open("PUT", url);
         xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
         xhr.send(JSON.stringify(data));
         xhr.onreadystatechange = (e) => {
          console.log(xhr.responseText);
          document.getElementById("a4").click();
         }
       });
      }
    }

    if(parsedURL == '/interviews/:id/delete')
    {
      const xhr = new XMLHttpRequest();
      const url='http://127.0.0.1:3004/api/v1/interviews/'+request.id.toString().slice(1);
      console.log(url);
      xhr.open("DELETE", url);
      xhr.send();
      setTimeout(function(){ document.getElementById("a4").click(); }, 500);

    }

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

// window.onpopstate = () => {
//   contentDiv.innerHTML = routes[window.location.pathname];
// }



 function showParticipants(){
   console.log("HI");
   // pathName = "/participant";
   // window.history.pushState(
   //   {},
   //   pathName,
   //   window.location.origin + pathName
   // );
   // contentDiv.innerHTML = routes[pathName];
 }


 function showInterviews(){
    interviews.style.display = 'block';
    participants.style.display = 'none';

 }
