/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function openNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Form

// dom variables
var msf_getFsTag = document.getElementsByTagName("fieldset");

// declaring the active fieldset & the total fieldset count
var msf_form_nr = 0;
var fieldset = msf_getFsTag[msf_form_nr];
fieldset.className = "msf_show";

// creates and stores a number of bullets
var msf_bullet_nr = "<div class='msf_bullet'></div>";
var msf_length = msf_getFsTag.length;
for (var i = 1; i < msf_length; ++i) {
    msf_bullet_nr += "<div class='msf_bullet'></div>";
};
// injects bullets
var msf_bullet_o = document.getElementsByClassName("msf_bullet_o");
for (var i = 0; i < msf_bullet_o.length; ++i) {
    var msf_b_item = msf_bullet_o[i];
    msf_b_item.innerHTML = msf_bullet_nr;
};

// removes the first back button & the last next button
document.getElementsByName("back")[0].className = "msf_hide";
document.getElementsByName("next")[msf_bullet_o.length - 1].className = "msf_hide";

// Makes the first dot active
var msf_bullets = document.getElementsByClassName("msf_bullet");
msf_bullets[msf_form_nr].className += " msf_bullet_active";

// Validation loop & goes to the next step
function msf_btn_next() {
    var msf_val = true;

    var msf_fs = document.querySelectorAll("fieldset")[msf_form_nr];
    var msf_fs_i_count = msf_fs.querySelectorAll("input").length;

    for (i = 0; i < msf_fs_i_count; ++i) {
        var msf_input_s = msf_fs.querySelectorAll("input")[i];
        if (msf_input_s.getAttribute("type") === "button") {
            // nothing happens
        } else {
            if (msf_input_s.value === "") {
                msf_input_s.style.backgroundColor = "pink";
                msf_val = false;
            } else {
                if (msf_val === false) {} else {
                    msf_val = true;
                    msf_input_s.style.backgroundColor = "lime";
                }
            }
        };
    };
    if (msf_val === true) {
        // goes to the next step
        var selection = msf_getFsTag[msf_form_nr];
        selection.className = "msf_hide";
        msf_form_nr = msf_form_nr + 1;
        var selection = msf_getFsTag[msf_form_nr];
        selection.className = "msf_show";
        // refreshes the bullet
        var msf_bullets_a = msf_form_nr * msf_length + msf_form_nr;
        msf_bullets[msf_bullets_a].className += " msf_bullet_active";
    }
};

// goes one step back
function msf_btn_back() {
    msf_getFsTag[msf_form_nr].className = "msf_hide";
    msf_form_nr = msf_form_nr - 1;
    msf_getFsTag[msf_form_nr].className = "msf_showhide";
};

// Submit button functionality
function endpoint() {

    // Create keys to store names and location
    // Find out how many items are in local storage, then add 1
    let key_firstName = "key_firstName";
    let key_lastName = "key_lastName";
    let key_city = "key_city";
    let key_country = "key_country";

    // Store the value of the name inputs title as variables
    let val_firstName = document.getElementById("firstname").value;
    let val_lastName = document.getElementById("lastname").value;
    let val_city = document.getElementById("city").value;
    let val_country = document.getElementById("country").value;

    // Add the key/value pair to localStorage
    localStorage.setItem(key_firstName, val_firstName);
    localStorage.setItem(key_lastName, val_lastName);
    localStorage.setItem(key_city, val_city);
    localStorage.setItem(key_country, val_country)

    // Go to endpoint page
    location.href = "endpoint.html";

}

// Update profile on endpage using localStorage values
function updateProfile() {

    // Create keys to access local storage values
    let key_firstName = "key_firstName";
    let key_lastName = "key_lastName";
    let key_city = "key_city";
    let key_country = "key_country";

    // Access local storage values
    let firstName = localStorage.getItem(key_firstName);
    let lastName = localStorage.getItem(key_lastName);
    let city = localStorage.getItem(key_city);
    let country = localStorage.getItem(key_country);

    // Replace null values
    if (!firstName) {
        firstName = "FirstName"
    }
    if (!lastName) {
        lastName = "LastName"
    }
    if (!city) {
        city = "City"
    }
    if (!country) {
        country = "Country"
    }

    // Create a new textnode for full name and location
    let fullName = document.createTextNode(firstName + " " + lastName);
    let location = document.createTextNode(city + ", " + country);
    let welcomeMsg = document.createTextNode("Welcome to the unearthed family, " + firstName + "!");

    // Get first child node of 'profile-name' class
    // Get first child node of 'profile-location' class
    // Get first child node of 'greeting-msg' id
    let profileName = document.getElementsByClassName("profile-name")[0];
    let profileLocation = document.getElementsByClassName("profile-location")[0];
    let profileMsg = document.getElementById("greeting-msg");

    // Replace first child node of 'profile-name' class with newly created fullName text node
    // Replace first child node of 'profile-location' class with newly created profileLocation text node
    // Replace first child node of 'greeting-msg' id with newly created profileMsg text node
    profileName.replaceChild(fullName, profileName.childNodes[0]);
    profileLocation.replaceChild(location, profileLocation.childNodes[0]);
    profileMsg.replaceChild(welcomeMsg, profileMsg.childNodes[0]);

}

// Function for logout button on endpoint page
function logout() {

    // Clear localStorage data
    localStorage.clear();

    // Go to index page
    location.href = "index.html";
}