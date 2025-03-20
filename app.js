document.addEventListener("DOMContentLoaded", () => {
    const emojis = document.querySelectorAll(".emoji");
    const calendarEl = document.getElementById("calendar");
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek"
      },
      events: moodHistory.map(entry => ({
        title: entry.mood,
        date: entry.date,
        display: "background"
      })),
      eventContent: function(arg) {
        return { html: `<div class="mood-event">${arg.event.title}</div>` };
      },
      height: 'auto',
    });

    calendar.render();

    emojis.forEach(emoji => {
      emoji.addEventListener("click", () => {
        const mood = emoji.getAttribute("data-mood");
        const date = new Date().toISOString().split("T")[0];
        const existingEntry = moodHistory.find(entry => entry.date === date);

        if (existingEntry) {
          alert("You've already logged your mood for today!");
          return;
        }

        moodHistory.push({ date, mood });
        localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
        
        calendar.addEvent({
          title: mood,
          date: date,
          display: "background"
        });
      });
    });
  });