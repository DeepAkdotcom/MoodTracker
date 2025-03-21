document.addEventListener("DOMContentLoaded", () => {
  // Get all emoji elements and the calendar container
  const emojis = document.querySelectorAll(".emoji");
  const calendarEl = document.getElementById("calendar");
  
  // Load mood history from localStorage or initialize empty array
  let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

  // Initialize FullCalendar with configuration
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth", 
    headerToolbar: {  
      left: "prev,next today",
      center: "title",           
      right: "dayGridMonth,dayGridWeek"  
    },

    // Converting moodHistory to calendar events
    events: moodHistory.map(entry => ({
      title: entry.mood,  
      date: entry.date,    
      display: "background" 
    })),

    // Custom rendering for events (shows emoji in calendar cells)
    eventContent: function(arg) {
      return { html: `<div class="mood-event">${arg.event.title}</div>` };
    },
    height: 'auto',
  });

  calendar.render();  // renders the calendar

  // click event handlers for emoji buttons
  emojis.forEach(emoji => {
    emoji.addEventListener("click", () => {
      // Get selected mood and current date 
      const mood = emoji.getAttribute("data-mood");
      const date = new Date().toLocaleDateString("en-CA"); 
      
      // Check for existing entry today
      const existingEntry = moodHistory.find(entry => entry.date === date);

      // Preventing duplicate entries
      if (existingEntry) {
        alert("You've already logged your mood for today!");
        return;  
      }

      // Update mood history and save to localStorage
      moodHistory.push({ date, mood });
      localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
      
      // Adding new event to calendar
      calendar.addEvent({
        title: mood,
        date: date,
        display: "background"
      });
    });
  });
});