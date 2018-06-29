//RETRIEVES ALL OF THE SALONS
$(function () {
    $.getJSON('../Scripts/DataSource.json', function (data) {
        var stars = "<i class='glyphicon glyphicon-star'></i>";
        var emptyStar = "<i class='glyphicon glyphicon-star-empty'></i>";
        var stringStar = "";
        var i = 0;
        //LOOPS THROUGH ALL OF THE SALONS
        $.each(data.companyInfo, function () {

            //CHECKS THE AMOUNT OF STARS OF CURRENT SALON IN THE LOOP.
            if (data.companyInfo[i].reviewStars == 0) { //IF SALON HAS 0 STARS - ADD 5 EMPTY STARS
                stringStar += emptyStar.repeat(5);
            }
            else if (data.companyInfo[i].reviewStars == 1) { //IF SALON HAS 1 STARS - ADD 1 STAR 4 EMPTY STARS
                stringStar += stars.repeat(1) + emptyStar.repeat(4); 
            }
            else if (data.companyInfo[i].reviewStars == 2) { //IF SALON HAS 2 STARS - ADD 2 STARS 3 EMPTY STARS
                stringStar += stars.repeat(2) + emptyStar.repeat(3);
            }
            else if (data.companyInfo[i].reviewStars == 3) { //IF SALON HAS 3 STARS - ADD 3 STARS 2 EMPTY STARS
                stringStar += stars.repeat(3) + emptyStar.repeat(2);
            }
            else if (data.companyInfo[i].reviewStars == 4) { //IF SALON HAS 4 STARS - ADD 4 STARS AND 1 EMPTY STAR
                stringStar += stars.repeat(4) + emptyStar.repeat(1);
            }
            else if (data.companyInfo[i].reviewStars == 5) { //IF SALON HAS 5 STARS - ADD 5 STARS
                stringStar += stars.repeat(5);
            }
            $("table#myTable").append("<tr><td><span>" + this['openingHours'] + "</span></td>" +
                "<td><p><span>" + this['name'] + "</span><span>" + this['price'] + " kr" + "</span></p>" +
                "<p> " + stringStar +
                "<span>(" + this['amountOfReviews'] + ")</span><span>" + this['distanceInMinutes'] + " min" + "</span></p>" +
                "<p>" + this['street'] + "</p> " +
                "</td><td style='padding: 0;'><button onclick='reply_click(this.value)' value='" + this['name'] + "'><i class='fa fa-angle-right'></i></button></td></tr>")
            i++; //ADDS 1 TO RETRIEVE THE NEXT SALON
            stringStar = ""; //EMPTIES THE STRING SO A NEW STRING CAN BE MADE
        });
    });
});

function reply_click(val) {
    var s, stars, emptyStar, stringStar;
    stars = "<i class='glyphicon glyphicon-star'></i>";
    emptyStar = "<i class='glyphicon glyphicon-star-empty'></i>";
    stringStar = "";
    document.getElementById("list").style.display = "none"; //TURN PREVIOUS LIST (WITH ALL SALONS) INVISIBLE
    document.getElementById("cList").style.display = "initial"; //TURN LIST (WITH SELECTED SALON) VISIBLE
    document.getElementById("companyInfo").style.borderBottom = "2px solid rgb(193, 165, 13)"
    $.getJSON('../Scripts/DataSource.json', function (data) {
        for (var i = 0; i < data.companyInfo.length; i++) {
            if (data.companyInfo[i].name == val) {
                s = i;
            }
            else {
            }
        }
        //IDENTICAL CODE TO THE ONE ABOVE 
        if (data.companyInfo[s].reviewStars == 0) {
            stringStar += emptyStar.repeat(5);
        }
        else if (data.companyInfo[s].reviewStars == 1) {
            stringStar += stars.repeat(1) + emptyStar.repeat(4);
        }
        else if (data.companyInfo[s].reviewStars == 2) {
            stringStar += stars.repeat(2) + emptyStar.repeat(3);
        }
        else if (data.companyInfo[s].reviewStars == 3) {
            stringStar += stars.repeat(3) + emptyStar.repeat(2);
        }
        else if (data.companyInfo[s].reviewStars == 4) {
            stringStar += stars.repeat(4) + emptyStar.repeat(1);
        }
        else if (data.companyInfo[s].reviewStars == 5) {
            stringStar += stars.repeat(5);
        }
        //INSERTS COMPANY NAME
        document.getElementById("companyName").innerHTML = data.companyInfo[s].name;
        //INSERTS AMOUNT OF STARS AND AMOUNT OF REVIEWS
        document.getElementById("reviews").innerHTML = stringStar + "<span>(" + data.companyInfo[s].amountOfReviews + ")</span>";
        //ADDS LIST OF COMPANY INFORMATION
        $("#cList > ul").append("<li><p><i class='fa fa-map-marker'></i><span>" + data.companyInfo[s].street + ", 113 57 Stockholm</span></p></li>"
             + "<li><p><i class='fa fa-clock-o'></i><span> Öppet till " + data.companyInfo[s].openingHours + " idag</span></p></li>"
            + "<li><p><i class='fa fa-phone'></i><span>" + data.companyInfo[s].phoneNumber + "<span></p></li>"
            + "<li><p><i class='fa fa-globe'></i><span>" + data.companyInfo[s].website + "</span></p></li>");
    })
};
function backToList() {
    //CLEARS THE LIST
    $("#cList > ul > li").remove();
    //TURN PREVIOUS LIST (WITH ALL SALONS) INVISIBLE
    document.getElementById("list").style.display = "initial";
    //TURN LIST (WITH SELECTED SALON) VISIBLE
    document.getElementById("cList").style.display = "none";
};

function companySchema() {
    //ADDS BORDER BOTTOM TO "INFO"-BUTTON ON SELECTED SALON LIST
    document.getElementById("companyInfo").style.borderBottom = "2px solid rgb(193, 165, 13)"
    //REMOVES BORDER BOTTOM FROM "SCHEMA"-BUTTON
    document.getElementById("companySchema").style.borderBottom = "none"
}

function companyInfo() {
    //ADDS BORDER BOTTOM TO "SCHEMA"-BUTTON ON SELECTED SALON LIST
    document.getElementById("companySchema").style.borderBottom = "2px solid rgb(193, 165, 13)"
    //REMOVES BORDER BOTTOM FROM "INFO"-BUTTON
    document.getElementById("companyInfo").style.borderBottom = "none"
}

//TRIED TO FILTER THE LIST BY FINDING A SALON THAT HAS A PRICE WITHIN THE PRICE RANGE BUT COULD NOT DO IT.
function priceRange(val) {
    var splittable = val.split(' - '); //SPLITS THE PRICE RANGE
    minValue = parseInt(splittable[0]); //GETS THE LOWEST PRICE
    maxValue = parseInt(splittable[1]); //GETS THE HIGHEST PRICE
}









//FILTERS THE TABLE TO FIND A SALON THAT MATCHES THE PRICE THAT HAS BEEN ENTERED 
//(MUST TYPE IN THE PRICE - OBS! THE INPUT IS COMMENTED OUT IN THE INDEX VIEW)
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}