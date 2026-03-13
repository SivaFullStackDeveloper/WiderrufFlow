/* ===============================
   RevFlow Profile Controller
   Frontend-only functionality
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadProfile();
generateTokenIfMissing();
generateInstallCode();
bindEvents();

});


/* ===============================
   LOAD PROFILE DATA
================================ */

function loadProfile(){

setValue("profile-token",localStorage.getItem("rf_token"));
setValue("profile-company",localStorage.getItem("rf_company"));
setValue("profile-domain",localStorage.getItem("rf_domain"));
setValue("profile-entity",localStorage.getItem("rf_entity"));
setValue("profile-webhook",localStorage.getItem("rf_webhook"));

let color = localStorage.getItem("rf_color") || "#2563eb";

setValue("profile-color",color);

document.documentElement.style.setProperty("--primary",color);

}


/* ===============================
   SAVE PROFILE
================================ */

function saveProfile(){

saveItem("rf_company","profile-company");
saveItem("rf_domain","profile-domain");
saveItem("rf_entity","profile-entity");
saveItem("rf_webhook","profile-webhook");
saveItem("rf_color","profile-color");

let color = document.getElementById("profile-color").value;

document.documentElement.style.setProperty("--primary",color);

toast("Profile Saved");

}


/* ===============================
   TOKEN GENERATOR
================================ */

function generateTokenIfMissing(){

let token = localStorage.getItem("rf_token");

if(!token){

token="rf_live_"+Math.random().toString(36).substring(2,18);

localStorage.setItem("rf_token",token);

}

setValue("profile-token",token);

}


/* ===============================
   INSTALL CODE GENERATOR
================================ */

function generateInstallCode(){

let token = localStorage.getItem("rf_token");

let code =
'<script src="https://widerrufflow.onrender.com/widerrufflow.js" data-token="'+token+'" defer><\/script>';

let box=document.getElementById("installCode");

if(box) box.value=code;

}


/* ===============================
   COPY INSTALL CODE
================================ */

function copyInstallCode(){

let box=document.getElementById("installCode");

navigator.clipboard.writeText(box.value);

toast("Install code copied");

}


/* ===============================
   DOMAIN VALIDATION
================================ */

function validateDomain(){

let domain=document.getElementById("profile-domain").value;

try{

new URL(domain);

toast("Domain format valid");

}catch{

toast("Invalid domain format");

}

}


/* ===============================
   WEBHOOK VALIDATION
================================ */

function validateWebhook(){

let url=document.getElementById("profile-webhook").value;

try{

new URL(url);

toast("Webhook URL valid");

}catch{

toast("Invalid webhook URL");

}

}


/* ===============================
   BRAND COLOR LIVE PREVIEW
================================ */

function bindEvents(){

let colorInput=document.getElementById("profile-color");

if(colorInput){

colorInput.addEventListener("input",function(){

document.documentElement
.style.setProperty("--primary",this.value);

});

}

}


/* ===============================
   DOMAIN VERIFICATION SIMULATION
================================ */

function verifyDomain(){

let success = Math.random() > 0.3;

if(success){

toast("Domain Verified");

}else{

toast("Verification Failed");

}

}


/* ===============================
   PORTAL PREVIEW
================================ */

function openPortalPreview(){

let color = localStorage.getItem("rf_color") || "#2563eb";
let company = localStorage.getItem("rf_company") || "Your Company";

let w = window.open("","portalPreview","width=500,height=700");

w.document.write(`
<style>
body{
font-family:Arial;
padding:40px;
background:#f5f7fb;
}
button{
background:${color};
color:white;
border:none;
padding:12px 20px;
border-radius:6px;
font-size:16px;
}
</style>

<h2>${company}</h2>
<p>Customer withdrawal portal</p>
<button>Widerruf / Rückgabe</button>
`);

}


/* ===============================
   HELPERS
================================ */

function setValue(id,value){

let el=document.getElementById(id);

if(el && value) el.value=value;

}

function saveItem(key,id){

let el=document.getElementById(id);

if(el) localStorage.setItem(key,el.value);

}


/* ===============================
   TOAST MESSAGE
================================ */

function toast(msg){

let t=document.createElement("div");

t.innerText=msg;

Object.assign(t.style,{
position:"fixed",
bottom:"30px",
right:"30px",
background:"#111",
color:"#fff",
padding:"12px 18px",
borderRadius:"6px",
fontSize:"14px",
zIndex:9999
});

document.body.appendChild(t);

setTimeout(()=>t.remove(),2500);

}