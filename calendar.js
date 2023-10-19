/*GENERAL INFORMATION:

    This calendar was made by Whirlwind Website services. You can use this calendar however you like.

    STYLING THE CALENDAR:
        The calendar is aregular table, so it has <table>, <th>, <tr> and <td> elements.
        Generally the elements don't have IDs and class names, but you can give them by modifying the GenerateDays() function.
            In there, you can see the tags (except for the days' <td> element, because it is located in the GenerateDay() function).
            You can write regular HTML code in these tags and they will be generated accordingly.
        
            In CSS, you can style it however you awnt, generally the calendar does not have any styling.

    CALENDAR SETTINGS:
        You can set the days and months, as well as the element which you want to put the calendar in (calendarAera) in the rows below (row 31-37).
        Setting the days and months can be useful if you want the calendar to be a different language.
        the dateDisplayElement specifies what element would you want to use for displaying the year and month in the calendar. You can also set what format do you want to display them in.
        If you want to change the elements which are displayed in the calendar, you should need to go inside the GenrateDay() function and switch the <p> element to whatever you want it to be:
            y/m for year month
            m/y for month year
            m for just the month
            y for just the year
            anything else if you don't want to display either the year or month

        The prevMonthBthText and nextMonthBtnText define the text that is displayed inside the buttons which are used to jump to the previous and next month.
    
    DO NOT DELETE THE year AND month VARIABLES AS THEY ARE ESSENTIAL FOR THE CALENDAR!  

    Happy coding!
*/

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const calendarAera = document.querySelector('#calendar');
const dateDisplayElement = 'h1';
const dateDisplayFormat = 'm/y';
const prevMonthBthText = "Previous";
const nextMonthBtnText = "Next";

var month;
var year;
export class Calendar {

    constructor() {
        const currentDate = new Date();
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
    }

    GenerateDay(date) {
        let day = date.split('-')[2];

        //IF YOU WANT TO CHANGE THE ELEMENTS WHICH ARE DISPLAYED IN THE CALENDAR, YOU CAN DO THAT HERE:
        let element = '<p>' + day + "<p>";

        return element;
    }

    //get a year and a month for input and then return a matrix representing the days of the month according to the days' names
    //Before 1 and after 28-29-30-31, there are leading and closing 0-s which will be replaced in the table
    Matrixify() {
        //Getting the target month and its data
        var targetMonth = new Date(year + "-" + month + "-1");
        var targetMonthStartDay = targetMonth.getDay();
        const daysInTargetMonth = new Date(year, month, 0).getDate();
        

        //Create a matrix to display the days
        //The matrix has 7 columns each representing a day in the week
        const matrix = [];
        var dayCount = 0;
        var indexCount = 0;

        for (let i = 0; i < 6; i++) {
            matrix[i] = [];
            for (let j = 0; j < days.length; j++) {
                if(indexCount < targetMonthStartDay) { 
                    matrix[i][j] = 0;
                } else if(dayCount >= daysInTargetMonth) {
                    matrix[i][j] = 0;
                } else {
                    dayCount++;
                    matrix[i][j] = year + "-" + month + "-" + dayCount;
                }
                indexCount++;
            }
        }

        return matrix;
    }

    //Generate days for the current month
    GenerateDays() {
        //Initializ the table
        var table = '';
        table += '<table class="calendar table"><tr>'
        
        days.forEach(day => {
            table += '<td>' + day + '</td>';
        });

        table += '</tr>';

        //Get the days for the calendar in a 2d matrix and putting them in the table
        const daysMatrix = this.Matrixify();

        for(let i = 0; i < 6; i++) {
            table += '<tr>';
            for (let j = 0; j < days.length; j++) {
                table += '<td>';
                if(daysMatrix[i][j] === 0) {
                    table += '';
                } else {
                    table += this.GenerateDay(daysMatrix[i][j]);
                }
                table += '</td>';
            }
            table += '</tr>';
        }


        //Create the previous/next buttons and the date display and append them to the calendar's parent element.
        //create the next button
        const nextMonthBtn = document.createElement('button');
        nextMonthBtn.classList.add('calendarJumpBth');
        nextMonthBtn.textContent = nextMonthBtnText;
        nextMonthBtn.addEventListener('click', () => this.NextMonth());

        //create the previous button
        const prevMonthBth = document.createElement('button');
        prevMonthBth.classList.add('calendarJumpBth');
        prevMonthBth.textContent = prevMonthBthText;
        prevMonthBth.addEventListener('click', () => this.PreviousMonth());

        //set the date display
        let dateDisplay = '<' + dateDisplayElement + '>'
            switch (dateDisplayFormat) {
                case 'm/y':
                    dateDisplay += months[month - 1] + " " + year;
                    break;
                case 'y/m':
                    dateDisplay += year + " " + months[month - 1];
                    break;
                case 'y':
                    dateDisplay += year;
                    break;
                case 'm':
                    dateDisplay += months[month - 1];
                    break;
                default:
                    dateDisplay = '';
                    break;
            }
        dateDisplay += '</' + dateDisplayElement + '>';

        //first, make sure the calendar area is empty, then append everything
        calendarAera.innerHTML = "";
        calendarAera.appendChild(prevMonthBth);
        calendarAera.appendChild(nextMonthBtn);
        calendarAera.insertAdjacentHTML('beforeend', dateDisplay);
        calendarAera.insertAdjacentHTML('beforeend', table);
    }

    NextMonth() {
        if(month === 12) {
            year++;
            month = 1;
        } else {
            month++;
        }
        this.GenerateDays();
    }

    PreviousMonth() {
        if(month === 1) {
            year--;
            month = 12;
        } else {
            month--;
        }
        this.GenerateDays();
    }

}