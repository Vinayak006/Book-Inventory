let bookname = document.querySelector("#bookname");
let bookauthor = document.querySelector("#bookauthor");
let bookyear = document.querySelector("#bookyear")
let bookid = document.querySelectorAll(".bookid");
bookname.setAttribute("pattern", "[a-zA-Z ]+");
bookname.setAttribute("oninvalid", "setCustomValidity('Enter valid name')");
bookname.setAttribute("oninput", "setCustomValidity('')");
bookname.setAttribute("autocomplete", "off");
                
bookauthor.setAttribute("pattern", "[a-zA-Z ]+");
bookauthor.setAttribute("oninvalid", "setCustomValidity('Enter valid name')");
bookauthor.setAttribute("oninput", "setCustomValidity('')");
bookauthor.setAttribute("autocomplete", "off");
                
bookyear.setAttribute("pattern", "[0-9]{4}");
bookyear.setAttribute("oninvalid", "setCustomValidity('Enter valid year')");
bookyear.setAttribute("oninput", "setCustomValidity('')");
bookyear.setAttribute("autocomplete", "off");