
// <!-- ================================== custom scripts  ==================================-->

// ***************************************** header *****************************************
// for changing theme Dark/Light
let root = document.querySelector(":root");
let themeSwitchBtn = document.querySelector("#theme_changer input");
let themeSwitchIcon = document.querySelector("#theme_changer .material-icons");
let darkTheme = "dark_mode";
let lightTheme = "light_mode";

$("#theme_changer").click(function () {

    $(root).toggleClass('dark');

    if ($(root).hasClass("dark")) {
        $(themeSwitchBtn).prop('checked', true);
        themeSwitchIcon.innerHTML = darkTheme;
    } else {
        $(themeSwitchBtn).prop('checked', false);
        themeSwitchIcon.innerHTML = lightTheme;
    }
})

// Closing Opening Submenu
$(document).ready(function () {
    // Toggle the "open" class when clicking on the "header_menu_icon"
    $('.header_menu_icon').on('click', function (event) {
        var headerMenu = $(this).closest('.header_menu');

        // Close all other open menus
        $('.header_menu.open').not(headerMenu).removeClass('open');

        // Toggle the "open" class on the clicked "header_menu"
        headerMenu.toggleClass('open');
        event.stopPropagation();
    });

    // Remove the "open" class when clicking outside the "header_menu"
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.header_menu').length) {
            $('.header_menu').removeClass('open');
        }
    });
});


// ******************************************* Main Section *******************************************
// setting main section height according to device height
window.addEventListener('resize', setMainHeight);
window.addEventListener('DOMContentLoaded', setMainHeight);

function setMainHeight() {
    let bodyElement = document.querySelector('body');
    let headerElement = document.querySelector('header');

    let maincontentHeight = bodyElement.clientHeight - headerElement.clientHeight;
    // $(".main-section").css("max-height", maincontentHeight);
    $(".main-section").css("height", maincontentHeight);
}

// ******************************************* Sidenav *******************************************
// Sidenav Submenu Toggle button highlight
let submenuBtn = document.getElementsByClassName('submenu_toggle_btn');
let submenuContainer = document.getElementsByClassName('sidenav_submenu_container');
let openedSubmenu = null; // To store the reference to the currently opened submenu

for (let i = 0; i < submenuContainer.length; i++) {
    $(submenuBtn[i]).click(function () {
        if (openedSubmenu !== submenuContainer[i]) {
            // Close the previously opened submenu (if any)
            if (openedSubmenu) {
                $(openedSubmenu).slideUp(150);
                $(openedSubmenu.previousElementSibling).removeClass("open");
            }

            // Open the clicked submenu
            $(submenuBtn[i]).addClass("open");
            $(submenuContainer[i]).slideDown("fast");
            openedSubmenu = submenuContainer[i];
        } else {
            // Toggle the currently opened submenu
            $(submenuBtn[i]).toggleClass("open");
            $(submenuContainer[i]).slideToggle("fast");
            openedSubmenu = $(submenuBtn[i]).hasClass("open") ? submenuContainer[i] : null;
        }
    });
}

// sidenav submenu highlight 
let submenuBtns = document.getElementsByClassName('sidenav_submenu');
let openedSubmenuBtn = null;

for (let i = 0; i < submenuBtns.length; i++) {
    submenuBtns[i].addEventListener('click', function () {
        if (openedSubmenuBtn !== this) {
            // Remove the "open" class from the previously opened submenu button
            if (openedSubmenuBtn) {
                openedSubmenuBtn.classList.remove("active");
            }

            // Toggle the "open" class for the clicked submenu button
            this.classList.add("active");
            openedSubmenuBtn = this;
        }
    });
}

// sidenav slide left/right toggle
$(".sidenav_menu.slide_btn").click(function () {
    // $(".sidenav.main-section").toggleClass("slide_active");
})

// for activating related Sidenav menu according to URL() Path
$(function () {

    var url = window.location.pathname,
        urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
    // now grab every link from the navigation
    $('.sidenav_menu').each(function () {
        // and test its normalized href against the url pathname regexp
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).addClass('active');
        }
    });
});


//for filtering sidenav menu on Searchbox input
const replaceFormat = /[^a-zA-Z0-9]/g; // Remove any dots, slashes, and whitespaces

// Cache the jQuery elements for better performance
const $sidenavSubmenus = $('.sidenav_submenu');
const $sidenavMenuContainers = $('.sidenav_menu_container');

function filterMenu(inputValue) {
    var searchString = inputValue.value.replace(replaceFormat, '').toLowerCase();

    // Show/hide "sidenav_submenu" based on text matching the search term
    $sidenavSubmenus.each(function () {
        var submenuText = $(this).text().replace(replaceFormat, '').toLowerCase();
        var isVisible = submenuText.includes(searchString);
        $(this).toggle(isVisible);
    });

    // Show/hide "sidenav_menu_container" based on child "sidenav_submenu" text matching the search term
    $sidenavMenuContainers.each(function () {
        var hasMatchingChild = $(this).find('.sidenav_submenu').filter(function () {
            var childText = $(this).text().replace(replaceFormat, '').toLowerCase();
            return childText.includes(searchString);
        }).length > 0;
        $(this).toggle(hasMatchingChild);
    });
}

//Clearing the searchbox
function clearSearchBox() {
    var searchBox = $('.menusearchbox');
    searchBox.val(''); // Clear the search box
    filterMenu(searchBox[0]);
}

// ******************************************* Content *******************************************
//Alert Message Copy
$(document).ready(function () {
    $(document).on('click', '.alert_msg_copy_btn', function () {
        // Get the corresponding "alert_msg_container" for the clicked button
        var $alertMsgContainer = $(this).closest('.alert').find('.alert_msg_container');

        // Select the text inside the "alert_msg_container" div
        var textToCopy = $alertMsgContainer.text().trim();

        // Save a reference to the clicked element (copy button)
        var $clickedBtn = $(this);

        // Use the Clipboard API to copy the text to the clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(function () {
                // Success! The text was copied to the clipboard.
                showTooltip('Copied', $clickedBtn);
            })
            .catch(function (error) {
                // An error occurred while copying the text.
                console.error('Error copying text:', error);
            });
    });

    function showTooltip(text, targetElement) {
        var tooltip = $('<div class="copy_tooltip">' + text + '</div>');
        targetElement.append(tooltip);

        // var tooltipPosition = targetElement.position();
        // tooltip.css({
        //     top: tooltipPosition.top - tooltip.outerHeight(),
        //     left: tooltipPosition.left + (targetElement.outerWidth() - tooltip.outerWidth()) / 2
        // });

        setTimeout(function () {
            tooltip.fadeOut(function () {
                tooltip.remove();
            });
        }, 500);
    }
});


// for scrooling to top in main section content
$("a[href='#go_top']").click(function () {
    $(".content").scrollTop(0);
    return false;
});

// read more or less text in post description
function AddReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 300;
    // Text to show when text is collapsed
    var readMoreTxt = "... Read More";
    // Text to show when text is expanded
    var readLessTxt = " Read Less";

    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".addReadMore").each(function () {
        if ($(this).find(".firstSec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'>" + readMoreTxt + "</span><span class='readLess'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }

    });
    //Read More and Read Less Click Event binding
    $(document).on("click", ".readMore,.readLess", function () {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}
$(function () {
    //Calling function after Page Load
    AddReadMore();
});

// for zooming post image
let postImage = document.getElementsByClassName('post-content-image');
let fullscreenIcon = document.getElementsByClassName('image-fullscreen');
for (let i = 0; i < postImage.length; i++) {

    $(postImage[i], fullscreenIcon[i]).click(function () {

        $(this).toggleClass("zoom_post-image");

    });
    $(fullscreenIcon[i]).click(function () {

        $(postImage[i]).toggleClass("zoom_post-image");

    });

    // for closing fullscreen view on pressing ESC
    $(document).keydown(function (e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            $(postImage[i]).removeClass("zoom_post-image");
        }
    });
}

// post comment box toggle slide up/down
let postEdit = document.getElementsByClassName('post-edit');
let postContent = document.getElementsByClassName('post-content');
let commentBox = document.getElementsByClassName('post-comment-section');
let commentBoxToggleBtn = document.getElementsByClassName('comment_box_toggle_btn');
let commentBoxToggleBtn2 = document.getElementsByClassName('comment_box_toggle_btn2');

for (let i = 0; i < commentBoxToggleBtn.length; i++) {

    $(commentBoxToggleBtn[i]).click(function () {
        $(commentBox[i]).slideToggle(300);
        $(postContent[i]).slideToggle(300);
        $(postEdit[i]).slideToggle(300);
    });

    $(commentBoxToggleBtn2[i]).click(function () {
        $(commentBox[i]).slideToggle(300);
        $(postContent[i]).slideToggle(300);
        $(postEdit[i]).slideToggle(300);
    });
}

// for reply comment connection lines
let replyToggleBtn = document.querySelectorAll('details summary');
for (let i = 0; i < replyToggleBtn.length; i++) {
    replyToggleBtn[i].addEventListener('click',
        function () {
            // replyToggleBtn[i].parentElement.parentElement.parentElement.classList.toggle("replies_open");
            replyToggleBtn[i].closest('.comment').classList.toggle("replies_open");
        });
}

// ************** check if textarea is empty **************
// if empty disable post button
// if not empty enable post button
let inputText = document.getElementById("post_textarea");
let formSubmitBtn = document.getElementById("post_submit_btn");
let formCancelBtn = document.getElementById("post_cancel_btn");
function checkifFormIsEmpty() {
    if ($(inputText).val().trim().length || isEmpty == false) {
        $(formSubmitBtn).attr("disabled", false);
        $(formCancelBtn).attr("disabled", false);
    } else {
        $(formSubmitBtn).attr("disabled", true);
        $(formCancelBtn).attr("disabled", true);
    }
}
// setInterval(checkifFormIsEmpty, 500);

//  *********************Textarea text formatting *********************
var postTextArea = document.getElementById("post_textarea");
function boldText() {
    if (postTextArea.style.fontWeight == "bolder") {
        postTextArea.style.fontWeight = "initial";
    } else {
        postTextArea.style.fontWeight = "bolder";
    }
}

function italicText() {
    if (postTextArea.style.fontStyle == "italic") {
        postTextArea.style.fontStyle = "normal";
    } else {
        postTextArea.style.fontStyle = "italic";
    }
}

function underlineText() {
    if (postTextArea.style.textDecoration == "underline") {
        postTextArea.style.textDecoration = "none";
    } else {
        postTextArea.style.textDecoration = "underline";
    }
}

function resetText() {
    postTextArea.style.fontStyle = "initial";
    postTextArea.style.fontWeight = "initial";
    postTextArea.style.textDecoration = "none";
}

// for selecting all text in textarea
function selectallText() {
    postTextArea.select();
}
// for clearing all text in textarea
function clearallText() {
    postTextArea.value = "";
}

// ********************** file uploader preview ****************************************
// this variable will store images for preview
var images = [];
var videos = [];

// this function will select images
function image_select() { }
function video_select() { }

// this function will show images in the DOM
function image_show() { }
function video_show() { }

// this function will get all images from the array
function get_image_data() { }
function get_video_data() { }

// this function will delete a specific image from the container
function delete_image() { }
function delete_video() { }

// this function will check duplicate images
function check_duplicate_image() { }
function check_duplicate_video() { }

// check if image container is empty
var isEmpty = true;
let filePreviewContainer = document.getElementById('uploaded_file_preview_container');
// For Image File select
function image_select() {

    // set false if image is selected
    isEmpty = false;
    var image = document.getElementById('image').files;

    for (i = 0; i < image.length; i++) {
        if (check_duplicate_image(image[i].name)) {
            images.push({
                "name": image[i].name,
                "url": URL.createObjectURL(image[i]),
                "file": image[i],
            })
        } else {
            alert("( " + image[i].name + ") - The File is already Uploaded.");
        }
    }

    document.getElementById('form').reset();
    filePreviewContainer.innerHTML = image_show();

    if (image.length > 0) {
        filePreviewContainer.css("display", "block");
    } else {
        filePreviewContainer.css("display", "none");
    }
}

function image_show() {
    var image = "";
    images.forEach((i) => {
        image += `<div class="post_uploaded_file"><img onload="loadImage()" src="` + i.url + `" alt="Image">
   	  	  	  	  <span class="delete_selected_image" onclick="delete_image(`+ images.indexOf(i) + `)">✖</span></div>`;
    })
    return image;
}

function delete_image(e) {
    images.splice(e, 1);
    filePreviewContainer.innerHTML = image_show();

    // check if images length is 0 then set true
    if (images.length == 0) {
        isEmpty = true;
    }
}

function check_duplicate_image(name) {
    var image = true;
    if (images.length > 0) {
        for (e = 0; e < images.length; e++) {
            if (images[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}

function get_image_data() {
    var form = new FormData()
    for (let index = 0; index < images.length; index++) {
        form.append("file[" + index + "]", images[index]['file']);
    }
    return form;
}

// for video select
function video_select() {

    // set false if image is selected
    isEmpty = false;
    var video = document.getElementById('video').files;

    for (i = 0; i < video.length; i++) {
        if (check_duplicate_video(video[i].name)) {
            videos.push({
                "name": video[i].name,
                "url": URL.createObjectURL(video[i]),
                "file": video[i],
            })
        } else {
            alert("( " + video[i].name + ") - The File is already Uploaded.");
        }
    }

    document.getElementById('form').reset();
    filePreviewContainer.innerHTML = video_show();

    if (video.length > 0) {
        filePreviewContainer.css("display", "block");
    } else {
        filePreviewContainer.css("display", "none");
    }
}

function video_show() {
    var video = "";
    videos.forEach((i) => {
        video += `<div class="post_uploaded_file">
                    <video autoplay muted>
                        <source src="` + i.url + `">
                    </video>
   	  	  	  	    <span class="delete_selected_image" onclick="delete_video(`+ videos.indexOf(i) + `)">✖</span></div>`;
    })
    return video;
}

function check_duplicate_video(name) {
    var video = true;
    if (videos.length > 0) {
        for (e = 0; e < videos.length; e++) {
            if (videos[e].name == name) {
                video = false;
                break;
            }
        }
    }
    return video;
}

function delete_video(e) {
    videos.splice(e, 1);
    filePreviewContainer.innerHTML = video_show();

    // check if images length is 0 then set true
    if (videos.length == 0) {
        isEmpty = true;
    }
}

function get_video_data() {
    var form = new FormData()
    for (let index = 0; index < videos.length; index++) {
        form.append("file[" + index + "]", videos[index]['file']);
    }
    return form;
}

// $("form").on("submit", function (e) {
//     e.preventDefault();
//     $.ajax({
//         url: "upload.php",
//         type: "POST",
//         processData: false,
//         contentType: false,
//         cache: false,
//         data: send_image_data(),
//         success: function (d) {
//             console.log(d)
//         }
//     })
// })

$('#reply_form').hide();

function appendInputField() {
    $('#reply_form').slideToggle("fast");
}

// append reply to comment
let replyText = document.getElementById('reply_input_text');
let userName = "Vivek kumar";
function appendReply() {
    this.preventDefault;

    let replyDisplay = document.getElementById('replies');

    let reply = '';
    var today = new Date();

    // setting date into dd/mm/yyyy format

    // setting time into mm:hh:AM/PM format
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let setTime = hours + ':' + minutes + ' ' + ampm;

    let time = setTime;

    // exceution time start
    let startTime = performance.now();

    if (!$(replyText).val().trim().length) {
        // alert("Reply Cannot be Empty");
        return false;
    } else {

        reply += `<div class="comment reply">
        <span class="user-avatar">
        <img src="Img/Icons/outlined/default_avatar2.png">
        </span>
        <div class="user-info">
        <span class="username">`+ userName + `</span>
        <time class="time">`+ time + `</time>
        <p class="comment-text">`+ replyText.value + `</p>
        </div>
        </div>`;

        $('.loader').css("display", "block");
    }

    replyDisplay.innerHTML += reply;

    // exceution time end
    let endTime = performance.now();
    let executionTime = endTime - startTime + 300;
    setTimeout(function () { $('.loader').css("display", "none"); }, executionTime);
}

let replySubmitBtn = document.querySelector('#reply_form button[type="submit"]');
let replyResetBtn = document.querySelector('#reply_form button[type="reset"]');
function toggleDisableBtn() {
    if (!$(replyText).val().trim().length) {

        $(replySubmitBtn).attr("disabled", true);
        $(replyResetBtn).attr("disabled", true);

        return false;
    } else {
        $(replySubmitBtn).attr("disabled", false);
        $(replyResetBtn).attr("disabled", false);
    }
}

// setInterval(() => {
//     toggleDisableBtn();
// }, 1000);

// append Comment
function appendComment() {
    this.preventDefault;

    let commentDisplay = document.getElementById('comment_display');
    let commentText = document.getElementById('comment_text');
    let comment = '';
    var today = new Date();

    // setting date into dd/mm/yyyy format
    // setting time into mm:hh:AM/PM format
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let setTime = hours + ':' + minutes + ' ' + ampm;

    let time = setTime;

    // exceution time start
    let startTime = performance.now();

    if (!$(commentText).val().trim().length) {
        alert("Comment Cannot be Empty");
        return false;
    } else {

        comment += `<div class="comment">
        <span class="user-avatar">
        <img src="Img/Icons/outlined/default_avatar2.png">
        </span>
        <div class="user-info">
        <span class="username">`+ userName + `</span>
        <time class="time">`+ time + `</time>
        <p class="comment-text">`+ commentText.value + `</p>
        <a href="#" class="comment_reply_btn"><span class="material-icons">shortcut</span>Reply</a>
        </div>
        </div>`;

        $('.loader').css("display", "block");
    }

    commentDisplay.innerHTML += comment;

    // exceution time end
    let endTime = performance.now();
    let executionTime = endTime - startTime + 300;
    setTimeout(function () { $('.loader').css("display", "none"); }, executionTime);
}

// let commentSubmitBtn = document.querySelector('#comment_form button[type="submit"]');
// let commentResetBtn = document.querySelector('#comment_form button[type="reset"]');
// function toggleDisableBtn(){
//     if (!$('#comment_text').val().trim().length) {

//         $(commentSubmitBtn).attr("disabled", true);
//         $(commentResetBtn).attr("disabled", true);

//         return false;
//     } else {

//         $(commentSubmitBtn).attr("disabled", false);
//         $(commentResetBtn).attr("disabled", false);
//     }
// }

// function toggleCommentOption() {

//     // $(".options-container").slideToggle("fast");
//     $(".options-container").fadeToggle(10);

//     window.addEventListener('click', function (e) {
//         if (document.getElementById('option_container').contains(e.target)) {

//             $(".options-container").fadeOut(10);

//         }
//     });
// }

function toggleCommentOption() {

    // $(".options-container").slideToggle("fast");
    $(".options-container").fadeToggle(10);

    window.addEventListener('click', function (e) {
        if (!document.getElementById('comment-options').contains(e.target) || document.getElementById('option_container').contains(e.target)) {

            $(".options-container").fadeOut(10);

        }
    });
}

let commentEditBtn = document.getElementById('edit-comment-btn');
let commentEditCancelBtn = document.getElementById('edit_cancel-btn');
commentEditBtn.addEventListener('click', function () {

    $('#comment-text').attr("contentEditable", true).attr("spellcheck", false);
    $('#comment-text-btn-container').css("display", "flex");

});
commentEditCancelBtn.addEventListener('click', function () {

    $('#comment-text').removeAttr("contentEditable").removeAttr("spellcheck");
    $('#comment-text-btn-container').css("display", "none");

});


var commentModal = document.getElementById('comment-delete-conformation-modal');
var el = document.getElementById('delting-comment');
function popUpdeleteComment() {

    $(commentModal).fadeIn(50);

}

function deleteComment() {
    $(el).fadeOut("slow");
}

window.addEventListener('click', function (e) {
    if (document.getElementById('comment-delete-conformation-modal-content').contains(e.target)) {
        $(commentModal).fadeOut("fast");
    }
});


// Enable Select2
$(document).ready(function () {
    $("select").select2();

    // $('select').each(function () {
    //     // Check if there's at least one non-empty option
    //     if ($(this).find('option[value!=""]:first').length > 0) {
    //         // Check if the first option is already a "Select" option
    //         if ($(this).find('option:first').val() !== '') {
    //             $(this).prepend('<option value="" disabled selected>Select</option>');
    //         }
    //         $('select').select2({
    //             placeholder: 'Select an option', // Set your desired placeholder text
    //             allowClear: true // Allow clearing the selection
    //         });
    //     }
    // });

   $('select').each(function () {
    // Check if there's at least one non-null and non-empty option
    if ($(this).find('option').filter(function () {
        return this.value !== '' && this.value !== null;
    }).length > 0) {
        // Check if the first option is already a "Select" option
        if ($.trim($(this).find('option:first').val()) !== '') {
            $(this).prepend('<option value="" disabled selected>Select</option>');
        }
        $(this).select2({
            placeholder: 'Select an option',
            allowClear: true
        });
    }
});

});


$(document).ready(function () {
    $('#myTable').DataTable();
});