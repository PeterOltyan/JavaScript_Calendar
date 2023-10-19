This calendar was made by Whirlwind Website services. You can use this calendar however you like.

After placing the JS file to your desired folder, you can generate the calendar like this:

____________________________________________
<!DOCTYPE html>
<html lang="en">
<head>
    <script type="module" src="js/calendar.js"></script>
    <script type="module">
        // Import the Calendar class from the JavaScript file
        import { Calendar } from './js/calendar.js';

        // Create an instance of the Calendar class
        const calendar = new Calendar();

        // Call the GenerateDays() method from the Calendar class when the page is loaded
        window.addEventListener('load', function(){
            calendar.GenerateDays();
        });
    </script>
</head>
<body>
    <div id='calendar'></div>
</body>
</html>

____________________________________________

The calendar will generate into a div with the id of 'calendar', but you can quickly change it in the file.