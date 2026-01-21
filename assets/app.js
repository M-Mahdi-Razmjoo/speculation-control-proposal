document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Initialize Mermaid
  if (window.mermaid) {
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'neutral', 
      securityLevel: 'loose'
    });
  }

  // 2. Initialize KaTeX (Math)
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "\\(", right: "\\)", display: false}
      ]
    });
  }

  // 3. Tab Logic for Code Blocks
  window.openTab = function(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }

    // Remove active class from buttons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show current tab and add active class
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  };

});
