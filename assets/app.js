document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Initialize KaTeX (Math Rendering)
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "\\(", right: "\\)", display: false}
      ]
    });
  }

  // 2. Tab Switching Logic
  window.setTab = function(evt, tabName) {
    // Hide all tab content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    // Deactivate all buttons
    const buttons = document.querySelectorAll('.tab');
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Show specific tab and activate button
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
  };

});
